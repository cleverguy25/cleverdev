import fetch from "node-fetch";

function defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

function convertFromJson(json) {
  const result = Object.assign({}, json);
  result.created = new Date(json.created);
  result.lastModified = new Date(json.lastModified);
  return result;
}

class SquidexClientConfiguration {
  constructor() {
    defineProperty(this, "url", "https://cloud.squidex.io");

    defineProperty(this, "clientId", void 0);

    defineProperty(this, "clientSecret", void 0);

    defineProperty(this, "project", "");
  }
}

class ConfigurationManager {
  static buildConfiguration(options, ...extraOptions) {
    if (options === undefined) {
      throw new Error(
        "Configuration options are required"
      );
    }

    if (options.clientId === undefined) {
      throw new Error("`clientId` is required");
    }

    if (options.clientSecret === undefined) {
      throw new Error("`clientSecret` is required");
    }

    if (options.project === undefined) {
      throw new Error("`project` is required");
    }

    return Object.assign(
      {},
      new SquidexClientConfiguration(),
      options,
      ...extraOptions
    );
  }
}

export class SquidexClient {
  constructor(options) {
    defineProperty(this, "config", void 0);
    defineProperty(this, "token", void 0);
    this.config = ConfigurationManager.buildConfiguration(options);
  }

  async getAuthenticationToken() {
    if (!this.token) {
      await this.initializeToken();
    }

    return this.token;
  }

  async initializeToken() {
    const authorizationResponse = await fetch(
      `${this.config.url}/identity-server/connect/token`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        body: `grant_type=client_credentials&client_id=${this.config.clientId}&client_secret=${this.config.clientSecret}&scope=squidex-api`
      }
    );

    if (!authorizationResponse.ok) {
      const errorText = await authorizationResponse.text();
      throw new Error(`Could not obtain Squidex token. ${errorText}`);
    }

    const json = await authorizationResponse.json();
    this.token = `Bearer ${json["access_token"]}`;
  }

  async getAsset(id) {
    const token = await this.getAuthenticationToken();
    const response = await fetch(
      `${this.config.url}/api/apps/${this.config.project}/assets/${id}`,
      {
        headers: {
          Authorization: token,
          "X-Flatten": "true"
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    return await response.json();
  }

  async query(schema) {
    const token = await this.getAuthenticationToken();
    const response = await fetch(
      `${this.config.url}/api/content/${this.config.project}/${schema}`,
      {
        headers: {
          Authorization: token,
          "X-Flatten": "true"
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    const data = await response.json();
    return data.items.map(x => {
      return convertFromJson(x);
    });
  }
}

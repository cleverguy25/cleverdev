import { getPageLookup } from './_pages.js';

export async function get(req, res, next) {

	const lookup = await getPageLookup();
	const { page } = req.params;
	
	let key = page.toLowerCase();
	if (key == "index") {
		key = '';
	}
	if (lookup.has(key)) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});
		res.end(lookup.get(key));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}

import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} seconds`));
		}, s * 1000);
	});
};

export const getJSON = async function (url) {
	try {
		// Fetch recipe data from API
		const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
		// const res = await fetch(url);

		if (!res.ok) throw new Error('No recipes found for that query. Please try again.');
		const data = await res.json();
		return data;
	} catch (err) {
		throw err;
	}
};

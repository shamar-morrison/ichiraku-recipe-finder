import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
	return new Promise(function (_, reject) {
		setTimeout(function () {
			reject(new Error(`Request took too long! Timeout after ${s} seconds`));
		}, s * 1000);
	});
};

// get Recipe data from server
export const getJSON = async function (url) {
	try {
		// Fetch recipe data from API
		const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

		if (!res.ok) throw new Error('No recipes found for that query. Please try again.');
		const data = await res.json();
		return data;
	} catch (err) {
		throw err;
	}
};

// upload Recipe data to server
export const sendJSON = async function (url, recipeData) {
	try {
		const fetchPro = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(recipeData),
		});

		const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
		const data = await res.json();

		if (!res.ok) throw new Error(data.message, res.status);
		return data;
	} catch (err) {
		throw err;
	}
};

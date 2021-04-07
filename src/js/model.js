import * as config from './config.js';
import { getJSON } from './helpers.js';

export const state = {
	recipe: {},
	search: {
		query: '',
		results: [],
	},
	bookmarks: [],
};

export const loadRecipe = async function (recipeID) {
	try {
		const data = await getJSON(`${config.API_URL}/${recipeID}`);
		const { recipe } = data.data;
		state.recipe = recipe;
	} catch (error) {
		throw Error(error);
		// console.error(error.message);
	}
};

export const loadSearchResults = async searchQuery => {
	try {
		const data = await getJSON(`${config.API_URL}?search=${searchQuery}`);
		const searchResults = data.data.recipes;
		// set state
		state.search.results = searchResults;
		state.search.query = searchQuery;
		console.debug('results', searchResults);
	} catch (error) {
		throw Error(error);
	}
};

import * as config from './config.js';
import { getJSON } from './helpers.js';

export const state = {
	recipe: {},
	search: {},
	bookmarks: [],
};

export const loadRecipe = async function (recipeID) {
	try {
		const data = await getJSON(`${config.API_URL}${recipeID}`);
		const { recipe } = data.data;
		state.recipe = recipe;
	} catch (error) {
		throw Error(error);
		// console.error(error.message);
	}
};

export const loadSearchResults = async query => {};

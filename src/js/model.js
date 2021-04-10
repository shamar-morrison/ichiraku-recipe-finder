import * as config from './config.js';
import { getJSON } from './helpers.js';

export const state = {
	recipe: {},
	search: {
		query: '',
		results: [],
		currentPage: 1,
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
		throw error;
	}
};
/** @returns a certain number of results per page */
export const getSearchResultsPage = (pageNum = state.search.currentPage) => {
	state.search.currentPage = pageNum;
	const startIndex = (pageNum - 1) * config.RESULTS_PER_PAGE;
	const endIndex = pageNum * config.RESULTS_PER_PAGE;

	return state.search.results.slice(startIndex, endIndex);
};

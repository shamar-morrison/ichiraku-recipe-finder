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

/** Load the selected recipe */
export const loadRecipe = async function (recipeID) {
	try {
		const data = await getJSON(`${config.API_URL}/${recipeID}`);
		const { recipe } = data.data;
		state.recipe = recipe;
	} catch (error) {
		throw Error(error);
		// console.error(error.message);
	}

	// if current recipe is bookmark, load with bookmark icon
	if (state.bookmarks.some(bookmark => bookmark.id === recipeID)) {
		state.recipe.isBookmarked = true;
	} else {
		state.recipe.isBookmarked = false;
	}
};

/** Load the search results */
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

/** Update servings */
export const updateServings = newServings => {
	state.recipe.ingredients.forEach(ing => {
		if (!ing.quantity) return;
		ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
	});
	state.recipe.servings = newServings;
};

/** Add recipe to bookmarks */
export const addBookmark = recipe => {
	state.bookmarks.push(recipe);

	// mark recipe as bookmarked if === current recipe
	if (recipe.id === state.recipe.id) state.recipe.isBookmarked = true;
};

/** Remove recipe from bookmarks */
export const removeBookmark = id => {
	// remove bookmark
	const recipeIndex = state.bookmarks.findIndex(bookmark => bookmark.id === id);
	state.bookmarks.splice(recipeIndex, 1);
	console.debug('bookmarks', state.bookmarks);

	// mark current recipe as unbookmarked
	if (id === state.recipe.id) state.recipe.isBookmarked = false;
};

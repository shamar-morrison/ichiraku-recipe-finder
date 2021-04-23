import * as config from './config.js';
import { getJSON, sendJSON } from './helpers.js';
import addRecipeView from './views/addRecipeView.js';

/** Application state */
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
		const data = await getJSON(`${config.API_URL}/${recipeID}?key=${config.API_KEY}`);
		const { recipe } = data.data;
		state.recipe = recipe;
	} catch (error) {
		throw Error(error);
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
		const data = await getJSON(`${config.API_URL}?search=${searchQuery}&key=${config.API_KEY}`);
		const searchResults = data.data.recipes;

		// set state
		state.search.results = searchResults;
		state.search.query = searchQuery;
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

/** Save bookmarks to localStorage */
const saveBookmarks = () => {
	localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

/** Add recipe to bookmarks */
export const addBookmark = recipe => {
	state.bookmarks.push(recipe);

	// mark recipe as bookmarked if === current recipe
	if (recipe.id === state.recipe.id) state.recipe.isBookmarked = true;
	saveBookmarks();
};

/** Remove recipe from bookmarks */
export const removeBookmark = id => {
	// remove bookmark
	const recipeIndex = state.bookmarks.findIndex(bookmark => bookmark.id === id);
	state.bookmarks.splice(recipeIndex, 1);

	// mark current recipe as unbookmarked
	if (id === state.recipe.id) state.recipe.isBookmarked = false;
	saveBookmarks();
};

export const uploadRecipe = async recipeData => {
	try {
		const ingredients = Object.entries(recipeData)
			// filter ingredients from recipeData
			.filter(el => el[0].startsWith('ingredient') && el[1] !== '')
			.map(ing => {
				const [quantity, unit, description] = ing[1].split(',').map(el => el.trim());
				return {
					quantity: isNaN(quantity) ? null : +quantity,
					unit: unit ? unit : '',
					description: description ? description : '',
				};
			});

		const recipe = {
			title: recipeData.title,
			source_url: recipeData.sourceUrl,
			image_url: recipeData.image,
			publisher: recipeData.publisher,
			cooking_time: +recipeData.cookingTime,
			servings: +recipeData.servings,
			ingredients,
		};

		const data = await sendJSON(`${config.API_URL}?key=${config.API_KEY}`, recipe);
		data.data.recipe.isBookmarked = true;
		state.recipe = data.data.recipe;

		// add created recipe to bookmarks
		addBookmark(state.recipe);
	} catch (err) {
		console.error('uploadRecipe()', err);
	}
};

const initModel = () => {
	// get bookmarks from localStorage
	const storage = localStorage.getItem('bookmarks');
	if (storage) state.bookmarks = JSON.parse(storage);
};

initModel();

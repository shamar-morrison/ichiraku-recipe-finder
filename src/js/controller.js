import * as model from './model.js';
import * as config from './config.js';
import RecipeView from './views/recipeView.js';
import SearchBarView from './views/searchBarView.js';
import SearchResultsView from './views/searchResultsView.js';
import PaginationView from './views/paginationView.js';
import BookmarksView from './views/bookmarksView.js';
import AddRecipeView from './views/addRecipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// /** Parcel's hot reloading */
// if (module.hot) {
// 	module.hot.accept();
// }

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

/** Show the recipe */
const controlRecipes = async () => {
	try {
		// get recipe ID
		const recipeID = window.location.hash.slice(1);
		if (!recipeID) return;

		// show spinner while waiting for image
		RecipeView.renderSpinner();

		// loading recipe
		await model.loadRecipe(recipeID);

		// render recipe
		RecipeView.render(model.state.recipe);
		console.debug(model.state.recipe);
	} catch (err) {
		RecipeView.renderErrorMsg();
		console.error(err.message);
	}
};

/** Display search results */
const controlSearchResults = async () => {
	try {
		const searchQuery = SearchBarView._getSearchQuery();
		if (!searchQuery) return;

		// render spinner
		SearchResultsView.renderSpinner();

		await model.loadSearchResults(searchQuery);

		// if no recipes found
		if (model.state.search.results.length <= 0) {
			throw Error('No recipes found for that query.');
		}

		// reset page number on new search
		model.state.search.currentPage = 1;

		// render results
		SearchResultsView.render(model.getSearchResultsPage());

		// render pagination buttons
		PaginationView.render(model.state.search);
	} catch (error) {
		SearchResultsView.renderErrorMsg(error.message);
		console.error(error);
	}
};

const controlPagination = pageNum => {
	// update search results
	SearchResultsView.render(model.getSearchResultsPage(pageNum));
	// render pagination btns
	PaginationView.render(model.state.search);
};

const controlServings = newServings => {
	// update the recipe servings (in state)
	model.updateServings(newServings);

	// update the recipe view
	RecipeView.render(model.state.recipe);
};

const controlBookmarks = () => {
	// Add/remove bookmarks
	if (!model.state.recipe.isBookmarked) {
		model.addBookmark(model.state.recipe);
	} else {
		model.removeBookmark(model.state.recipe.id);
	}
	// update recipe view
	RecipeView.render(model.state.recipe);

	// render empty message if no bookmarks
	if (!model.state.bookmarks.length) {
		BookmarksView.renderErrorMsg('No bookmarks. Find recipes you love and bookmark them');
		return;
	}
	// render bookmarks
	BookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async newRecipe => {
	try {
		AddRecipeView.renderSpinner();

		await model.uploadRecipe(newRecipe);

		// render recipe
		RecipeView.render(model.state.recipe);

		// show success message
		AddRecipeView.renderMsg();

		// render bookmarks
		BookmarksView.render(model.state.bookmarks);
		// model.state.bookmarks = [];

		// change recipe ID in URL
		window.history.pushState(null, '', `#${model.state.recipe.id}`);

		// hide upload recipe form
		setTimeout(() => {
			AddRecipeView.toggleUploadModal();
		}, config.MODAL_CLOSE);
	} catch (err) {
		console.error(err.message);
		AddRecipeView.renderErrorMsg(err.message);
	}
};

/**
 * Initialise App
 */
const init = () => {
	RecipeView.addLoadHandler(controlRecipes);
	RecipeView.addUpdateServingsHandler(controlServings);
	RecipeView.addBookmarkEventHandler(controlBookmarks);
	AddRecipeView.addHandlerUploadRecipe(controlAddRecipe);

	// render bookmarks on initial page load
	if (model.state.bookmarks.length > 0) BookmarksView.render(model.state.bookmarks);

	SearchBarView.addSubmitHandler(controlSearchResults);
	PaginationView.addClickHandler(controlPagination);
};

init();

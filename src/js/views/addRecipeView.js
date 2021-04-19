import View from './View.js';

class AddRecipeView extends View {
	_parentElement = document.querySelector('.upload');

	_btnAddRecipe = document.querySelector('.nav__btn--add-recipe');
	_addRecipeModal = document.querySelector('.add-recipe-window');
	_modalOverlay = document.querySelector('.overlay');
	_btnCloseModal = document.querySelector('.btn--close-modal');

	constructor() {
		super();
		this._addHandlerToggleModal();
	}

	/** */
	_addHandlerUpload() {
		this._parentElement.addEventListener('submit', e => {
			e.preventDefault();
			const uploadRecipeData = [...new FormData(this._parentElement)];
		});
	}

	_generateMarkup() {}

	/** */
	_toggleHiddenClass() {
		this._modalOverlay.classList.toggle('hidden');
		this._addRecipeModal.classList.toggle('hidden');
	}

	_addHandlerToggleModal() {
		this._btnAddRecipe.addEventListener('click', this._toggleHiddenClass.bind(this));
		this._btnCloseModal.addEventListener('click', this._toggleHiddenClass.bind(this));
		this._modalOverlay.addEventListener('click', this._toggleHiddenClass.bind(this));
	}
}

export default new AddRecipeView();

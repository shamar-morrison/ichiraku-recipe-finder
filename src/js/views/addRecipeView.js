import View from './View.js';

class AddRecipeView extends View {
	_parentElement = document.querySelector('.upload');
	_message = 'Recipe was successfully uploaded.';

	_btnAddRecipe = document.querySelector('.nav__btn--add-recipe');
	_addRecipeModal = document.querySelector('.add-recipe-window');
	_modalOverlay = document.querySelector('.overlay');
	_btnCloseModal = document.querySelector('.btn--close-modal');

	constructor() {
		super();
		this._addHandlerToggleModal();
	}

	/** */
	addHandlerUploadRecipe(handler) {
		this._parentElement.addEventListener('submit', e => {
			e.preventDefault();
			const dataArr = [...new FormData(this._parentElement)];
			const uploadRecipeData = Object.fromEntries(dataArr);
			console.debug('uploadRecipeData()', uploadRecipeData);
			handler(uploadRecipeData);
		});
	}

	_generateMarkup() {}

	/** */
	toggleUploadModal() {
		this._modalOverlay.classList.toggle('hidden');
		this._addRecipeModal.classList.toggle('hidden');
	}

	_addHandlerToggleModal() {
		this._btnAddRecipe.addEventListener('click', this.toggleUploadModal.bind(this));
		this._btnCloseModal.addEventListener('click', this.toggleUploadModal.bind(this));
		this._modalOverlay.addEventListener('click', this.toggleUploadModal.bind(this));
	}
}

export default new AddRecipeView();

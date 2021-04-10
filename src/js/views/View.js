const loadingGif = require('url:../../img/loading.gif');

export default class View {
	_data;

	/**
	 * Render the recipe/search results/pagination btns
	 */
	render(data) {
		this._data = data;
		const markupHTML = this._generateMarkup();

		this._clear();
		this._parentElement.insertAdjacentHTML('beforeend', markupHTML);
	}

	_clear() {
		this._parentElement.innerHTML = '';
	}

	/**
	 * Render the loading GIF
	 */
	renderSpinner() {
		const spinner = `
		<div class="spinner">
          <img src="${loadingGif}" alt="loading..." srcset="${loadingGif}" class="loading-gif">
        </div> `;
		this._clear();
		this._parentElement.insertAdjacentHTML('afterbegin', spinner);
	}

	/**
	 * Render an error message
	 */
	renderErrorMsg(message = `No recipe found. Please try another recipe.`) {
		const errorMsg = `
        <div class="error">
            <div>
              <i class="fas fa-exclamation-circle"></i>
              <p>${message}</p>
            </div>
        </div> `;
		this._clear();
		this._parentElement.insertAdjacentHTML('afterbegin', errorMsg);
	}
}

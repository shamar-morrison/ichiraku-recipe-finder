import View from './View.js';
import { state } from '../model.js';
import { RESULTS_PER_PAGE } from '../config.js';

class PaginationView extends View {
	_parentElement = document.querySelector('.pagination');

	_generateMarkup() {
		// get number of pages
		const numPages = Math.ceil(this._data.results.length / RESULTS_PER_PAGE);

		// if on page 1 and there are other pages
		if (this._data.currentPage === 1 && numPages > 1) {
			return `other pages`;
		}

		// if on last page
		if (this._data.currentPage === numPages) {
			return `on last page`;
		}

		// if on any other page
		if (this._data.currentPage < numPages) {
			return `any other page`;
		}

		// if on page 1 and there are no other pages
		return `one page only`;
	}
}

export default new PaginationView();

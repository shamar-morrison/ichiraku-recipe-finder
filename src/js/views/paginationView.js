import View from './View.js';
import { RESULTS_PER_PAGE } from '../config.js';

class PaginationView extends View {
	_parentElement = document.querySelector('.pagination');

	_generateMarkup() {
		// get number of pages
		const numPages = Math.ceil(this._data.results.length / RESULTS_PER_PAGE);
		const currentPage = this._data.currentPage;

		// if on page 1 and there are other pages
		if (currentPage === 1 && numPages > 1) {
			return `
				<button class="btn--inline pagination__btn--next" data-goto="${currentPage + 1}">
					<span>Next</span>
					<i class="fas fa-arrow-circle-right"></i>
				</button> `;
		}

		// if on last page
		if (currentPage === numPages && numPages > 1) {
			return `
				<button class="btn--inline pagination__btn--prev" data-goto="${currentPage - 1}">
					<i class="fas fa-arrow-circle-left"></i>
					<span>Back</span>
				</button>`;
		}

		// if on any other page
		if (currentPage < numPages) {
			return `
				<button class="btn--inline pagination__btn--prev" data-goto="${currentPage - 1}">
					<i class="fas fa-arrow-circle-left"></i>
					<span>Back</span>
				</button>
				<button class="btn--inline pagination__btn--next" data-goto="${currentPage + 1}">
					<span>Next</span>
					<i class="fas fa-arrow-circle-right"></i>
				</button> `;
		}

		// if on page 1 and there are no other pages
		return ``;
	}

	addClickHandler(handler) {
		this._parentElement.addEventListener('click', function (event) {
			const targetBtn = event.target.closest('button');
			if (!targetBtn) return;

			const gotoPage = +targetBtn.dataset.goto;
			handler(gotoPage);
		});
	}
}

export default new PaginationView();

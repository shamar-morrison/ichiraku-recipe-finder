class SearchBarView {
	_parentElement = document.querySelector('.search');

	_getSearchQuery() {
		return this._parentElement.querySelector('.search__field').value;
	}

	addEventHandler(handler) {
		this._parentElement.addEventListener('submit', e => {
			e.preventDefault();
			handler();
		});
	}
}
export default new SearchBarView();

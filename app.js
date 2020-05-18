window.addEventListener('popstate', (e) => {
	console.log('popstate event ', e);
});

window.onload = () => {
	const root = document.getElementById('root');
	const books = JSON.parse(window.localStorage.getItem('booksList'));

	const nav = document.createElement('div');
	nav.setAttribute('class', 'nav');

	const section = document.createElement('div');
	section.setAttribute('class', 'section');

	const header = document.createElement('h3');
	header.innerText = 'Books';
	nav.appendChild(header);

	books.map(item => {
		const link = createItemBookList(item.name, item.id);
		nav.appendChild(link);
	})

	root.appendChild(nav);
}

function createItemBookList (name, id) {
	const item = document.createElement('div')
	item.setAttribute('class', 'listItem');

	const bookNameContainer = document.createElement('div');
	const bookLink = document.createElement('a');
	bookLink.innerText = `${name}`;
	bookLink.setAttribute('href', `/#`);
	bookLink.setAttribute('id', `${id}`);
	bookLink.addEventListener('click', clickLink);
	bookNameContainer.appendChild(bookLink);

	const button = document.createElement('button');
	button.innerText = 'Edit';

	item.appendChild(bookNameContainer);
	item.appendChild(button);

	return item;
}

function clickLink(e) {
	e.preventDefault();
	const url = new URL(window.location.href);
	const baseUrl = url.href.slice(0, url.href.indexOf('.html')) + '.html';
	const newHref = baseUrl	 + `?id=${this.id}#preview`;
	window.history.pushState({}, '', newHref);
	window.dispatchEvent(new CustomEvent('popstate', {'detail': {'id': this.id}}));
}
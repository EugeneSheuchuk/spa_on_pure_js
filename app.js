/// first add event listener
window.addEventListener('popstate', (e) => {
	if (e.state) {
		bookPreview(e.state.id);
	} else {
		bookPreview(e.detail.id);
	}
});
/// execute code after the page has been loaded
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
	root.appendChild(section);

	console.log(window.location.href);
}
/// create nav item
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
/// change URL bar after a link click
function clickLink(e) {
	e.preventDefault();
	const url = new URL(window.location.href);
	const baseUrl = url.href.slice(0, url.href.indexOf('.html')) + '.html';
	const newHref = baseUrl	 + `?id=${this.id}#preview`;
	window.history.pushState({'id': this.id}, '', newHref);
	window.dispatchEvent(new CustomEvent('popstate', {'detail': {'id': this.id}}));
}
/// clear section and create new elements
function bookPreview(id) {
	const idToNumber = Number(id);
	const section = document.querySelectorAll('.section')[0];
	section.innerHTML = '';
	const header = document.createElement('h3');
	header.innerText = 'Book preview!';
	const book = books.find((elem) => elem.id === idToNumber);
	section.appendChild(header);
	section.appendChild(createBookBlock(book));

}
/// create book block with all necessary data
function createBookBlock (book) {
	const container = document.createElement('div');
	container.setAttribute('class', 'bookContainer');
	const bookName = document.createElement('p');
	bookName.setAttribute('class', 'bookName');
	bookName.innerHTML = `<b>Book name:</b> ` + book.name;
	const author = document.createElement('p');
	author.setAttribute('class', 'bookAuthor');
	author.innerHTML = `<b>Book author:</b> ` + book.author;
	const plot = document.createElement('p');
	plot.setAttribute('class', 'bookPlot');
	plot.innerHTML = `<b>Book plot:</b> ` + book.plot;
	const img = document.createElement('img');
	img.setAttribute('src', `${book.image}`);
	container.appendChild(bookName);
	container.appendChild(author);
	container.appendChild(plot);
	container.appendChild(img);
	return container;
}
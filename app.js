/// first add event listener
window.addEventListener('popstate', (e) => {
	if (e.state === null) { /// this case work when manually change hash in the loaded page
		const url = new URL(window.location.href);
		const id = url.searchParams.get("id");
		const hash = url.hash;
		bookPreview(id, hash.slice(1));
	} else if (e.state) {
		bookPreview(e.state.id, e.state.action);
	} else {
		bookPreview(e.detail.id, e.detail.action);
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

	const url = new URL(window.location.href);
	const id = url.searchParams.get("id");
	const hash = url.hash;
	if (id) {
		if (hash === '#preview') {
			bookPreview(id, 'preview');
		} else if (hash === '#edit') {
			bookPreview(id, 'edit');
		}
	}
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
	button.addEventListener('click', editBookOnLink);

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
	window.history.pushState({'id': this.id, 'action': 'preview'}, '', newHref);
	window.dispatchEvent(new CustomEvent('popstate', {'detail': {'id': this.id, 'action': 'preview'}}));
}
/// clear section and create new elements
function bookPreview(id, action) {
	const idToNumber = Number(id);
	const section = document.querySelectorAll('.section')[0];
	section.innerHTML = '';
	const header = document.createElement('h3');
	const books = JSON.parse(window.localStorage.getItem('booksList'));
	const book = books.find((elem) => elem.id === idToNumber);
	if (action === 'preview') {
		header.innerText = 'Book preview!';
		section.appendChild(header);
		section.appendChild(createBookBlock(book));
	} else if (action === 'edit') {
		header.innerText = 'Edit the book data!';
		section.appendChild(header);
		section.appendChild(editBookBlock(book));
	}
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
/// change URL bar after a button click
function editBookOnLink(e) {
	e.preventDefault();
	const url = new URL(window.location.href);
	const baseUrl = url.href.slice(0, url.href.indexOf('.html')) + '.html';
	const id = url.searchParams.get("id");
	const newHref = baseUrl	 + `?id=${id}#edit`;
	window.history.pushState({'id': id, 'action': 'edit'}, '', newHref);
	window.dispatchEvent(new CustomEvent('popstate', {'detail': {'id': id, 'action': 'edit'}}));
}

function editBookBlock (book) {
	const bookId = book.id;
	const container = document.createElement('form');
	container.setAttribute('class', 'editBookContainer');
	const name = createFormInput('Book name', book.name);
	name.setAttribute('id','name');
	const author = createFormInput('Book author', book.author);
	author.setAttribute('id', 'author');
	const image = createFormInput('Book image address', book.image);
	image.setAttribute('id', 'image');
	const plot = createFormInput('Book plot', book.plot);
	plot.setAttribute('id', 'plot');
	container.appendChild(name);
	container.appendChild(author);
	container.appendChild(image);
	container.appendChild(plot);

	const submit = document.createElement('input');
	submit.setAttribute('type', 'submit');
	submit.setAttribute('value', 'Save');
	container.appendChild(submit);

	const cancel = document.createElement('input');
	cancel.setAttribute('type', 'button');
	cancel.setAttribute('value', 'Cancel');
	cancel.addEventListener('click', (e) => {
		e.preventDefault();
		const result = confirm('Discard changes?');
		if (result) {
			const url = new URL(window.location.href);
			const newHref = url.href.slice(0, url.href.indexOf('#')) + '#preview';
			const id = url.searchParams.get("id");
			window.history.pushState({'id': id, 'action': 'preview'}, '', newHref);
			window.dispatchEvent(new CustomEvent('popstate', {'detail': {'id': id, 'action': 'preview'}}));
		}
	});
	container.appendChild(cancel);

	const saveBookData = () => {
		const book = collectBookData();
		book.id = Number(bookId);
		const books = JSON.parse(window.localStorage.getItem('booksList'));
		const newBooks = books.map(elem => {
			if (elem.id === bookId) return book;
			return elem;
		})
		localStorage.setItem('booksList',JSON.stringify(newBooks));
		setTimeout(() => {
			alert('Book successfully updated');
			const url = new URL(window.location.href);
			const newHref = url.href.slice(0, url.href.indexOf('#')) + '#preview';
			const id = url.searchParams.get("id");
			window.history.pushState({'id': id, 'action': 'preview'}, '', newHref);
			window.dispatchEvent(new CustomEvent('popstate', {'detail': {'id': id, 'action': 'preview'}}));
		}, 300);
	};

	container.addEventListener('submit', (e) => {
		e.preventDefault();
		if (checkBookData(e.target)) {
			alert('Field(s) can not be empty!!!');
			return;
		}
		saveBookData();
	});
	return container;
}

function createFormInput (name, value) {
	const block = document.createElement('label');
	block.innerHTML = `<b>${name}:</b> `;
	const input = document.createElement('input');
	input.setAttribute('type', 'text')
	input.setAttribute('required', 'true');
	input.setAttribute('value', value);
	block.appendChild(input);
	return block;
}

function checkBookData(data) {
	const bookFields = [...data];
	return bookFields.some(elem => elem.defaultValue === '');
}

function collectBookData() {
	const name = document.getElementById('name').children[1].value;
	const author = document.getElementById('author').children[1].value;
	const image = document.getElementById('image').children[1].value;
	const plot = document.getElementById('plot').children[1].value;
	return {name, author, image, plot};
}
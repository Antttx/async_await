const ALBUMS_URL = 'https://jsonplaceholder.typicode.com/albums';

const dataContainer = document.createElement('ol');
dataContainer.id = 'data-container';
document.body.append(dataContainer);

const loader = document.createElement('span');
loader.className = 'loader';
loader.setAttribute('hidden', '');
loader.textContent = 'Загрузка...';
dataContainer.append(loader);

function createElements(albums) {
	albums.forEach((album) => {
		const itemList = document.createElement('li');
		itemList.textContent = album.title;
		dataContainer.append(itemList);
	})

}

function isLoader() {
	if (loader.hasAttribute('hidden')) {
		loader.removeAttribute('hidden')
	}
	loader.setAttribute('hidden', '');
}

async function renderAlbums() {
	try {
		const request = await fetch(ALBUMS_URL);
		isLoader();
		if (!request.ok) {
			throw new Error('Ошибка получения альбомов');
		}
		const response = await request.json();
		console.log(response);
		createElements(response);
	} catch(error) {
		console.log('Error', error);
	} finally {
		isLoader();
	}

}

renderAlbums();
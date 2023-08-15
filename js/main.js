const API = "https://rickandmortyapi.com/api";
const cards = document.querySelector('.cards');
const loadMore = document.querySelector('.load-more');

const search = document.querySelector('#search');
const species = document.querySelector('#species');
const gender = document.querySelector('#gender');
const status = document.querySelector('#status');
const btnAdvancedFilters = document.querySelector('.btn-advanced-filters');

const filters = {
    name: '',
    species: '',
    gender: '',
    status: '',
    page: 1
}

initialize();

btnAdvancedFilters.addEventListener('click', () => {
    const advancedFilters = document.querySelector('.advanced-filters');
    advancedFilters.classList.toggle('activated');
});

loadMore.addEventListener('click', () => {
    filters.page++;
    initialize(filters);
});

species.addEventListener('change', async (e) => {
    filters.species = e.target.value;
    cards.innerHTML = '';
    filters.page = 1;
    initialize(filters);
});

gender.addEventListener('change', async (e) => {
    filters.gender = e.target.value;
    cards.innerHTML = '';
    filters.page = 1;
    initialize(filters);
});

status.addEventListener('change', async (e) => {
    filters.status = e.target.value;
    cards.innerHTML = '';
    filters.page = 1;
    initialize(filters);
});

search.addEventListener('keyup', async (e) => {
    if (e.keyCode == 13) {
        filters.name = e.target.value;
        cards.innerHTML = '';
        filters.page = 1;
        initialize(filters);
    }
});


async function initialize() {
    const characters = await getCharacters(filters);
    await render(characters);
}

async function getCharacters({ name, species, gender, status, page = 1 }) {
    const response = await fetch(`${API}/character?name=${name}&species=${species}&gender=${gender}&status=${status}&page=${page}`);
    const datas = await response.json();
    return datas.results;
}

async function render(characters) {
    characters.forEach(character => {
        const { image, name, species, gender, status, card, infos } = createElements();
        name.innerHTML = character.name;
        image.src = character.image;
        species.innerHTML = `<b>Species</b>: ${character.species}`;
        gender.innerHTML = `<b>Gender</b>: ${character.gender}`;
        status.innerHTML = `<b>Status</b>: ${character.status}`;

        card.appendChild(name);
        card.appendChild(image);
        infos.appendChild(species);
        infos.appendChild(gender);
        infos.appendChild(status);
        card.appendChild(infos);
        cards.appendChild(card);
    });
}

function createElements() {
    return {
        image: createElement('img', 'image'),
        name: createElement('h3', 'name'),
        species: createElement('span', 'species'),
        gender: createElement('span', 'gender'),
        status: createElement('span', 'status'),
        card: createElement('div', 'card'),
        infos: createElement('div', 'infos')
    };
}

function createElement(elementType, className = defualt) {
    const element = document.createElement(elementType);
    element.classList.add(className);
    return element;
}
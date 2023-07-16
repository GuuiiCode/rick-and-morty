const API = "https://rickandmortyapi.com/api";
const cards = document.querySelector('.cards');
const loadMore = document.querySelector('.load-more');
let count = 1;

getInfoRickAndMorty();

async function getInfoRickAndMorty() {
    const response = await fetch(`${API}/character?page=${count}`);
    const data = await response.json();

    data.results.forEach(element => {
        let p = document.createElement('p');
        p.classList.add('name');

        let img = document.createElement('img');
        img.classList.add('image');

        let div = document.createElement('div');
        div.classList.add('card');

        div.appendChild(img);
        div.appendChild(p);
        cards.appendChild(div);

        p.innerHTML = element.name;
        img.src = element.image;
    });

    // console.log(data);
}

loadMore.addEventListener('click', () => {
    count++;
    getInfoRickAndMorty();
});
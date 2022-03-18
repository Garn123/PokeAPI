let pokemons = [];

window.onload = () => {
    init()
    const inputText = document.querySelector(".input-text")
    inputText.addEventListener("input", () => searchBar())
}

const init = async () => {
    pokemons = await fetchPokemon()
    printPokemons(pokemons)
}


const fetchPokemon = async () => {
    const data = [];
    for (let i = 1; i <= 151; i++) {
        const fetchPok = await fetch (`https://pokeapi.co/api/v2/pokemon/${i}`)
        const fetchList = await fetchPok.json()
        data.push(fetchList)
    }
    return data;
}

const printPokemons = (pokemons) => {
    const list = document.querySelector('.list') ? document.querySelector('.list') : document.createElement('div');
    list.innerHTML = ""
    list.className = 'list'
    pokemons.forEach(pokemon => {
        const card = document.createElement('div')
        card.innerHTML += `
            <div class="container">       
                <p class="order"><span>ID: </span>${pokemon.order}</p>
                <h1 class="name">${pokemon.name}</h1>
                <img src=${pokemon.sprites.other.dream_world.front_default} alt=${pokemon.name}/>
                <p class="type"><span>Type: </span>${pokemon.types[0].type.name}</p>
                <p class="height">${pokemon.height/10} m</p>
                <p class="weight">${pokemon.weight/10} kg</p>
            </div>
            <div class="back">
            </div>
        `

        card.className = `${pokemon.types[0].type.name} card`;
        list.appendChild(card)
    })
    document.body.appendChild(list)
}

const searchBar = () =>  {
    const inputText = document.querySelector(".input-text")
    const pokeFilter = pokemons.filter(pokemon => (pokemon.name.toLowerCase().includes(inputText.value.toLowerCase())))
    printPokemons(pokeFilter)
}
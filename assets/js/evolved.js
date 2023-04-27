const pokemonName = document.querySelector('.pokemon_name')
const pokemonNumber = document.querySelector('.pokemon_number')
const pokemonImage = document.querySelector('.pokemon_image')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const prev = document.querySelector('.btn-prev')
const next = document.querySelector('.btn-next')

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const ApiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (ApiResponse.status === 200) {
        const data = await ApiResponse.json();
        return data
    }

}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...'
    pokemonNumber.innerHTML = ''
    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        input.value = ''
        searchPokemon = data.id
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not found :C';
        pokemonNumber.innerHTML = ''
    }

}

form.addEventListener('submit', (event) => {
        event.preventDefault()
    renderPokemon(input.value.toLowerCase())

});

next.addEventListener('click', (event) => {
    
    searchPokemon += 1;
    renderPokemon(searchPokemon)

});

prev.addEventListener('click', (event) => {
    if(searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon)
    } else {
        window.location = 'index.html'
    }
});
renderPokemon(searchPokemon)

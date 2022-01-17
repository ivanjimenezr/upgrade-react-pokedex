import './App.scss';
import { useState } from "react"
import  Axios  from 'axios';


const App = () => {

  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemonDetail, setPokemonDetal] = useState(false)
  const [pokemon, setPokemon] = useState({
    name: "",
    number: "",
    species: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    type: "",
  });
  
  
  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (res) => {
        
        setPokemon({
          name: pokemonName,
          number: res.data.id,
          species: res.data.species.name,
          image: res.data.sprites.front_default,
          hp: res.data.stats[0].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
          speed: res.data.stats[5].base_stat,
					type: res.data.types[0].type.name,
          base_experience: res.data.base_experience,
          height: res.data.height,
          abilities: res.data.abilities,

        });
        setPokemonChosen(true);
        console.log(res.data)
        
      }
    );
  };

  


  return (
    <div className="App">
      <div className='TitleSection'>
        <h1>Pokédex</h1>
        <input type="text" onChange={(event)=>{
          setPokemonName(event.target.value);
        }}
        value={pokemonName.toLowerCase()} />

        
        <div>
          {pokemonName && <button onClick={searchPokemon}>Search Pokémon</button>}
        </div>

        <div className="DisplaySection">
        {!pokemonChosen ? (
          <h1> Please choose a Pokémon </h1>) : (
          <>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.image} alt={pokemon.name} />
            <h3>Number: <span className='red'>#{pokemon.number}</span></h3>
            <h3>Species: {pokemon.species}</h3>
            <h3>Type: {pokemon.type}</h3>
            <h4>Hp: <span className='red'>{pokemon.hp}</span></h4>
            <h4>Attack: <span className='red'>{pokemon.attack}</span></h4>
            <h4>Defense: <span className='red'>{pokemon.defense}</span></h4>
            <h4>Speed: <span className='red'>{pokemon.speed}</span></h4>
            <button className="custom-btn btn-4" onClick={() => setPokemonDetal(true)}>
              Detalles
            </button>
          </>
        )}
      </div>
      
      {pokemonDetail ? (
        <>
          <h1>{pokemon.name}</h1>
            <img src={pokemon.image} alt={pokemon.name} />
            <h3>Number: <span className='red'>#{pokemon.number}</span></h3>
            <h3>Species: {pokemon.species}</h3>
            <h3>Type: {pokemon.type}</h3>
            <h4>Hp: <span className='red'>{pokemon.hp}</span></h4>
            <h4>Attack: <span className='red'>{pokemon.attack}</span></h4>
            <h4>Defense: <span className='red'>{pokemon.defense}</span></h4>
            <h4>Speed: <span className='red'>{pokemon.speed}</span></h4>
            <h3>Base Experience: {pokemon.base_experience}</h3>
            <h3>height: {pokemon.height}</h3>
            {console.log(pokemon.abilities)}
            
            {pokemon.abilities.map((item)=>{
                    return (
                        <div key={JSON.stringify(item)}>
                            
                            <p>{item.ability.name}</p>
                            {console.log(item.ability.name)}
                        </div>
                    )})}
        <button className="custom-btn btn-4" onClick={() => setPokemonDetal(false)}>
              Cerrar
            </button>
        </>
        ) : null}
          
      </div>
      
    </div>
  );
}

export default App;







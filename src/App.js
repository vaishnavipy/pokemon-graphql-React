
import './App.css';
import { ApolloClient,ApolloCache, InMemoryCache,gql, useQuery,useLazyQuery} from "@apollo/client";
import { useState,useEffect } from 'react';



function App() {

  const [pokemons,setPokemons] = useState([]) 

  const [search,setSearch] = useState("")

  const GET_POKEMONS = gql`
    query get_pokemons{
      pokemons(first:50){
        id
        name
        maxCP
        maxHP
        attacks{
          special{
            name
            
          }
        }
        
        image
        
        
      }
    }
    `;

    const GET_POKEMON = gql`
    query get_pokemon($name:String!){
      pokemon(name:$name){
        id
        name
        maxCP
        maxHP
        attacks{
          special{
            name
            
          }
        }
        
        image
        
        
      }
    }
    `;

   const {loading,err,data} = useQuery(GET_POKEMONS);


  useEffect(()=>{
    if(data){
    setPokemons(data.pokemons)
  
    }
    //console.log(data.pokemons[0].attacks.special[0].name)
  },[data])

  function handleChange(e){
    setSearch(e.target.value)
  }

  const [getPoke,{loading:loadingR,data:dataR}] = useLazyQuery(GET_POKEMON)

  function handleSearch(){
   
  
    getPoke({variables:{name:search}})
   
  } 

  function handleEnter(e){
   if( e.keyCode === 13){
     handleSearch();
   }
  }



  return (

    <div>
       <div className="search">
        <label>Search for a pokemon : </label>
        <input type="text" name="search" value={search} onChange={handleChange} onKeyDown={handleEnter}/>
        <button onClick={handleSearch}>SEARCH</button>
      </div>

      <div className="app-container">

        { dataR && dataR.pokemon ? (<div className="poke-card">
            <h2 className="poke-name">{dataR.pokemon.name}</h2>
            <div className="power-flex"><p>{dataR.pokemon.maxCP}</p><p>{dataR.pokemon.maxHP}</p></div>
            <div className="img-div"><img src={dataR.pokemon.image}/></div>
            <div className="attacks-flex"><p>{dataR.pokemon.attacks.special[0].name}</p><p>{dataR.pokemon.attacks.special[0].name}</p><p>{dataR.pokemon.attacks.special[0].name}</p></div>
          </div>) : 

        pokemons.map((poke,i)=> {
          
          return ( 
          <div className="poke-card">
            <h2 className="poke-name">{poke.name}</h2>
            <div className="power-flex"><p>{poke.maxCP}</p><p>{poke.maxHP}</p></div>
            <div className="img-div"><img src={poke.image}/></div>
            <div className="attacks-flex"><p>{poke.attacks.special[0].name}</p><p>{poke.attacks.special[0].name}</p><p>{poke.attacks.special[0].name}</p></div>
          </div>)} ) }
      </div>
    </div>
  );
}

export default App;

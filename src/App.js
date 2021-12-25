import React, {useState, useEffect} from 'react';
import PokemonList from './PokemonList';
import axios from 'axios'
import Pag from './Pag'

function App(){
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)

useEffect( ()=>{
  setLoading(true)
  let cancel
  //axios is similar to fetch(), is getting pokeapi data and making a promise
  axios.get(currentPageUrl, {
    cancelToken: new axios.CancelToken(c => cancel = c  )
  }).then(request => {
    setLoading(false)
    //setting next page url
    setNextPageUrl(request.data.next)
    //setting previous page url
      setPrevPageUrl(request.data.previous)

    //getting name of each pokemon
    setPokemon(request.data.results.map(p => p.name))})


    return() => cancel()

},[currentPageUrl])


function gotoNextPage() {
  setCurrentPageUrl(nextPageUrl)
}
function gotoPrevPage(){
  setCurrentPageUrl(prevPageUrl)
}
if (loading) return "Loading..."


return (
    <>
    <PokemonList pokemon={pokemon} />
    <Pag
    gotoNextPage={nextPageUrl ? gotoNextPage: null}
    gotoPrevPage={prevPageUrl ? gotoPrevPage: null} />
  </> )
}



export default App;

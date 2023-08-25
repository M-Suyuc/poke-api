import { useEffect, useState } from 'react'
import { getPokemons, searchPokemon } from '../services/pokemons'

const incialUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=25'
// Otra forma de acceder a las paginas de los pokemones es con el siguiente link
// https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20 y en donde esta cero ("0"&limit=20) podemos cambiar el valor a travez de una variable de estado por ejemplo const [page, setPage] = useState(0) y lo inicializamos en cero

export const usePokeApi = () => {
  const [url, setUrl] = useState(incialUrl)
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(false)
  const [nextUrl, setNextUrl] = useState()
  const [prevUrl, setPrevUrl] = useState()
  const [pokemonSearch, setpokemonSearch] = useState([])

  const handleNext = () => {
    setPokemons([])
    setUrl(nextUrl)
  }
  const handlePrev = () => {
    setPokemons([])
    setUrl(prevUrl)
  }

  const fetchPokemons = async () => {
    setLoading(true)
    try {
      const { next, previous, results } = await getPokemons(url)
      getPokemon(results)

      setNextUrl(next)
      setPrevUrl(previous)
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const getPokemon = async (res) => {
    setLoading(true)
    try {
      res.map(async (item) => {
        const res = await fetch(item.url)
        if (!res.ok) {
          const error = new Error('An error ocurred while feching the data')
          throw error
        }
        const pokemon = await res.json()

        const POKEMON = {
          id: pokemon.id,
          name: pokemon.name,
          image: pokemon.sprites.other.dream_world.front_default,
          type: pokemon.types[0].type.name,
          stats: pokemon.stats,
        }

        setPokemons(function infoPokemon(pokemons) {
          pokemons.sort((a, b) => (a.id > b.id ? 1 : -1))
          pokemons = [...pokemons, POKEMON]
          return pokemons
        })
      })
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const singlePokemon = async ({ search }) => {
    setLoading(true)
    try {
      const POKEMON = await searchPokemon(
        `https://pokeapi.co/api/v2/pokemon/${search}`
      )
      setpokemonSearch(POKEMON)
    } catch (err) {
      console.log(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPokemons()
  }, [url])

  return {
    pokemons,
    loading,
    handleNext,
    handlePrev,
    prevUrl,
    singlePokemon,
    pokemonSearch,
    setpokemonSearch,
  }
}

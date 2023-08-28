import { useEffect, useState, useRef, useCallback } from 'react'
import { getPokemons, searchPokemon } from '../services/pokemons'
import { mapeoPokemon } from '../utils/mapeo'

const incialUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=25'

export const usePokeApi = ({ search }) => {
  const [url, setUrl] = useState(incialUrl)
  const [pokemons, setPokemons] = useState([])
  const [loading, setLoading] = useState(false)
  const [nextUrl, setNextUrl] = useState()
  const [prevUrl, setPrevUrl] = useState()
  const [pokemonSearch, setpokemonSearch] = useState([])
  const previousSearch = useRef(search)
  console.log(previousSearch)

  const handleNext = () => {
    setPokemons([])
    setUrl(nextUrl)
  }
  const handlePrev = () => {
    setPokemons([])
    setUrl(prevUrl)
  }

  const fetchPokemons = async () => {
    try {
      setLoading(true)
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
        const { POKEMON } = mapeoPokemon(pokemon)

        setPokemons(function infoPokemon(pokemons) {
          pokemons.sort((a, b) => a.id - b.id)
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

  const singlePokemon = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return
    try {
      setLoading(true)
      previousSearch.current = search
      const POKEMON = await searchPokemon({ search })
      setpokemonSearch([POKEMON])
    } catch (err) {
      console.log(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

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

import { mapeoPokemon } from '../utils/mapeo'

export const getPokemons = async (url) => {
  const res = await fetch(url)
  if (!res.ok) {
    const error = new Error('An error ocurred while feching the data')
    throw error
  }
  const json = await res.json()
  const { results, next, previous } = json
  return { results, next, previous }
}

export const searchPokemon = async ({ search }) => {
  if (search === '') return null
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
    if (!res.ok) {
      const error = new Error('An error ocurred while feching the data')
      throw error
    }
    const pokemon = await res.json()
    const { POKEMON } = mapeoPokemon(pokemon)

    return POKEMON
  } catch (error) {
    throw new Error('Error searching movies')
  }
}

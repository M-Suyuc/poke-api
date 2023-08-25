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

export const searchPokemon = async (search) => {
  const res = await fetch(search)
  if (!res.ok) {
    const error = new Error('An error ocurred while feching the data')
    throw error
  }
  const json = await res.json()
  const POKEMON = {
    id: json.id,
    name: json.name,
    image: json.sprites.other.dream_world.front_default,
    type: json.types[0].type.name,
    stats: json.stats,
  }
  return [POKEMON]
}

export const mapeoPokemon = (pokemon) => {
  const POKEMON = {
    id: pokemon.id,
    name: pokemon.name,
    image: pokemon.sprites.other.dream_world.front_default,
    type: pokemon.types[0].type.name,
    stats: pokemon.stats,
  }
  return { POKEMON }
}

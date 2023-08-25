export const getPokemons = async (url) => {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error('Error')
    const json = await res.json()
    const { results, next, previous } = json
    return { results, next, previous }
  } catch (error) {
    throw new Error('Error searching movies')
  }
}

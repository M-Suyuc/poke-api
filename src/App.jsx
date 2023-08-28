import { useState, useRef, useEffect } from 'react'
import Buttons from './components/Buttons'
import Pokemon from './components/Pokemon'
import { usePokeApi } from './hooks/usePokeApi'
import { Loader } from './components/Loader'
import Formulario from './components/Formulario'

function useSearch() {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef('')

  useEffect(() => {
    if (isFirstInput.current) {
      const value = (isFirstInput.current = search)
      console.log(value)
      console.log(search)
      isFirstInput.current = search === ''
      return
    }

    if (search === '') {
      setError('No se puede buscar una película vacía')
      return
    }

    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (search.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres')
      return
    }

    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function App() {
  const { search, updateSearch, error } = useSearch()

  const {
    prevUrl,
    pokemons,
    handleNext,
    handlePrev,
    loading,
    pokemonSearch,
    singlePokemon,
    setpokemonSearch,
  } = usePokeApi({ search })

  const handleSubmit = (event) => {
    event.preventDefault()
    singlePokemon({ search })
  }

  const handleChange = (event) => {
    const newSearch = event.target.value.toLowerCase()
    updateSearch(newSearch)
    setpokemonSearch([])
  }

  return (
    <div className='block w-full max-w-6xl py-4 px-10 md:px-20 pb-32 m-auto bg-gradient-to-r from-cyan-500 via-blue-800  to-cyan-400 min-h-screen'>
      <h1 className='mt-3 text-center text-5xl lg:text-6xl font-bold text-white/40'>
        Poké Api
      </h1>
      <Formulario
        search={search}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <section>
        {!search && (
          <div className='ml-auto mr-auto mt-8 mb-4'>
            <Buttons
              handleNext={handleNext}
              handlePrev={handlePrev}
              prevUrl={prevUrl}
            />
          </div>
        )}

        {loading && <Loader />}

        {!search ? (
          <div className='grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center'>
            {pokemons.map((pokemon) => (
              <Pokemon key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        ) : (
          pokemonSearch.map((pokemon) => (
            <Pokemon key={pokemon.id} pokemon={pokemon} />
          ))
        )}
      </section>
    </div>
  )
}

export default App

import { useState } from 'react'
import Buttons from './components/Buttons'
import Pokemon from './components/Pokemon'
import { usePokeApi } from './hooks/usePokeApi'
import { Loader } from './components/Loader'

function App() {
  const { prevUrl, pokemons, handleNext, handlePrev, loading } = usePokeApi()
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const ulrSerchPokemon = `https://pokeapi.co/api/v2/pokemon/${search}`
    const singlePokemon = async (url) => {
      try {
        const response = await fetch(url)
        if (!response.ok)
          throw new Error('POKEMON NO ENCONTRADO INTENTE DE NUEVO')
        const json = await response.json()
        const POKEMON = {
          id: json.id,
          name: json.name,
          image: json.sprites.other.dream_world.front_default,
          type: json.types[0].type.name,
          stats: json.stats,
        }
        setData([POKEMON])
      } catch (err) {
        console.log(err.message)
        setError(err.message)
      }
    }
    singlePokemon(ulrSerchPokemon)
  }

  const handleChange = (e) => {
    const query = e.target.value.toLowerCase()
    setSearch(query)
    setError('')
    setData([])
  }
  return (
    <div className='block w-full max-w-6xl py-4 px-10 md:px-20 pb-32 m-auto'>
      <h1 className='mt-3 text-center text-5xl font-bold'>Poké Api</h1>

      <form onSubmit={handleSubmit} className='my-8 '>
        <label
          htmlFor='default-search'
          className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
        >
          Search
        </label>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <svg
              className='w-4 h-4 text-gray-500 dark:text-gray-400'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
              />
            </svg>
          </div>
          <input
            autoFocus
            onChange={handleChange}
            type='search'
            id='default-search'
            className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none'
            placeholder='Busca pikachu, charmander...'
          />
          <button
            type='submit'
            className='text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Search
          </button>
        </div>
      </form>

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
          <div className='grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-slate-700 place-items-center'>
            {pokemons.map((pokemon) => (
              <Pokemon key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        ) : (
          data.map((pokemon) => <Pokemon key={pokemon.id} pokemon={pokemon} />)
        )}
      </section>
    </div>
  )
}

export default App

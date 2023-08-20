import { useState } from 'react'
import Buttons from './components/Buttons'
import Pokemon from './components/Pokemon'
import { usePokeApi } from './hooks/usePokeApi'

function App () {
  const { prevUrl, pokemons, handleNext, handlePrev } = usePokeApi()
  const [search, setSearch] = useState('')
  const [data, setData] = useState([])
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const ulrSerchPokemon = `https://pokeapi.co/api/v2/pokemon/${search}`
    const singlePokemon = async (url) => {
      try {
        const response = await fetch(url)
        // console.log(response.ok)
        if (!response.ok) throw new Error('POKEMON NO ENCONTRADO INTENTE DE NUEVO')
        const json = await response.json()
        const POKEMON = {
          id: json.id,
          name: json.name,
          image: json.sprites.other.dream_world.front_default,
          type: json.types[0].type.name,
          stats: json.stats
        }
        setData([POKEMON])
      } catch (err) {
        // console.log(err)
        // console.log(err.message)
        setError(err.message)
      }
    }
    singlePokemon(ulrSerchPokemon)
  }

  const handleChange = (e) => {
    setSearch(e.target.value.toLowerCase())
    setError('')
    setData([])
  }
  return (
    <div>
      <h1 className='mt-3 text-center text-5xl font-bold'>Poké Api</h1>
      <form
        onSubmit={handleSubmit}
        className='w-96 p-4 flex ml-auto mr-auto justify-between mt-16'
      >
        <input
          placeholder='Busca un pokemon'
          onChange={handleChange}
          type='text'
          className='border-2 border-solid border-black  outline-none w-3/4 pl-2 rounded font-medium'
        />
        <button className='border-2 border-solid border-black px-4 py-1 rounded font-medium'>
          Buscar
        </button>
      </form>
      {/* Rederizando los pokemons */}
      <section className=''>
        {
          search === ''
            ? (
              <div>
                <div className='w-11/12 ml-auto mr-auto mt-8 mb-4'>
                  <Buttons
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    prevUrl={prevUrl}
                  />
                </div>
                <div className='w-11/12 ml-auto mr-auto pt-2  pb-10  grid gap-4 justify-items-center items-center grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
                  {
                    pokemons.map(({ id, name, type, image, stats }) => (
                      <Pokemon
                        key={id}
                        id={id}
                        name={name}
                        type={type}
                        image={image}
                        stats={stats}
                      />
                    ))
                  }
                </div>
              </div>
              )
            : error
              ? <h4 className='text-red-700 text-4xl text-center font-bold'>{error}</h4>
              : data.map(({ id, name, type, image, stats }) => (
                <Pokemon
                  key={id}
                  id={id}
                  name={name}
                  type={type}
                  image={image}
                  stats={stats}
                />
              ))
        }
      </section>
    </div>
  )
}

export default App

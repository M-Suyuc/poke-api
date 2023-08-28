import { useModal } from '../hooks/useModal'
import PokemonModal from './PokemonModal'

const Pokemon = ({ pokemon }) => {
  const { id, name, type, image, stats } = pokemon
  const [isOpenModal, openModal, closeModal] = useModal(false)

  const pokemonColor = (type) => {
    const colores = {
      bug: 'bg-lime-400',
      water: 'bg-blue-400',
      grass: 'bg-green-400',
      fire: 'bg-red-500',
      normal: 'bg-gray-600',
      fighting: 'bg-red-700',
      rock: 'bg-yellow-600',
      steel: 'bg-indigo-300',
      electric: 'bg-yellow-400',
      flying: 'bg-violet-400',
      psychic: 'bg-rose-400',
      dragon: 'bg-violet-600',
      ice: 'bg-cyan-300',
      poison: 'bg-fuchsia-700',
      dark: 'bg-yellow-800',
      ghost: 'bg-indigo-600',
      fairy: 'bg-pink-300',
    }
    const colorDefault = 'bg-orange-700'
    return colores[type] || colorDefault
  }

  return (
    <>
      <article
        className={`${pokemonColor(
          type
        )} border border-solid border-black p-3 rounded flex flex-col-reverse justify-between items-center  shadow-sm w-full max-w-[280px] hover:bg-opacity-75`}
      >
        <p className='text-center text-xl font-semibold'>
          {id} {name}
        </p>
        <figure>
          <img
            onClick={openModal}
            data-name={name}
            src={image}
            alt={name}
            className='w-44 h-44 cursor-pointer'
          />
        </figure>
      </article>

      <PokemonModal isOpen={isOpenModal} closeModal={closeModal}>
        <h3 className='text-center text-3xl font-bold'>
          {id} - {name}
        </h3>
        <p className='font-semibold text-xl '>Tipo:</p>
        <p>{type}</p>
        <p className='font-semibold text-xl'>Estadísticas:</p>
        {stats.map((item) => (
          <ul key={item.stat.name}>
            <li className='font-semibold'>{item.stat.name}</li>
            <li>{item.base_stat}</li>
          </ul>
        ))}
      </PokemonModal>
    </>
  )
}

export default Pokemon

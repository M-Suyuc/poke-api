import { useModal } from '../hooks/useModal'
import PokemonModal from './PokemonModal'

const Pokemon = ({ pokemon }) => {
  const { id, name, type, image, stats } = pokemon
  const [isOpenModal, openModal, closeModal] = useModal()

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
        <h3 className='text-center text-4xl font-bold first-letter:uppercase text-slate-700'>
          {name}
        </h3>
        <div className='flex flex-col md:flex-row  justify-between items-center py-4 gap-4 md:gap-0'>
          <div className='w-[100%] md:w-[50%] pl-0 flex flex-col justify-center items-center md:items-start md:pl-20 text-xl'>
            <p className=''>Tipo: {type}</p>
            {stats.map((item) => (
              <ul key={item.stat.name}>
                <li className='first-letter:uppercase'>
                  {item.stat.name}: {item.base_stat}
                </li>
              </ul>
            ))}
          </div>
          <div className='w-[50%] flex justify-center items-center'>
            <figure className='w-[100%] md:w-[55%]'>
              <img
                src={image}
                alt={name}
                className='aspect-square w-full h-full'
              />
            </figure>
          </div>
        </div>
      </PokemonModal>
    </>
  )
}

export default Pokemon

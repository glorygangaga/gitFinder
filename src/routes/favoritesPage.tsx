import Navigation from "../components/navigation"
import { useAppSelector } from "../hooks/redux"

const FavoritesPage = () => {
  const {favorites} = useAppSelector(state => state.gitHub)
  return(
    <div>
      <Navigation/>
      <div className="flex justify-center max-w-7xl mx-auto my-0 px-[40px] pt-4">
        {!favorites.length ? 
          <p className="text-center font-semibold text-3xl mt-4">there is not favorites</p> 
          : 
          <ul className="list-none flex flex-col gap-2">
            {favorites.map((f, index) => 
              <li key={index} className="border px-3 py-2 hover:bg-gray-100 hover:shadow-xl transition-all duration-300">
                <a href={f} target="_blank">{f}</a>
              </li>
              )}
          </ul>
        }
      </div>
      
    </div>
  )
}

export default FavoritesPage
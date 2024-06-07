import { useState } from "react"
import { useAction } from "../hooks/actions"
import { useAppSelector } from "../hooks/redux"
import { IRepo } from "../models"

const RepoCard = ({repo}: {repo: IRepo}) => {
  const {addFavorite, removeFavorite} = useAction()
  const {favorites} = useAppSelector(state => state.gitHub)
  const [isFavorite, setIsFavorite] = useState(favorites.includes(repo.html_url))

  const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    addFavorite(repo.html_url)
    setIsFavorite(true)
  }

  const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    removeFavorite(repo.html_url)
    setIsFavorite(false)

  }

  return (
    <div className="border py-3 px-5 rounded mb-2 hover:shadow-md hover:bg-gray-100 transition-all">
      <a href={repo.html_url} target="_blank">
        <h2 className="text-xl font-bold">{repo.full_name}</h2>
        <p className="text-sm mb-2">
          Forks: <span className="font-bold mr-2">{repo.forks}</span>
          watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        <p className="text-sm font-thin">{repo?.description}</p>

        {!isFavorite ?<button 
          className="py-2 px-4 bg-yellow-400 mr-4 rounded hover:shadow-md transition-all"
          onClick={(e) => addToFavorite(e)}  
        >Add</button>
          :
        <button 
          className="py-2 px-4 bg-red-700 rounded hover:shadow-md transition-all"
          onClick={(e) => removeFromFavorite(e)}  
        >remove</button>}
      </a>
    </div>
  )
}

export default RepoCard
import { useEffect, useState } from "react"
import Navigation from "../components/navigation"
import { useSearchUsersQuery, useLazyGetUserReposQuery } from "../store/github/gihub.api"
import { useDebounse } from "../hooks/debounce"
import RepoCard from "../components/repoCard"

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounse(search)
  const {isLoading, isFetching, isError, data} = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true
  })
  const [fetchRepos, {isLoading: isRepoloading, data: repos}] = useLazyGetUserReposQuery()  

  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0)
  }, [debounced, data])

  const clickHandler = (username: string) => {  
    fetchRepos(username)
    setDropdown(false);
  } 

  return (
    <div >
      <Navigation/>
      <div className="max-w-7xl mx-auto my-0 px-[40px]">
        <div className="relative w-[560px] mx-auto pt-4 ">
          <input 
            type="text"
            className="border rounded-lg py-2 px-4 w-full h-[42px] mb-2 focus:outline-none"
            placeholder="search for github userName"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          { dropdown && 
            <ul className="absolue top-[42px] left-0 right-0 max-w-[560px] max-h-[200px] overflow-y-scroll shadow-md bg-white list-none">
              {(isFetching || isLoading) && 
                <div className="flex mt-5 justify-center">
                  <svg className="animate-spin ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p>Please wait</p>
                </div>
              }
              
              {data?.map(user => {
                return(
                  <li 
                    key={user.id}
                    className=" px-4 py-2 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
                    onClick={() => clickHandler(user.login)}
                  >{user.login}</li>
                )
              })}
            </ul>}
            {isError && <p className=" font-bold text-center text-red-600 pt-4"> something went wrong...</p>}             
            <div className="container">
              {isRepoloading  && <p className="text-center"> Repos are loading...</p>}
              {repos?.map(repo => {
                return (
                  <RepoCard repo={repo} key={repo.id}/>
                )
              })}
            </div>
        </div>
        
      </div>
    </div>
  )
}

export default HomePage
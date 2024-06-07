import { Link } from "react-router-dom"

const Navigation = () => {
  return (
    <nav className="bg-gray-500">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-[40px] h-[50px] text-white">
        <h3 className="font-bold">Github search</h3>
        <div className="flex gap-[20px]">
          <Link to='/'>main</Link>
          <Link to='/favorites'>favorites</Link>
        </div>
      </div>
      
        
    </nav>
  )
}

export default Navigation
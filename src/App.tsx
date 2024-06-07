import { Routes, Route, BrowserRouter } from "react-router-dom"
import HomePage from "./routes/homePage"
import FavoritesPage from "./routes/favoritesPage"
import { Provider } from "react-redux"
import { store } from "./store"

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/favorites' element={<FavoritesPage/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
    
  )
}

export default App

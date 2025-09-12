import { BrowserRouter as Router, Routes, Route, Outlet, Navigate} from 'react-router-dom'

import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import AdminPage from './pages/AdminPage.jsx'
import BreakfastManagement from './pages/admin/BreakfastManagement.jsx'
import MenuManagement from './pages/admin/MenuManagement.jsx'
import HomePage from "./pages/Homepage"
import Hyang1 from "./pages/Hyang1Page.jsx"
import RestaurantPage from './pages/RestaurantPage.jsx'
import StorePage from './pages/StorePage.jsx'
import KioskPage from './pages/KioskPage.jsx'
import CurrentInfoPage from './pages/CurrentInfoPage.jsx'

import "./App.css"
import style from "./App.module.css"
import EnqueuePage from './pages/EnqueuePage.jsx'
function App() {  
  return (
    <Router>
      <Routes>
        <Route element={
          <>
            <Navbar />
            <div className={style.inner}>
              <Outlet/>
            </div>
            <Footer/>
          </>
        }>
          <Route path='/' element={<HomePage />} />
          <Route path='/restaurants/h1' element={<Hyang1 />} />
          <Route path='/restaurants/:restaurant' element={<RestaurantPage />} />
        </Route>
        <Route element = {
          <div className={style.inner}>
            <Outlet/>
          </div>
        }>
          <Route path='/enqueue' element={<EnqueuePage/>}></Route>
          <Route path='/kiosk' element = {<KioskPage/>}></Route>
        </Route>
          {/* <Route path='*' element = {<Navigate to={"/"}/>}></Route> */}
        <Route path='/restaurants/:restaurant/:store' element = {<StorePage/>}></Route>
        <Route path='/restaurants/h1/current-info' element = {<CurrentInfoPage/>}></Route>
        <Route path='/admin' element={<AdminPage/>}>
          <Route path='breakfast' element={<BreakfastManagement/>} />
          <Route path='menus' element={<MenuManagement/>} />
        </Route>
      </Routes>           
    </Router>
  )
}

export default App

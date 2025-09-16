import { BrowserRouter as Router, Routes, Route, Outlet, Navigate} from 'react-router-dom'

import Navbar from "./Components/Navbar/Navbar.jsx"
import Footer from "./Components/Footer/Footer.jsx"
import Hyang1Page from "./pages/Hyang1Page.jsx"

import RestaurantPage from './pages/RestaurantPage.jsx'
import KioskPage from './pages/KioskPage.jsx'
import StorePage from './pages/StorePage.jsx'
import CurrentInfoPage from './pages/CurrentInfoPage.jsx'
import AdminPage from './pages/AdminPage.jsx'
import BreakfastManagement from './pages/admin/BreakfastManagement.jsx'
import MenuManagement from './pages/admin/MenuManagement.jsx'

import TestPage from './pages/TestPage.jsx'

import "./App.css"
import style from "./App.module.css"

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
          <Route path='/' element={<Navigate to="/restaurants/h1" replace />} />
          <Route path='/restaurants/h1' element={<Hyang1Page/>} />
          <Route path='/restaurants/:restaurant' element={<RestaurantPage />} />
        </Route>
        <Route element = {
          <div className={style.inner}>
            <Outlet/>
          </div>
        }>
          <Route path='/kiosk' element = {<KioskPage/>}></Route>
        </Route>
        <Route path='/restaurants/:restaurant/:store' element = {<StorePage/>}></Route>
        <Route path='/restaurants/h1/current-info' element = {<CurrentInfoPage/>}></Route>
        <Route path='/admin' element={<AdminPage/>}>
          <Route path='breakfast' element={<BreakfastManagement/>} />
          <Route path='menus' element={<MenuManagement/>} />
        </Route>
        <Route path='/test' element={<TestPage/>}></Route>
           
      </Routes>           
    </Router>
  )
}

export default App

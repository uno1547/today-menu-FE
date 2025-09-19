import { useState, useEffect } from "react"
import { Link, Outlet, useLocation, Navigate, useNavigate } from "react-router-dom"

import AdminLogin from "../Components/AdminLogin/AdminLogin"
import styles from "./AdminPage.module.css"

const AdminPage = () => {
  console.log('AdminPage 렌더링');
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('accessToken'))
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogin = () => {
    setIsLoggedIn(true)
    localStorage.setItem('accessToken', 'your-access-token') // 실제 토큰으로 교체
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('accessToken')
    navigate('/')
  }

  if(!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />
  }

  if(location.pathname === '/admin') {
    return <Navigate to="/admin/breakfast" replace />
  }

  return (
    <div className={styles.AdminPage}>
      <header className={styles.header}>
        <h1>관리자 페이지</h1>
        <button onClick={handleLogout} className={styles.logoutBtn}>로그아웃</button>
        <nav className={styles.tabNav}>
          <Link to={"/admin/breakfast"} className={`${styles.tabBtn} ${location.pathname === '/admin/breakfast' ? styles.active : ''}`}>조식 관리</Link>
          <Link to={"/admin/menu"} className={`${styles.tabBtn} ${location.pathname === '/admin/menu' ? styles.active : ''}`}>메뉴 관리</Link>
        </nav>
      </header>
      {/* 관리자 페이지 내용 */}
      {/* <main className={styles.content}> */}
      <Outlet />
      {/* </main> */}
    </div>
  )
}

export default AdminPage
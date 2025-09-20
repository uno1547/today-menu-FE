import { useState, useEffect } from "react"
import { Link, Outlet, useLocation, Navigate, useNavigate } from "react-router-dom"

import AdminLogin from "../Components/Login/AdminLogin"
import styles from "./AdminPage.module.css"

const AdminPage = () => {
  console.log('AdminPage 렌더링');
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('accessToken'))
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogin = () => {
    /*서버에 로그인 처리*/
    setIsLoggedIn(true) // 토큰 검사로 판단하는게 아니긴함, 초기화함수는 한번실행하고 말기때문에
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
    <div className={styles.adminPage}>
      <header className={styles.header}>
        <h1 className={styles.mainText}>관리자 페이지</h1>
        <button onClick={handleLogout} className={styles.logoutBtn}>로그아웃</button>
      </header>
        <nav className={styles.tabNav}>
          <Link to={"/admin/breakfast"} className={`${styles.tabBtn} ${location.pathname === '/admin/breakfast' ? styles.active : ''}`}>조식 관리</Link>
          <Link to={"/admin/menu"} className={`${styles.tabBtn} ${location.pathname === '/admin/menu' ? styles.active : ''}`}>메뉴 관리</Link>
        </nav>
      {/* 관리자 페이지 내용 */}
      <main className={styles.content}>
      <Outlet />
      </main>
    </div>
  )
}

export default AdminPage
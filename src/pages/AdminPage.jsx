import { useState, useEffect } from "react"
import { Link, Outlet, useLocation, Navigate, useNavigate } from "react-router-dom"

import AdminLogin from "../Components/AdminLogin/AdminLogin"
import styles from "./AdminPage.module.css"

const AdminPage = () => {
  console.log('AdminPage 렌더링');
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  // 컴포넌트 마운트 시 localStorage에서 로그인 상태 확인
  useEffect(() => {
    const savedLoginState = localStorage.getItem('adminLoggedIn')
    if (savedLoginState) {
      setIsLoggedIn(true)
    }
  }, []) // 얘는 첫 마운트 때를 위한 토큰 확인

  const handleLogin = async (formData) => {
    // 간단한 시뮬레이션을 위한 더미 로그인 로직
    console.log('로그인 시도:', formData)
    
    setIsLoggedIn(true)
    localStorage.setItem('adminLoggedIn', 'true')
    // // 실제 구현 예시:
    // try {
    //   const response = await fetch('/api/admin/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    //   })
    //   const data = await response.json()
    //   if (data.token) {
    //     localStorage.setItem('adminToken', data.token)
    //     // localStorage.setItem('adminLoggedIn', 'true')
    //     setIsLoggedIn(true)
    //   }
    // } catch (error) {
    //   console.error('로그인 실패:', error)
    // }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('adminLoggedIn')
    // navigate('/admin')
    navigate('/', { replace: true })
  }

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />
  }

  // /admin 경로로 정확히 접근했을 때 기본으로 breakfast로 리다이렉트
  if (location.pathname === '/admin') {
    return <Navigate to="/admin/breakfast" replace />
  }

  return (
    <div className={styles.adminPage}>
      <header className={styles.header}>
        <h1 className={styles.mainText}>관리자 대시보드</h1>
        <button onClick={handleLogout} className={styles.logoutBtn}>
          로그아웃
        </button>
      </header>
      
      <nav className={styles.tabNav}>
        <Link 
          to="/admin/breakfast" 
          className={`${styles.tabBtn} ${location.pathname === '/admin/breakfast' ? styles.active : ''}`}
        >
          천원의 아침밥 관리
        </Link>
        <Link 
          to="/admin/menus" 
          className={`${styles.tabBtn} ${location.pathname === '/admin/menus' ? styles.active : ''}`}
        >
          식단 관리
        </Link>
      </nav>
      
      <main className={styles.content}>
        <Outlet />
      </main>
    </div>
  )
}

export default AdminPage
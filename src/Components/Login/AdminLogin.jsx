import { useState } from 'react'
import styles from './AdminLogin.module.css'

const AdminLogin = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // 부모 컴포넌트의 onLogin 함수 호출
    if (onLogin) {
      // onLogin(formData)
      onLogin()
    }
  }

  return (
    <div className={styles['admin-login']}>
      <h2>관리자 로그인</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles['form-group']}>
          <label htmlFor="username">아이디</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="아이디를 입력하세요"
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>
        <button type="submit" className={styles['login-btn']}>
          로그인
        </button>
      </form>
    </div>
  )
}

export default AdminLogin
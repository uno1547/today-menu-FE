import { Link, useLocation } from "react-router-dom"
import style from "./Footer.module.css"

const Footer = () => {
  return (
    <footer className={style.footer}>
      <p>&copy; 2025 My Company. All rights reserved.</p>
      <Link to="/admin">관리자 로그인</Link>
    </footer>
  );
}
export default Footer
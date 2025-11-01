// import style from "./Store.module.css"
import style from "./StoreTest.module.css"
import { useNavigate, useParams } from "react-router-dom"

const Store = ({ store }) => {
  const navigate = useNavigate()
  // const {restaurant} = useParams() params 받아서 식당/가게 전체주소를 명시할수도있음
  const {name, image} = store
  const navigateHandler = () => {

  }
  return (
    <div className={style.store} onClick={() => {navigate(`${name}`)}}>
      <img src={null} alt={name}/>
      <span className={style.text}>{name}</span>
    </div>
  )
}

export default Store
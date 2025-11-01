// import style from "./Menu.module.css"
import style from "./MenuTest.module.css"
import img from "../../assets/food.png"

const Menu = ({ menu }) => {
  const {name, price } = menu
  return (
    <div className={style.menu}>
      <img src={img} alt={name} />
      <span className={style.text}>{name}</span>
      <span className={style.price}>{price}원</span>
    </div>
  )
}
export default Menu
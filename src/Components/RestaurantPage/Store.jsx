// import style from "./Store.module.css"
import style from "./StoreTest.module.css"
import { useNavigate, useParams } from "react-router-dom"

import tobagi from "../../assets/tobagi.png"
import arirang from "../../assets/arirang.png"
import umga from "../../assets/umga.jpg"
import kang from "../../assets/kang.jpg"
import ramen from "../../assets/ramen.jpg"
import hongdae from "../../assets/hongdae.png"
import gongdup from "../../assets/gongdup.png"
import daehan from "../../assets/daehan.jpeg"
import suomien from "../../assets/suomien.jpeg"
import hazben from "../../assets/hazben.jpeg"


const storeImgMap = {
  "공여사&덮다": gongdup,
  "대한짜장": daehan,
  "또바기육개장": tobagi,
  "라면집": ramen,
  "수오미엔": suomien,
  "아리랑핫도그": arirang,
  "엄가네해장국": umga,
  "크앙분식": kang,
  "하즈벤": hazben,
  "홍대쌀국수": hongdae,
}

const Store = ({ store }) => {
  const navigate = useNavigate()
  // const {restaurant} = useParams() params 받아서 식당/가게 전체주소를 명시할수도있음
  const {name, image } = store
  // console.log(image);
  const navigateHandler = () => {

  }
  return (
    <div className={style.store} onClick={() => {navigate(`${name}`)}}>
      {/* <img src={image ? image : ""} alt={name}/> */}
      <img src={storeImgMap[name]} alt={name}/>
      <span className={style.text}>{name}</span>
    </div>
  )
}

export default Store
// import style from "./Store.module.css"
import style from "./StoreTest.module.css"
import { useNavigate, useParams } from "react-router-dom"
/*
const storeImgMap = {
  "또바기육개장": "",
  "아리랑핫도그": "엄가네사진경로",
  "엄가네해장국": "크앙사진경로",
  "크앙분식": "노량진사진경로",
  "라면집": "라면사진경로",
  "홍대쌀국수": "홍대쌀국수사진경로",
  "공여사&덮다": "카레사진경로",
  "대한짜장": "돈까스집사진경로",
  "수오미엔": "육개장집사진경로",
  "하즈벤": "학생회관사진경로",
  "홍대쌀국수": "학생회관사진경로",
}
*/
const Store = ({ store }) => {
  const navigate = useNavigate()
  // const {restaurant} = useParams() params 받아서 식당/가게 전체주소를 명시할수도있음
  const {name, image } = store
  // console.log(image);
  const navigateHandler = () => {

  }
  return (
    <div className={style.store} onClick={() => {navigate(`${name}`)}}>
      <img src={image ? image : ""} alt={name}/>
      <span className={style.text}>{name}</span>
    </div>
  )
}

export default Store
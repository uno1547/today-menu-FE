import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import Menu from "../Components/StoresPage/Menu"
// import storePageStyle from "./StorePage.module.css"
import storePageStyle from "./StoreTestPage.module.css"
import img from "../assets/food.png"

const menusDummyData = [
  { "name": "제육폭탄덮밥", "price": 8900, "store": "공여사&덮다", "image": "" },
  { "name": "도시락제육덮밥", "price": 7500, "store": "공여사&덮다", "image": "" },
  { "name": "치즈제육도시락", "price": 8900, "store": "공여사&덮다", "image": "" },
  { "name": "치킨덮밥", "price": 7500, "store": "공여사&덮다", "image": "" },
  { "name": "항정살덮밥", "price": 8500, "store": "공여사&덮다", "image": "" },
  { "name": "삼겹살덮밥", "price": 7900, "store": "공여사&덮다", "image": "" },
  { "name": "직화된장삼겹덮밥", "price": 8500, "store": "공여사&덮다", "image": "" },
  { "name": "중화제육덮밥", "price": 7900, "store": "공여사&덮다", "image": "" },
  { "name": "우삼겹덮밥", "price": 8900, "store": "공여사&덮다", "image": "" },
  { "name": "소불고기덮밥", "price": 8500, "store": "공여사&덮다", "image": "" },
  { "name": "마라삼겹덮밥", "price": 7900, "store": "공여사&덮다", "image": "" },
  { "name": "간장계란덮밥", "price": 6000, "store": "공여사&덮다", "image": "" },
  { "name": "대창덮밥", "price": 7900, "store": "공여사&덮다", "image": "" },
  { "name": "낙곱새덮밥", "price": 7900, "store": "공여사&덮다", "image": "" },
  { "name": "낙지덮밥", "price": 7900, "store": "공여사&덮다", "image": "" },
  { "name": "홍우동+완탕", "price": 9500, "store": "수오미엔", "image": "" },
  { "name": "홍우동+밀크티 세트", "price": 9000, "store": "수오미엔", "image": "" },
  { "name": "유니 짜장면", "price": 7000, "store": "수오미엔", "image": "" },
  { "name": "우육면+콜라/사이다 세트", "price": 9500, "store": "수오미엔", "image": "" },
  { "name": "우육면+밀크티", "price": 10000, "store": "수오미엔", "image": "" },
  { "name": "우육면+가지튀김 세트", "price": 12000, "store": "수오미엔", "image": "" },
  { "name": "우육면", "price": 8500, "store": "수오미엔", "image": "" },
  { "name": "대창면", "price": 7500, "store": "수오미엔", "image": "" },
  { "name": "완탕면", "price": 7500, "store": "수오미엔", "image": "" },
  { "name": "새우완탕", "price": 2000, "store": "수오미엔", "image": "" },
  { "name": "중화비빔면", "price": 7500, "store": "수오미엔", "image": "" },
  { "name": "마파두부", "price": 7000, "store": "수오미엔", "image": "" },
  { "name": "짜장덮밥", "price": 7000, "store": "수오미엔", "image": "" },
  { "name": "폴로덮밥", "price": 8000, "store": "수오미엔", "image": "" },
  { "name": "미니 폴로덮밥", "price": 6500, "store": "수오미엔", "image": "" },
  { "name": "쌀국수세트", "price": 9900, "store": "홍대쌀국수", "image": "" },
  { "name": "볶음밥세트", "price": 11000, "store": "홍대쌀국수", "image": "" },
  { "name": "마라탕+밥(홍우동)", "price": 7500, "store": "홍대쌀국수", "image": "" },
  { "name": "토마토-감자탕 쌀국수", "price": 8900, "store": "홍대쌀국수", "image": "" },
  { "name": "온면", "price": 6500, "store": "홍대쌀국수", "image": "" },
  { "name": "홍대쌀국수", "price": 5500, "store": "홍대쌀국수", "image": "" },
  { "name": "소고기쌀국수", "price": 6500, "store": "홍대쌀국수", "image": "" },
  { "name": "닭고기쌀국수", "price": 6500, "store": "홍대쌀국수", "image": "" },
  { "name": "소고기볶음 쌀국수", "price": 7000, "store": "홍대쌀국수", "image": "" },
  { "name": "소고기폭탄쌀국수", "price": 8500, "store": "홍대쌀국수", "image": "" },
  { "name": "돼지불고기쌀국수", "price": 6500, "store": "홍대쌀국수", "image": "" },
  { "name": "얼큰한 내 영혼의 쌀국수", "price": 7500, "store": "홍대쌀국수", "image": "" },
  { "name": "소불고기 볶음면", "price": 7000, "store": "홍대쌀국수", "image": "" },
  { "name": "소불고기 볶음밥", "price": 7500, "store": "홍대쌀국수", "image": "" },
  { "name": "해물볶음밥", "price": 6500, "store": "홍대쌀국수", "image": "" },
  { "name": "짜장면", "price": 4500, "store": "대한짜장", "image": "" },
  { "name": "간짜장", "price": 5500, "store": "대한짜장", "image": "" },
  { "name": "짬뽕", "price": 5500, "store": "대한짜장", "image": "" },
  { "name": "냉면", "price": 5000, "store": "대한짜장", "image": "" },
  { "name": "콩국수", "price": 5000, "store": "대한짜장", "image": "" },
  { "name": "물만두", "price": 5000, "store": "대한짜장", "image": "" },
  { "name": "군만두", "price": 5000, "store": "대한짜장", "image": "" },
  { "name": "볶음밥", "price": 6000, "store": "대한짜장", "image": "" },
  { "name": "잡채밥", "price": 7000, "store": "대한짜장", "image": "" },
  { "name": "삼선짬뽕", "price": 8000, "store": "대한짜장", "image": "" },
  { "name": "삼선짜장", "price": 8000, "store": "대한짜장", "image": "" },
  { "name": "굴짬뽕", "price": 8000, "store": "대한짜장", "image": "" },
  { "name": "유슬짜장", "price": 8000, "store": "대한짜장", "image": "" },
  { "name": "쟁반짜장", "price": 8000, "store": "대한짜장", "image": "" },
  { "name": "송이밥", "price": 8000, "store": "대한짜장", "image": "" },
  { "name": "연어초밥", "price": 18000, "store": "하즈벤", "image": "" },
  { "name": "새우초밥", "price": 18000, "store": "하즈벤", "image": "" },
  { "name": "모듬초밥", "price": 18000, "store": "하즈벤", "image": "" },
  { "name": "하즈벤 도시락", "price": 20000, "store": "하즈벤", "image": "" },
  { "name": "연어국수 세트", "price": 21000, "store": "하즈벤", "image": "" },
  { "name": "제주흑돼지 돈가스", "price": 12000, "store": "하즈벤", "image": "" },
  { "name": "한상정식", "price": 16000, "store": "하즈벤", "image": "" },
  { "name": "통모짜치즈돈가스 정식", "price": 15000, "store": "하즈벤", "image": "" },
  { "name": "가츠동", "price": 10000, "store": "하즈벤", "image": "" },
  { "name": "에비동", "price": 10000, "store": "하즈벤", "image": "" },
  { "name": "믹스동", "price": 11000, "store": "하즈벤", "image": "" },
  { "name": "사케동", "price": 16000, "store": "하즈벤", "image": "" },
  { "name": "카이센동", "price": 23000, "store": "하즈벤", "image": "" },
  { "name": "간장연어덮밥", "price": 16000, "store": "하즈벤", "image": "" },
  { "name": "연어덮밥", "price": 17000, "store": "하즈벤", "image": "" },
  { "name": "전통 육개장", "price": 10000, "store": "또바기육개장", "image": "" },
  { "name": "전통육개장 칼국수", "price": 10000, "store": "또바기육개장", "image": "" },
  { "name": "차돌박이 육개장", "price": 12000, "store": "또바기육개장", "image": "" },
  { "name": "부대 육개장", "price": 12000, "store": "또바기육개장", "image": "" },
  { "name": "버섯 육개장", "price": 11000, "store": "또바기육개장", "image": "" },
  { "name": "순두부 육개장", "price": 11000, "store": "또바기육개장", "image": "" },
  { "name": "한방 삼계탕", "price": 14000, "store": "또바기육개장", "image": "" },
  { "name": "들깨 삼계탕", "price": 14000, "store": "또바기육개장", "image": "" },
  { "name": "맑은 육개장", "price": 10000, "store": "또바기육개장", "image": "" },
  { "name": "사골떡 만두국", "price": 10000, "store": "또바기육개장", "image": "" },
  { "name": "얼큰 닭칼국수", "price": 13000, "store": "또바기육개장", "image": "" },
  { "name": "얼큰 닭개장", "price": 13000, "store": "또바기육개장", "image": "" },
  { "name": "어린이 맑은육개장", "price": 7000, "store": "또바기육개장", "image": "" },
  { "name": "어린이 사골떡만두국", "price": 7000, "store": "또바기육개장", "image": "" },
  { "name": "맑은 닭개장", "price": 13000, "store": "또바기육개장", "image": "" },
  { "name": "뼈해장국", "price": 10000, "store": "엄가네해장국", "image": "" },
  { "name": "뼈우거지해장국", "price": 10000, "store": "엄가네해장국", "image": "" },
  { "name": "특(곱빼기)", "price": 12000, "store": "엄가네해장국", "image": "" },
  { "name": "우거지해장국", "price": 9000, "store": "엄가네해장국", "image": "" },
  { "name": "내장탕", "price": 12000, "store": "엄가네해장국", "image": "" },
  { "name": "갈비탕", "price": 15000, "store": "엄가네해장국", "image": "" },
  { "name": "병천순대국밥", "price": 10000, "store": "엄가네해장국", "image": "" },
  { "name": "아리랑 핫도그", "price": 1000, "store": "아리랑핫도그", "image": "" },
  { "name": "감자 핫도그", "price": 1500, "store": "아리랑핫도그", "image": "" },
  { "name": "더킹 핫도그", "price": 1500, "store": "아리랑핫도그", "image": "" },
  { "name": "요거다 핫도그", "price": 3500, "store": "아리랑핫도그", "image": "" },
  { "name": "모짜렐라치즈 핫도그", "price": 1500, "store": "아리랑핫도그", "image": "" },
  { "name": "체다치즈 핫도그", "price": 1500, "store": "아리랑핫도그", "image": "" },
  { "name": "오징어먹물 핫도그", "price": 1500, "store": "아리랑핫도그", "image": "" },
  { "name": "치즈 핫도그", "price": 3500, "store": "아리랑핫도그", "image": "" },
  { "name": "감자렐라 핫도그", "price": 2000, "store": "아리랑핫도그", "image": "" },
  { "name": "체다렐라 핫도그", "price": 2000, "store": "아리랑핫도그", "image": "" },
  { "name": "롱소세지 핫도그", "price": 3500, "store": "아리랑핫도그", "image": "" },
  { "name": "로얄쇼콜라라떼", "price": 3500, "store": "아리랑핫도그", "image": "" },
  { "name": "초코/녹차라떼", "price": 3000, "store": "아리랑핫도그", "image": "" },
  { "name": "레몬자몽TEA", "price": 3000, "store": "아리랑핫도그", "image": "" },
  { "name": "아메리카노", "price": 1500, "store": "아리랑핫도그", "image": "" },
  { "name": "크앙-라떡", "price": 5500, "store": "크앙분식", "image": "" },
  { "name": "플떡볶이", "price": 6500, "store": "크앙분식", "image": "" },
  { "name": "크앙 고기-라떡", "price": 9000, "store": "크앙분식", "image": "" },
  { "name": "로제크림파스타볶이", "price": 8900, "store": "크앙분식", "image": "" },
  { "name": "크뒹김말이튀김 (베이컨+치즈)", "price": 3900, "store": "크앙분식", "image": "" },
  { "name": "순대꼬치튀김(2EA)", "price": 2500, "store": "크앙분식", "image": "" },
  { "name": "못난이칠순대", "price": 5000, "store": "크앙분식", "image": "" },
  { "name": "소떡소떡", "price": 3500, "store": "크앙분식", "image": "" },
  { "name": "순살치킨가라아게(5EA)", "price": 4900, "store": "크앙분식", "image": "" },
  { "name": "튀김범벅", "price": 8900, "store": "크앙분식", "image": "" },
  { "name": "기본튀김", "price": 8900, "store": "크앙분식", "image": "" },
  { "name": "꼬불이오뎅", "price": 1500, "store": "크앙분식", "image": "" },
  { "name": "심쿵(삼겹살+쫄면)", "price": 8900, "store": "크앙분식", "image": "" },
  { "name": "크쫄떡볶이", "price": 6500, "store": "크앙분식", "image": "" },
  { "name": "대왕 수제 김말이", "price": 3900, "store": "크앙분식", "image": "" },
  { "name": "라면 (단품)", "price": 1900, "store": "라면집", "image": "" },
  { "name": "라면세트 (계란, 치즈, 주먹밥 중 1가지 추가시)", "price": 2500, "store": "라면집", "image": "" },
  { "name": "오늘의 라면", "price": 3500, "store": "라면집", "image": "" },
  { "name": "프리미엄라면", "price": 4000, "store": "라면집", "image": "" },
  { "name": "덮밥류", "price": 4500, "store": "라면집", "image": "" },
  { "name": "황제라면 세트 (라면 + 덮밥)", "price": 5900, "store": "라면집", "image": "" }
]
console.log('main');
const StorePage = () => {
  console.log('스토어페이지 렌더링!');
  const [menus, setMenus] = useState([])
  const {restaurant, store} = useParams()
  const navigate = useNavigate()
  console.log(restaurant, store);
  useEffect(() => {
    const getMenus = async () => {
      try {
        const response = await fetch(`http://localhost:8080/restaurants/${encodeURIComponent(restaurant)}/stores/${encodeURIComponent(store)}/menus`)
        if(!response.ok) throw new Error("메뉴 불러오는데 오류발생")
        const data = await response.json()
        // const { menus } = response.json()
        console.log(data);
        console.log(data.menus);
        // console.log(menus);
        setMenus(data.menus)
        // setMenus(menus)
      } catch (err) {
        console.error(err)
      }
    }
    // getMenus()


    // console.log('effect!');
    const getMenusHard = () => {
      // console.log(store);
      const filteredMenus = menusDummyData.filter(menu => menu.store == store)
      console.log(filteredMenus);
      setMenus(filteredMenus)
    }
    getMenusHard()
    ///// 더미데이터로 테스트용 나중에 지우고 위에 getMenus()만 주석해제해주면됌
    // setMenus(menusData)
    /////
  }, [])
  return (
    <div className={storePageStyle.inner}>
      <div className = {storePageStyle.header}>
        <h1>{store}</h1>
        {/* <span className={storePageStyle.previousBtn} onClick={() => {navigate(-1)}}>&lt; 돌아가기</span> */}
        {/* <span className={storePageStyle.previousBtn} onClick={() => {navigate(-1)}}>&lt;</span> */}
        <span className={storePageStyle.previousBtn} onClick={() => {navigate(-1)}}>돌아가기</span>
      </div>
      {/* <span onClick={(e) => {
        e.preventDefault()
        navigate(-1)
      }}>&lt</span> */}
      {/* <button className={storePageStyle.previousBtn} onClick={() => {navigate(-1)}}>돌아가기</button> */}
      <div className={storePageStyle["grid-container"]}>
        {menus.map((menu) => {
          return <Menu key={menu.name} menu = {menu}/>
        })}
      </div>
    </div>
  )
}

export default StorePage
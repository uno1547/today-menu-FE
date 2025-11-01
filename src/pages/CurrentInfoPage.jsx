import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import ricepan from "../../../img/천밥.png";
// import style from "./CurrentInfo.module.css";
import style from "./CurrentInfoTestPage.module.css";
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL

import { io } from "socket.io-client";

const CurrentInfoPage = () => {
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [curCnt, setCurCnt] = useState(0);
  const [waitImg, setWaitImg] = useState(null)
  const [waitCnt, setWaitCnt] = useState(0);
  const [isSellingActive, setIsSellingActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket'], // 웹소켓 전용
    });
    newSocket.on("connect", () => {
      console.log("✅ 소켓 연결됨:", newSocket.id);
      setIsLoading(false);
    });

    newSocket.on("sale-status", (data) => {
      const { sellQuantity, currentQuantity, isSelling } = data;
      console.log(sellQuantity, currentQuantity, isSelling);
      if(!isSelling) {
        setCurCnt(0);
        setTotalQuantity(0);
        setWaitCnt(0);
      }
      setIsSellingActive(isSelling);
      setTotalQuantity(sellQuantity);
      setCurCnt(currentQuantity);
      console.log("판매 상태:", isSelling);
      // 종료 > 판매중 바뀌었을 때는 수량 초기화 안함

      // 판매중 > 종료로 바뀌었을 때 수량 초기화
    });

    newSocket.on("stock-update", (count) => {
      const {sellQuantity, currentQuantity } = count
      console.log(currentQuantity, sellQuantity);
      if(sellQuantity) {
        setTotalQuantity(sellQuantity);
      }
      setCurCnt(currentQuantity);
    })
    newSocket.on("waitCnt-update", (count) => { // waitCnt 업데이트용 이벤트
      const { currentWaitCnt, imageB64 } = count;
      setWaitCnt(currentWaitCnt);
      setWaitImg(imageB64);
      console.log("대기 인원 수:", currentWaitCnt);
      console.log("대기 이미지:", imageB64);
    });
    // 컴포넌트가 마운트될 때 소켓 연결
    // console.log('effect');
    // connectSocket();
    // 소켓연결하면서 재고량 판매상태 받아온 걸 state로 업데이트 해야하나?
    // setIsSellingActive(true) // 실제로는 서버에서 판매 상태 받아와야 함
    return () => {
      newSocket.disconnect();
    }
  }, []);

  return (
    <>
      <div className={style.header}>
        <h1 className={style["HeadText"]}>대기 현황</h1>
        <span className={style.previousBtn} onClick={() => {navigate(-1)}}>&lt;</span>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isSellingActive ? (
        // 판매 중일 때 기존 화면 표시
        <div className={style["cnt-div3"]}>
          <div>
            <div className={style.stock3}>
              <span className={style.cntH}>잔여 수량</span>
              <span className = {style.cntV}>{`${curCnt} / ${totalQuantity} 개`}</span>
              {/* <span className = {style.cntV}>{`${quantity ? quantity : 50} / 100 개`}</span> */}
            </div>
            <div className={style.wait3}>
              <span className={style.cntH}>대기 인원 수</span>
              <span className = {style.cntV}>{`${waitCnt ? waitCnt : 0} 명`}</span>
              {waitImg && <img src={`data:image/png;base64,${waitImg}`} alt="대기 이미지" style={{ width: '200px', marginTop: '10px' }} />}
            </div>
          </div>
        </div>
      ) : (
        // 판매 마감 시 표시
        <div className={style.closedDiv}>
          <div className={style.closedMessage}>
            <h2>판매 마감되었습니다</h2>
            <p>오늘의 천원의 아침밥 판매가 종료되었습니다.</p>
            <p>내일 다시 이용해 주세요.</p>
          </div>
        </div>
      )}
    </>
  );
};

export default CurrentInfoPage;
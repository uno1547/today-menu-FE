import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import ricepan from "../../../img/천밥.png";
import style from "./CurrentInfo.module.css";

import { io } from "socket.io-client";

const CurrentInfoPage = () => {
  const [socket, setSocket] = useState(null);
  // const [messages, setMessages] = useState([]);

  const [quantity, setQuantity] = useState(0);
  const [waitCnt, setWaitCnt] = useState(0)
  const [isSellingActive, setIsSellingActive] = useState(false)

  const navigate = useNavigate()

  const connectSocket = () => {
    const newSocket = io("http://localhost:3000");
    // setSocket(newSocket);
    newSocket.on("connect", () => {
      console.log("✅ 소켓 연결됨:", newSocket.id);
    });

    newSocket.on("sale-started", (data) => {
      const { sellQuantity, waitCount } = data;
      setQuantity(sellQuantity);
      setWaitCnt(waitCount)
      setIsSellingActive(true)
    });

    newSocket.on("stock-update", (count) => {
      const {sellQuantity, isSelling} = count
      console.log(sellQuantity, isSelling);
      setQuantity(sellQuantity);
      setIsSellingActive(isSelling)
      // setMessages((prev) => [...prev, `재고: ${count}`]);
    });

    newSocket.on("sale-ended", (msg) => {
      // setMessages((prev) => [...prev, msg]);
      newSocket.disconnect();
    });

  };

  useEffect(() => {
    // 컴포넌트가 마운트될 때 소켓 연결
    console.log('effect');
    connectSocket();
    // 소켓연결하면서 재고량 판매상태 받아온 걸 state로 업데이트 해야하나?
    // setIsSellingActive(true) // 실제로는 서버에서 판매 상태 받아와야 함
  }, []);

  return (
    <>
      <h1 className={style["HeadText"]}>대기 현황</h1>
      <span className={style.previousBtn} onClick={() => {navigate(-1)}}>&lt; 돌아가기</span>
      
      {isSellingActive ? (
        // 판매 중일 때 기존 화면 표시
        <div className={style["cnt-div3"]}>
          <div>
            <div className={style.stock3}>
              <span className={style.cntH}>잔여 수량</span>
              <span className = {style.cntV}>{`${quantity}`}</span>
              {/* <span className = {style.cntV}>{`${quantity ? quantity : 50} / 100 개`}</span> */}
            </div>
            <div className={style.wait3}>
              <span className={style.cntH}>대기 인원 수</span>
              <span className = {style.cntV}>{`${waitCnt ? waitCnt : 5} 명`}</span>
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
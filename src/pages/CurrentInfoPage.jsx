import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import ricepan from "../../../img/천밥.png";
import style from "./CurrentInfo.module.css";

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

const CurrentInfoPage = () => {
  const [quantity, setQuantity] = useState(0);
  const [waitCnt, setWaitCnt] = useState(0)
  const [isSellingActive, setIsSellingActive] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    // 판매 상태 확인
    const sellingStatus = localStorage.getItem('breakfastSellingActive')
    setIsSellingActive(sellingStatus === 'true')

    // 판매 중일 때만 WebSocket 연결
    if (sellingStatus === 'true') {
      const client = new Client({
        // 백엔드의 STOMP 엔드포인트 (SockJS로 연결됨)
        webSocketFactory: () => new SockJS("http://localhost:8080/websocket"),
        onConnect: () => {
          console.log("STOMP 연결 성공");

          // 백엔드에서 설정한 구독 경로에 맞게 수정해야 함
          client.subscribe("/topic/stock", (message) => {
            const data = JSON.parse(message.body);
            if(data.stock !== undefined && data.stock !== null) setQuantity(data.stock)
            if(data.count !== undefined && data.count !== null) setWaitCnt(data.count)
            // setQuantity(data.stock);
          });
          client.publish({
            destination: "/app/get-stock",
          });
        },
        onStompError: (frame) => {
          console.error("STOMP 오류", frame);
        },
      });

      client.activate();

      // cleanup
      return () => {
        client.deactivate();
      };
    }
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
              <span className = {style.cntV}>{`${quantity ? quantity : 50} / 100 개`}</span>
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
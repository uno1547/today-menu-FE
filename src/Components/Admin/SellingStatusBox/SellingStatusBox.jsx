import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'
import styles from './SellingStatusBox.module.css'
const SellingStatusBox = ({ onStopSelling }) => {
  const [totalQuantity, setTotalQuantity] = useState(0)
  const [currentQuantity, setCurrentQuantity] = useState(0)

  const handleStopSelling = async () => {
    try {
      const response = await fetch('https://hyang-cafeteria-server.onrender.com/api/admin/stop-breakfast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        alert('판매가 종료되었습니다.');
        onStopSelling(); // 부모 컴포넌트의 상태 업데이트
        // 판매 종료 후 추가 작업 (예: 상태 업데이트)
      } else {
        console.error('Failed to stop selling:', data.message);
        alert('판매 종료에 실패했습니다.');
      }
    } catch (err) {
      console.error('Error stopping selling:', err);
      alert('판매 종료 중 오류가 발생했습니다.');
    }
  }

  // 마운트시 소켓 연결
  useEffect(() => {
    const newSocket = io("https://hyang-cafeteria-server.onrender.com");

    newSocket.on("connect", () => {
      console.log("✅ 소켓 연결됨:", newSocket.id);
    });
    // 클라는 최초 수량 받는거랑 이후의 업데이트에 대해서 수량 push받으면된다.
    newSocket.on("stock-update", count => {
      // 서버는 최초연결할때 "stock-update" 이벤트로 둘다쏴줌
      // 하지만 이후 결제할때 "stock-update" 이벤트로는 currentQuantity만 쏴줌
      // 따라서 이렇게 받으면 문제 없음, 물론 여기에 isSelling도 포함시킨다면, 바로반영 가능할듯?
      const { sellQuantity, currentQuantity } = count
      console.log("재고:", sellQuantity);
      if (sellQuantity) {
        setTotalQuantity(sellQuantity);
      }
      setCurrentQuantity(currentQuantity);
      //
    });
    return () => {
      newSocket.disconnect();
    }
  }, []);

  return (
    <div className={styles.stopSellingSection}>
      <div className={styles.statusInfo}>
        <span className={styles.statusIndicator}>🟢 판매 중</span>
        <span className={styles.statusMessage}>현재 천원의 아침밥을 판매하고 있습니다.</span>
        <span>{currentQuantity} / {totalQuantity}개</span>
      </div>
      <button 
        onClick={handleStopSelling}
        className={`${styles.actionBtn} ${styles.stopBtn}`}
      >
        판매 종료
      </button>
    </div>
  )
}
export default SellingStatusBox
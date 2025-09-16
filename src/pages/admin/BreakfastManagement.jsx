import { useState, useEffect } from 'react'
import styles from './BreakfastManagement.module.css'

const BreakfastManagement = () => {
  const [isSellingActive, setIsSellingActive] = useState(false)
  const [sellQuantity, setSellQuantity] = useState('')

  // 컴포넌트 마운트 시 판매 상태 확인
  useEffect(() => {
    const sellingStatus = localStorage.getItem('breakfastSellingActive')
    if (sellingStatus === 'true') {
      setIsSellingActive(true)
    }
  }, [])

  const connectSocket = () => {
    const newSocket = io("http://localhost:3000");

    newSocket.on("connect", () => {
      console.log("✅ 소켓 연결됨:", newSocket.id);
    });

    newSocket.on("stock-update", (count) => {
      setStock(count);
      // setMessages((prev) => [...prev, `재고: ${count}`]);
    });

    newSocket.on("sale-ended", (data) => {
      // setMessages((prev) => [...prev, msg]);
      const { isSelling } = data;
      setIsSellingActive(isSelling)
      newSocket.disconnect();
    });

    setSocket(newSocket);
  };

  const handleStartSelling = async () => {
    if (!sellQuantity || sellQuantity <= 0) {
      alert('판매 수량을 입력해주세요.')
      return
    }
    
    //////////////////// 실제로는 서버에 POST 요청
    /*
    localStorage.setItem('breakfastSellingActive', 'true')
    localStorage.setItem('breakfastSellQuantity', sellQuantity)
    setIsSellingActive(true)
    setSellQuantity('')
    */
    //////////////////////////
    try {
      console.log(JSON.stringify({ quantity: sellQuantity }));
      const response = await fetch('http://localhost:3000/api/admin/start-breakfast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: sellQuantity })
      })
      // const data = await response.json() // 굳이 cnt를 받아야해?
      // 그냥 소켓 연결하면 수량 알수있잖어
      // se
      if (response.ok) {
        setIsSellingActive(true)
      } 
    } catch (error) {
      console.error('판매 시작 실패:', error)
      return
    }

    
    console.log(`판매 시작: ${sellQuantity}개`)
  }

  const handleStopSelling = async () => {
    // 실제로는 서버에 POST 요청
    // localStorage.setItem('breakfastSellingActive', 'false')
    // localStorage.removeItem('breakfastSellQuantity')
    const response = await fetch('/api/admin/stop-breakfast', {
      method: 'POST'
    })
    if (!response.ok) {
      console.error('판매 종료 실패')
      return
    }
    setIsSellingActive(false)
    
    console.log('판매 종료')
  }

  return (
    <div className={styles.container}>
      {/* <h2>천원의 아침밥 관리</h2>
      <p>천원의 아침밥 메뉴와 관련된 관리 기능들입니다.</p> */}
      
      <div className={styles.sellingControl}>
        <h3>판매 상태 관리</h3>
        
        {!isSellingActive ? (
          // 판매 중단 상태
          <div className={styles.startSellingSection}>
            <div className={styles.inputGroup}>
              <label htmlFor="sellQuantity">판매 수량:</label>
              <input
                type="number"
                id="sellQuantity"
                value={sellQuantity}
                onChange={(e) => setSellQuantity(e.target.value)}
                placeholder="판매할 수량을 입력하세요"
                min="1"
                max="200"
              />
              <span>개</span>
            </div>
            <button 
              onClick={handleStartSelling}
              className={`${styles.actionBtn} ${styles.startBtn}`}
            >
              판매 시작
            </button>
          </div>
        ) : (
          // 판매 중 상태
          <div className={styles.stopSellingSection}>
            <div className={styles.statusInfo}>
              <span className={styles.statusIndicator}>🟢 판매 중</span>
              <span>현재 천원의 아침밥을 판매하고 있습니다.</span>
            </div>
            <button 
              onClick={handleStopSelling}
              className={`${styles.actionBtn} ${styles.stopBtn}`}
            >
              판매 종료
            </button>
          </div>
        )}
      </div>
      
      {/* <div className={styles.actions}>
        <button className={styles.actionBtn}>메뉴 수정</button>
        <button className={styles.actionBtn}>재고 관리</button>
        <button className={styles.actionBtn}>주문 현황</button>
      </div>
      
      <div className={styles.menuList}>
        <h3>현재 운영 중인 메뉴</h3>
        <div className={styles.menuGrid}>
          <div className={styles.menuCard}>
            <h4>김치찌개 세트</h4>
            <p>가격: 1,000원</p>
            <p>재고: 50개</p>
          </div>
          <div className={styles.menuCard}>
            <h4>된장찌개 세트</h4>
            <p>가격: 1,000원</p>
            <p>재고: 30개</p>
          </div>
          <div className={styles.menuCard}>
            <h4>계란말이 세트</h4>
            <p>가격: 1,000원</p>
            <p>재고: 20개</p>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default BreakfastManagement

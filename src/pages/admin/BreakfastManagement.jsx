import { useState, useEffect } from 'react'

import StartSellingBox from '../../Components/Admin/StartSellingBox/StartSellingBox'
import SellingStatusBox from '../../Components/Admin/SellingStatusBox/SellingStatusBox'
import styles from './BreakfastManagement.module.css'
const API_BASE_URL = import.meta.env.VITE_API_URL

const BreakfastManagement = () => {
  const [isSellingActive, setIsSellingActive] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // 컴포넌트 마운트 시 판매 상태 확인
  useEffect(() => {
    const fetchData = async () => {
      // setIsSellingActive(false)
      // setIsSellingActive(true)
      // return
      try {
        const response = await fetch(`${API_BASE_URL}/api/admin/breakfast-status`, );
        const data = await response.json();
        if (response.ok) {
          setIsSellingActive(data.isSelling);
        } else {
          console.error('Failed to fetch breakfast status');
        }
      } catch (err) {
        console.error('Error fetching breakfast status:', err);
      } finally {
        setIsLoading(false)
      }
    };
    fetchData();
  }, [])

  /*
  만약 판매시작을 눌렀는데 서버가 이미 시작 상태라면 의도치 않은 흐름임
  이럴땐 서버에서 에러를 내려주고 프론트에서 alert로 알려주기

  하지만 소켓연결을 활용한다면, 별도 에러 처리 필요없이
  UI가 자동으로 갱신되게 할수도있긴함(아까는 오버스펙이라매;;)
  */

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
      <div className={styles.sellingControl}>
        <h3>판매 상태 관리</h3>
        {isLoading ?
          ( 
            <p>로딩 중...</p>
          )
          : 
          !isSellingActive ? 
            (
            // 판매 중단 상태
            <StartSellingBox onSellingStart={() => setIsSellingActive(true)} />
            ) 
            : 
            (
            // 판매 중 상태
            <SellingStatusBox onStopSelling={() => setIsSellingActive(false)} />
            )
        }

      </div>
    </div>
  )
}

export default BreakfastManagement

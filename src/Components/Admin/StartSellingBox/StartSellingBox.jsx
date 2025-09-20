import { useState } from 'react'
import styles from './StartSellingBox.module.css'
const API_BASE_URL = import.meta.env.VITE_API_URL
const StartSellingBox = ({ onSellingStart }) => {
  const [sellQuantity, setSellQuantity] = useState(0)

  const handleStartSelling = async () => {
    if (!sellQuantity || sellQuantity <= 0) {
      alert('판매 수량을 입력해주세요.')
      return
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/start-breakfast`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: sellQuantity }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('판매가 시작되었습니다.');
        onSellingStart(); // 부모 컴포넌트의 상태 업데이트
        // 판매 시작 후 추가 작업 (예: 상태 업데이트)
      } else {
        console.error('Failed to start selling:', data.message);
        alert('판매 시작에 실패했습니다.');
      }
    } catch (err) {
      console.error('Error starting selling:', err);
      alert('판매 시작 중 오류가 발생했습니다.');
    }
  }

  return (
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
  )
}
export default StartSellingBox
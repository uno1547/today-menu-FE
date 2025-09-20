import styles from './SellingStatusBox.module.css'
const SellingStatusBox = ({ onStopSelling }) => {
  const handleStopSelling = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/admin/stop-breakfast', {
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

  return (
    <div className={styles.stopSellingSection}>
      <div className={styles.statusInfo}>
        <span className={styles.statusIndicator}>🟢 판매 중</span>
        <span className={styles.statusMessage}>현재 천원의 아침밥을 판매하고 있습니다.</span>
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
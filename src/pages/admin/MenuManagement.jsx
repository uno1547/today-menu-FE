import styles from './MenuManagement.module.css'

const MenuManagement = () => {
  return (
    <div className={styles.container}>
      <h2>식단 관리</h2>
      <p>학교 식당의 전체 식단을 관리합니다.</p>
      
      <div className={styles.actions}>
        <button className={styles.actionBtn}>오늘의 메뉴 설정</button>
        <button className={styles.actionBtn}>주간 식단 계획</button>
        <button className={styles.actionBtn}>메뉴 등록</button>
        <button className={styles.actionBtn}>영양 정보 관리</button>
      </div>
      
      <div className={styles.weeklyMenu}>
        <h3>이번 주 식단</h3>
        <div className={styles.menuTable}>
          <div className={styles.dayColumn}>
            <h4>월요일</h4>
            <div className={styles.mealInfo}>
              <p><strong>점심:</strong> 김치찌개, 불고기, 밥</p>
              <p><strong>저녁:</strong> 된장찌개, 생선구이, 밥</p>
            </div>
          </div>
          <div className={styles.dayColumn}>
            <h4>화요일</h4>
            <div className={styles.mealInfo}>
              <p><strong>점심:</strong> 순두부찌개, 돈까스, 밥</p>
              <p><strong>저녁:</strong> 미역국, 제육볶음, 밥</p>
            </div>
          </div>
          <div className={styles.dayColumn}>
            <h4>수요일</h4>
            <div className={styles.mealInfo}>
              <p><strong>점심:</strong> 콩나물국, 닭갈비, 밥</p>
              <p><strong>저녁:</strong> 계란국, 고등어조림, 밥</p>
            </div>
          </div>
          <div className={styles.dayColumn}>
            <h4>목요일</h4>
            <div className={styles.mealInfo}>
              <p><strong>점심:</strong> 떡국, 불닭, 밥</p>
              <p><strong>저녁:</strong> 무국, 치킨까스, 밥</p>
            </div>
          </div>
          <div className={styles.dayColumn}>
            <h4>금요일</h4>
            <div className={styles.mealInfo}>
              <p><strong>점심:</strong> 김치국, 비빔밥</p>
              <p><strong>저녁:</strong> 육개장, 볶음밥</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuManagement

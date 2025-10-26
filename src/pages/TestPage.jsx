
import { useEffect, useState } from "react"

import { io } from "socket.io-client";
const API_BASE_URL = import.meta.env.VITE_API_URL

const TestPage = () => {
  // const [socket, setSocket] = useState(null);
  const [data, setData] = useState("");
  const connectSocket = () => {
    const newSocket = io("http://localhost:3000");
    // setSocket(newSocket);
    newSocket.on("connect", () => {
      console.log("✅ 소켓 연결됨:", newSocket.id);
    });
    newSocket.on("stock-update", (count) => {
      // setQuantity(count);
      // setMessages((prev) => [...prev, `재고: ${count}`]);
      const {sellQuantity, isSelling} = count
      console.log("재고:", sellQuantity);
    });
    console.log('이건?');
  }

  const getdataFromFirestore = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/get-data`)
      const { data } = await response.json()
      console.log(data);
      setData(data[0].name);
      console.log('Firestore 데이터:', data);
    } catch (err) {
      console.error('Firestore 데이터 가져오기 오류:', err);
    }
  }

  // useEffect(() => {
  //   console.log("TestPage mounted");
  //   connectSocket();
  // }, []);

  return (
    <div>
      <h1>Test Page</h1>
      <p>This is a test page for development purposes.</p>
      <button onClick={getdataFromFirestore}>Fetch Firestore Data</button>
      <h3>{data}</h3>
    </div>
  )
}

export default TestPage
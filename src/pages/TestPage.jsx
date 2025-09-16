
import { useEffect, useState } from "react"

import { io } from "socket.io-client";

const TestPage = () => {
  // const [socket, setSocket] = useState(null);
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

  useEffect(() => {
    console.log("TestPage mounted");
    connectSocket();
  }, []);

  return (
    <div>
      <h1>Test Page</h1>
      <p>This is a test page for development purposes.</p>
    </div>
  )
}

export default TestPage
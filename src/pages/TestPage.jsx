import { useEffect } from "react"

import { io } from "socket.io-client";

const TestPage = () => {

  const connectSocket = () => {
    const newSocket = io("http://localhost:3000");
    // setSocket(newSocket);
    newSocket.on("connect", () => {
      console.log("✅ 소켓 연결됨:", newSocket.id);
    });
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
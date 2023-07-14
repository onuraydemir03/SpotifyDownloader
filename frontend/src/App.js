import React, { useEffect, useState } from "react";

const App = () => {
  const [message, setMessage] = useState("")
  const getWelcomeMessage = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("user_id");
    const response = await fetch("/user?user_id="+ encodeURIComponent(userId), requestOptions);
    const data = await response.json();
    
    console.log(data);
  }

  useEffect( () => {
    getWelcomeMessage();
  }, [])
  return (
  <div>
  <h1> Hello World. </h1>
  </div>
  );
}

export default App;

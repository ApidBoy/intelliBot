import './App.css';
import React, { useState } from 'react';
import MainComponent from './components/MainComponent';

let mode = 0;

function App() {

  const [bubbles, setBubbles] = useState([]);

  const initFunction = async () => {
    const message = document.getElementById('sendBox').value;
    setBubbles(prevBubbles => [
      ...prevBubbles,
      {
        'side': 'client',
        'response': message
      }
    ]);
    document.getElementById('sendBox').value = '';
    const { Configuration, OpenAIApi } = require("openai");
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY
    });
    const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message.toLowerCase(),
        max_tokens: 200,
        temperature: 0.2,
    });

    setBubbles(prevBubbles => [
      ...prevBubbles,
      {
        'side': 'server',
        'response': response.data.choices[0].text
      }
    ]);
  }

  const deleteAll = () => {
    setBubbles([
      {
        'side': 'delete'
      }
    ]);
  }
  const toggleMode = () => {
    const body = document.getElementById('body');
    const topBar = document.getElementById('topBar');
    const sendBox = document.getElementById('sendBox');
    const sendBoxContainer = document.getElementById('sendBoxContainer');
    const sendButton = document.getElementById('sendButton');
    const bubbleClient = Array.from(document.querySelectorAll('.bubble.client'));
    const bubbleServer = Array.from(document.querySelectorAll('.bubble.server'));

    if (mode % 2 === 0) {
      body.style.background='#2D2424';
      topBar.style.background='#5C3D2E';
      topBar.style.color='#fff';
      sendButton.style.color='#fff';
      sendBox.style.background='#3d3232';
      sendBoxContainer.style.background='#5C3D2E';
      bubbleClient.map((element) => {
        element.style.background="#5C3D2E";
        element.style.color="#fff";
        return 0;
      });
      bubbleServer.map((element) => {
        element.style.background="#B85C38";
        element.style.color="#fff";
        return 0;
      });
      document.getElementById('mode').className="barIcon fa-solid fa-moon";
    }
    else {
      body.style.background='#FDF6F0';
      topBar.style.background='#FFE7CC';
      topBar.style.color='#000';
      sendButton.style.color='#000';
      sendBox.style.background='#faf2ec';
      sendBoxContainer.style.background='#F8E2CF';
      bubbleClient.map((element) => {
        element.style.background="#FFE7CC";
        element.style.color="#000";
        return 0;
      });
      bubbleServer.map((element) => {
        element.style.background="#facfb5";
        element.style.color="#000";
        return 0;
      });
      document.getElementById('mode').className="barIcon fa-regular fa-moon";
    }
    mode++;
  }

  return (
    <>
      <MainComponent
        initFunction={initFunction}
        bubbles={bubbles}
        deleteAll={deleteAll}
        toggleMode={toggleMode}
      />
    </>
  );
}

export default App;

import { useState, useRef, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DrinkMenu from './DrinkMenu'
import eatChicken from './assets/eatChicken.gif';
import soundEffect from './assets/sound-effect.mp3';

function App() {
  const [isMoving, setIsMoving] = useState(false); // 控制動畫的開關
  const [volume, setVolume] = useState(0.3); // 設定預設音量
  const audioRef = useRef(null); // 用於引用 <audio> 元素

  const toggleMoving = () => {
    setIsMoving(!isMoving);
    if (isMoving) {
      audioRef.current.pause(); // 暫停音效
      audioRef.current.currentTime = 0; // 重置音效播放時間
    } else {
      audioRef.current.play(); // 播放音效
    }
  };

  // 在音效播放完成後，重新播放音效
  const handleAudioEnded = () => {
    audioRef.current.currentTime = 0; // 重置音效播放時間
    audioRef.current.play(); // 播放音效
  };

  // 監聽音效的 'ended' 事件
  useEffect(() => {
    audioRef.current.addEventListener('ended', handleAudioEnded);
    return () => {
      audioRef.current.removeEventListener('ended', handleAudioEnded);
    };
  }, []);

  // 設定音量
  useEffect(() => {
    audioRef.current.volume = volume;
  }, [volume]);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        {/* 根據 isMoving 狀態決定是否加入 moving 類別 */}
        <img
          src={eatChicken}
          className={`logo ${isMoving ? 'moving' : ''}`}
          alt="eatChicken logo"
        />
      </div>
      
      {/* 開關動畫的按鈕 */}
      <button onClick={toggleMoving}>
        {isMoving ? "停止動畫" : "啟動動畫"}
      </button>

      {/* 設定音量的滑塊 */}
      音量調整
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
      />

      {/* 音效 */}
      <audio ref={audioRef}>
      <source src={soundEffect} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <h1>餐點管理工具</h1>react-week1-practise:餐點管理工具-調整庫存數量 Vite + React 
      
      <div className="card">
        {/* 練習區開始 */}
        <DrinkMenu />
        {/* 練習區結束 */}
      </div>
    </>
  )
}

export default App

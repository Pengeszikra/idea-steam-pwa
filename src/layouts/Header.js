import React, {useState} from 'react';

export default ({score, saved, avatarName = 'Adeimantosz'}) => {
  const [time, setTime] = useState('00:01');
  
  return (
    <div className="header">
      <span className="avatar avatar-level-1">{avatarName}</span>
      <span className="score"><b>pont:</b>{score}</span>
      <span className="saved"><b>megmentett:</b>{saved}</span>
      <span className="timer"><b>idő:</b>{time}</span>
      <button>setup</button>
    </div>
  )
}


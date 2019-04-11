import React, {useState} from 'react';

export default ({point = 0, saved = 0, avatarName = 'Adeimantosz'}) => {
  const [time, setTime] = useState('00:01');
  
  return (
    <div className="header">
      <span className="avatar avatar-level-1">{avatarName}</span>
      <span className="score"><b>pont:</b>{point}</span>
      <span className="saved"><b>megmentett:</b>{saved}</span>
      <span className="timer"><b>idő:</b>{time}</span>
      <button>setup</button>
    </div>
  )
}


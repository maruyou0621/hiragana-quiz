import React, { useState, useEffect } from "react";

const DailyMission = () => {
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    // 仮のミッションリスト（後でランダム化）
    const missionList = [
      { id: 1, task: "10問正解する", reward: 10 },
      { id: 2, task: "3回プレイする", reward: 15 },
      { id: 3, task: "90%正解率を達成", reward: 20 },
    ];
    setMissions(missionList);
  }, []);

  return (
    <div>
      <h2>🎯 今日のデイリーミッション</h2>
      {missions.map((m) => (
        <p key={m.id}>{m.task} - {m.reward}P</p>
      ))}
    </div>
  );
};

export default DailyMission;

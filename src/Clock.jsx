import React, { useState, useEffect } from "react";

const AnalogClockWithOuterSchedule = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const activities = [
    { name: "Tidur", start: 1, end: 4 },
    { name: "Bangun", start: 4, end: 5 },
    { name: "Clean up", start: 5, end: 7 },
    { name: "Olahraga", start: 7, end: 8 },
    { name: "Nonton", start: 8, end: 11 },
    { name: "Ishoma", start: 11, end: 13 },
    { name: "Ngoding", start: 13, end: 15 },
    { name: "Free time :)", start: 15, end: 18 },
    { name: "Belajar", start: 18, end: 22 },
    { name: "Research", start: 22, end: 24 },
  ];

  const secondsDegrees = (time.getSeconds() / 60) * 360;
  const minutesDegrees = ((time.getHours() % 12) * 60 + time.getMinutes()) * 6;
  const hoursDegrees = time.getHours() * 30 + time.getMinutes() / 2;

  return (
    <div className="flex flex-col items-center justify-center h-screen font-sans">
      <h2 className="m-2">JADWAL MENGANGGUR DANI !</h2>
      <p className="m-0 italic">Inspired by Bae Seok Ryu - Love Next Door</p>
      <h3 className="m-2">TODAY'S TIME TABLE</h3>
      <div className="mt-12 p-5 border-2 border-black rounded-full">
        <div className="relative w-96 h-96 border-2 border-black rounded-full">
          {activities.map((activity, index) => {
            const middle = (activity.start + activity.end) / 2;
            const isRightSide = middle >= 2 && middle <= 12;

            return (
              <div key={index}>
                <div
                  className="absolute bottom-1/2 left-1/2 transform origin-bottom bg-black"
                  style={{
                    height: "170px",
                    width: "1px",
                    transform: `rotate(${activity.start * 15}deg)`,
                  }}
                />
                <span
                  className={`absolute top-1/2 left-1/2 font-bold text-sm transform translate-x-[-50%] translate-y-[-120%] rotate-${middle * 15} translate-x-[${isRightSide ? "-90deg" : "90deg"}]`}
                >
                  {activity.name}
                </span>
              </div>
            );
          })}

          {[...Array(24)].map((_, index) => {
            const hour = (index + 1) % 24;
            return (
              <div
                key={index}
                className="absolute left-1/2 transform origin-center"
                style={{
                  transform: `rotate(${index * 15}deg)`,
                }}
              >
                <div className="h-3 w-1 bg-black rounded-full absolute top-[-10px]" />
                <div
                  className="absolute top-[-35px] transform translate-x-[-50%] font-bold"
                  style={{
                    transform: `rotate(-${index * 15}deg)`,
                  }}
                >
                  {hour}
                </div>
              </div>
            );
          })}
          <div
            className="absolute bottom-1/2 left-1/2 bg-black rounded-lg"
            style={{ height: "80px", width: "8px", transform: `rotate(${hoursDegrees}deg)` }}
          />
          <div
            className="absolute bottom-1/2 left-1/2 bg-black rounded-lg"
            style={{ height: "110px", width: "6px", transform: `rotate(${minutesDegrees}deg)` }}
          />
          <div
            className="absolute bottom-1/2 left-1/2 bg-red-500 rounded-lg"
            style={{ height: "150px", width: "4px", transform: `rotate(${secondsDegrees}deg)` }}
          />
          <div className="absolute top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] w-15 h-15 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
            PLAY!
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalogClockWithOuterSchedule;


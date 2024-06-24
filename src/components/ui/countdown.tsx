"use client";
import { useEffect, useState } from "react";

// 获取今天的剩余时间
function getTimeLeftToday() {
  // 获取当前时间
  const now = new Date() as any;

  // 设置时间为当天午夜（当天的24:00）
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    24,
    0,
    0
  ) as any;

  // 计算时间差（毫秒）
  let diff = endOfDay - now;

  // 将毫秒转换为天、小时、分钟和秒
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= days * (1000 * 60 * 60 * 24);
  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * (1000 * 60 * 60);
  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * (1000 * 60);
  const seconds = Math.floor(diff / 1000);

  // 返回时分秒，注意这里我们返回的是到午夜剩余的时间，所以天数应该是0
  return {
    hours: hours.toString(), // 确保小时是两位数
    minutes: minutes.toString(), // 确保分钟是两位数
    seconds: seconds.toString(), // 确保秒是两位数
  };
}
const CountDown = () => {
  const timeLeftTotal = getTimeLeftToday();

  const [timeLeft, setTimeLeft] = useState(timeLeftTotal);

  const countdown = () => {
    useEffect(() => {
      const interval = setInterval(() => {
        const timeLeftTotal = getTimeLeftToday();
        setTimeLeft(timeLeftTotal);
      }, 1000);
      return () => clearInterval(interval);
    }, []);
  };
  countdown();
  return (
    <div className="flex gap-1">
      <div>
        <span className="countdown font-mono text-1xl">
          {timeLeft.hours.toString().padStart(2, "0")}
          {/* @ts-ignore */}
          {/* <span style={{ "--value": timeLeft.hours }}></span> */}
        </span>
        hours
      </div>
      <div>
        <span className="countdown font-mono text-1xl">
          {timeLeft.minutes.toString().padStart(2, "0")}
          {/* @ts-ignore */}
          {/* <span style={{ "--value": timeLeft.minutes }}></span> */}
        </span>
        min
      </div>
      <div>
        <span className="countdown font-mono text-1xl">
          {/* @ts-ignore */}
          <span style={{ "--value": timeLeft.seconds }}></span>
        </span>
        sec
      </div>
    </div>
  );
};

export default CountDown;

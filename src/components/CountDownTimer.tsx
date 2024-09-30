"use client";
import React, { useState, ChangeEvent, useEffect, useRef } from "react";

const CountDownTimer = () => {

  const [time, setTime] = useState<number>(0);
  const [duration, setDuration] = useState<number | undefined>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false)
  const timeRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isActive && !isPaused) {
      timeRef.current = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timeRef.current!);
            return 0;
          }
          return prevTime -1;
        })
      }, 1000);
    }
  
    return () => {
      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
    }
  }, [isActive, isPaused]);
  

  const handleSetDuration = ():void => {
    if (typeof duration == 'number' && duration > 0) {
      setTime(duration);
      setInputValue('');
    } 
  }

  const handleStart = ():void => {
    if (time > 0) {
      setIsActive(true);
      setIsPaused(false);
    }
  }

  const handlePause = ():void => {
    if(isActive){
      setIsPaused(true);
      setIsActive(false);
      if(timeRef.current){
        clearInterval(timeRef.current);
      }
    }
  }

  const handleReset = ():void => {
      setIsActive(false);
      setIsPaused(false);
      setTime(0);
      setInputValue('');
      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
  }

  const formatTime = (time: number):string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const timeFormat = `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
    return timeFormat;
  }

  const handleDurationChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value.trim();
    if (value !== ' ') {
      setDuration(Number(value));
      setInputValue(value)
    }
  }

  return (
    <div>
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <div className="w-3/6 h-auto shadow-lg bg-white rounded-3xl p-10 box-sha">
          <h1 className="text-center text-4xl pb-3 font-bold">
            Countdown Timer App
          </h1>
          <div className="flex justify-center mt-5">
            <input
              className="border-2 focus-visible:outline-none border-gray-200 rounded-xl w-96 px-4 py-2"
              placeholder="Enter duration in seconds"
              type="number"
              value={inputValue}
              onChange={handleDurationChange}
            />
            <input
              className="border-2 border-gray-200 px-5 rounded-xl cursor-pointer ms-3"
              type="button"
              value="Set"
              onClick={handleSetDuration}
            />
          </div>
          <div className="flex justify-center text-7xl py-5">
            {formatTime(time)}
          </div>
          <div className="flex justify-center">
            <input
              className="border-2 border-gray-200 px-5 py-2 rounded-xl cursor-pointer ms-3"
              type="button"
              value={isPaused ? 'Resume' : 'Start'}
              onClick={handleStart}
            />
            <input
              className="border-2 border-gray-200 px-5 py-2 rounded-xl cursor-pointer ms-3"
              type="button"
              value="Pause"
              onClick={handlePause}
            />
            <input
              className="border-2 border-gray-200 px-5 py-2 rounded-xl cursor-pointer ms-3"
              type="button"
              value="Reset"
              onClick={handleReset}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountDownTimer;

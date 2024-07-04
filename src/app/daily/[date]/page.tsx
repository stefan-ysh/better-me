"use client";
import Image from "next/image";

// 文字动画
import { TextAnimate } from "@/components/ui/text-animate";

// 倒计时
import CountDwon from "@/components/ui/countdown";

import React, { useEffect, useState } from "react";
import { supabase } from "../../../../api";

// emoji list
const emoji = ["🎉", "🙂", "🤔", "😤", "😡", "🤬"];
const emojiExercise = ['🤬', '😡', '😤', '🤔', '🙂', '🎉'];
export const runtime = 'edge';
export default function Page({ params }: { params: { date: string } }) {
  const [coffeeIdx, setCoffeeIdx] = useState(0);
  const [beerIdx, setBeerIdx] = useState(0);
  const [owlIdx, setOwlIdx] = useState(0);
  const [exerciseIdx, setExerciseIdx] = useState(0);

  // 防抖函数
  function debounce(fn: Function, ms = 500) {
    let timerId // 创建一个标记用来存放定时器的返回值
    return function () {
         timerId && clearTimeout(timerId) // 每当用户输入的时候把前一个 setTimeout clear 掉
        // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
        timerId = setTimeout(() => {
             fn.apply(this, arguments)
         }, ms)
     }
  }


  // 获取数据
  async function getRecord() {
    const { data, error } = await supabase
    .from("better_us")
    .select("*")
    .eq("created_at", params.date)
    if (error) {
      console.log(error)
    } else {
      console.log('data', data)
      if (data.length > 0) {
        // @ts-ignore
        setCoffeeIdx(data[0].coffee)
        // @ts-ignore
        setBeerIdx(data[0].beer)
        // @ts-ignore
        setOwlIdx(data[0].stay_up)
        // @ts-ignore
        setExerciseIdx(data[0].exercise)
      } else {
        createRecord()
      }
    }
  }
  useEffect(() => {
    // 数据库中查找当前日期的内容，作为回显的依据
    getRecord()
    
  })

  // @ts-ignore
  async function createRecord() {
    // 在数据库里找出 created_at 为 params.date 的数据进行更新，如果没有就插入
    const { data, error } = await supabase
    .from("better_us")
    .insert([
      { created_at: params.date, coffee: coffeeIdx, beer: beerIdx, stay_up: owlIdx, exercise: exerciseIdx }
    ])
    if (error) {
      console.log(error)
    }
  }

  async function updaterecord() {
    const { data, error } = await supabase
    .from("better_us")
    .update({ coffee: coffeeIdx, beer: beerIdx, stay_up: owlIdx, exercise: exerciseIdx })
    .eq("created_at", params.date)
    if (error) {
      console.log(error)
    }
  }
  return (
    <div className="w-full flex flex-col absolute inset-0">
      <div className="w-full h-10 leading-[40px] flex justify-between p-1 sticky top-0 shadow-xl">
        <span className="font-mono">
          {params.date}
        </span>
        <CountDwon />
      </div>
      <div className="flex flex-1 justify-around md:flex-row flex-col">
        {/* coffee */}
        <div className="w-full shadow-xl text-center flex-1 flex items-center justify-around flex-col">
          <Image priority src="/coffee.svg" alt="logo" width={200} height={200} />
          <TextAnimate text={ "COFFEE * " + coffeeIdx + ' CUP'} type="rollIn" />
          <div className="w-full flex items-center relative overflow-hidden ">
            <button
              className="btn w-1/4 absolute left-5"
              onClick={() => {
                if (coffeeIdx > 0) {
                  setCoffeeIdx(coffeeIdx - 1);
                } else {
                  setCoffeeIdx(0);
                }
                debounce(updaterecord)()
              }}
            >
              -
            </button>
            <div className="w-full items-center flex flex-col text-5xl h-24 ">
              {emoji.map((item, index) => (
                <div
                key={index}
                style={{
                    transition: "all 0.5s ease",
                    top: `${index * 100 - coffeeIdx * 100}px`,
                  }}
                  className="w-24 h-24 absolute leading-[100px]"
                >
                  {item}
                </div>
              ))}
            </div>
            <button
              className="btn w-1/4 absolute right-5"
              onClick={() => {
                if (coffeeIdx < emoji.length - 1) {
                  setCoffeeIdx(coffeeIdx + 1);
                }
                debounce(updaterecord)()
              }}
            >
              +
            </button>
          </div>
        </div>
        {/* beer */}
        <div className="w-full shadow-xl text-center flex-1 flex items-center justify-around flex-col">
          <Image priority src="/beer.svg" alt="logo" width={200} height={200} />
          <TextAnimate text={ "BEER * " + beerIdx + ' CUP'} type="rollIn" />
          <div className="w-full flex items-center relative overflow-hidden ">
            <button
              className="btn w-1/4 absolute left-5"
              onClick={() => {
                if (beerIdx > 0) {
                  setBeerIdx(beerIdx - 1);
                } else {
                  setBeerIdx(0);
                }
                debounce(updaterecord)()
              }}
            >
              -
            </button>
            <div className="w-full items-center flex flex-col text-5xl h-24 ">
              {emoji.map((item, index) => (
                <div
                key={index}
                style={{
                    transition: "all 0.5s ease",
                    top: `${index * 100 - beerIdx * 100}px`,
                  }}
                  className="w-24 h-24 absolute leading-[100px]"
                >
                  {item}
                </div>
              ))}
            </div>
            <button
              className="btn w-1/4 absolute right-5"
              onClick={() => {
                if (beerIdx < emoji.length - 1) {
                  setBeerIdx(beerIdx + 1);
                }
                debounce(updaterecord)()
              }}
            >
              +
            </button>
          </div>
        </div>
        {/* stay up late */}
        <div className="w-full shadow-xl text-center flex-1 flex items-center justify-around flex-col">
          <Image priority src="/owl.svg" alt="logo" width={200} height={200} />
          <TextAnimate text={ "STAY UP * " + owlIdx + ' H'} type="rollIn" />
          <div className="w-full flex items-center relative overflow-hidden ">
            <button
              className="btn w-1/4 absolute left-5"
              onClick={() => {
                if (owlIdx > 0) {
                  setOwlIdx(owlIdx - 1);
                } else {
                  setOwlIdx(0);
                }
                debounce(updaterecord)()
              }}
            >
              -
            </button>
            <div className="w-full items-center flex flex-col text-5xl h-24 ">
              {emoji.map((item, index) => (
                <div
                key={index}
                style={{
                    transition: "all 0.5s ease",
                    top: `${index * 100 - owlIdx * 100}px`,
                  }}
                  className="w-24 h-24 absolute leading-[100px]"
                >
                  {item}
                </div>
              ))}
            </div>
            <button
              className="btn w-1/4 absolute right-5"
              onClick={() => {
                if (owlIdx < emoji.length - 1) {
                  setOwlIdx(owlIdx + 1);
                }
                debounce(updaterecord)()
              }}
            >
              +
            </button>
          </div>
        </div>
        {/* exercise */}
        <div className="w-full shadow-xl text-center flex-1 flex items-center justify-around flex-col">
          <Image priority src="/exercise.svg" alt="logo" width={200} height={200} />
          <TextAnimate text={ "EXERCISE * " + exerciseIdx / 2 + ' H'} type="rollIn" />
          <div className="w-full flex items-center relative overflow-hidden ">
            <button
              className="btn w-1/4 absolute left-5"
              onClick={() => {
                if (exerciseIdx > 0) {
                  setExerciseIdx(exerciseIdx - 1);
                } else {
                  setExerciseIdx(0);
                }
                debounce(updaterecord)()
              }}
            >
              -
            </button>
            <div className="w-full items-center flex flex-col text-5xl h-24 ">
              {emojiExercise.map((item, index) => (
                <div
                key={index}
                style={{
                    transition: "all 0.5s ease",
                    top: `${index * 100 - exerciseIdx * 100}px`,
                  }}
                  className="w-24 h-24 absolute leading-[100px]"
                >
                  {item}
                </div>
              ))}
            </div>
            <button
              className="btn w-1/4 absolute right-5"
              onClick={() => {
                if (exerciseIdx < emoji.length - 1) {
                  setExerciseIdx(exerciseIdx + 1);
                }
                debounce(updaterecord)()
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

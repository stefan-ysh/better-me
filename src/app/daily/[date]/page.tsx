"use client";
import Image from "next/image";

// 文字动画
import { TextAnimate } from "@/components/ui/text-animate";

// 倒计时
import CountDwon from "@/components/ui/countdown";

import { useState } from "react";

// emoji list
const emoji = ["🎉", "🙂", "🤔", "😤", "😡", "🤬"];
const emojiExercise = ['🤬', '😡', '😤', '🤔', '🙂', '🎉'];
export default function Page({ params }: { params: { date: string } }) {
  console.log('[ params.date ] >', params.date)
  const [coffeeIdx, setCoffeeIdx] = useState(0);
  const [beerIdx, setBeerIdx] = useState(0);
  const [owlIdx, setOwlIdx] = useState(0);
  const [exerciseIdx, setExerciseIdx] = useState(0);

  return (
    <div className="w-full">
      <div className="w-full h-full flex justify-end p-1 sticky top-0 shadow-xl">
        <CountDwon />
      </div>
      <div className="flex justify-around md:flex-row flex-col absolute top-8 left-0 right-0 bottom-0">
        {/* coffee */}
        <div className="w-full shadow-xl p-4 text-center flex-1 flex items-center justify-around flex-col">
          <Image src="/coffee.svg" alt="logo" width={200} height={200} />
          <TextAnimate text={ "COFFEE * " + coffeeIdx + ' CUP'} type="rollIn" />
          <div className="w-full flex items-center relative overflow-hidden ">
            <button
              className="btn w-1/4 absolute left-0"
              onClick={() => {
                if (coffeeIdx > 0) {
                  setCoffeeIdx(coffeeIdx - 1);
                } else {
                  setCoffeeIdx(0);
                }
              }}
            >
              -
            </button>
            <div className="w-full items-center flex flex-col text-5xl h-24 ">
              {emoji.map((item, index) => (
                <div
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
              className="btn w-1/4 absolute right-0"
              onClick={() => {
                if (coffeeIdx < emoji.length - 1) {
                  setCoffeeIdx(coffeeIdx + 1);
                }
              }}
            >
              +
            </button>
          </div>
        </div>
        {/* beer */}
        <div className="w-full shadow-xl p-4 text-center flex-1 flex items-center justify-around flex-col">
          <Image src="/beer.svg" alt="logo" width={200} height={200} />
          <TextAnimate text={ "BEER * " + beerIdx + ' CUP'} type="rollIn" />
          <div className="w-full flex items-center relative overflow-hidden ">
            <button
              className="btn w-1/4 absolute left-0"
              onClick={() => {
                if (beerIdx > 0) {
                  setBeerIdx(beerIdx - 1);
                } else {
                  setBeerIdx(0);
                }
              }}
            >
              -
            </button>
            <div className="w-full items-center flex flex-col text-5xl h-24 ">
              {emoji.map((item, index) => (
                <div
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
              className="btn w-1/4 absolute right-0"
              onClick={() => {
                if (beerIdx < emoji.length - 1) {
                  setBeerIdx(beerIdx + 1);
                }
              }}
            >
              +
            </button>
          </div>
        </div>
        {/* stay up late */}
        <div className="w-full shadow-xl p-4 text-center flex-1 flex items-center justify-around flex-col">
          <Image src="/owl.svg" alt="logo" width={200} height={200} />
          <TextAnimate text={ "STAY UP * " + owlIdx + ' H'} type="rollIn" />
          <div className="w-full flex items-center relative overflow-hidden ">
            <button
              className="btn w-1/4 absolute left-0"
              onClick={() => {
                if (owlIdx > 0) {
                  setOwlIdx(owlIdx - 1);
                } else {
                  setOwlIdx(0);
                }
              }}
            >
              -
            </button>
            <div className="w-full items-center flex flex-col text-5xl h-24 ">
              {emoji.map((item, index) => (
                <div
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
              className="btn w-1/4 absolute right-0"
              onClick={() => {
                if (owlIdx < emoji.length - 1) {
                  setOwlIdx(owlIdx + 1);
                }
              }}
            >
              +
            </button>
          </div>
        </div>
        {/* exercise */}
        <div className="w-full shadow-xl p-4 text-center flex-1 flex items-center justify-around flex-col">
          <Image src="/exercise.svg" alt="logo" width={200} height={200} />
          <TextAnimate text={ "EXERCISE * " + exerciseIdx / 2 + ' H'} type="rollIn" />
          <div className="w-full flex items-center relative overflow-hidden ">
            <button
              className="btn w-1/4 absolute left-0"
              onClick={() => {
                if (exerciseIdx > 0) {
                  setExerciseIdx(exerciseIdx - 1);
                } else {
                  setExerciseIdx(0);
                }
              }}
            >
              -
            </button>
            <div className="w-full items-center flex flex-col text-5xl h-24 ">
              {emojiExercise.map((item, index) => (
                <div
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
              className="btn w-1/4 absolute right-0"
              onClick={() => {
                if (exerciseIdx < emoji.length - 1) {
                  setExerciseIdx(exerciseIdx + 1);
                }
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

"use client";
import Image from "next/image";

// 文字动画
import { TextAnimate } from "@/components/ui/text-animate";

// 倒计时
import CountDwon from "@/components/ui/countdown";

// 生成高亮效果
import { annotate } from "rough-notation";
import { useState } from "react";

// emoji list
const emoji = ["🎉", "👍", "😘", "🙂", "🤔", "😤", "😡"];
export default function Page({ params }: { params: { date: string } }) {
  const [el, setEl] = useState<any>({});

  // 切换 stay up 和 exercise 的选中状态
  const handleChange = (elId: string, event: HTMLInputElement) => {
    let annotation = null;
    if (!el[elId]) {
      const e = document.getElementById(elId) as HTMLElement;
      annotation = annotate(e, { type: "highlight" });
      setEl({ ...el, [elId]: annotation });
    } else {
      annotation = el[elId];
    }

    // 获取当前 input 的值判断是否选中
    if (event.target.checked) {
      // 选中则高亮
      annotation.show();
    } else {
      // 未选中则取消高亮
      annotation.hide();
    }
  };
  const [coffeeIdx, setCoffeeIdx] = useState(0);
  const [beerIdx, setBeerIdx] = useState(0);
  return (
    <div className="w-full">
      <div className="w-full h-full flex justify-end p-1 sticky top-0 shadow-xl">
        <CountDwon />
      </div>
      <div className="flex justify-around md:flex-row flex-col absolute top-8 left-0 right-0 bottom-0">
        <div className="w-full shadow-xl p-4 text-center flex-1 flex items-center justify-around flex-col">
          <Image src="/coffee.svg" alt="logo" width={200} height={200} />
          <div className="w-full items-center flex flex-col text-5xl h-24 overflow-hidden relative">
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
          <div className="flex items-center">
            <button
              className="btn"
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
            <TextAnimate text="COFFEE" type="rollIn" />
            <button
              className="btn"
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
        <div className="w-full shadow-xl p-4 text-center flex-1 flex items-center justify-around flex-col">
          <Image src="/beer.svg" alt="logo" width={200} height={200} />
          <div className="w-full items-center flex flex-col text-5xl h-24 overflow-hidden relative">
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
          <div className="flex items-center">
            <button
              className="btn"
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
            <TextAnimate text="BEER" type="rollIn" />
            <button
              className="btn"
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
        <div className="w-full shadow-xl p-4 text-center flex-1 flex items-center justify-around flex-col">
          <Image src="/owl.svg" alt="logo" width={200} height={200} />
          <div className="flex items-center">
            <div id="myStayUpElement">
              <TextAnimate text="STAY UP" type="rollIn" />
            </div>
            <input
              type="checkbox"
              defaultChecked={false}
              className="checkbox"
              onChange={(event) => handleChange("myStayUpElement", event)}
            />
          </div>
        </div>
        <div className="w-full shadow-xl p-4 text-center flex-1 flex items-center justify-around flex-col">
          <Image src="/exercise.svg" alt="logo" width={200} height={200} />
          <div className="flex items-center">
            <div id="myExerciseElement">
              <TextAnimate text="EXERCISE" type="rollIn" />
            </div>
            <input
              type="checkbox"
              defaultChecked={false}
              className="checkbox"
              onChange={(event) => handleChange("myExerciseElement", event)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

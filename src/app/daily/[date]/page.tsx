"use client";

// image UI component
import Image from "next/image";

// emoji UI componen
import Emoji from "./components/Emoji";

// text animate UI component
import { TextAnimate } from "@/components/ui/text-animate";

// countdown UI component
import CountDwon from "@/components/ui/countdown";

import React, { useCallback, useEffect, useState } from "react";
import { supabase } from "../../../../api";

interface PageProp {
  params: {
    date: string;
  };
}
export const runtime = "edge";
export default function Page({ params }: PageProp) {
  const [coffeeIdx, setCoffeeIdx] = useState(0);
  const [beerIdx, setBeerIdx] = useState(0);
  const [owlIdx, setOwlIdx] = useState(0);
  const [exerciseIdx, setExerciseIdx] = useState(0);
  // @ts-ignore
  function debounce(fn, delay) {
    let timeoutId: any;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  }
  // 获取数据
  async function getRecord() {
    const { data, error } = await supabase
      .from("better_us")
      .select("*")
      .eq("created_at", params.date);
    if (error) {
      console.log(error);
    } else {
      console.log("data", data);
      if (data.length > 0) {
        // @ts-ignore
        setCoffeeIdx(data[0].coffee);
        // @ts-ignore
        setBeerIdx(data[0].beer);
        // @ts-ignore
        setOwlIdx(data[0].stay_up);
        // @ts-ignore
        setExerciseIdx(data[0].exercise);
      } else {
        createRecord();
      }
    }
  }

  // @ts-ignore
  async function createRecord() {
    // 在数据库里找出 created_at 为 params.date 的数据进行更新，如果没有就插入
    const { data, error } = await supabase.from("better_us").insert([
      {
        created_at: params.date,
        coffee: coffeeIdx,
        beer: beerIdx,
        stay_up: owlIdx,
        exercise: exerciseIdx,
      },
    ]);
    if (error) {
      console.log(error);
    }
  }

  async function updateRecord() {
    const { data, error } = await supabase
      .from("better_us")
      .update({
        coffee: coffeeIdx,
        beer: beerIdx,
        stay_up: owlIdx,
        exercise: exerciseIdx,
      })
      .eq("created_at", params.date);
    if (error) {
      console.log(error);
    }
  }

  const debounceUpdate = debounce(updateRecord, 1000)

  useEffect(() => {
    // 数据库中查找当前日期的内容，作为回显的依据
    getRecord();
  }, []);

  return (
    <div className="w-full flex flex-col absolute inset-0">
      <div className="w-full h-10 leading-[40px] flex justify-between p-1 sticky top-0 shadow-xl">
        <span className="font-mono">{params.date}</span>
        <CountDwon />
      </div>
      <div className="flex flex-1 justify-around md:flex-row flex-col">
        {/* coffee */}
        <div className="w-full shadow-xl text-center flex-1 flex items-center justify-around flex-col">
          <Image
            priority
            src="/coffee.svg"
            alt="logo"
            width={200}
            height={200}
          />
          <TextAnimate text={"COFFEE * " + coffeeIdx + " CUP"} type="rollIn" />
          <div className="w-full flex items-center relative overflow-hidden ">
            <button
              onClick={() => {
                setCoffeeIdx(1);
                debounceUpdate();
              }}
            >
              -
            </button>
            <Emoji idx={coffeeIdx} type="coffee" />
            <button
              className="btn w-1/4 absolute right-5"
              onClick={() => {
                setCoffeeIdx((prevIdx) =>
                  prevIdx < 5 ? prevIdx + 1 : prevIdx
                );
                debounceUpdate();
              }}
            >
              +
            </button>
          </div>
        </div>
        {/* beer */}
        <div className="w-full shadow-xl text-center flex-1 flex items-center justify-around flex-col">
          <Image priority src="/beer.svg" alt="logo" width={200} height={200} />
          <TextAnimate text={"BEER * " + beerIdx + " CUP"} type="rollIn" />
          <div className="w-full flex items-center relative overflow-hidden ">
            <button
              className="btn w-1/4 absolute left-5"
              onClick={() => {
                if (beerIdx > 0) {
                  setBeerIdx(beerIdx - 1);
                } else {
                  setBeerIdx(0);
                }
                debounceUpdate();
              }}
            >
              -
            </button>
            <Emoji idx={beerIdx} type="beer" />
            <button
              className="btn w-1/4 absolute right-5"
              onClick={() => {
                if (beerIdx < 5) {
                  setBeerIdx(beerIdx + 1);
                }
                debounceUpdate();
              }}
            >
              +
            </button>
          </div>
        </div>
        {/* stay up late */}
        <div className="w-full shadow-xl text-center flex-1 flex items-center justify-around flex-col">
          <Image priority src="/owl.svg" alt="logo" width={200} height={200} />
          <TextAnimate text={"STAY UP * " + owlIdx + " H"} type="rollIn" />
          <div className="w-full flex items-center relative overflow-hidden ">
            <button
              className="btn w-1/4 absolute left-5"
              onClick={() => {
                if (owlIdx > 0) {
                  setOwlIdx(owlIdx - 1);
                } else {
                  setOwlIdx(0);
                }
                debounceUpdate();
              }}
            >
              -
            </button>
            <Emoji idx={owlIdx} type="owl" />
            <button
              className="btn w-1/4 absolute right-5"
              onClick={() => {
                if (owlIdx < 5) {
                  setOwlIdx(owlIdx + 1);
                }
                debounceUpdate();
              }}
            >
              +
            </button>
          </div>
        </div>
        {/* exercise */}
        <div className="w-full shadow-xl text-center flex-1 flex items-center justify-around flex-col">
          <Image
            priority
            src="/exercise.svg"
            alt="logo"
            width={200}
            height={200}
          />
          <TextAnimate
            text={"EXERCISE * " + exerciseIdx / 2 + " H"}
            type="rollIn"
          />
          <div className="w-full flex items-center relative overflow-hidden ">
            <button
              className="btn w-1/4 absolute left-5"
              onClick={() => {
                if (exerciseIdx > 0) {
                  setExerciseIdx(exerciseIdx - 0.5);
                } else {
                  setExerciseIdx(0);
                }
                debounceUpdate();
              }}
            >
              -
            </button>
            <Emoji idx={exerciseIdx} type="exercise" />
            <button
              className="btn w-1/4 absolute right-5"
              onClick={() => {
                if (exerciseIdx < 5) {
                  setExerciseIdx(exerciseIdx + 1);
                }
                debounceUpdate();
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

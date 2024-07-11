import React from 'react';

// Emoji lists
const EMOJIS = ["🎉", "🙂", "🤔", "😤", "😡", "🤬"];
const EMOJIS_EXERCISE = ["🤬", "😡", "😤", "🤔", "🙂", "🎉"];

// Named constants for CSS styles
const EMOJI_STYLE = {
  transition: 'all 0.5s ease',
};
interface EmojiProp {
  type: 'coffee' | 'beer' | 'owl' | 'exercise'
  idx: number
}
const EmojiComponent = React.memo(({ type, idx }: EmojiProp) => {
  const emojis = type === 'exercise' ? EMOJIS_EXERCISE : EMOJIS;
  const maxIndex = emojis.length - 1;

  return (
    <div className="w-full items-center flex flex-col text-5xl h-24">
      {emojis.map((item, index) => (
        <div
          key={index}
          style={{
            ...EMOJI_STYLE,
            top: `${index * 100 - idx * 100}px`,
          }}
          className="w-24 h-24 absolute leading-[100px]"
        >
          {item}
        </div>
      ))}
    </div>
  );
});

export default EmojiComponent;
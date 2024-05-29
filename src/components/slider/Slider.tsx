import React from "react";

interface SliderProps {
  text: string;
}

const Slider: React.FC<SliderProps> = ({ text }) => {
  return (
    <div className="overflow-hidden whitespace-nowrap w-full h-8 bg-sih-red flex justify-center items-center">
      <div className="animate-marquee inline-block w-1/2">{text}</div>
    </div>
  );
};

export default Slider;

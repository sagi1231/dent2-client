import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

interface RangeSliderProps {
  min: number;
  max: number;
  step: number;
  defaultValue: [number, number];
  onChange: (value: [number, number]) => void;
}

const SliderContainer = styled.div`
  margin-top: 20px !important;
  width: 300px;
  /* margin: 0 auto; */
  margin-bottom: 20px;
  position: relative;
`;

const Slider = styled.div`
  position: relative;
  width: 100%;
  height: 10px;
  background-color: var(--purple-opacity);
  border-radius: 300px;
`;

const SliderTrack = styled.div`
  position: absolute;
  height: 100%;
  background-color: var(--primary-purple);

  border-radius: 3px;
`;

const SliderRange = styled.div<{ left: number; right: number }>`
  position: absolute;
  height: 100%;
  background-color: var(--primary-purple);
  border-radius: 3px;
  left: ${(props) => props.left}%;
  right: ${(props) => props.right}%;
`;

const SliderThumb = styled.div<{ left: number }>`
  position: absolute;
  width: 25px;
  height: 25px;
  background-color: var(--primary-purple);
  border: 3px solid white;
  border-radius: 50%;
  cursor: pointer;
  top: -8px;
  left: ${(props) => props.left}%;
  transform: translateX(-50%);
`;

const ThumbValue = styled.div<{ left: number }>`
  position: absolute;
  top: 20px;
  left: ${(props) => props.left}%;
  transform: translateX(-50%);
  font-size: 12px;
`;

const SliderValues = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 5px;
  color: #bdbdbd;
  /* margin-top: -40px; */
`;

const RangeSlider: React.FC<RangeSliderProps> = ({
  min,
  max,
  step,
  defaultValue,
  onChange,
}) => {
  const [minValue, setMinValue] = useState(defaultValue[0]);
  const [maxValue, setMaxValue] = useState(defaultValue[1]);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onChange([minValue, maxValue]);
  }, [minValue, maxValue, onChange]);

  const calculatePercentage = (value: number) =>
    ((value - min) / (max - min)) * 100;

  const snapToStep = (value: number) => Math.round(value / step) * step;

  const handleThumbMouseMove = (
    event: MouseEvent,
    setValue: React.Dispatch<React.SetStateAction<number>>,
    isMin: boolean
  ) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const newValue =
        min +
        Math.max(0, Math.min((event.clientX - rect.left) / rect.width, 1)) *
          (max - min);
      const snappedValue = snapToStep(newValue);
      if (isMin) {
        setValue(Math.min(snappedValue, maxValue - step));
      } else {
        setValue(Math.max(snappedValue, minValue + step));
      }
    }
  };

  const handleThumbMouseUp = (isMin: boolean) => {
    document.removeEventListener(
      "mousemove",
      isMin ? handleMinThumbMouseMove : handleMaxThumbMouseMove
    );
    document.removeEventListener(
      "mouseup",
      isMin ? handleMinThumbMouseUp : handleMaxThumbMouseUp
    );
  };

  const handleThumbMouseDown = (isMin: boolean) => {
    document.addEventListener(
      "mousemove",
      isMin ? handleMinThumbMouseMove : handleMaxThumbMouseMove
    );
    document.addEventListener(
      "mouseup",
      isMin ? handleMinThumbMouseUp : handleMaxThumbMouseUp
    );
  };

  const handleMinThumbMouseMove = (event: MouseEvent) =>
    handleThumbMouseMove(event, setMinValue, true);
  const handleMaxThumbMouseMove = (event: MouseEvent) =>
    handleThumbMouseMove(event, setMaxValue, false);
  const handleMinThumbMouseUp = () => handleThumbMouseUp(true);
  const handleMaxThumbMouseUp = () => handleThumbMouseUp(false);
  const handleMinThumbMouseDown = () => handleThumbMouseDown(true);
  const handleMaxThumbMouseDown = () => handleThumbMouseDown(false);

  return (
    <SliderContainer>
      <SliderValues>
        <span>{max} + </span>
        <span>{min}</span>
      </SliderValues>
      <Slider ref={sliderRef}>
        <SliderTrack />
        <SliderRange
          left={calculatePercentage(minValue)}
          right={100 - calculatePercentage(maxValue)}
        />
        <SliderThumb
          left={calculatePercentage(minValue)}
          onMouseDown={handleMinThumbMouseDown}
        />
        <SliderThumb
          left={calculatePercentage(maxValue)}
          onMouseDown={handleMaxThumbMouseDown}
        />
        <ThumbValue left={calculatePercentage(minValue)}>
          {Math.round(minValue)}
        </ThumbValue>
        <ThumbValue left={calculatePercentage(maxValue)}>
          {Math.round(maxValue)}
        </ThumbValue>
      </Slider>
    </SliderContainer>
  );
};

export default RangeSlider;

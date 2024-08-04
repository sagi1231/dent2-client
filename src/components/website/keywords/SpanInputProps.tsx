import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/CloseOutlined";

interface SpanInputProps {
  // Optional prop to set a placeholder for the input
  placeholder?: string;
}

const SpanInput: React.FC<SpanInputProps> = ({ placeholder }) => {
  const [inputText, setInputText] = useState<string>("");
  const [spans, setSpans] = useState<string[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleInputKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter" && inputText.trim() !== "") {
      setSpans([...spans, inputText.trim()]);
      setInputText("");
    }
  };

  const handleSpanClick = (span: string) => {
    setSpans(spans.filter((s) => s !== span));
  };

  const KeywordsBadge = styled.span`
    background: #741fff;
    color: white;
    padding: 0.5em 1em;
    border-radius: 25px;
    font-size: 12px;
    margin-right: 5px;
    margin-bottom: 5px;
    margin-top: 5px;
    display: flex;
    align-items: center;
    svg {
      font-size: 12px;
    }
    span {
      margin-left: 5px;
    }
  `;
  return (
    <div>
      <input
        className="input-style"
        type="text"
        placeholder="Enter Keywords"
        value={inputText}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
      />
      <div className="flex">
        {spans.map((span) => (
          <KeywordsBadge key={span} onClick={() => handleSpanClick(span)}>
            <CloseIcon />
            <span>{span}</span>
          </KeywordsBadge>
        ))}
      </div>
    </div>
  );
};

export default SpanInput;

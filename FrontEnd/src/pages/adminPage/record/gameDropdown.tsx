import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as DownIcon } from '../../../style/icons/String-icon-ChevronDown.svg';
import { GameInfo } from '../info/interface';
interface DropDownProps {
  options: GameInfo;
  onValue: (value: string) => void;
}

const GameDropDown: React.FC<DropDownProps> = ({ options, onValue }) => {
  const [currentValue, setCurrentValue] =
    useState('조회할 게임을 선택해주세요:)');
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionClick = (selectedOption: string, id: string) => {
    setCurrentValue(selectedOption);
    setShowOptions(false);
    onValue(id);
  };

  return (
    <DropDownContainer onClick={() => setShowOptions(!showOptions)}>
      <CurrentOption>
        {currentValue}
        <div>
          <DownIcon />
        </div>
      </CurrentOption>
      {showOptions && (
        <SelectOptions>
          {Array.isArray(options) &&
            options.map((option) => (
              <OptionItem
                key={option._id}
                onClick={() => handleOptionClick(option.gameTitle, option._id)}
              >
                {option.gameTitle}
              </OptionItem>
            ))}
        </SelectOptions>
      )}
    </DropDownContainer>
  );
};

export default GameDropDown;

const DropDownContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60rem;
  height: 5rem;
  font-size: 1.8rem;
  background: #f5f5f5;
  color: #242424;
  border: #000080 2px solid;
  border-radius: 1rem;
  cursor: pointer;
  box-shadow: 0px 0.676819px 2.03046px rgba(0, 0, 0, 0.1),
    0px 3.6097px 8.12183px rgba(0, 0, 0, 0.13);
`;

const CurrentOption = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
  div {
    position: absolute;
    right: 3rem;
  }
`;

const SelectOptions = styled.ul`
  z-index: 1;
  position: absolute;
  list-style: none;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: auto;
  overflow-y: auto;
  padding: 1rem 0;
  margin-top: 0.4rem;
  border-radius: 1rem;
  background: #f5f5f5;
  box-shadow: 0px 0.676819px 2.03046px rgba(0, 0, 0, 0.1),
    0px 3.6097px 8.12183px rgba(0, 0, 0, 0.13);
`;

const OptionItem = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 1.2rem;
  width: 100%;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 128, 0.2);
    font-weight: 600;
  }
`;
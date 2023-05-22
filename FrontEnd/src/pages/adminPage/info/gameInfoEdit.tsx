import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import GameInfoEditing from './gameInfoEditing';
import { GameInfo, GameData } from './interface';

const GameInfoEdit = () => {
  const [data, setData] = useState<GameInfo[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/games')
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [sendingData, setSendingData] = useState<GameData>();

  const handleEditClick = (id: string) => {
    setIsEditing(true);
    const gameInfo = data.find((item) => item._id === id);
    if (gameInfo) {
      setSendingData({
        id: gameInfo._id,
        name: gameInfo.gameTitle,
        iconUrl: gameInfo.gameIconUrl.toString(),
        category: gameInfo.gameCategory,
        description: gameInfo.gameDescription,
        menual: gameInfo.gameManual,
        status: gameInfo.gameServiceStatus,
      });
    }
  };
  const handleValue = (updateData: GameInfo | null, value: boolean) => {
    console.log(updateData);
    if (updateData === null) {
      setIsEditing(value);
      return;
    }

    if (updateData) {
      setData((prevData) =>
        prevData.map((item) => {
          if (item._id === updateData._id) {
            return {
              ...item,
              categoryName: updateData.gameCategory,
              gameDescription: updateData.gameDescription,
              gameIconUrl: updateData.gameIconUrl,
              gameManual: updateData.gameManual,
              gameTitle: updateData.gameTitle,
              gameServiceStatus: updateData.gameServiceStatus,
            };
          }
          return item;
        })
      );
    }
    setIsEditing(value);
  };

  return (
    <>
      {!isEditing ? (
        <>
          {data.map((item: GameInfo) => (
            <Container key={item._id}>
              <ImageContent>
                <GameImage
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7aRfWK5rqENOh5_8z0VK5FEKlGLcEfi-CLg&usqp=CAU"
                  alt="게임 아이콘"
                />
              </ImageContent>
              <div>
                <Title>[{item.gameTitle}]</Title>
                <Content>
                  <FlexContnet>
                    <SubTitle>카테고리:</SubTitle>
                    <ContentText>{item.gameCategory}</ContentText>
                  </FlexContnet>
                  <FlexContnet>
                    <SubTitle>게임 설명:</SubTitle>
                    <ContentText>{item.gameDescription}</ContentText>
                  </FlexContnet>
                  <FlexContnet>
                    <SubTitle>게임 조작:</SubTitle>
                    <ContentText>{item.gameManual}</ContentText>
                  </FlexContnet>
                  <FlexContnet>
                    <SubTitle>게임 상태:</SubTitle>
                    <ContentText>{item.gameServiceStatus}</ContentText>
                  </FlexContnet>
                </Content>
              </div>
              <Button onClick={() => handleEditClick(item._id)}>
                수정하기
              </Button>
            </Container>
          ))}
        </>
      ) : sendingData ? (
        <GameInfoEditing onValue={handleValue} receivedData={sendingData} />
      ) : (
        ''
      )}
    </>
  );
};

export default GameInfoEdit;

const Container = styled.div`
  display: flex;
  padding: 2rem;
  width: auto;
  height: 20rem;
  border-bottom: 2px solid #e0e0e0;
  position: relative;
`;
const ImageContent = styled.div`
  margin: 1rem;
  width: 13rem;
  height: 13rem;
  border: 4px solid #242424;
  filter: drop-shadow(4px 4px 4px rgba(0, 0, 0, 0.25));
  border-radius: 10px;
`;
const GameImage = styled.img`
  border-radius: 5px;
`;
const Title = styled.p`
  margin: 0.4rem 0 0 1rem;
  font-size: 2.4rem;
  color: #242424;
  font-weight: 500;
`;
const Content = styled.div`
  margin: 1.2rem 0 0 3rem;
`;
const FlexContnet = styled.div`
  display: flex;
  flex: 1
  position: relative;
  padding: 0.5rem;

`;
const SubTitle = styled.div`
  font-size: 1.4rem;
  color: #616161;
  font-weight: 500;
`;

const ContentText = styled.p`
  position: absolute;
  left: 36rem;
  color: #242424;
  font-size: 1.6rem;
  font-weight: 500;
`;

const Button = styled.button`
  position: absolute;
  bottom: 3rem;
  right: 4rem;
  width: 12rem;
  height: 5rem;
  background: #000080;
  border-radius: 10px;
  color: #ffffff;
  font-weight: 500;
  font-size: 1.8rem;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 128, 0.8);
  }
  &:active {
    background: rgba(0, 0, 128, 0.6);
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.4);
  }
`;
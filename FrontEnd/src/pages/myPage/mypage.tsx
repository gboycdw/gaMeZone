import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../../style/reset.css';
import '../../style/mypage.css';
import axios from 'axios';

import Footer from '../mainPage/mainFooter';
import Container from './components/container';
import Profile from './components/profile';
import UserInfo from './components/userInfo';
import UserCommu from './components/userCommu';
import MainBody from '../mainPage/mainBody';
import MainFooter from '../mainPage/mainFooter';
import MainHeader from '../mainPage/mainHeader';

const url = process.env.REACT_APP_API_URL;
const userToken: string | null = localStorage.getItem('userToken');
const config = {
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
};

function MyPage() {
  const [mainModal, setMainModal] = React.useState<boolean>(false);
  const [nickName, setNickName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [userIcon, setUserIcon] = React.useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userToken) {
      alert('로그인 후 이용 가능한 서비스입니다.');
      navigate('/');
    }

    const getUserInfo = async () => {
      const { data } = await axios.get(url + '/api/users', config);
      setNickName(data.nickname);
      setEmail(data.email);
      setUserIcon(data.userIcon);
    };
    getUserInfo();
  }, []);

  return (
    <div
      style={{
        backgroundColor: '#008080',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      <Container>
        <Profile userIcon={userIcon} email={email} nickName={nickName} />
        <Content>
          <UserInfo />
          <UserCommu />
        </Content>
      </Container>
      <MainBody mainModal={mainModal} setMainModal={setMainModal}></MainBody>
      <MainFooter
        mainModal={mainModal}
        setMainModal={setMainModal}
      ></MainFooter>
    </div>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px auto;
  width: 90%;
  height: 85%;
  border-radius: 5px;
`;

export default MyPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MyPageContainer,
  Title,
  Button,
} from './styles/MyPageStyle'; // Import styled components

const MyPage = () => {
  const navigate = useNavigate();

  const handleWithdraw = () => {
    // 회원 탈퇴 폼으로 이동
    navigate('/withdraw');
  };

  return (
    <MyPageContainer>
      <Title>마이 페이지</Title>
      
      {/* 회원 탈퇴 버튼 */}
      <Button onClick={handleWithdraw}>회원 탈퇴</Button>
    </MyPageContainer>
  );
};

export default MyPage;

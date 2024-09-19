import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  LoginContainer,
  Title,
  Input,
  ErrorMessage,
  Button,
  SignupButton,
  FindButton // 추가된 버튼 스타일
} from './styles/LoginStyle'; 

function Login({ setUser }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 서버에 로그인 요청 보내기
    axios.post('/api/login', { userId, userPwd: password })
      .then(response => {
        if (response.data.success) {
          // localStorage에 사용자 정보 저장
          localStorage.setItem('user', userId);

          // 메인 페이지로 이동
          navigate('/main');
        } else {
          setError(response.data.message);
        }
      })
      .catch(error => {
        console.error('로그인 중 오류가 발생했습니다.', error);
        setError('서버에 문제가 발생했습니다. 다시 시도해 주세요.');
      });
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleFindId = () => {
    navigate('/find-id'); // 아이디 찾기 페이지로 이동
  };

  const handleFindPassword = () => {
    navigate('/find-password'); // 비밀번호 찾기 페이지로 이동
  };

  return (
    <Container>
      <LoginContainer>
        <form onSubmit={handleLogin}>
          <Title>Login</Title>
          <Input
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">로그인</Button>
          <SignupButton type="button" onClick={handleSignUp}>
            회원가입
          </SignupButton>
          {/* 아이디 및 비밀번호 찾기 버튼 추가 */}
          <FindButton type="button" onClick={handleFindId}>
            아이디 찾기
          </FindButton>
          <FindButton type="button" onClick={handleFindPassword}>
            비밀번호 찾기
          </FindButton>
        </form>
      </LoginContainer>
    </Container>
  );
}

export default Login;

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
  FindButton
} from './styles/LoginStyle'; 

function Login({ setUser }) {
  const [userIdOrEmail, setUserIdOrEmail] = useState(''); // 아이디 또는 이메일 입력 필드
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // 서버에 로그인 요청 보내기
    axios.post('/users/login', { userIdOrEmail, userPwd: password }) // userIdOrEmail 필드로 전송
    .then(response => {
      if (response.data.success) {
        console.log(response.data)
        localStorage.setItem('user', response.data.userId);
        localStorage.setItem('user1', response.data.name);
        localStorage.setItem('user2', response.data.type);

   // 서버에서 사용자 정보 반환
        navigate('/main');
      } else {
        setError(response.data.message);
      }
    })
    .catch(error => {
      console.error('로그인 중 오류가 발생했습니다.', error);
      setError('일치하는 회원정보가 없습니다');
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
            placeholder="아이디 또는 이메일"
            value={userIdOrEmail}
            onChange={(e) => setUserIdOrEmail(e.target.value)}
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

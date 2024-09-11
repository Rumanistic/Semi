import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions/authActions';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);


	//db와 연결 필요!!
	
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ email, password }))
        .then(() => {
          if (auth.isAuthenticated) {
            navigate('/main'); 
          } else {
            setError('이메일 또는 비밀번호가 일치하지 않습니다.');
          }
        })
        .catch(() => {
          setError('이메일 또는 비밀번호가 일치하지 않습니다.');
        });
    } else {
      setError('모든 필드를 입력해주세요.');
    }
  };

  const handleForgotPassword = () => {
    navigate('/profile'); 
  };
  
  
  return (
    <LoginContainer>
      <h2>로그인</h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <Form onSubmit={handleSubmit}>
        <Label>이메일</Label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력하세요"
        />
        <Label>비밀번호</Label>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력하세요"
          
        />
        <Button id='login_btn' type="submit">로그인</Button>

        
      
      </Form>
      <Form>
      <Button type="button" onClick={handleForgotPassword}>비밀번호를 잊으셨나요?</Button>
      <Button type="button" onClick={() => navigate('/signup')}>회원가입</Button>
      </Form>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  margin-top: 100px;
  margin-left: 680px;
  width: 370px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-top: 10px;
  margin-left: 10px;
  font-size: 14px;
  text-align: left;
`;

const Input = styled.input`
  padding: 10px;
  margin-top: 5px;
  margin-left: 7px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 90%;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 25px;
  margin-left: 60px;
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 70%
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const SignupLink = styled.p`
  margin-top: 15px;
  cursor: pointer;
  color: blue;
  text-decoration: underline;
`;

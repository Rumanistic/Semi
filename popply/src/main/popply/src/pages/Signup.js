import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Signup = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    address: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const sendVerificationCode = () => {
	  axios.post('api/send-verification-code', { phone: userData.phone })
	  .then(() => setIsCodeSent(true))
	  .catch(err => console.error(err));
  };
  
  const verifyCode = () => {
	  axios.post('/api/verify-code', { phone: userData.phone, code: verificationCode })
	  .then(() => setIsCodeVerified(true))
	  .catch(err => console.error(err));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!isCodeVerified) {
		alert('휴대폰번호를 인증해주세요');
		return;
	}
	
	axios.post('/api/signup', userData)
	.then(response => {
		console.log(response.data);
		navigate('/');
	})
	.catch(err => console.error(err));
  };




  return (
    <SignupContainer>
      <TitleContainer>
      <h2>회원가입</h2>
      </TitleContainer>
      <Form onSubmit={handleSubmit}>
        <Label> 이메일 </Label>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
        />
        <Label> 아이디 </Label>
        <Input
          type="userId"
          name="userId"
          placeholder="userId"
          value={userData.userId}
          onChange={handleChange}
        />
        <Label> 비밀번호 </Label>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
        />
        <Label> 이름 </Label>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={userData.name}
          onChange={handleChange}
        />
        
        //휴대폰번호 부분 다시 수정해야 함
        
        <Label> 휴대폰번호 </Label>   
        <Input
          type="text"
          name="phone"
          placeholder="Phone"
          value={userData.phone}
          onChange={handleChange}
        />
        <Button type="button" onClick={sendVerificationCode}> 인증번호 전송 </Button>
        {isCodeSent && (
			<Form>
			<Label> 인증번호 </Label>
			<Input
			type="text"
			value={verificationCode}
			onChange={(e) => setVerificationCode(e.target.value)}
			/>
			<Button type="button" onClick={verifyCode}> 인증번호 </Button>
			</Form>
		)}
        <Label> 주소 </Label>
        <Input
          type="text"
          name="address"
          placeholder="주소 (선택 사항)"
          value={userData.address}
          onChange={handleChange}
        />
        <Button type="submit" disabled={!isCodeVerified}>회원가입</Button>
      </Form>
    </SignupContainer>
  );
};

const SignupContainer = styled.div`
  margin-top: 100px;
  margin-left: 680px;
  width: 370px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: left;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-top: 10px;
  font-size: 14px;
  padding: 3px;
  text-align: left;
`;

const Input = styled.input`
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 90%;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 15px;
  margin-bottom: 20px;
  margin-left: 55px;
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 70%;
  
 
  
`;







export default Signup;



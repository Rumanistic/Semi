import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  SignupContainer,
  Title,
  Form,
  Label,
  Input,
  ErrorMessage,
  Button
} from './styles/SignUpStyle'; // Import styled components

const Signup = () => {
  const [userData, setUserData] = useState({
    email: '',
    userId: '',
    userPwd: '',
    name: '',
    phone: '',
    address: '',
  });
  const [isUserIdAvailable, setIsUserIdAvailable] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const checkUserId = () => {
    if (!userData.userId) return;

    // 아이디 중복 체크
    axios.post(`/api/check-username/${userData.userId}`)
      .then(response => {
        if (response.data) {
          setIsUserIdAvailable(true);
          setErrorMessage('');
        } else {
          setIsUserIdAvailable(false);
          setErrorMessage('이미 사용 중인 아이디입니다.');
        }
      })
      .catch(err => {
        console.error('아이디 중복 체크 중 오류 발생:', err);
        setErrorMessage('아이디 중복 체크에 실패했습니다.');
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isUserIdAvailable) {
      alert('아이디를 다시 확인해 주세요.');
      return;
    }

    axios.post('/api/signup', userData)
      .then(() => {
        alert('회원가입이 완료되었습니다');
        navigate('/login');
      })
      .catch(err => {
        console.error('서버 요청 중 오류가 발생했습니다.', err);
        alert('서버 오류가 발생했습니다. 다시 시도해 주세요.');
      });
  };

  return (
    <SignupContainer>
      <Title>회원가입</Title>
      <Form onSubmit={handleSubmit}>
        <Label>이메일</Label>
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
        />
        <Label>아이디</Label>
        <Input
          type="text"
          name="userId"
          placeholder="userId"
          value={userData.userId}
          onChange={handleChange}
          onBlur={checkUserId}
        />
        {!isUserIdAvailable && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <Label>비밀번호</Label>
        <Input
          type="password"
          name="userPwd"
          placeholder="Password"
          value={userData.userPwd}
          onChange={handleChange}
        />
        <Label>이름</Label>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={userData.name}
          onChange={handleChange}
        />
        <Label>휴대폰번호</Label>
        <Input
          type="text"
          name="phone"
          placeholder="Phone"
          value={userData.phone}
          onChange={handleChange}
        />
        <Label>주소</Label>
        <Input
          type="text"
          name="address"
          placeholder="주소 (선택 사항)"
          value={userData.address}
          onChange={handleChange}
        />
        <Button type="submit">회원가입</Button>
      </Form>
    </SignupContainer>
  );
};

export default Signup;

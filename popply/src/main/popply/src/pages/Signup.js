import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  SignupContainer,
  Title,
  Form,
  Label,
  Input,
  ErrorMessage,
  SuccessMessage,
  Button,
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
  const [isUserIdAvailable, setIsUserIdAvailable] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 전화번호에서 하이픈 제거
    if (name === 'phone') {
      const phoneValue = value.replace(/-/g, ''); // 하이픈 제거
      setUserData({ ...userData, phone: phoneValue });
    } else {
      setUserData({ ...userData, [name]: value });
    }

    // 입력 필드 변경 시, 해당 필드의 에러 메시지 초기화
    setFieldErrors({ ...fieldErrors, [name]: '' });
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

    // 필수 필드 유효성 검사
    const errors = {};
    if (!userData.email) {
      errors.email = '이메일을 입력해 주세요.';
    } else if (!userData.email.includes('@')) { // 이메일에 '@' 포함 여부 확인
      errors.email = '올바른 이메일 주소를 입력해 주세요.';
    }

    if (!userData.userId) errors.userId = '아이디를 입력해 주세요.';
    if (!userData.userPwd) errors.userPwd = '비밀번호를 입력해 주세요.';
    if (!userData.name) errors.name = '이름을 입력해 주세요.';
    if (!userData.phone) errors.phone = '휴대폰 번호를 입력해 주세요.';

    // 에러가 있으면 상태 업데이트하고 함수 종료
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    if (isUserIdAvailable === false) { // 중복 아이디인 경우
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
        {fieldErrors.email && <ErrorMessage>{fieldErrors.email}</ErrorMessage>} {/* 이메일 에러 메시지 */}

        <Label>아이디</Label>
        <Input
          type="text"
          name="userId"
          placeholder="userId"
          value={userData.userId}
          onChange={handleChange}
          onBlur={checkUserId}
        />
        {isUserIdAvailable === false && <ErrorMessage>{errorMessage}</ErrorMessage>}
        {isUserIdAvailable === true && <SuccessMessage>사용 가능한 아이디입니다.</SuccessMessage>} {/* 성공 메시지 */}
        {fieldErrors.userId && <ErrorMessage>{fieldErrors.userId}</ErrorMessage>} {/* 아이디 에러 메시지 */}

        <Label>비밀번호</Label>
        <Input
          type="password"
          name="userPwd"
          placeholder="Password"
          value={userData.userPwd}
          onChange={handleChange}
        />
        {fieldErrors.userPwd && <ErrorMessage>{fieldErrors.userPwd}</ErrorMessage>} {/* 비밀번호 에러 메시지 */}

        <Label>이름</Label>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={userData.name}
          onChange={handleChange}
        />
        {fieldErrors.name && <ErrorMessage>{fieldErrors.name}</ErrorMessage>} {/* 이름 에러 메시지 */}

        <Label>휴대폰번호</Label>
        <Input
          type="text"
          name="phone"
          placeholder="Phone"
          value={userData.phone}
          onChange={handleChange}
        />
        {fieldErrors.phone && <ErrorMessage>{fieldErrors.phone}</ErrorMessage>} {/* 휴대폰번호 에러 메시지 */}

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

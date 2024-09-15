import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // 별도의 CSS 파일 임포트

const Signup = () => {
  const [userData, setUserData] = useState({
    email: '',
    userId: '',
    userPwd: '',
    name: '',
    phone: '',
    address: '',
  });
  const [isUserIdAvailable, setIsUserIdAvailable] = useState(true); // 아이디 중복 여부 상태 추가
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
        console.log(response)
        if (response.data) {
          setIsUserIdAvailable(true); // 아이디 사용 가능
          setErrorMessage('');
        } else {
          setIsUserIdAvailable(false); // 아이디 중복
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
        // 서버에서 받은 응답 처리
        alert('회원가입이 완료되었습니다');
       navigate('/login');
      })
      .catch(err => {
        console.error('서버 요청 중 오류가 발생했습니다.', err);
        alert('서버 오류가 발생했습니다. 다시 시도해 주세요.');
      });
  };

  return (
    <div className="signup-container">
      <div className="title-container">
        <h2>회원가입</h2>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <label> 이메일 </label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
        />
        <label> 아이디 </label>
        <input
          type="text"
          name="userId"
          placeholder="userId"
          value={userData.userId}
          onChange={handleChange}
          onBlur={checkUserId} // 아이디 입력 필드에서 포커스가 사라질 때 중복 체크
        />
        {!isUserIdAvailable && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* 아이디 중복 메시지 */}

        <label> 비밀번호 </label>
        <input
          type="password"
          name="userPwd"
          placeholder="Password"
          value={userData.password}
          onChange={handleChange}
        />
        <label> 이름 </label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={userData.name}
          onChange={handleChange}
        />
        <label> 휴대폰번호 </label>
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={userData.phone}
          onChange={handleChange}
        />
        <label> 주소 </label>
        <input
          type="text"
          name="address"
          placeholder="주소 (선택 사항)"
          value={userData.address}
          onChange={handleChange}
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default Signup;

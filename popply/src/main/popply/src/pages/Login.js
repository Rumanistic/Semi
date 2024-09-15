import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

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

  return (
    <div className="container">
      <div className="login-container">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="아이디"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="btn">
            로그인
          </button>
          <button
            type="button"
            onClick={handleSignUp}
            className="btn signup-btn"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;

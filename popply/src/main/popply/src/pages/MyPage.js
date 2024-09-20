import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  MyPageContainer,
  Title,
  Button,
  InfoContainer,
  Input,
  ErrorMessage
} from './styles/MyPageStyle'; // Import styled components

const MyPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [password, setPassword] = useState('');
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [error, setError] = useState('');

  // 현재 로그인된 사용자의 ID를 가져옴
  const savedUser = localStorage.getItem('user');

  const handlePasswordCheck = () => {
    // 서버에 비밀번호 확인 요청
    axios.post('/users/verify-password', { userId: savedUser, userPwd: password })
      .then(response => {
        if (response.data.success) {
          setUserInfo(response.data.userInfo); // 성공 시 사용자 정보 설정
          setIsPasswordVerified(true);
          setError('');
        } else {
          setError('비밀번호가 일치하지 않습니다.');
        }
      })
      .catch(error => {
        console.error('비밀번호 확인 중 오류가 발생했습니다.', error);
        setError('서버 오류가 발생했습니다. 다시 시도해 주세요.');
      });
  };

  const handleInputChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = () => {
    // 서버에 수정된 사용자 정보 업데이트 요청
    axios.post('/users/update-user-info', userInfo)
      .then(response => {
        if (response.data.success) {
          setIsEditing(false);
          alert('회원 정보가 수정되었습니다.');
        } else {
          setError('회원 정보 수정에 실패했습니다.');
        }
      })
      .catch(error => {
        console.error('회원 정보 수정 중 오류가 발생했습니다.', error);
        setError('서버 오류가 발생했습니다. 다시 시도해 주세요.');
      });
  };

  const handleWithdraw = () => {
    // 회원 탈퇴 폼으로 이동
    navigate('/withdraw');
  };

  // 전화번호를 '010-1234-5678' 형식으로 변환하는 함수
  const formatPhoneNumber = (phone) => {
    // 전화번호에 하이픈이 없을 경우에만 포맷팅
    if (!phone.includes('-')) {
      return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    }
    return phone;
  };

  return (
    <MyPageContainer>
      <Title>마이 페이지</Title>

      {!isPasswordVerified ? (
        // 비밀번호 입력 필드
        <div>
          <Input
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button onClick={handlePasswordCheck}>확인</Button>
        </div>
      ) : (
        // 비밀번호 확인 후 사용자 정보 표시 또는 수정
        <InfoContainer>
          {isEditing ? (
            // 수정 모드일 때
            <div>
              <p><strong>아이디:</strong> {userInfo.userId}</p>
              <p>
                <strong>이름:</strong>
                <Input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <strong>이메일:</strong>
                <Input
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                />
              </p>
              <p>
                <strong>전화번호:</strong>
                <Input
                  type="text"
                  name="phone"
                  value={userInfo.phone}
                  onChange={handleInputChange}
                />
              </p>
              <Button onClick={handleSaveChanges}>저장</Button>
              <Button onClick={() => setIsEditing(false)}>취소</Button>
            </div>
          ) : (
            // 일반 모드일 때
            <div>
              <p><strong>아이디:</strong> {userInfo.userId}</p>
              <p><strong>이름:</strong> {userInfo.name}</p>
              <p><strong>이메일:</strong> {userInfo.email}</p>
              <p><strong>전화번호:</strong> {formatPhoneNumber(userInfo.phone)}</p> {/* 포맷팅된 전화번호 표시 */}
              <Button onClick={() => setIsEditing(true)}>수정</Button>
            </div>
          )}

          {/* 회원 탈퇴 버튼을 InfoContainer 내부에 추가 */}
          <Button onClick={handleWithdraw}>회원 탈퇴</Button>
        </InfoContainer>
      )}
    </MyPageContainer>
  );
};

export default MyPage;

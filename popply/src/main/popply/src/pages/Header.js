import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import * as HeaderStyle from './styles/HeaderStyle';

function Header() {
  const navigate = useNavigate();

  // 로그인 상태를 관리하는 state
  const [user, setUser] = useState(null);

  useEffect(() => {
    // localStorage에서 사용자 정보를 가져와 상태에 저장
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(savedUser); // 저장된 사용자 이름으로 상태 설정
    }
  }, []);

  const handleLogout = () => {
    // 로그아웃 시 localStorage에서 사용자 정보 제거
    localStorage.removeItem('user');
    setUser(null); // 상태 업데이트
    alert("로그아웃 되었습니다!");
    navigate('/main'); // 메인 페이지로 이동
  };

  return (
    <HeaderStyle.HeaderArea>
      <HeaderStyle.HeaderNavMenuContainer>
        <HeaderStyle.HeaderLogoImgContainer onClick={() => { navigate('/') }}>
          <HeaderStyle.LogoImg src={`${process.env.PUBLIC_URL}/img/logo.jpg`} alt="Logo"/>
        </HeaderStyle.HeaderLogoImgContainer>
        <ul>
          <HeaderStyle.NavMenuContent onClick={() => { navigate('/popup') }}>Pop-up</HeaderStyle.NavMenuContent>
          <HeaderStyle.NavMenuContent onClick={() => { navigate('/share') }}>Share</HeaderStyle.NavMenuContent>
          <HeaderStyle.NavMenuContent onClick={() => { navigate('/supports') }}>Support</HeaderStyle.NavMenuContent>
          <HeaderStyle.NavMenuContent onClick={() => { navigate('/supports/faq') }}>FAQ</HeaderStyle.NavMenuContent>
          <div className="header">
            {user ? (
              <>
                <span>{user}님 환영합니다!</span>
                <HeaderStyle.NavMenuContent onClick={() => { navigate('/mypage') }}>My Page</HeaderStyle.NavMenuContent>
                <HeaderStyle.NavMenuContent onClick={handleLogout}>LogOut</HeaderStyle.NavMenuContent>
              </>
            ) : (
              <HeaderStyle.NavMenuContent onClick={() => { navigate('/login') }}>Login</HeaderStyle.NavMenuContent>
            )}
          </div>
        </ul>
      </HeaderStyle.HeaderNavMenuContainer>
    </HeaderStyle.HeaderArea>
  );
}

export default Header;

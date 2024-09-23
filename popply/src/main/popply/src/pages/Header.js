import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './styles/HeaderStyle.css'; // CSS 파일 import
import * as HeaderStyle from './styles/HeaderStyle';

function Header({user, setUser}) {
  // 로그인 상태를 관리하는 state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // 검색 처리 로직 추가
    console.log("검색어:", searchTerm);
    setIsModalOpen(false); // 검색 후 모달 닫기
  };

  const handleLogout = () => {
    // 로그아웃 시 localStorage에서 사용자 정보 제거
    sessionStorage.clear();
    setUser(null);
    alert("로그아웃 되었습니다!");
    navigate('/main'); // 메인 페이지로 이동
  };

  return (
    <HeaderStyle.HeaderArea>
      <HeaderStyle.HeaderNavMenuContainer>
        <HeaderStyle.HeaderLogoImgContainer onClick={() => { navigate('/') }}>
          PopSpot
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

        {/* 검색 버튼 추가 */}
        <div className="search-container">
          <button className="search-button" 
          onClick={() => setIsModalOpen(true)}
          ><img src="/img/search-icon.png" alt="Search" className="search-icon" 
          />
          </button>
        </div>
      </HeaderStyle.HeaderNavMenuContainer>

    {isModalOpen && (
      <div className="modal">
          <div className="modal-content">
              <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
              <input 
                  type="text" 
                  className="search-input" 
                  placeholder="검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                  className="search-button" 
                  onClick={handleSearch}
              >
                  search
              </button>
          </div>
      </div>
    )}
    </HeaderStyle.HeaderArea>
  );
}

export default Header;

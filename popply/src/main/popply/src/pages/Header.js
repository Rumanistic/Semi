import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './styles/HeaderStyle.css'; // CSS 파일 import

function Header() {
  
  // 로그인 상태를 관리하는 state
  const savedUser = localStorage.getItem('user1');

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
    localStorage.clear();
    alert("로그아웃 되었습니다!");
    navigate('/main'); // 메인 페이지로 이동
  };

  return (
    <header className="header-all">
      <nav className="header-nav-menu">
        <span className="header-logo" onClick={() => { navigate('/') }}>
          POPSPOT
        </span>
        <ul className="nav-menu-content">
          <li className="nav-menu-content" onClick={() => { navigate('/popup') }}>Pop-up</li>
          <li className="nav-menu-content" onClick={() => { navigate('/share') }}>Share</li>
          <li className="nav-menu-content" onClick={() => { navigate('/supports') }}>Support</li>
          <li className="nav-menu-content" onClick={() => { navigate('/supports/faq') }}>FAQ</li>
        </ul>
          <div className="header">
            {savedUser ? (
              <>
                <span>{user}님 환영합니다!</span>
                <li className="nav-menu-content" onClick={() => { navigate('/mypage') }}>My Page</li>
                <li className="nav-menu-content" onClick={handleLogout}>LogOut</li>
              </>
            ) : (
              <li className="nav-menu-content" onClick={() => { navigate('/login') }}>Login</li>
            )}
          </div>
        

        {/* 검색 버튼 추가 */}
        <div className="search-container">
          <button className="search-button" 
          onClick={() => setIsModalOpen(true)}
          ><img src="/img/search-icon.png" alt="Search" className="search-icon" 
          />
          </button>
        </div>
      </nav>

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
    </header>
  );
}

export default Header;

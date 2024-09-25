import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './styles/HeaderStyle.css'; // CSS 파일 import

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
    <header className="header-all">
      <span className="header-logo" onClick={() => { navigate('/') }}>
        POPSPOT
      </span>
      <nav className="header-nav-menu">
        <ul className="nav-menu-content">
          <li className="nav-menu-content" onClick={() => { navigate('/popup') }}>Pop-up</li>
          <li className="nav-menu-content" onClick={() => { navigate('/share') }}>Share</li>
          <li className="nav-menu-content" onClick={() => { navigate('/supports') }}>Support</li>
          <li className="nav-menu-content" onClick={() => { navigate('/supports/faq') }}>FAQ</li>
          
	        {/* 검색 버튼 추가 */}
	        <li className="search-container">
	          <button className="search-button" 
	          onClick={() => setIsModalOpen(true)}
	          ><img src="/img/search-icon.png" alt="Search" className="search-icon" 
	          />
	          </button>
	        </li>

        </ul>
        {user ? (
					<span className={"header-login"}>
            <span>{user}님 환영합니다!&ensp;&ensp;&ensp;</span>
            <span className="nav-menu-content" onClick={() => { navigate('/mypage') }}>My Page</span>
            <span className="nav-menu-content" onClick={handleLogout}>LogOut</span>
          </span>
        ) : (
          <span className={"header-login"} onClick={() => { navigate('/login') }}>Login</span>
        )}
      </nav>
    </header>
  );
}

export default Header;

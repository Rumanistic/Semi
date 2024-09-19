import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as HeaderStyle from './styles/HeaderStyle'
import './styles/HeaderStyle.css'; // CSS 파일 import

function Header() {

	const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
	const navigate = useNavigate();

	const handleSearch = () => {
        // 검색 처리 로직 추가
        console.log("검색어:", searchTerm);
        setIsModalOpen(false); // 검색 후 모달 닫기
    };


	return (
		<header className="header-all">

			<nav className="header-nav-menu">
				<span className="header-logo" onClick={() => { navigate('/'); }}>
					POPinnn
				</span>

				<ul className="nav-menu-content">
					<li className="nav-menu-content" onClick={() => { navigate('/popup'); }}>pop-up</li>
					<li className="nav-menu-content" onClick={() => { navigate('/share'); }}>share</li>
					<li className="nav-menu-content" onClick={() => { navigate('/supports/faq'); }}>Support</li>
					<li className="nav-menu-content" onClick={() => { navigate('/Login'); }}>로그인</li>
				</ul>
				{/* 검색 버튼 추가 */}
                <div className="search-container">
                    <button 
                        className="search-button" 
                        onClick={() => setIsModalOpen(true)}
                    ><img 
                    src="/img/search-icon.png" 
                    alt="Search" 
                    className="search-icon" 
                />
                    </button>
                </div>
            </nav>

            {/* 모달 검색 창 */}
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
                            검색
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;
import { useNavigate } from "react-router-dom";
import * as HeaderStyle from './styles/HeaderStyle'

function Header() {
	const savedUser = localStorage.getItem('user');
	const navigate = useNavigate();
	const handleLogout = () => {
		// 로그아웃 시 localStorage에서 사용자 정보 제거
		localStorage.clear();
		alert("로그아웃 되었습니다!")
		navigate('/main'); // 메인 페이지로 이동
	  };

  return (
    <HeaderStyle.HeaderArea>
    	<HeaderStyle.HeaderNavMenuContainer>
	    	<HeaderStyle.HeaderLogoImgContainer onClick={() => {navigate('/')}}>
	    		<HeaderStyle.LogoImg src={`${process.env.PUBLIC_URL}/img/logo.jpg`} alt="Logo"/>
	  		</HeaderStyle.HeaderLogoImgContainer>
    		<ul>
    			<HeaderStyle.NavMenuContent onClick={() => { navigate('/popup')}}>Pop-up</HeaderStyle.NavMenuContent>
    			<HeaderStyle.NavMenuContent onClick={() => { navigate('/share')}}>Share</HeaderStyle.NavMenuContent>
    			<HeaderStyle.NavMenuContent onClick={() => { navigate('/supports')}}>Support</HeaderStyle.NavMenuContent>
    			<HeaderStyle.NavMenuContent onClick={() => { navigate('/supports/faq')}}>Support</HeaderStyle.NavMenuContent>
				<div className="header">
        {savedUser!=null ? (
          <>
            <span>{savedUser}님 환영합니다!</span>
            <HeaderStyle.NavMenuContent onClick={() => handleLogout()}>LogOut</HeaderStyle.NavMenuContent>
          </>
        ) : (
			<HeaderStyle.NavMenuContent onClick={() => { navigate('/login')}}>Login</HeaderStyle.NavMenuContent>

        )}
      </div>
    		</ul>
    	</HeaderStyle.HeaderNavMenuContainer>
    </HeaderStyle.HeaderArea>
  );
}


export default Header;
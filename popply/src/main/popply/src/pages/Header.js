import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

function Header() {
	
	const navigate = useNavigate();

  return (
    <HeaderArea>
    	<HeaderNavMenuContainer>
	    	<HeaderLogoImgContainer onClick={() => {navigate('/')}}>
	    		<LogoImg src={`${process.env.PUBLIC_URL}/img/logo.jpg`} alt="Logo"/>
	  		</HeaderLogoImgContainer>
    		<ul>
    			<NavMenuContent onClick={() => { navigate('/details')}}>Detail</NavMenuContent>
    			<NavMenuContent></NavMenuContent>
    			<NavMenuContent></NavMenuContent>
    			<NavMenuContent onClick={() => { navigate('/faqs')}}>FAQ</NavMenuContent>
    			<NavMenuContent onClick={() => { navigate('/support')}}>Support</NavMenuContent>
    		</ul>
    	</HeaderNavMenuContainer>
    </HeaderArea>
  );
}


export default Header;

/* CSS Export Area */
export const HeaderArea = styled.header`
	width: 100%;
	height: 54px;
`;

export const HeaderLogoImgContainer = styled.span`
	float: left;
	margin: 0 10px;
`;

export const LogoImg = styled.img`
	height: 54px;
`;

export const HeaderNavMenuContainer = styled.nav`
`;

export const NavMenuContent = styled.li`
	float: left;
`;
import { useNavigate } from "react-router-dom";
import * as HeaderStyle from './styles/HeaderStyle'

function Header() {
	
	const navigate = useNavigate();

  return (
    <HeaderStyle.HeaderArea>
    	<HeaderStyle.HeaderNavMenuContainer>
	    	<HeaderStyle.HeaderLogoImgContainer onClick={() => {navigate('/')}}>
	    		<HeaderStyle.LogoImg src={`${process.env.PUBLIC_URL}/img/logo.jpg`} alt="Logo"/>
	  		</HeaderStyle.HeaderLogoImgContainer>
    		<ul>
    			<HeaderStyle.NavMenuContent onClick={() => { navigate('/lists/popup')}}>Pop-up</HeaderStyle.NavMenuContent>
    			<HeaderStyle.NavMenuContent onClick={() => { navigate('/lists/share')}}>Share</HeaderStyle.NavMenuContent>
    			<HeaderStyle.NavMenuContent></HeaderStyle.NavMenuContent>
    			{/*<NavMenuContent onClick={() => { navigate('/faqs')}}>FAQ</NavMenuContent>*/}
    			<HeaderStyle.NavMenuContent onClick={() => { navigate('/supports')}}>Support</HeaderStyle.NavMenuContent>
				<HeaderStyle.NavMenuContent onClick={() => { navigate('/event')}}>EventDetail</HeaderStyle.NavMenuContent>
    		
    		</ul>
    	</HeaderStyle.HeaderNavMenuContainer>
    </HeaderStyle.HeaderArea>
  );
}


export default Header;

/* CSS Export Area */
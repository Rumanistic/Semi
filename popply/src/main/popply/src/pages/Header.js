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
    			<HeaderStyle.NavMenuContent onClick={() => { navigate('/popup')}}>Pop-up</HeaderStyle.NavMenuContent>
    			<HeaderStyle.NavMenuContent onClick={() => { navigate('/share')}}>Share</HeaderStyle.NavMenuContent>
    			<HeaderStyle.NavMenuContent onClick={() => { navigate('/supports')}}>Support</HeaderStyle.NavMenuContent>
				<HeaderStyle.NavMenuContent onClick={() => { navigate('/event/1')}}>EventDetail</HeaderStyle.NavMenuContent>
    			<HeaderStyle.NavMenuContent onClick={() => { navigate('/supports/faq')}}>Support</HeaderStyle.NavMenuContent>
    		</ul>
    	</HeaderStyle.HeaderNavMenuContainer>
    </HeaderStyle.HeaderArea>
  );
}


export default Header;
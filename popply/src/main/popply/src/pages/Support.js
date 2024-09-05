import { Route, Routes, useNavigate } from 'react-router-dom';
import Faq from './support/Faq';
import UserSupport from './support/UserSupport';
import * as SupportStyle from './styles/SupportStyle'

function Support() {

	const navigate = useNavigate();
	
  return (
    <SupportStyle.SupportContainer>
    	<SupportStyle.AsideNavContainer>
    		<SupportStyle.AsideNavMenuContainer>
    			<ul>
	    			<SupportStyle.NavMenuContent onClick={() => { navigate('/supports/faq')}}>FAQ</SupportStyle.NavMenuContent>
	    			<SupportStyle.NavMenuContent onClick={() => { navigate('/supports/usersupport')}}>고객지원</SupportStyle.NavMenuContent>
    			</ul>
    		</SupportStyle.AsideNavMenuContainer>
    	</SupportStyle.AsideNavContainer>
    	<SupportStyle.SectionContainer>
  			<Routes>
  				<Route path='faq' element={<Faq />}/>
  				<Route path='usersupport' element={<UserSupport />}/>
  			</Routes>
    	</SupportStyle.SectionContainer>
    </SupportStyle.SupportContainer>
  );
}


export default Support;
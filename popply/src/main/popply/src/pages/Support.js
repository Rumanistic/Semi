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
	    			<SupportStyle.NavMenuContent onClick={() => { navigate('./faq')}}>FAQ</SupportStyle.NavMenuContent>
	    			<SupportStyle.NavMenuContent onClick={() => { navigate('./usersupport')}}>고객지원</SupportStyle.NavMenuContent>
    			</ul>
    		</SupportStyle.AsideNavMenuContainer>
    	</SupportStyle.AsideNavContainer>
    	<SupportStyle.SectionContainer>
    		<article>
    			<Routes>
    				<Route path='/faq' element={<Faq />}/>
    				<Route path='/usersupport' element={<UserSupport />}/>
    			</Routes>
    		</article>
    	</SupportStyle.SectionContainer>
    </SupportStyle.SupportContainer>
  );
}


export default Support;

/* */

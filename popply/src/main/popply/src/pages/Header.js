import { useNavigate } from "react-router-dom";

function Header() {
	
	const navigate = useNavigate();

  return (
    <div>
    	<span onClick={() => {navigate('/')}}><img src={`${process.env.PUBLIC_URL}/img/logo.jpg`} alt="Logo" className="img-logo" /></span>
    	<nav>
    		<ul>
    			<li onClick={() => { navigate('/details')}}>Detail</li>
    			<li></li>
    			<li></li>
    			<li onClick={() => { navigate('/faqs')}}>FAQ</li>
    			<li onClick={() => { navigate('/support')}}>Support</li>
    		</ul>
    	</nav>
    </div>
  );
}


export default Header;

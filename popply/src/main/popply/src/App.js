import './App.css';
import Main from './pages/Main';
import List from './pages/List';
import Support from './pages/Support'
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import DeleteAccount from './pages/DeleteAccount'
import { Route, Routes } from 'react-router-dom';
import EventDetail from './pages/EventDetail';
import Review from './pages/Review';
import UserSupportDetail from './pages/support/UserSupportDetail';
import FindId from './pages/FindId';
import FindPassword from './pages/FindPassword';
import MyPage from './pages/MyPage';
import Withdraw from './pages/Withdraw';
import EventSubmit from './pages/event/EventSubmit';
import EventEdit from './pages/event/EventEdit';
import { useEffect, useState } from 'react';
import PopupList from './pages/list/PopupList';


function App({user, setUser}) {
	
	const [permissions, setPermissions] = useState('');
	const logined = () => {setPermissions(sessionStorage.getItem("permissions"))}
	
	useEffect(() => {
		logined();
	}, [user]);
	
  return (
	
    <div className="App">
  		<Routes>
  			<Route path='/' element={<Main />}/>
				<Route path="/login" element={<Login setUser={setUser}/>} />
				<Route path="/main" element={<Main />} />
				<Route path="/signup" element={<Signup />} />
				<Route path='/popup' element={<PopupList />}/>
				<Route path='/event/:no' element={<EventDetail />} />
				<Route path='/review' element={<Review />}/>
  			<Route path='/supports/*' element={<Support />} />
			  <Route path="/find-id" element={<FindId />} />
			  <Route path="/find-password" element={<FindPassword />} />
	  	</Routes>
	  	
	  	{user && 
		  	<Routes>
					<Route path='/supports/usersupport/detail/:no' element={<UserSupportDetail />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/mypage" element={<MyPage />} />
        	<Route path="/delete-account" element={<DeleteAccount />} />
					<Route path="/withdraw" element={<Withdraw />} />
		  	</Routes>
	  	}
	  	
	  	{
				 user !== null && permissions.includes('planner') && 
				<Routes>
		  		<Route path='/popup/submit' element={<EventSubmit />}/>
					<Route path='/popup/edit' element={<EventEdit />}/>
				</Routes>
			}
	  	
    </div>
  );
}

export default App;

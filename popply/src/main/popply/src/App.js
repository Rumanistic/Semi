import './App.css';
import Main from './pages/Main';
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
	
	const [permissions, setPermissions] = useState(sessionStorage.getItem("permissions"));
	const [tag, setTag] = useState('');
	
	useEffect(() => {
    setPermissions(sessionStorage.getItem("permissions"));
  }, [user]);
  
  const noPermissionRoutes = [
		{ path:'/', element: <Main />},
		{ path:'/login', element: <Login setUser={setUser}/>},
		{ path:'/main', element: <Main setTag={setTag}/>},
		{ path:'/signup', element:<Signup />},
		{ path:'/popup', element: <PopupList />},
		{ path:'/popup/tag?', element: <PopupList tag={tag}/>},
		{ path:'/event/:no', element: <EventDetail />},
		{ path:'/review', element: <Review />},
		{ path:'/supports/*', element: <Support />},
		{ path:'/find-id', element: <FindId />},
		{ path:'/find-password', element: <FindPassword />}
	];
  
  const userPermissionRoutes = [
		{ path:'/supports/usersupport/detail/:no', element: <UserSupportDetail />},
		{ path:'/profile', element: <Profile />},
		{ path:'/mypage', element: <MyPage />},
		{ path:'/delete-account', element: <DeleteAccount />},
		{ path:'/withdraw', element: <Withdraw />}
	];
  
  const plannerPermissionRoutes = [
		{path: '/popup/submit', element: <EventSubmit />},
		{path: '/popup/edit', element: <EventEdit />}
	];
	
  return (
	
    <div className="App">
  		<Routes>
  			{noPermissionRoutes.map((r, i) => (
					<Route key={i} path={r.path} element={r.element}/>
				))}
				{user &&
					userPermissionRoutes.map((r, i) => (
					<Route key={i} path={r.path} element={r.element}/>
				))}
				{user !== null && permissions && permissions.includes('planner') &&
					plannerPermissionRoutes.map((r, i) => (
					<Route key={i} path={r.path} element={r.element}/>
				))}
	  	</Routes>
	  		  	
    </div>
  );
}

export default App;

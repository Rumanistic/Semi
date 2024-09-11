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

function App() {

  return (
    <div className="App">
  		<Routes>
  		    <Route path='/' element={<Main />}/>
			<Route path='/:page' element={<List />}/>
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/delete-account" element={<DeleteAccount />} />
			<Route path='/event/:no' element={<EventDetail />} />
			<Route path='/review' element={<Review />}/>
  			<Route path='/supports/*' element={<Support />} />
	  	</Routes>
    </div>
  );
}

export default App;

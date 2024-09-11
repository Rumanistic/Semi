import './App.css';
import List from './pages/List';
import Support from './pages/Support';
import { Route, Routes } from 'react-router-dom';
import EventDetail from './pages/EventDetail';
import Review from './pages/Review';

function App() {
  return (
    <div className="App">
  		<Routes>
  			<Route path='/' element={<Main />}/>
			<Route path='/:page' element={<List />}/>
			<Route path='/event/:no' element={<EventDetail />} />
			<Route path='/review' element={<Review />}/>
  			<Route path='/supports/*' element={<Support />} />
	  	</Routes>
    </div>
  );
}

export default App;

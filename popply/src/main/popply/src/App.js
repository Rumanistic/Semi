import './App.css';
import List from './pages/List';
//import Faq from './pages/Faq';
import Support from './pages/Support'
import { Route, Routes } from 'react-router-dom';
import EventDetail from './pages/EventDetail';
import PopupList from './pages/list/PopupList';
import ShareList from './pages/list/ShareList';

function App() {

  return (
    <div className="App">
  		<Routes>
  			<Route path='/' />
				<Route path='/lists/popup' element={<PopupList />}/>
				<Route path='/lists/share' element={<ShareList />}/>
				<Route path='/event/:page' element={<EventDetail />}/>
   	  	{/*<Route path='/faqs' element={<Faq />} />*/}
				<Route path='/lists/:page/*' element={<List />}/>
   	  	<Route path='/supports/*' element={<Support />} />
	  	</Routes>
    </div>
  );
}

export default App;

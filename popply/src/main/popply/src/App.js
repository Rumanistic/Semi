import './App.css';
import List from './pages/List';
import Support from './pages/Support'
import { Route, Routes } from 'react-router-dom';
import Detail from './pages/detail/Detail';

function App() {

  return (
    <div className="App">
  		<Routes>
  			<Route path='/' />
				<Route path='/:page' element={<List />}/>
				<Route path='/detail/:no' element={<Detail />} />
   	  	<Route path='/supports/*' element={<Support />} />
	  	</Routes>
    </div>
  );
}

export default App;

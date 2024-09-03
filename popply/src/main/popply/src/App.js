import './App.css';
import Header from './pages/Header';
import Detail from './pages/Detail';
import Faq from './pages/Faq';
import Support from './pages/Support'
import Footer from './pages/Footer';
import { Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <Header />
  		<Routes>
  			<Route path='/' />
				<Route path='/details' element={<Detail />}/>
   	  	<Route path='/faqs' element={<Faq />} />
   	  	<Route path='/supports' element={<Support />} />
	  	</Routes>
   		<Footer />
    </div>
  );
}

export default App;

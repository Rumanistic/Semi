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
        {/* 루트 경로는 이벤트 목록 페이지로 연결 */}
        <Route path='/' element={<List />} />
        
        {/* 페이지별로 목록을 보여주기 위한 라우트 */}
        <Route path='/:page' element={<List />} />
        
        {/* 특정 이벤트 상세 페이지 */}
		<Route path='/event/:eventNo' element={<EventDetail />} />
        
        {/* 리뷰 페이지 */}
        <Route path='/review/:eventNo' element={<Review />} /> 
        
        {/* Support 페이지, 중첩 라우팅도 처리 */}
        <Route path='/supports/*' element={<Support />} />
      </Routes>
    </div>
  );
}

export default App;

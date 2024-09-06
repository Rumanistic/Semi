import * as ListStyle from './styles/ListStyle';
import { Route, Routes, useParams } from 'react-router-dom';
import Popup from './list/PopupList';
import Share from './list/ShareList';
import Detail from './detail/Detail';
import EventDetail from './EventDetail';

function List() {
	const {page} = useParams();
	
	const gettype = () => {
		switch(page) {
			case 'popup':
				return <Popup />;
			case 'share':
				return <Share />;
			case 'detail':
				const {no} = useParams;
				return <Detail />
			default:
				return <span>잘못된 요청입니다.</span>
		}
	}
	
  return (
    <ListStyle.ListContainer>
    	{gettype()}
    	<Routes>
    		<Route path='/detail/:no' element={<EventDetail  />} />
    	</Routes>
  	</ListStyle.ListContainer>
  );
}


export default List;
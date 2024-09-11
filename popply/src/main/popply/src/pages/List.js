import * as ListStyle from './styles/ListStyle';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Popup from './list/PopupList';
import Share from './list/ShareList';

function List() {
	const {page} = useParams();
	const navigate = useNavigate();
	
	const gettype = () => {
		switch(page) {
			case 'popup':
				return <Popup />;
			case 'share':
				return <Share />;
			default:
				return <span>잘못된 요청입니다.</span>
		}
	}
	
  return (
    <ListStyle.ListContainer>
    	{gettype()}
  	</ListStyle.ListContainer>
  );
}

export default List;
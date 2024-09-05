import * as ListStyle from './styles/ListStyle';
import { useParams } from 'react-router-dom';
import Popup from './list/PopupList';
import Share from './list/ShareList';
import Detail from './detail/Detail';

function List() {
	
	const {page} = useParams();
	
	const getPage = () => {
		switch(page) {
			case 'popup':
				return <Popup />;
			case 'share':
				return <Share />;
			default:
				return <Detail />
		}
	}
	
  return (
    <ListStyle.ListContainer>
    	{getPage()}
  	</ListStyle.ListContainer>
  );
}


export default List;
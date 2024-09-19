import * as ListStyle from './styles/ListStyle';
import { useParams } from 'react-router-dom';
import Popup from './list/PopupList';

function List() {
	const {page} = useParams();
	
  return (
    <ListStyle.ListContainer>
    	{page ? <Popup /> : null}
  	</ListStyle.ListContainer>
  );
}

export default List;
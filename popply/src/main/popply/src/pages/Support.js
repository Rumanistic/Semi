import axios from 'axios';
import { useEffect, useState } from 'react';

function Support() {
	const [faqList, setFaqList] = useState([]);
	useEffect(() => {
		const result = axios.get(`/faqs/test`);
		setFaqList(result.data);
		console.log(result.data);
	}, [])

  return (
    <div>
    	<h1 align='center'>F A Q</h1>
    	<p>{faqList}</p>
    </div>
  );
}


export default Support;
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StarPoint from "../component/StarPoint";

function PopupList() {
	const [list, setList] = useState({eList:[], rPoint: {}});
	const {page} = useParams();
	
	useEffect(() => {
		console.log(page)
		axios.get(`/event/${page}`)
				 .then(result => {
					 setList(result.data);
				 });
	}, [])

	console.log(list);

  return (
		<span>
			<h1>Pop-up List</h1>
	    <section>
	    	{ShowList(list)}
	    </section>
		</span>
  );
}

function ShowList(list){
	
	const {eList, rPoint} = list;
	
	const navigate = useNavigate();
	
	return (
		<span>
			{eList.map((e, i) => {
				return(
					<div onClick={() => {navigate(`/detail/${e.eventNo}`)}} key={e.eventNo}>
						<span>{e.eventNo}</span>&emsp;
						<span>{e.title}</span>&emsp;
						<span>{rPoint[e.eventNo] ? 
						  StarPoint(rPoint[e.eventNo]) 
						  : StarPoint(0.0)}</span>
					</div>
				)
			})}
		</span>
	)
}

export default PopupList;
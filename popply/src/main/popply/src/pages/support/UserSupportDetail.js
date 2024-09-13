import { useEffect, useState } from "react";
import { ContentContainer, ContentDetailBody, ContentHorizontalBar } from "../styles/UserSupportStyle";
import { useParams } from "react-router-dom";
import axios from "axios";


function UserSupportDetail() {
	const [width, setWidth] = useState(window.innerWidth);
	const [supportData, setSupportData] = useState({
		userId: '',
		title: '',
		inquiry: '',
		type: 0,
		answer: '',
		adminId: '',
		answeredDate: ''
	})
	const {no} = useParams();
	
	
	console.log('reached here successfully!')
	
	useEffect(() => {
		const getNowWidth = () => {
			setWidth(window.innerWidth)
		};
		
		window.addEventListener('resize', getNowWidth);
		
		return () => {
			window.removeEventListener('resize', getNowWidth);
		}
	})
	
	useEffect(() => {
		axios.get(`/supports/usersupport/${no}`).then(result => {
			const support = result.data.support;
			setSupportData({
				...supportData,
				...support
			})
		})
	}, [no])
	
	
	return (
		<ContentContainer width={width}>
			<ContentHorizontalBar />
				<ContentDetailBody>
					<span><label>제목</label> <span>{supportData.title}</span></span>
					<span><label>제목</label> <span>{supportData.type}</span></span>
					<span><p dangerouslySetInnerHTML={{__html: supportData.inquiry}}></p></span>
					<p>{supportData.createdDate}</p>
				</ContentDetailBody>
				{supportData.answer !== '' ? <AnswerData /> : <span />}
			<ContentHorizontalBar />
		</ContentContainer>
	)
}

function AnswerData() {
	
}

export default UserSupportDetail;
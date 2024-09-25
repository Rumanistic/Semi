import { useEffect, useState } from "react";
import { ContentContainer, ContentDetailBody, ContentHorizontalBar, label } from "../styles/UserSupportStyle";
import { useParams } from "react-router-dom";
import axios from "axios";
import { RightFloatSpan } from "../styles/FaqStyle";

const userPermissions = ["user", "admin"];
const userData = {userId: 'admin2', permissions: userPermissions}
const isAdmin = userData.permissions.includes("admin");
const userId = userData.userId;

function UserSupportDetail() {
	const [width, setWidth] = useState(window.innerWidth);
	const [supportData, setSupportData] = useState({
		supportNo: 0,
		userId: '',
		title: '',
		inquiry: '',
		type: 0,
		inquiryCreatedDate: '',
		answer: '',
		adminId: '',
		answeredDate: ''
	})
	const {no} = useParams();
	const [state, setState] = useState(false);
	
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
			const answer = result.data.answer;
			
			setSupportData({
				...supportData,
				supportNo: support.supportNo,
				userId: support.userId,
				inquiryCreatedDate: support.createdDate,
				inquiry: support.inquiry,
				title: support.title,
				type: support.type,
				...(answer && answer !== '' ? {
					answer: answer.answer,
			    adminId: answer.userId,
			    answeredDate: answer.createdDate
				} : {})
			})
		})
	}, [no])
	
	const stateChange = () => {
		setState(!state);
	}
	
	
	return (
		<ContentContainer width={width}>
			<ContentHorizontalBar borderpixel={3}/>
				<ContentDetailBody>
				{console.log(supportData)}
					<p><label>제목 : </label><span>{supportData.title}</span></p>
					<ContentHorizontalBar width={'80%'}/>
					<p><label>분류 : </label> <span>{supportData.type}</span></p>
					<ContentHorizontalBar width={'80%'}/>
					<span><p dangerouslySetInnerHTML={{__html: supportData.inquiry}}></p></span>
				</ContentDetailBody>
				{supportData.answer !== '' ? <AnswerData /> : <span />}
				
				{
					isAdmin &&
					(<RightFloatSpan>
						{!state ? <button onClick={stateChange}>문의사항 답변 등록</button> : <span />}
					</RightFloatSpan>)
				}
				<RegisterAnswer state={state} title={supportData.title} answer={supportData.answer} stateChange={stateChange} />
			<ContentHorizontalBar borderpixel={3}/>
		</ContentContainer>
	)
}

function RegisterAnswer({state, title, answer, stateChange}) {
	const [newAnswer, setNewAnswer] = useState(answer);
	
	const dataChange = (e) => {
		const data = e.target.innerHTML;
		console.log(data);
		setNewAnswer(data);
	}
	
	const answerSubmit = () => {
		console.log("등록이벤트");
		console.log("등록한 답변:", newAnswer);
		axios.post('/supports/usersupport/answer/test', {
	    answer: newAnswer,
	    title: title
		}, {
	    headers: {
	        'Content-Type': 'application/json; charset=UTF-8'  // UTF-8 설정
	    }
		})
		stateChange();
	}
	
	return (
			state ? 
			(<span> 
				<p contentEditable={true} onInput={dataChange}>type here</p>
				<button onClick={() => answerSubmit()}>문의사항 답변 등록!</button>
			</span>) : (<span />)
	);
}

function AnswerData() {
	
}

export default UserSupportDetail;
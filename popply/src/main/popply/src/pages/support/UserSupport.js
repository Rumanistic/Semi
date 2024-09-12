import { useEffect, useState } from "react";
import { ContentContainer, ContentHorizontalBar, ContentHorizontalSpan, ContentVerticalSpan } from "../styles/UserSupportStyle";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


function UserSupport() {
	const [width, setWidth] = useState(window.innerWidth);
	const userId = 'user01';
	
	useEffect(() => {
		const getNowWidth = () => {
			setWidth(window.innerWidth)
		};
		
		window.addEventListener('resize', getNowWidth);
		
		return () => {
			window.removeEventListener('resize', getNowWidth);
		}
	})
	
	
	
	return (
		<ContentContainer width={width}>
			<ContentVerticalSpan style={{alignItems: 'center'}}>
				<ContentHorizontalBar borderpixel={3} />				
					<UserSupportList userId={userId}/>
				<ContentHorizontalBar borderpixel={3} />
			</ContentVerticalSpan>
		</ContentContainer>
	)
}

function UserSupportList({userId}) {
	const [sList, setSList] = useState([]);
	
	useEffect(() => {
		axios
			.get('/supports/usersupport')
			.then(result => setSList(result.data));		
	}, []);
	
	const navigate = useNavigate(); 
	
	return (
		<ContentVerticalSpan style={{alignItems: 'center'}}>
			<h2>고객 지원 리스트</h2>
			<ContentHorizontalBar width={'90%'} />
			{sList.map((e, i) => {
				if(e.secret !== 1){
					return (
						<ContentHorizontalSpan>
							<span>{i+1}</span>
							<span>{getType(e.type)}</span>
							<span>{e.userId}</span>
							<span>{e.title}</span>
						</ContentHorizontalSpan>
					);
				}
				
				if(e.userId !== userId){
					return (
						<ContentHorizontalSpan>
							<span>{i+1}</span>
							<span>{getType(e.type)}</span>
							<span>{e.userId}</span>
							<span> 🔒 </span>
							<span>비공개 문의사항입니다.</span>
						</ContentHorizontalSpan>
					)
				}
				
				return(
					<ContentHorizontalSpan>
						<span>{i+1}</span>
						<span>{getType(e.type)}</span>
						<span>{e.userId}</span>
						<span> 🔓 </span>
						<span>{e.title}</span>
					</ContentHorizontalSpan>
				);
			})}
		</ContentVerticalSpan>
	)
}

function getType(type){
	switch(type){
		case 1:
			return '로그인';
		case 2:
			return '회원가입';
		case 9:
			return '기타'
	}
}


export default UserSupport;
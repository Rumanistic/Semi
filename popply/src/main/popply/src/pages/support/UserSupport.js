import { useEffect, useState } from "react";
import { ContentContainer, ContentHorizontalBar, ContentHorizontalSpan, ContentVerticalSpan } from "../styles/UserSupportStyle";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { RightFloatSpan } from "../styles/FaqStyle";


function UserSupport() {
	const [width, setWidth] = useState(window.innerWidth);
	const userId = 'user02';
	
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
			<h2>고객 문의</h2>
			<RightFloatSpan style={{
				position: 'absolute',
		    right: '16%',
		    top: '15%',
		    float: 'right'
			}}>
				<input 
					type="button" 
					value={"문의사항 등록"}
					onClick={() => navigate('/supports/usersupport/register')}
				/>
			</RightFloatSpan>
			<ContentHorizontalBar width={'90%'} />
			{sList.map((e, i) => {
				if(e.secret !== 1){
					return (
						<ContentHorizontalSpan redirect={'y'} onClick={() => navigate(`/supports/usersupport/detail/${e.supportNo}`)}>
							<span className="no">{i+1}</span>
							<span className="type">{getType(e.type)}</span>
							<span className="secret"/>
							<span className="userId">{e.userId}</span>
							<span className="title">{e.title}</span>
						</ContentHorizontalSpan>
					);
				}
				
				if(e.userId !== userId){
					return (
						<ContentHorizontalSpan redirect={'n'}>
							<span className="no">{i+1}</span>
							<span className="type">{getType(e.type)}</span>
							<span className="secret"> 🔒 </span>
							<span className="userId">{e.userId}</span>
							<span className="title">비공개 문의사항입니다.</span>
						</ContentHorizontalSpan>
					)
				}
				
				return(
					<ContentHorizontalSpan redirect={'y'} onClick={() => navigate(`/supports/usersupport/detail/${e.supportNo}`)}>
						<span className="no">{i+1}</span>
						<span className="type">{getType(e.type)}</span>
						<span className="secret"> 🔓 </span>
						<span className="userId">{e.userId}</span>
						<span className="title">{e.title}</span>
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
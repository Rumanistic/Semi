import { useEffect, useRef, useState } from "react";
import { useNavigate} from 'react-router-dom';
import { ContentContainer, ContentHorizontalBar, ContentHorizontalSpan, ContentVerticalSpan } from "../styles/UserSupportStyle";
import Wysiwyg from "../component/WYSIWYG";
import { RightFloatSpan } from "../styles/FaqStyle";
import axios from 'axios';
import { 
  TitleInput,
  SelectType,
  Label,
  CheckboxLabel,
  SecretCheckbox,
  SubmitResetButtons
} from "../styles/UserSupportStyle";

function UserSupportRegister() {
	const [width, setWidth] = useState(window.innerWidth);
	const navigate = useNavigate();
	
	// WYSIWYG 에디터 사용 시 HTML태그가 붙은 DOM 데이터 형식을 추가하는 상태라
	// 에디터 DOM에 접근하기 위한 ref 생성
	const editorRef = useRef(null);
	
	// 글 작성 시 빠진 항목 포커스를 위한 input ref 생성
	const titleRef =useRef(null);
	
	const [inquiryData, setInquiryData] = useState({
		userId: sessionStorage.getItem('userId'),
		title: '',
		type: 1,
		inquiry: '',
		secret: 0
	})
	
	useEffect(() => {
		const getNowWidth = () => {
			setWidth(window.innerWidth)
		};
		
		window.addEventListener('resize', getNowWidth);
		
		return () => {
			window.removeEventListener('resize', getNowWidth);
		}
	})
	
	const dataChange = (e) => {
		console.log(inquiryData);
		if(e.target.value === 'on'){
			if(inquiryData.secret === 1){
				setInquiryData({
					...inquiryData,
					secret: 0
				})
				return;
			}
			
			setInquiryData({
					...inquiryData,
					secret: 1
			})
		}
			
		if(e.target.name !== 'secret'){
			setInquiryData({
				...inquiryData,
				[e.target.name]: e.target.value
			})
		}
	}

	const submitData = () => {
		// 전송하기 전 wysiwyg 에디터 텍스트를 가져옴
		const editorData = editorRef.current.getData();
		
		// 전송할 데이터를 업데이트하면서 새 변수에 담음
		setInquiryData(
			(inquiryData) => {
				// 전송할 변수 submitData 생성
				const submitData = {
				...inquiryData,
				inquiry: editorData
			};
		
			// axios를 실행할 doSubmit(전송할 데이터)
			console.log(submitData);
			doSubmit(submitData);
		})
	}
	
	 const handleCancel = () => { navigate('/supports/usersupport'); };
		
	function doSubmit(submitData) {
		
		axios
			.post('/supports/usersupport/register', submitData, {
				headers: {
					"Content-Type": "application/json"
				}
			})
			.then(result => {
				console.log(result);
				navigate('/supports/usersupport');
			});
	}
	
	return (
	    <ContentContainer width={width}>
	      <ContentHorizontalBar borderpixel={3} />
	         <h2>1:1 문의사항 등록</h2>
	      <ContentHorizontalBar width={'85%'} borderpixel={1} />
	      <ContentHorizontalSpan>
	       	 <Label>문의사항</Label>
	       	 <TitleInput ref={titleRef} name="title" placeholder="문의하실 내용을 간략하게 정리해주세요." onChange={dataChange} />
	      </ContentHorizontalSpan>
	      <ContentHorizontalBar width={'85%'} borderpixel={1} />
	      <ContentHorizontalSpan>
	         <Label>종류</Label>
	        <SelectType name="type" onChange={dataChange}>
	          <option value={1}>&ensp;로그인</option>
	          <option value={2}>&ensp;회원가입</option>
	          <option value={9}>&ensp;기타</option>
	        </SelectType>
	      </ContentHorizontalSpan>
	      <ContentHorizontalBar width={'85%'} borderpixel={1} />
	      <ContentHorizontalSpan>
	         <Label width="40%">상세 내용 문의</Label>
	      <ContentVerticalSpan>
	         <Wysiwyg editorRef={editorRef}/>
	      <ContentHorizontalSpan>
	         <RightFloatSpan>
	          <CheckboxLabel>비밀글 등록</CheckboxLabel>
	          <SecretCheckbox name="secret" type="checkbox" onChange={dataChange} />
	          </RightFloatSpan>
	      </ContentHorizontalSpan>
	      </ContentVerticalSpan>
	      </ContentHorizontalSpan>
	      <ContentHorizontalBar width={'85%'} borderpixel={1} />
	      	<SubmitResetButtons>
	          <input type="reset" value="취소" onClick={handleCancel} />
	          <input type="submit" value="등록" onClick={submitData} />
	 		</SubmitResetButtons>
	      <ContentHorizontalBar borderpixel={3} />
	    </ContentContainer>
	  );
	}


export default UserSupportRegister;
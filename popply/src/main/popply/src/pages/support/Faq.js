import axios from 'axios';
import { useEffect, useState } from 'react';
import * as FaqStyle from '../styles/FaqStyle'; // styled-components 파일 import
import { useNavigate } from 'react-router-dom';
import { ContentHorizontalBar } from "../styles/UserSupportStyle"; // 다른 스타일 import

const userPermissions = ["user", "admin"];
const userData = {userId: 'admin2', permissions: userPermissions}
const isAdmin = userData.permissions.includes("admin");
const userId = userData.userId;

function Faq() {
	const [faqList, setFaqList] = useState([
		{ question: "원하는 주제의 팝업스토어들만 모아서 보고싶어요. 어떻게 해야 하나요?", answer: "'메인 - Pop-up - 원하시는 주제의 태그' 를 선택하셔서 회원님이 원하시는 주제의 팝업만 모아서 보실 수 있습니다!" },
		{ question: "팝업스토어를 열려고 하는데 홈페이지에 등록 가능한가요?", answer: "'메인 - Support - 고객문의' 에서 입점문의가 가능합니다!" },
		{ question: "팝업스토어를 친구와 공유하는 방법이 있나요?", answer: "네, 공유하시고자 하시는 팝업스토어 안내글 하단에 공유하기 버튼을 통해 sns로 정보를 공유하실 수 있습니다!" }
	]);

	const [isOpen, setIsOpen] = useState(false);
	const [modalType, setModalType] = useState('');
	const [faq, setFaq] = useState({});
	const [headType, setHeadType] = useState('');

	const navigate = useNavigate();

	const openModalHandler = () => {
		setIsOpen(!isOpen);
	}

	const modalTypeHandler = (type) => {
		setModalType(type);
	}

	const faqHandler = (faq) => {
		setFaq(faq);
	}

	const headTypeHandler = (headType) => {
		setHeadType(headType)
	}

	useEffect(() => {
		axios.get(`/faqs`).then(result => {
		console.log(result.data);
			// setFaqList(result.data);
		});
	}, []);

  return (
    <div>
    	<h1 align='center' style={{fontSize: "35px", fontWeight: "bold"}}>   F A Q  
    	<ContentHorizontalBar width={'100%'} borderpixel={2} /> 
			{
				isAdmin &&
				(<FaqStyle.RightFloatSpan>	
					<button onClick={() => {
						openModalHandler(); 
						modalTypeHandler('new'); 
						faqHandler({});
						headTypeHandler('추가');
					}}>FAQ 추가</button>
				</FaqStyle.RightFloatSpan>)
			}
    	</h1>
    	<section>
    		<article>
					<ShowFaq faqList={faqList}/>
    		</article>
    		<article>
    			<FaqStyle.FaqH3>찾으시는 내용이 없나요 ❓</FaqStyle.FaqH3>
    		</article>
    		<FaqStyle.RightFloatSpan>
					<button style={{backgroundColor:'lightpink',
									fontSize:'15px', 
									borderRadius: '10px', 
									padding: '5px', 
									borderColor: 'transparent',
									marginRight: '30px'
									}} onClick={() => {navigate('/supports/usersupport')}}>고객지원 문의하기</button>
				</FaqStyle.RightFloatSpan>
    	</section>
			{
				isOpen && (<Modal isOpen={isOpen} modalType={modalType} faq={faq} onClose={openModalHandler} headType={headType}/>)
			}

    </div>
  );

	// ShowFaq 컴포넌트
	function ShowFaq({ faqList }) {
		  return ( 
		    <span>
		      {faqList.map((faq, i) => (
		        <FaqStyle.FaqBox key={i}>  {/* 각 FAQ를 박스로 감싸서 경계 주기 */}
		          <FaqStyle.FaqDetails>
		            <summary style={{ fontSize: "20px" }}>{faq.question}</summary>
		            <p>
		              {faq.answer} &emsp; 
		              {
		                isAdmin && 
		                (<FaqStyle.RightFloatSpan>
		                  <button onClick={() => {
		                    openModalHandler(); 
		                    modalTypeHandler('edit'); 
		                    faqHandler(faq);
		                    headTypeHandler('수정');
		                  }}>수정</button>&emsp;
		                  <button onClick={() => (DeleteFaq(faq.faqNo))}>삭제</button>
		                </FaqStyle.RightFloatSpan>)
		              }
		            </p>
		          </FaqStyle.FaqDetails>
		        </FaqStyle.FaqBox>
		      ))}
		    </span>
		  );
		}
	
	
	
	/**
	 * newFaq 
	 */
	function NewFaq({question, answer, onQuestionChange, onAnswerChange}) {
		return (
			<FaqStyle.ModalFormContentArea>
				<FaqStyle.FormLabel>질문: <FaqStyle.FormInput 
													name="question" 
													type="text" 
													placeholder='질문을 입력해주세요.'
													value={question}
													onChange={(e) => {onQuestionChange(e.target.value)}} 
												/></FaqStyle.FormLabel><br /><br />
        <FaqStyle.FormLabel>답변: <FaqStyle.FormTextArea 
        									name="answer" 
        									placeholder='답변을 입력해주세요.'
        									value={answer}
        									onChange={(e) => {onAnswerChange(e.target.value)}}
      									></FaqStyle.FormTextArea></FaqStyle.FormLabel>
      </FaqStyle.ModalFormContentArea>
		);
	}
	
	function EditFaq({faq, onQuestionChange, onAnswerChange}) {
		return (
			<FaqStyle.ModalFormContentArea>
				<FaqStyle.FormLabel>질문: <FaqStyle.FormInput 
													name="question" 
													type="text" 
													defaultValue={faq.question}
													onChange = {(e) => {onQuestionChange(e.target.value)}} 
												/></FaqStyle.FormLabel><br /><br />
        <FaqStyle.FormLabel>답변: <FaqStyle.FormTextArea 
        									name="answer" 
        									defaultValue={faq.answer}
        									onChange = {(e) => {onAnswerChange(e.target.value)}}
      									></FaqStyle.FormTextArea></FaqStyle.FormLabel>
      </FaqStyle.ModalFormContentArea>
		);
	}
	
	function DeleteFaq(faqNo) {
		console.log(faqNo);
		if(window.confirm('등록된 FQA 항목을 삭제하시겠습니까?')) {
			axios.delete(`/faqs/${faqNo}`)
					 .then(() => {
						 	alert('삭제되었습니다.');
						 	window.location.reload();
						 });
		}
		//todo 지웠을 때 생성 시 렌더링 안되는 상황 발생
	}
	
	function Modal({modalType, faq, onClose, headType}) {
		
		const [question, setQuestion] = useState(faq.question || '');
		const [answer, setAnswer] = useState(faq.answer || '');
		
		const doSubmit = (e) => {
			e.preventDefault();
			const formData = {
				question,
				answer,
				userId
			};
			
		if(modalType === 'new') {
			axios.post('/faqs/new', formData)
					 .then(
						 axios.get(`/faqs`)
						 			.then(
										result => {
										 	setFaqList(result.data);
										}
									)
					 )
		} else if(modalType === 'edit'){
			axios.put(`/faqs/${faq.faqNo}`, formData)
					 .then(
						 axios.get(`/faqs`)
						 			.then(
										result => {
										 	setFaqList(result.data);
										}
									)
					 )
		}
			
			onClose();
		}
		
		return (
			<FaqStyle.ModalBackgroundArea onClick={onClose}>
        <FaqStyle.ModalContentArea onClick={e => e.stopPropagation()}>
        	<FaqStyle.ModalHeadArea>
        		<FaqStyle.ModalHeadH2>FAQ {headType}</FaqStyle.ModalHeadH2>
	          <FaqStyle.ModalCloseButton onClick={onClose}>✖️</FaqStyle.ModalCloseButton>
        	</FaqStyle.ModalHeadArea>
					<form name="faqForm" onSubmit={doSubmit}>
	          {
	            modalType === 'new' && 
	            <NewFaq
	            	question={question}
	            	answer={answer}
	            	onQuestionChange={setQuestion}
	            	onAnswerChange={setAnswer} 
	            />
	          }
	          {
	            modalType === 'edit' && 
	            <EditFaq 
	            	faq={faq}
	            	onQuestionChange={setQuestion}
	            	onAnswerChange={setAnswer} 
            	/>
	          }
	          <br/>
	          <FaqStyle.FormButtonArea>
	          	<FaqStyle.FormSubmitButton type='submit'>등록</FaqStyle.FormSubmitButton>
	          	<FaqStyle.FormResetButton type='reset' onClick={onClose}>취소</FaqStyle.FormResetButton>
	          </FaqStyle.FormButtonArea>
					</form>
        </FaqStyle.ModalContentArea>
			{/* 버튼 만들고 axios으로 API 통신해서 나머지 만들기 */}
      </FaqStyle.ModalBackgroundArea>
		)
	}
}

export default Faq;
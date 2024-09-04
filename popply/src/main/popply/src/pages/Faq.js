import axios from 'axios';
import { useEffect, useState } from 'react';
import { styled } from 'styled-components'

const userPermissions = ["admin", "user"];
const userData = {userId: 'admin2', permissions: userPermissions}
const isAdmin = userData.permissions.includes("admin");
const userId = userData.userId;

function Faq() {
	const [faqList, setFaqList] = useState([])
	const [isOpen, setIsOpen] = useState(false);
	const [modalType, setModalType] = useState('');
	const [faq, setFaq] = useState({});
	const [headType, setHeadType] = useState('');
	
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
			setFaqList(result.data);
		});
	}, [])

  return (
    <div>
    	<h1 align='center'>F A Q ✔️ ✖️</h1>
    	<section>
				<ShowFaq faqList={faqList}/>
    	</section>
			{
				isAdmin &&
				(<div>
					<button onClick={() => {
						openModalHandler(); 
						modalTypeHandler('new'); 
						faqHandler({})
						headTypeHandler('추가')}
						}>FAQ 추가</button>
				</div>)
			}
			{
				isOpen && (<Modal isOpen={isOpen} modalType={modalType} faq={faq} onClose={openModalHandler} headType={headType}/>)
			}
    </div>
  );

	/**
	 * ShowFaq는 모든 faq 리스트를 보여줍니다.
	 * 관리자의 경우, 수정과 삭제 버튼이 보여지게 됩니다.
	 */
	function ShowFaq({ faqList }) {
		return ( 
			<span>
			{faqList.map((faq, i) => (
					<details className="details-accordion" key={i}>
						<summary>{faq.question}</summary>
						<p>
							{faq.answer} &emsp; 
							{
								isAdmin && 
								(<span><button onClick={() => {
									openModalHandler(); 
									modalTypeHandler('edit'); 
									faqHandler(faq)
									headTypeHandler('수정')}
									}>수정</button>&emsp;
								<button onClick={() => (DeleteFaq(faq.faqNo))}>삭제</button></span>)
							}
						</p>
					</details>
			))}
			</span>
		)
	}
	
	/**
	 * newFaq 
	 */
	function NewFaq({question, answer, onQuestionChange, onAnswerChange}) {
		return (
			<ModalFormContentArea>
				<FormLabel>질문: <FormInput 
													name="question" 
													type="text" 
													placeholder='질문을 입력해주세요.'
													value={question}
													onChange={(e) => {onQuestionChange(e.target.value)}} 
												/></FormLabel><br /><br />
        <FormLabel>답변: <FormTextArea 
        									name="answer" 
        									placeholder='답변을 입력해주세요.'
        									value={answer}
        									onChange={(e) => {onAnswerChange(e.target.value)}}
      									></FormTextArea></FormLabel>
      </ModalFormContentArea>
		);
	}
	
	function EditFaq({faq, onQuestionChange, onAnswerChange}) {
		return (
			<ModalFormContentArea>
				<FormLabel>질문: <FormInput 
													name="question" 
													type="text" 
													defaultValue={faq.question}
													onChange = {(e) => {onQuestionChange(e.target.value)}} 
												/></FormLabel><br /><br />
        <FormLabel>답변: <FormTextArea 
        									name="answer" 
        									defaultValue={faq.answer}
        									onChange = {(e) => {onAnswerChange(e.target.value)}}
      									></FormTextArea></FormLabel>
      </ModalFormContentArea>
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
			<ModalBackgroundArea onClick={onClose}>
        <ModalContentArea onClick={e => e.stopPropagation()}>
        	<ModalHeadArea>
        		<ModalHeadH2>FAQ {headType}</ModalHeadH2>
	          <ModalCloseButton onClick={onClose}>✖️</ModalCloseButton>
        	</ModalHeadArea>
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
	          <FormButtonArea>
	          	<FormSubmitButton type='submit'>등록</FormSubmitButton>
	          	<FormResetButton type='reset' onClick={onClose}>취소</FormResetButton>
	          </FormButtonArea>
					</form>
        </ModalContentArea>
			{/* 버튼 만들고 axios으로 API 통신해서 나머지 만들기 */}
      </ModalBackgroundArea>
		)
	}
}

export default Faq;

/* CSS Export Area: styled-components 설치해서 사용 */
/* 모달 배경 */
export const ModalBackgroundArea = styled.div`
	position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10; /* 모달을 최상위로 올리기 */
`;

/* 모달 컨텐츠 박스 */
export const ModalContentArea = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  width: 100%;
  height: 30%;
  z-index: 11;
  position: relative;
`;

/* 모달 헤드 div */
export const ModalHeadArea = styled.div`
	margin-bottom: 20px;
`;

/* 닫기 버튼 */
export const ModalCloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`;

/* 모달 제목 */
export const ModalHeadH2 = styled.h2`
	display: inline;
	top: 10px;
`;

/* 모달 컨텐츠 */
export const ModalFormContentArea = styled.article`
	width: 100%;
`;

/* 폼 내부 label */
export const FormLabel = styled.label`
	display: flex;
	font-size: 20px;
	align-items: center;
`;

/* 폼 내부 input */
export const FormInput = styled.input`
	width: 80%;
	height: 20px;
	margin-left: 10px;
`;

/* 폼 내부 textarea */
export const FormTextArea = styled.textarea`
	width: 80%;
	height: 7em;
	resize: none;
	margin-left: 10px;
`;

/* 폼 내부 submit&reset 버튼 영역 */
export const FormButtonArea = styled.span`
	float: right;
	margin-right: 10%;
`;

/* 폼 submit 버튼 */
export const FormSubmitButton = styled.button`
	border-radius: 4px;
	border: none;
	width: 80px;
	height: 30px;
	background-color: rgba(0, 255, 0, 0.3);
	margin-right: 20px;
	font-size: 20px;
	cursor: pointer;
	
	&:hover {
		background-color: rgba(0, 255, 0, 0.7);
	}
`;

/* 폼 reset 버튼 */
export const FormResetButton = styled.button`
	border-radius: 4px;
	border: none;
	width: 80px;
	height: 30px;
	background-color: rgba(255, 0, 0, 0.3);
	font-size: 20px;
	cursor: pointer;
	
	&:hover {
		background-color: rgba(255, 0, 0, 0.7);
	}
`;
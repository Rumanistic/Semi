import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import './Faq.css';

const userPermissions = ["admin", "user"];
const userData = {userId: 'admin', permissions: userPermissions}
const isAdmin = userData.permissions.includes("admin");

function Faq() {
	const [faqList, setFaqList] = useState([])
	const [isOpen, setIsOpen] = useState(false);
	const [modalType, setModalType] = useState('');
	const [faq, setFaq] = useState({});
	
	const openModalHandler = () => {
		setIsOpen(!isOpen);
	}
	
	const modalTypeHandler = (type) => {
		setModalType(type);
	}
	
	const faqHandler = (faq) => {
		setFaq(faq);
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
					<button onClick={() => {openModalHandler(); modalTypeHandler('new'); faqHandler({})}}>FAQ 추가</button>
				</div>)
			}
			{
				isOpen && (<Modal isOpen={isOpen} modalType={modalType} faq={faq} onClose={openModalHandler}/>)
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
								(<span><button onClick={() => {openModalHandler(); modalTypeHandler('edit'); faqHandler(faq)}}>수정</button>&emsp;
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
	function NewFaq() {
		return (
			<form>
				<h2> FAQ 추가 </h2>
				<div>
					<label>질문</label><input name="question" id="question" type="text" placeholder="질문을 입력하세요" /><br />
				</div> 
				<div>
          <label>답변</label><textarea name="question" id="question" placeholder="답변을 입력하세요"></textarea><br />
        </div>
			</form>
		);
	}
	
	function EditFaq({faq}) {
		return (
			<form>
				<h2> FAQ 수정 </h2>
				<div>
					<label>질문</label><input name="question" id="question" type="text" defaultValue={faq.question} /><br />
				</div> 
				<div>
          <label>답변</label><textarea name="question" id="question" defaultValue={faq.answer}></textarea><br />
        </div>
			</form>
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
	
	function Modal({modalType, faq, onClose}) {
		return (
			<div className="modal-background" onClick={onClose}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>X</button>
          {
            modalType === 'new' && <NewFaq />
          }
          {
            modalType === 'edit' && <EditFaq faq={faq} />
          }
        </div>
			{/* 버튼 만들고 axios으로 API 통신해서 나머지 만들기 */}
      </div>
		)
	}
}
export default Faq;

import axios from "axios";
import { useEffect, useState } from "react";

function Event(){

	let [events, setEvents] = useState([]);
		useEffect(()=>{
			axios.get(`/api/events`) 
			.then(result => {
				console.log(result.data);
				setEvents(result.data);
			})
			.catch(() =>{
				console.log('실패');
				alert('더이상 상품이 없습니다');
			})
		},[])
		
		

    return (
        <>
		{
			events.map((t)=>{
				return(
					<>
					 <h1>상세 페이지</h1>
			<img src={`${process.env.PUBLIC_URL}/img/img1.jpg`} className="img-style" />
			<img src={`${process.env.PUBLIC_URL}/img/img2.jpg`} className="img-style" />

			<div className='summary'>

				<h1 className="tit">t.title</h1>
				<p className='date'>24.08.16 - 24.09.29</p>
				<p className='laoction'>서울특별시 강남구 더조은 학원</p>
			</div>

			<hr />

			<div className='time'>
				<header>
					<h3>운영시간</h3>
				</header>
				<ul>
					<li>월 : 11:00 - 22:00</li>
					<li>화 : 11:00 - 22:00</li>
					<li>수 : 11:00 - 22:00</li>
					<li>목 : 11:00 - 22:00</li>
					<li>금 : 11:00 - 22:00</li>
				</ul>
			</div>

			<hr />

			<div className='reservation'>
				<button>예약하기</button> &emsp;&emsp; <button>리뷰</button>
			</div>
			
			<hr/>
			
			<div className='introduction'>
				<h3>상세정보</h3>
				<p>최고심이 짱이양 ~~</p>
				<p>최고심 귀여워 ~~</p>
			</div>

			<hr />

			<div className='announce'>
				<h3>안내 및 주의사항</h3>
				<p>*모든 증정품은 한정수량으로 조기 소진될 수 있습니다.</p>
			</div>
			<hr />

			<div className='sns'>
				<a
					href="https://www.instagram.com/gosimperson/?hl=ko"
					target="_blank"
					rel="noopener noreferrer"> sns로 이동하기 </a>
			</div>
					</>
				)
			})

		}
       
            </>

    )
}
export default Detail;

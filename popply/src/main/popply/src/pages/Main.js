import React, { useState, useEffect } from 'react'
import './Main.css';
import { Link } from 'react-router-dom';
import PostRegister from './PostRegister'; // 경로를 확인하세요

const Main = () => {
  const [imageIndex, setImageIndex] = useState(0);

  const images = [
    `${process.env.PUBLIC_URL}/img/main_img1.jpg`,
    `${process.env.PUBLIC_URL}/img/main_img2.jpg`,
    `${process.env.PUBLIC_URL}/img/main_img3.jpg`, // 추가할 이미지 경로
  ];

  const nextImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const previousImage = () => {
    setImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  // 3초마다 다음 이미지로 변경
  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval); // 컴포넌트 언마운트 시 클리어
  }, []);

  return (
    <>
    <span>
    <div className='main_container'> 
        <img  //메인 이미지 부분
        src={images[imageIndex]}
        alt="Main" 
        className="main_image" 
        />
        
        {/* 메인이미지 위에 올릴 텍스트 */}
        <div className="overlay_text">
          <h1 className="overlay_title"><b>영화같은 하룻밤, 부커스 비치 호텔</b></h1>
          <h3 className="overlay_detail">강원도 양양에 재현한 1970-80년대 미국의 레트로 무드</h3>
        </div>

        {/* 버튼을 이미지 위에 배치 */}
        <div className="button_container">
          <button onClick={previousImage} className="image-toggle-button"> 이전 </button>
          <button onClick={nextImage} className="image-toggle-button"> 다음 </button>
        </div>
      </div>
      </span>



      <br/><br/><br/><br/>  {/* 한줄 띄우기 */}

      {/* 리스트 목록들 총 제목 */}
      <div style={{textAlign:'center'}}><h3><b>주목해야 할 팝업</b></h3></div>

      <br/><br/><br/>

      {/* 첫번째 큰 리스트 */}
      <div className="container">
        <div className="list_item">  {/* 리스트1 제목 */}
          <img src="/img/main_list1_img.jpg" alt="list_img" className = "list_img" /> 

          <div className="text_content">
            <h5 className="list_subtitle"> <b>이토록 다채로운 블랙, 누아르 마르디 메크르디</b> </h5>
            <p className="list_detail"> : 카페, 레코드숍, 리빙 편집숍이 한 건물에 </p>
            <button className="list_button" onClick={() => alert('버튼이 클릭되었습니다!')}>  {/* 버튼 추가 */}
              키워드 1
            </button> &nbsp;
            <button className="list_button" onClick={() => alert('버튼이 클릭되었습니다!')}>
              키워드 2
            </button>
          </div>
        </div>

        <div className="list_item">  {/* 리스트2 제목 */}
          <img src="/img/main_list2_img.jpg" alt="list_img" className = "list_img" /> 

          <div className="text_content">
            <h5 className="list_subtitle"> <b>파친코2, 두 배로 몰입하는 방법</b> </h5>
            <p className="list_detail"> 프로젝트 렌트 3개 공간에 마련된 "Apple TV+ 파친코" 팝업스토어 </p>
            <button className="list_button" onClick={() => alert('버튼이 클릭되었습니다!')}>  {/* 버튼 추가 */}
              키워드 1
            </button> &nbsp;
            <button className="list_button" onClick={() => alert('버튼이 클릭되었습니다!')}>
              키워드 2
            </button>
          </div>
        </div>

        <div className="list_item">  {/* 리스트3 제목 */}
          <img src="/img/main_list3_img.jpg" alt="list_img" className = "list_img" /> 

          <div className="text_content">
            <h5 className="list_subtitle"> <b>키아프 서울 2024에 주목할 시간</b> </h5>
            <p className="list_detail"> 예술이 깃든 9월 첫 주, 키아프 서울 "Kiaf SEOUL"과 함께! </p>
            <button className="list_button" onClick={() => alert('버튼이 클릭되었습니다!')}>  {/* 버튼 추가 */}
              키워드 1
            </button> &nbsp;
            <button className="list_button" onClick={() => alert('버튼이 클릭되었습니다!')}>
              키워드 2
            </button>
          </div>
        </div>


{/* 게시물 등록 버튼  */}
        <div>
          <Link to="/PostRegister">
            <button>게시물 등록</button>
          </Link>
        </div>
      </div>


      </>
  );
}

export default Main;
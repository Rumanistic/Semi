import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Main.css';

const Main = ({ user, setUser }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const navigate = useNavigate();
 


  const images = [
    `${process.env.PUBLIC_URL}/img/main-img.jpg`,
    `${process.env.PUBLIC_URL}/img/main-img2.jpg`,
    `${process.env.PUBLIC_URL}/img/main-img3.jpg`,
  ];

  const nextImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const previousImage = () => {
    setImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>

      <div className='main_container'>
        <img
          src={images[imageIndex]}
          alt="Main"
          className="main_image"
        />

        <div className="overlay_text">
          <h1 className="overlay_title"><b>영화같은 하룻밤, 부커스 비치 호텔</b></h1>
          <h3 className="overlay_detail">강원도 양양에 재현한 1970-80년대 미국의 레트로 무드</h3>
        </div>

        <div className="button_container">
          <button onClick={previousImage} className="image-toggle-button"> 이전 </button>
          <button onClick={nextImage} className="image-toggle-button"> 다음 </button>
        </div>
      </div>

      <br/><br/><br/><br/>

      <div style={{textAlign:'center'}}><h3><b>주목해야 할 팝업</b></h3></div>

      <br/><br/><br/>

      <div className="container">
        {/* 리스트 아이템들 */}
        {/* 게시물 등록 버튼 */}
        <div>
          <Link to="/register">
            <button>게시물 등록</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Main;

import React, { useState, useEffect } from 'react';
import './styles/Main.css';
import './styles/Main_list.css';

const Main = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [currentItems, setCurrentItems] = useState([0, 1, 2]); // 현재 보여줄 리스트 인덱스
  const images = [
    `/img/main_img1.jpg`,
    `/img/main_img2.jpg`,
    `/img/main_img3.jpg`,
  ];
  const listItems = [
    {
      img: `/img/list1-img.jpg`,
      title: "이토록 다채로운 블랙, 누아르 마르디 메크르디",
      detail: "카페, 레코드숍, 리빙 편집숍이 한 건물에",
    },
    {
      img: `/img/list2-img.jpg`,
      title: "파친코2, 두 배로 몰입하는 방법",
      detail: "프로젝트 렌트 3개 공간에 마련된 'Apple TV+ 파친코' 팝업스토어",
    },
    {
      img: `/img/list3-img.jpg`,
      title: "키아프 서울 2024에 주목할 시간",
      detail: "예술이 깃든 9월 첫 주, 키아프 서울 'Kiaf SEOUL'과 함께!",
    },
  ];

  const nextImage = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const previousImage = () => {
    setImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const nextItem = () => {
    setCurrentItems((prevItems) => {
      const newItems = prevItems.map(item => (item + 1) % listItems.length);
      return newItems;
    });
  };

  const previousItem = () => {
    setCurrentItems((prevItems) => {
      const newItems = prevItems.map(item => (item - 1 + listItems.length) % listItems.length);
      return newItems;
    });
  };

  // 3초마다 다음 이미지로 변경
  useEffect(() => {
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* 메인 이미지와 텍스트 */}
      <section className='main_container'> 
        <figure>
          <img  
            src={images[imageIndex]}
            alt="Main" 
            className="main_image" 
          />
          <div className="overlay_text">
            <h1 className="overlay_title">영화같은 하룻밤, 부커스 비치 호텔</h1>
            <h3 className="overlay_detail">강원도 양양에 재현한 1970-80년대 미국의 레트로 무드</h3>
          </div>
        </figure>
        <div className="main_button_container">
          <button onClick={previousImage} className="main_toggle_button"> &lt; </button>
          <button onClick={nextImage} className="main_toggle_button"> &gt; </button>
        </div>
      </section>

      {/* 리스트 항목 */}
      <section className="list_container">
        <div className="list_items"> 
          <h2 className='list_main_name'>POPIN POP-UP</h2>
          <div className="list_content">
            <div className="list_carousel_button_container">
              <button className="list_carousel-button" onClick={previousItem}>이전</button>
              <button className="list_carousel-button" onClick={nextItem}>다음</button>
            </div>
            
            <div className="list_items_container">
              {currentItems.map(index => (
                <article className="list_item" key={index}>
                  <img src={listItems[index].img} alt="list_img" className="list_img" />
                  <div className="text_content">
                    <h3 className="list_subtitle">{listItems[index].title}</h3>
                    <p className="list_detail">{listItems[index].detail}</p>
                    <button className="list_button" onClick={() => alert('버튼이 클릭되었습니다!')}>키워드 1</button>
                    <button className="list_button" onClick={() => alert('버튼이 클릭되었습니다!')}>키워드 2</button>
                    </div>
                  
                </article>
              ))}
              </div>
            </div>
          
        </div>
      </section>
    </>
  );
}

export default Main;

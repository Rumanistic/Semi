import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './styles/Main.css';
import './styles/Main_list.css';
import axios from 'axios';

const Main = ({setTag}) => {
	const [events, setEvents] = useState([]);
  const [banner, setBanner] = useState(0);
  const [list, setList] = useState(0);
  const [banners, setBanners] = useState([]);
  const [lists, setLists] = useState([]);
  
  const navigate = useNavigate();
  
	const tagRemover = /<[^>]*>/g;
	const imgRemover = /image[0-9]+/g;
	const alertRemover = /\[alert\](?:!\s\w)*[가-힣]*(?:\s[가-힣]*)*/g;
	
	console.log(typeof setTag);
  
  // 서버에서 최근 8개의 이벤트를 가져옴
  useEffect(() => {
    axios.get('http://localhost:8080/event/recent')
      .then(response => {
				console.log(response.data);
        setEvents(response.data);
      })
      .catch(error => {
        console.error('서버로 요청 중 에러 발생:', error);
      });
  }, []);
  
  useEffect(() => {
		if(events.length === 8){
			const [bannersSlice, listsSlice] = [events.slice(0,3), events.slice(3,8)];
			setBanners([...bannersSlice]);
			setLists([...listsSlice]);
		}
	}, [events]);

  const totalBanners = 3;
  
  const nextBanner = () => {
    if (banner < totalBanners - 1) {
      setBanner(banner + 1);
    } else {
			setBanner(0);
		}
  };
  
  const prevBanner = () => {
    if (banner > 0) {
      setBanner(banner - 1);
    } else {
			setBanner(2);
		}
  };
  
  const nextList = () => {
    if (list < 5) {
      setList(list + 1);
    } else {
			setList(0);
		}
  };
  
  const prevList = () => {
    if (list < 0) {
      setList(list - 1);
    } else {
			setList(4);
		}
  };
  
  const setTagEvent = (lists, list, i, num) => {
		setTag(lists[(list + i)% lists.length].tags.split(',')[num])
	};

  // 3초마다 다음 이미지로 변경
  useEffect(() => {
    const interval = setInterval(nextBanner, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className='main_container'> 
        {banners.length > 1 ? 
	        <figure style={{ maxHeight: '700px' }}>
          	<img  
            src={parseImgSrc(banners[banner])}
            alt="Main" 
            className="main_image" 
          	/>
          	<div className="overlay_text">
            <h1 className="overlay_title">{banners[banner].title}</h1>
            <h3 className="overlay_detail">{
							`${banners[banner]
								.content
								.replace(tagRemover, '')
								.replace(imgRemover, '')
								.replace(alertRemover, '')
								.substring(0, 80)}...`
						}</h3>
          </div>
	      </figure> : null}
        <div className="main_button_container">
          <button onClick={prevBanner} className="main_toggle_button"> &lt; </button>
          <button onClick={nextBanner} className="main_toggle_button"> &gt; </button>
        </div>
      </section>


      <section className="list_container">
        <h2 className='list_main_name'>POP IN POP-UP</h2>
        <div className="list_items"> 
            <img className="list_btn" src='/img/lt.png' alt='' onClick={() => prevList()}/>
            <div className="list_items_container">
              {lists.length > 1 && lists.map((e, i) => (
                <article className="list_item" key={i} onClick={() => navigate(`/event/${lists[(list + i)% lists.length].eventNo}`)}>
                  <img src={parseImgSrc(lists[(list + i)% lists.length])} alt="list_img" className="list_img" />
                  <div className="text_content">
                    <h3 className="list_subtitle">{lists[(list + i)% lists.length].title}</h3>
                    <p className="list_detail">{
											`${lists[(list + i)% lists.length]
													.content
													.replace(tagRemover, '')
													.replace(imgRemover, '')
													.replace(alertRemover, '')
													.substring(0, 50)}...`}</p>
                    <button className="list_button" onClick={() => {
											setTagEvent(lists, list, i, 0);
											navigate('/popup/tag?');
                    }}>
                    	{`${lists[(list + i)% lists.length].tags.split(',')[0]}`}
                    </button>&nbsp;&nbsp;&nbsp;
                    <button className="list_button" onClick={() => setTagEvent(lists, list, i, 1)}>
                    	{`${lists[(list + i)% lists.length].tags.split(',')[1]}`}
                  	</button>
                    </div>
                </article>
              ))}
            </div>
            <img className="list_btn" src='/img/gt.png' alt='' onClick={() => nextList()}/>
        </div>
      </section>
    </>
  );
}

const parseImgSrc = (e) => {
	const hyphenRemover = /-/g;
	
	const checkDir = (createdDate) => {
		const date = createdDate.replace(hyphenRemover, '');
		
		return date.substring(0,8);
	}
	
	return `/img/
		${e.company}${checkDir(e.createdDate)}/
		${e.images !== null && e.images !== '' ? e.images.split(',')[0] : 'FullStar'}.png`;
}

export default Main;

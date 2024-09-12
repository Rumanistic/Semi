import React, { useState }from 'react';
import './Footer.css';

const Footer = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('제목:', title);
        console.log('내용:', content);
        console.log('작성자:', author);

        // 양식 초기화
        setTitle('');
        setContent('');
        setAuthor('');
    };
	
	

  return (
    <div className="footer-container">
            <h1>게시물 등록</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">제목:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label htmlFor="content">내용:</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="5"
                    required
                ></textarea>

                <label htmlFor="author">작성자:</label>
                <input
                    type="text"
                    id="author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                />

                <button type="submit">등록</button>
            </form>
        </div>
  );
};


export default Footer;

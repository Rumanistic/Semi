import React, { useState }from 'react';

const PostRegister = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [inquiryType, setInquiryType] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('작성자 :', name);
        console.log('휴대폰 번호 :', phone);
        console.log('이메일 :', email);
        console.log('문의유형:', inquiryType);
        console.log('문의 제목:', title);
        console.log('문의 내용:', content);

        // 양식 초기화
        setTitle('');
        setContent('');
        setAuthor('');
    };

    return (
        <div className="footer-container">
        <h1>게시물 등록</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">이름:</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <label htmlFor="phone">휴대폰 번호:</label>
            <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />

            <label htmlFor="email">이메일:</label>
            <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <label htmlFor="inquiryType">팝업 유형:</label>
            <select
                id="inquiryType"
                value={inquiryType}
                onChange={(e) => setInquiryType(e.target.value)}
                required
            >
                <option value="">선택하세요</option>
                <option value="general">팝업 문의</option>
                <option value="support"> 문의</option>
                <option value="feedback">피드백</option>
            </select>

            <label htmlFor="title">문의 제목:</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />

            <label htmlFor="content">문의 내용:</label>
            <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="5"
                required
            ></textarea>

            <button type="submit">등록</button>
        </form>
    </div>
    );
};

export default PostRegister;
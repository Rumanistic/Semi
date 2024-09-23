import styled from 'styled-components';

export const MyPageContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  font-family: 'Pretendard-Regular', sans-serif;
  box-sizing: border-box;
`;

export const Input = styled.input`
  padding: 15px;
  margin-bottom: 20px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  box-sizing: border-box; 

  &:focus {
    outline: none;
    border-color: #ff6347;
    box-shadow: 0 2px 10px rgba(255, 99, 71, 0.2);
  }
`;

export const Button = styled.button`
  padding: 15px 25px;
  background: linear-gradient(135deg, #ff7e79, #ffb199);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  width: 100%;
  font-family: 'Pretendard-Regular', sans-serif;
  box-sizing: border-box;

  &:hover {
    background: linear-gradient(135deg, #ff6347, #ff9472);
    transform: translateY(-5px);
  }

  &:active {
    background: linear-gradient(135deg, #ff6347, #ff9472);
    transform: scale(0.96);
    box-shadow: 0 5px 15px rgba(255, 123, 123, 0.3);
  }
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const InfoContainer = styled.div`
  margin-top: 20px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1);
`;

export const ErrorMessage = styled.p`
  color: #ff6347;
  font-size: 1rem;
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
  background-color: #ffe6e6;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

import styled from 'styled-components';

export const WithdrawContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 50px;
  border: 1px solid #dcdcdc;
  border-radius: 15px;
  background-color: #f7f7f7;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 40px;
  font-size: 2.4rem;
  color: #8a8a8a;
  font-family: 'Pretendard-Regular', sans-serif;
  font-weight: 700;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const Label = styled.label`
  text-align: left;
  margin-bottom: 5px;
  color: #555;
  font-weight: 500;
  font-size: 1.2rem;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fafafa;
  color: #333;
  font-size: 1.1rem;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
  font-family: 'Pretendard-Regular', sans-serif;

  &:focus {
    outline: none;
    border-color: #a3a3a3;
    box-shadow: 0 0 10px rgba(163, 163, 163, 0.5);
  }
`;

export const Button = styled.button`
  padding: 15px;
  background: linear-gradient(45deg, #f2c6c6, #f4dcdc);
  color: #444;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1.2rem;
  font-family: 'Pretendard-Regular', sans-serif;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #e3b0b0, #e8caca);
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  &:active {
    background: linear-gradient(45deg, #d89f9f, #e0b8b8);
    transform: scale(0.98);
  }
`;

export const ErrorMessage = styled.div`
  color: #c87070;
  margin-bottom: 25px;
  text-align: center;
  font-weight: bold;
  animation: shake 0.3s ease-in-out;
  font-family: 'Pretendard-Regular', sans-serif;

  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  }
`;

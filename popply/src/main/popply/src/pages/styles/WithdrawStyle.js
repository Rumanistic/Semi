import styled from 'styled-components';

export const WithdrawContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding: 30px; /* 패딩을 늘려 여백을 줌 */
  border: 1px solid #dcdcdc;
  border-radius: 15px; /* 둥근 모서리로 부드러운 느낌 */
  background-color: #f7f7f7; /* 부드러운 회색 배경색 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); /* 부드러운 그림자 */
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  color: #8a8a8a; /* 부드러운 회색 텍스트 */
  font-family: 'Arial', sans-serif;
  font-weight: 600;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1); /* 약간의 그림자 */
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  margin-bottom: 5px;
  color: #555; /* 중간 톤의 회색 */
  font-weight: 500;
`;

export const Input = styled.input`
  margin-bottom: 20px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fafafa; /* 밝은 회색 */
  color: #333;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);

  &:focus {
    outline: none;
    border-color: #a3a3a3; /* 포커스 시 연한 회색 테두리 */
    box-shadow: 0 0 10px rgba(163, 163, 163, 0.5); /* 포커스 시 부드러운 그림자 */
  }
`;

export const ErrorMessage = styled.div`
  color: #c87070; /* 부드러운 코랄색 */
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
  animation: shake 0.3s ease-in-out; /* 애니메이션 효과 */
  
  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  }
`;

export const Button = styled.button`
  padding: 12px;
  background: linear-gradient(45deg, #f2c6c6, #f4dcdc); /* 부드러운 분홍색 그라데이션 */
  color: #444; /* 텍스트를 어두운 회색으로 변경 */
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1.1rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(45deg, #e3b0b0, #e8caca); /* 호버 시 더 진한 분홍색 */
    transform: translateY(-3px); /* 살짝 위로 이동 */
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }

  &:active {
    background: linear-gradient(45deg, #d89f9f, #e0b8b8);
    transform: scale(0.98);
  }
`;

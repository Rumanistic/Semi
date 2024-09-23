import styled from 'styled-components';

export const MyPageContainer = styled.div`
  max-width: 600px; /* 너비 약간 확대 */
  margin: 0 auto;

  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  font-family: 'Pretendard-Regular', sans-serif; /* 통일된 폰트 설정 */

`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Pretendard-Regular', sans-serif; /* 통일된 폰트 설정 */

`;

export const Button = styled.button`
  padding: 15px 25px; /* 패딩 조정 */
  background: linear-gradient(135deg, #ff7e79, #ffb199); /* 그라데이션 변경 */
  color: white;
  border: none;
  border-radius: 25px; /* 더 둥근 모서리 */
  cursor: pointer;
  width: 100%;
  font-family: 'Pretendard-Regular', sans-serif; /* 통일된 폰트 설정 */


  &:hover {
    background: linear-gradient(135deg, #ff6347, #ff9472); /* 호버 시 색상 변경 */
    transform: translateY(-5px); /* 살짝 위로 이동 */
  }

  &:active {
    background: linear-gradient(135deg, #ff6347, #ff9472);
    transform: scale(0.96); /* 살짝 작아지는 효과 */
    box-shadow: 0 5px 15px rgba(255, 123, 123, 0.3); /* 클릭 시 그림자 변경 */
  }
`;

export const InfoContainer = styled.div`
  margin-top: 20px;
  padding: 30px; /* 패딩 조정 */
  background-color: #ffffff;
  border-radius: 15px; /* 둥근 모서리 */
  box-shadow: 0 3px 15px rgba(0, 0, 0, 0.1); /* 그림자 조정 */
`;

export const Input = styled.input`
  padding: 15px; /* 패딩 조정 */
  margin-bottom: 20px; /* 여백 증가 */
  width: 100%;
  border: 1px solid #ddd; /* 테두리 색 변경 */
  border-radius: 8px; /* 둥근 모서리 */
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05); /* 내부 그림자 추가 */

  &:focus {
    outline: none;
    border-color: #ff6347; /* 포커스 시 테두리 색상 변경 */
    box-shadow: 0 2px 10px rgba(255, 99, 71, 0.2); /* 포커스 시 그림자 변경 */
  }
`;

export const ErrorMessage = styled.p`
  color: #ff6347; /* 색상 변경 */
  font-size: 1rem;
  margin-bottom: 20px;
  text-align: center; /* 중앙 정렬 */
  font-weight: bold; /* 글씨 강조 */
  background-color: #ffe6e6; /* 배경색 추가 */
  padding: 10px; /* 패딩 추가 */
  border-radius: 8px; /* 둥근 모서리 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
`;

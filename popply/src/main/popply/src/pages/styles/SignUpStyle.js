import styled from 'styled-components';

export const SignupContainer = styled.div`
  width: 400px;
  padding: 40px;
  background-color: #fffaf0;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: center;
  margin: 0 auto; /* 가로 중앙 정렬 */
  margin-top: 100px; /* 위쪽에서 충분한 간격을 두기 위해 여백 추가 */
  font-family: 'Jeju Gothic', sans-serif;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  }
`;

export const Title = styled.h2`
  font-size: 2.4rem;
  color: #333;
  margin-bottom: 25px;
  font-weight: 700;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  text-align: left;
  margin: 10px 0 5px;
  font-size: 1.2rem;
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1.2rem;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 1rem;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  padding: 10px;
  margin-top: 15px;
  margin-bottom: 20px;
  background-color: #e67e22;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  width: 100%;
  font-family: 'Jeju Gothic', sans-serif; /* 버튼 글씨체 적용 */
  font-size: 1.2rem; /* 버튼 글씨 크기 */

  &:hover {
    background-color: #d35400;
  }

  &:active {
    background-color: #c0392b;
  }
`;

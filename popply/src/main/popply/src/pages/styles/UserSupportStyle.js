import { styled } from 'styled-components';

export const ContentContainer = styled.div`
  width: 100%; 
  font-size: 24px;
  font-family: 'Pretendard-Regular', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ContentHorizontalBar = styled.span`
  display: block;
  margin: 5px 0;
  margin-top: 10px;
  margin-bottom: 10px;
  width: ${({ width }) => width || '90%'};
  background-color: #FFA2A2;
  border: solid ${({ borderpixel }) => borderpixel || 1}px #FFA2A2;
`;

export const ContentHorizontalSpan = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 90%;
  padding: 4px;
  align-items: center;
  cursor: ${({ redirect }) => (redirect === 'y' ? 'pointer' : 'default')};
  font-family: 'Pretendard-Regular', sans-serif;

  .no, .type, .secret, .userId, .title {
    min-height: 35px;
    display: flex;
    align-items: center;
  }

  .no {
    width: 3%;
  }

  .type {
    width: 11%;
    text-align: left;
    padding-left: 20px;
  }

  .secret {
    width: 3%;
  }

  .userId {
    width: 12%;
  }

  .title {
    flex-grow: 1;
  }
`;

export const ContentVerticalSpan = styled.span`
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100%;
  font-family: 'Pretendard-Regular', sans-serif;
  margin-bottom: 10px;
`;

export const ContentDetailBody = styled.section`
  min-width: 90%;
  text-align: left;
  font-family: 'Pretendard-Regular', sans-serif;
  margin-bottom: 10px;
`;

export const StyledButton = styled.button`
  font-size: 16px;
  padding: 10px 20px;
  margin: 0 10px;  
  background-color: #4CAF50;  
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  transition: transform 0.2s ease, background-color 0.2s ease;
  
  /* Hover 상태일 때 */
  &:hover {
    background-color: #ffcccc;
    transform: scale(1.05);  /* 크기 확대 */
  }

  /* Active 상태일 때 */
  &:active {
    background-color: #ffb3b3;
  }
`;

export const TitleInput = styled.input`
  font-size: 16px;
  width: 60%;
  height: 28px;
  margin-top: 5px;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const SelectType = styled.select`
  font-size: 16px;
  width: 10%;
  height: 28px;
  margin-top: 10px;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const Label = styled.label`
  font-size: 20px;
  width: ${({ width }) => width || '30%'};
  align-content: center;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const CheckboxLabel = styled.label`
  font-size: 19px;
  width: 40%;
  align-content: center;
  font-family: 'Pretendard-Regular', sans-serif;
`;

export const SecretCheckbox = styled.input`
  margin-left: 10px;
`;

export const SubmitResetButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 90%;
  margin-top: 10px;

  input[type='reset'],
  input[type='submit'] {
   background-color: lightpink;
   font-size: 13px;
   border-color: transparent;
   border-radius: 10px;
   cursor: pointer;
   padding: 5px 15px;
   margin-left: 10px;
  }
`;
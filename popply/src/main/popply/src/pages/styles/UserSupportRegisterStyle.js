import styled from 'styled-components';

export const ContentContainer = styled.div`
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  background-color: #fffcf7;
  padding: 20px;
  margin: 20px auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ContentHorizontalBar = styled.div`
  width: ${({ width }) => (width ? width : '90%')};
  height: ${({ borderpixel }) => (borderpixel ? `${borderpixel}px` : '1px')};
  background-color: #FFA2A2;
  margin: 10px 0;
`;

export const ContentHorizontalSpan = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0;

  label {
    font-size: 16px;
    font-family: 'Pretendard-Regular', sans-serif;
  }

  input, select {
    font-size: 16px;
    font-family: 'Pretendard-Regular', sans-serif;
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  input[type="submit"], input[type="reset"] {
    background-color: #FFA2A2;
    border: none;
    padding: 10px 20px;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    border-radius: 5px;
    margin-left: 10px;
  }

  input[type="submit"]:hover, input[type="reset"]:hover {
    background-color: #ff8a8a;
  }

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
  }
`;

export const ContentVerticalSpan = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const RightFloatSpan = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  label {
    font-size: 16px;
    font-family: 'Pretendard-Regular', sans-serif;
    margin-right: 10px;
  }

  input[type="checkbox"] {
    width: 20px;
    height: 20px;
  }
`;

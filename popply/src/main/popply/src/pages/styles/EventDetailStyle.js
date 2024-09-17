import styled from 'styled-components';

export const EventContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  padding: 40px;
  background-color: #fffaf0;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  font-family: 'Jeju Gothic', sans-serif;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  }
`;

export const EventTitle = styled.h1`
  font-size: 2.4rem;
  color: #e74c3c;
  text-align: center;
  margin-bottom: 25px;
  font-weight: 700;
`;

export const EventDetailItem = styled.div`
  padding: 10px 0;
  border-bottom: 2px dashed #f39c12;

  &:last-child {
    border-bottom: none;
  }
`;

export const EventHeading = styled.h3`
  color: #e67e22;
  font-size: 1.5rem;
  margin-top: 20px;
  margin-bottom: 10px;
`;

export const EventParagraph = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1.2rem;
  color: #2d3436;
  line-height: 1.8;

  span {
    font-weight: 500;
    color: #3498db;
  }
`;

export const EventLocation = styled.p`
  font-size: 1.3rem;
  color: #e74c3c;
  font-weight: bold;
`;

export const Button = styled.button`
  display: inline-block;
  background-color: #e67e22;
  color: white;
  width: 200px;
  height: 50px;
  font-size: 1.1rem;
  font-family: 'Jeju Gothic', sans-serif;
  border-radius: 50px;
  margin-top: 20px;
  text-align: center;
  line-height: 50px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  text-decoration: none;
  border: none;
  outline: none;
  cursor: pointer;

  &:hover {
    background-color: #d35400;
    transform: scale(1.05);
  }

  &:active {
    background-color: #c0392b;
    transform: scale(0.98);
  }
`;

export const EventImages = styled.div`
  margin-bottom: 20px;
`;

// 반응형 스타일
export const ResponsiveContainer = styled.div`
  @media (max-width: 768px) {
    ${EventContainer} {
      padding: 20px;
    }

    ${EventTitle} {
      font-size: 2rem;
    }

    ${EventParagraph} {
      font-size: 1rem;
    }
  }
`;

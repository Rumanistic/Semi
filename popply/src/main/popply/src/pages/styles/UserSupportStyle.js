import { styled } from 'styled-components'

export const ContentContainer = styled.div`
	width: ${({width}) => width * 0.15 > 168 ? width * 0.85 : width - 168};
	font-size: 24px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const ContentHorizontalBar = styled.span`
	display: block;
  margin: 0;
  width: ${({width}) => width || '100%'};
  background-color: black;
  border: solid ${({borderpixel}) => borderpixel || 1}px black;
`


export const ContentHorizontalSpan = styled.span`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	width: 90%;
	padding: 4px;
	align-items: center;
	cursor: ${({redirect})=> redirect === 'y' ? 'pointer' : 'default'};
	
	
	.no {
		width: 3%;
		min-height: 35px;
		display: flex;
		align-items: center;
	}
	
	.type {
		width: 11%;
		text-align: left;
		padding-left: 20px;
		min-height: 35px;
		display: flex;
		align-items: center;
	}
	
	.secret {
		width: 3%;
		min-height: 35px;
		display: flex;
		align-items: center;
	}
	
	.userId {
		width: 12%;
		min-height: 35px;
		display: flex;
		align-items: center;
	}
	
	.title {
		flex-grow: 1;
		display: flex;
		align-items: center;
	}
`;

export const ContentVerticalSpan = styled.span`
	display: flex;
	flex-direction: column;
	width: 90%;
	height: 100%;
`; 
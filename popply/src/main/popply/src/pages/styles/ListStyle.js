import { styled } from 'styled-components'

export const ListContainer = styled.section`
	width: 100%;
`;

export const StarImg = styled.img`
	width: 30px;
`;

export const ListHeaderContainer = styled.div`
	display: flex;
	width: 100%;
`;

export const ListHeaderContainerHead1 = styled.h1`
	font-size: 32px;
	margin: 0;
	width: 100%;
`;

export const ViewChangeSpanContainer = styled.span`
	position: relative;
	float: right;
	display: inline-flex;
	background-color: rgba(102, 102, 255, 0.2);
	width: 90px;
	height: 40px;
	border-radius: 40px;
`;

export const ViewChangeSpanHamburger = styled.span`
	position: absolute;
	top: 10px;
	left: 10px;
	width: 20px;
	height: 20px;
	background-image: url('/img/hamburger.png');
	background-size: cover;
  background-position: center;
	opacity: ${({islistview}) => islistview === 'list' ? '1' : '0.4'};
	z-index: 1;
`;

export const ViewChangeSpanDot = styled.span`
	position: absolute;
	top: 10px;
	right: 10px;
	width: 20px;
	height: 20px;
	background-image: url('/img/dot.png');
	background-size: cover;
  background-position: center;
	opacity: ${({islistview}) => islistview === 'list' ? '0.4' : '1'};
	z-index: 1;
`;

export const ViewChangeSpan = styled.span`
	position: absolute;
	display: inline-block;
	left: ${({islistview}) => islistview === 'list' ? '0px' : '40px'};
	transition: left 0.3s ease;
	width: 44px;
	height: 40px;
	background-color: rgba(102, 102, 255, 0.7);
	border-radius: 40px;
`;

export const EventListSpan = styled.span`
	display: inline-flex;
	flex-wrap: wrap;
	background-color: rgba(0, 0, 0, 0.1);
`;

export const Col1 = styled.div`
	min-width: 99%;
	max-height: 400px;
	min-height: 400px;
`;

export const EventListSpanImage = styled.img`
	min-height: 80%;
	width: auto;
	background-size: cover;
  background-position: center;
`;

export const EventCardSpan = styled.span`
	display: inline-flex;
	flex-wrap: wrap;
	background-color: rgba(0, 0, 0, 0.1);
`;

export const Col4 = styled.div`
	display: flex;
  flex-direction: column;
	max-width: 33%;
`;

export const EventCardSpanImage = styled.img`
	min-width: 80%;
`;

export const ListContentContainer = styled.section`
	display: inline-flex;
`;

export const ListContentTagsContainer = styled.aside`
	display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
	min-width: 180px;
`;

export const ListContentTag = styled.span`
	height: 30px;
	border: ${({value}) => value ? 
		'solid 1px rgba(0, 0, 255, 0.8)' : 'solid 1px rgba(0, 0, 255, 0.7)'
	}; 
	border-radius: 30px;
	background-color: ${({value}) => value ? 
		'rgba(0, 0, 255, 0.8)' : 'white'
	}; 
	color: ${({value}) => value ? 
		'white' : 'black'
	}; 
	padding: 3px;
	margin: 3px;
	cursor: pointer;
	transition: background-color 0.3s ease;
	user-select: none;
`;
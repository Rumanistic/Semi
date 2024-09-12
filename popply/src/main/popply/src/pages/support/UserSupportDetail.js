import { useEffect, useState } from "react";
import { ContentContainer, ContentHorizontalBar } from "../styles/UserSupportStyle";


function UserSupportDetail() {
	const [width, setWidth] = useState(window.innerWidth);
	
	console.log('reached here successfully!')
	
	useEffect(() => {
		const getNowWidth = () => {
			setWidth(window.innerWidth)
		};
		
		window.addEventListener('resize', getNowWidth);
		
		return () => {
			window.removeEventListener('resize', getNowWidth);
		}
	})
	
	
	
	return (
		<ContentContainer width={width}>
			<ContentHorizontalBar />
			<UserSupportList />
			<ContentHorizontalBar />
		</ContentContainer>
	)
}

function UserSupportList() {
	
}


export default UserSupportDetail;
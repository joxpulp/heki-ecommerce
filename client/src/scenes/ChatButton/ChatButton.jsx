import React from 'react';
import { Box } from '../../components/Box/Box';
import { useDispatch, useSelector } from 'react-redux';
import { showChat } from '../../reducers/ui/uiReducer';
import { SiGooglechat } from 'react-icons/si';
import { AiFillCloseSquare } from 'react-icons/ai';

function ChatButton() {
	const dispatch = useDispatch();
	const { openChat } = useSelector((state) => state.ui);

	return (
		<Box
			bg='black'
			zIndex='1000'
			right='5'
			p='10px'
			bottom='2'
			position='fixed'
			color='white'
			borderRadius='10px'
			cursor='pointer'
			onClick={() => dispatch(showChat(!openChat))}
			initial={{ opacity: 0, x: 60 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 100 }}
		>
			{openChat ? (
				<AiFillCloseSquare fontSize='25px' />
			) : (
				<Box
					animate={{ y: 2 }}
					transition={{ y: { duration: 0.4, yoyo: Infinity } }}
				>
					<SiGooglechat fontSize='25px' />
				</Box>
			)}
		</Box>
	);
}

export default ChatButton;

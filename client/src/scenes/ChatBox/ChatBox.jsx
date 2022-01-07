import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import { Box } from '../../components/Box/Box';
import { ButtonBase } from '../../components/Button/ButtonBase/ButtonBase';
import { InputBase } from '../../components/Input/InputBase/InputBase';
import { Text } from '../../components/Text/Text';

const ChatBox = () => {
	const { userData } = useSelector((state) => state.auth);
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState([]);
	const socket = io('https://hekitech.herokuapp.com', {
		transports: ['websocket'],
	});

	const chatBox = useRef(null);

	const sendMessage = (e) => {
		e.preventDefault();
		socket.emit('sendMessage', message);
		setMessage('');
	};

	useEffect(() => {
		chatBox.current.scrollIntoView({
			behavior: 'smooth',
			block: 'end',
			inline: 'nearest',
		});
	}, [messages]);

	useEffect(() => {
		socket.on('messages', (data) => {
			setMessages(data);
		});
		return () => {
			socket.off('messages');
			socket.emit('delete');
		};
	}, []);

	return (
		<Box
			bg='#1b1b1bb2'
			position='fixed'
			bottom='5'
			right={['2', '2', '5']}
			flexDirection='column'
			zIndex='1000'
			p='10px'
			width={['95%', '500px']}
			height='300px'
			borderRadius='5px'
			initial={{ opacity: 0, x: 60 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 100 }}
			glass
		>
			<Box
				p='10px'
				bg='white'
				color='black'
				overflowY='scroll'
				overflowX='hidden'
				flexDirection='column'
				alignItems={messages.length === 0 ? 'center' : 'start'}
				justifyContent={messages.length === 0 ? 'center' : 'start'}
				height='300px'
			>
				{messages.length === 0 ? (
					<Text>
						Hi {userData.name}, write stock, order or cart to get an answer{' '}
					</Text>
				) : (
					messages.map((message, index) => (
						<Box
							p='15px'
							my='10px'
							key={index}
							width='95%'
							bg='#eeeeeece'
							flexDirection='column'
							color='#5c5c5c'
							borderRadius='10px'
							initial={{ opacity: 0, x: 60 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{delay: .3}}
						>
							<Text pb='10px' color='#2c533a'>
								{message.type} says:{' '}
							</Text>
							<pre style={{ display: 'table', borderCollapse: 'separate' }}>
								{message.message}
							</pre>
						</Box>
					))
				)}
				<Box ref={chatBox}></Box>
			</Box>
			<Box mt='10px' width='100%' justifyContent='space-between'>
				<InputBase
					type='text'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={(e) => e.key === 'Enter' && sendMessage(e)}
					placeholder='Message'
					flex='1'
				/>
				<ButtonBase ml='5px' onClick={sendMessage} color='black'>
					Enviar
				</ButtonBase>
			</Box>
		</Box>
	);
};

export default ChatBox;

import React, { useContext, useState } from 'react';
import { ThemeContext } from 'styled-components';
import { useDispatch } from 'react-redux';
import { setUserMenu } from '../../reducers/ui/uiReducer';
import { Link } from 'react-router-dom';
import { Box } from '../../components/Box/Box';
import { Title } from '../../components/Title/Title';
import Navbar from '../Navbar/Navbar';
import { FiX, FiMenu } from 'react-icons/fi';

function Header() {
	const {
		colors: { primary },
	} = useContext(ThemeContext);
	const [isOpen, setIsOpen] = useState(false);

	const dispatch = useDispatch();

	const handleMenu = () => {
		setIsOpen(!isOpen);
		dispatch(setUserMenu(false));
	};

	return (
		<Box
			as='header'
			position='fixed'
			width='100%'
			height='60px'
			alignItems='center'
			px={['20px', '20px', '145px']}
			bg={primary}
			color='white'
			borderBottom='1px solid white'
			zIndex={1}
		>
			<Box onClick={handleMenu} display={['flex', 'flex', 'none']} mr='10px'>
				{isOpen ? <FiX fontSize='25px' /> : <FiMenu fontSize='25px' />}
			</Box>
			<Link to='/' onClick={() => dispatch(setUserMenu(false))}>
				<Title mr='20px' cursor='pointer'>
					Heki
				</Title>
			</Link>
			<Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
		</Box>
	);
}

export default Header;

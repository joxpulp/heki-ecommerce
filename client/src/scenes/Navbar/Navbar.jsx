import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Box } from '../../components/Box/Box';
import { GroupList } from '../../components/GroupList/GroupList';
import { Image } from '../../components/Image/Image';
import { ListItem } from '../../components/ListItem/ListItem';
import { Text } from '../../components/Text/Text';
import { setUserMenu } from '../../reducers/ui/uiReducer';
import UserMenu from '../UserMenu/UserMenu';
import cart from '../../services/svg/cart.svg';
import { AnimatePresence } from 'framer-motion';

function Navbar({ isOpen, setIsOpen }) {
	const dispatch = useDispatch();
	const { userData, loggedIn } = useSelector((state) => state.auth);
	const { cartData, totalItems } = useSelector((state) => state.cart);
	const { userMenu } = useSelector((state) => state.ui);

	const handleUserMenu = () => {
		dispatch(setUserMenu(false));
		setIsOpen(false);
	};

	const handleMenu = () => {
		dispatch(setUserMenu(!userMenu));
		setIsOpen(false);
	};

	useEffect(() => {
		localStorage.setItem('userData', JSON.stringify(userData));
	}, [userData]);

	useEffect(() => {
		localStorage.setItem('cartData', JSON.stringify(cartData));
	}, [cartData]);

	return (
		<Box
			as='nav'
			flex={1}
			justifyContent={['flex-end', 'flex-end', 'flex-start']}
		>
			<GroupList
				width='100%'
				position={['absolute', 'absolute', 'relative']}
				top={[60, 60, 0]}
				left={[isOpen ? 0 : '-100%', isOpen ? 0 : '-100%', 0]}
				flexDirection={['column', 'column', 'row']}
				flex={1}
				justifyContent='space-evenly'
				alignItems='center'
				p={['20px', '20px', 0]}
				bg={['#272727', '#272727', 'transparent']}
				opacity={[isOpen ? 1 : 0, isOpen ? 1 : 0, 1]}
			>
				<ListItem mb={['20px', '20px', 0]}>
					<Link to='/' onClick={handleUserMenu}>
						Shop
					</Link>
				</ListItem>
				<ListItem mb={['20px', '20px', 0]}>
					<Link to='/about' onClick={handleUserMenu}>
						About
					</Link>
				</ListItem>
				<ListItem>
					<Link to='/contact' onClick={handleUserMenu}>
						Contact
					</Link>
				</ListItem>
			</GroupList>
			<GroupList justifyContent='space-evenly'>
				<ListItem alignItems='center' mr='20px' onClick={handleUserMenu}>
					<Link to='/cart'>
						<Image mr='5px' src={cart} />
						{loggedIn && cartData && <Text>{totalItems}</Text>}
					</Link>
				</ListItem>
				<ListItem height='100%' alignItems='center'>
					{loggedIn ? (
						<Box onClick={handleMenu}>
							<Image
								borderRadius='100%'
								width='20px'
								mr='10px'
								src={userData.avatar}
								alt='avatar'
							/>
							<Text>{userData.name}</Text>
						</Box>
					) : (
						<Link to='/login'>Login</Link>
					)}
				</ListItem>
			</GroupList>
			<AnimatePresence exitBeforeEnter>
				{userMenu && <UserMenu />}
			</AnimatePresence>
		</Box>
	);
}

export default Navbar;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducers/auth/authReducer';
import { clearSuccessMsg, setUserMenu } from '../../reducers/ui/uiReducer';
import { Link } from 'react-router-dom';
import { Box } from '../../components/Box/Box';
import { GroupList } from '../../components/GroupList/GroupList';
import { ListItem } from '../../components/ListItem/ListItem';

const UserMenu = () => {
	const dispatch = useDispatch();
	const { userData } = useSelector((state) => state.auth);

	const handleLogout = () => {
		dispatch(logout());
		dispatch(setUserMenu(false));
		dispatch(clearSuccessMsg());
	};

	const handleUserMenu = () => {
		dispatch(setUserMenu(false));
	};

	return (
		<Box
			position='absolute'
			alignItems='center'
			top={60}
			right={[0, 0, '110px']}
			width={['100%', '100%', '120px']}
			height='160px'
			justifyContent='center'
			bg='#272727'
			color='#e4e4e4'
			initial={{ opacity: 0, x: '100%' }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: '100%' }}
			transition={{ ease: 'easeInOut' }}
		>
			<GroupList display='flex' flexDirection='column' alignItems='center'>
				<ListItem mb='20px'>
					<Link to='/profile' onClick={handleUserMenu}>
						Edit User
					</Link>
				</ListItem>
				<ListItem mb='20px'>
					<Link to='/orders' onClick={handleUserMenu}>
						Orders
					</Link>
				</ListItem>
				{userData.admin && (
					<ListItem mb='20px'>
						<Link to='/adminpanel' onClick={handleUserMenu}>
							Admin Panel
						</Link>
					</ListItem>
				)}
				<ListItem onClick={handleLogout}>Logout</ListItem>
			</GroupList>
		</Box>
	);
};

export default UserMenu;

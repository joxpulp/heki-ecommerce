import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../reducers/auth/authReducer';
import { clearErrorMsg, clearSuccessMsg } from '../../reducers/ui/uiReducer';
import { Form, Formik } from 'formik';
import { loginValidation } from '../../helpers/yup';
import Button from '../../components/Button/Button';
import { Title } from '../../components/Title/Title';
import { Text } from '../../components/Text/Text';
import { Main } from '../../components/Main/Main';
import { Section } from '../../components/Section/Section';
import Input from '../../components/Input/Input';

function LoginPage() {
	const history = useHistory();

	const dispatch = useDispatch();
	const { loading, errorMsg } = useSelector((state) => state.ui);

	const handleClickSignup = () => {
		history.push('/signup');
		dispatch(clearErrorMsg());
		dispatch(clearSuccessMsg());
	};

	return (
		<Main
			alignItems='center'
			justifyContent='center'
			width='100%'
			py='50px'
			flexDirection='column'
			initial={{ opacity: 0, x: '-90%' }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: '-90%' }}
		>
			<Section
				bg='white'
				width={['90%', '90%', '50%']}
				height='500px'
				alignItems='center'
				boxShadow='0px 0px 25px 10px #F6F4FD'
				p='10px'
			>
				<Formik
					initialValues={{
						email: '',
						pwd: '',
					}}
					validationSchema={loginValidation}
					onSubmit={({ email, pwd }) => {
						dispatch(clearErrorMsg());
						dispatch(login({ email, pwd }));
					}}
				>
					<Form
						style={{
							width: '100%',
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Title my='10px'>Welcome Back</Title>
						<Text color='#A9ABBD'>Login with your email:</Text>
						{errorMsg && (
							<Text m='20px' color='#b62929'>
								{errorMsg}
							</Text>
						)}
						<Input
							disabled={loading}
							id='email'
							name='email'
							type='email'
							placeholder='Email'
						/>
						<Input
							disabled={loading}
							id='pwd'
							name='pwd'
							type='password'
							placeholder='Password'
						/>
						<Button>Login</Button>
					</Form>
				</Formik>
			</Section>
			<Text m='30px' cursor='pointer' onClick={handleClickSignup}>
				Or create an account
			</Text>
		</Main>
	);
}

export default LoginPage;

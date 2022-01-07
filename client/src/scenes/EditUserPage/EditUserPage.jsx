import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editUser } from '../../reducers/auth/authReducer';
import { ErrorMessage, Form, Formik } from 'formik';
import Button from '../../components/Button/Button';
import { Text } from '../../components/Text/Text';
import { Title } from '../../components/Title/Title';
import EditInput from '../../components/EditInput/EditInput';
import EditImage from '../../components/EditImage/EditImage';
import { editProfileValidation } from '../../helpers/yup';
import { Main } from '../../components/Main/Main';
import { Section } from '../../components/Section/Section';

function EditUserPage() {
	const dispatch = useDispatch();
	const { userData } = useSelector((state) => state.auth);

	return (
		<Main alignItems='center' justifyContent='center' width='100%' py='50px'>
			<Section
				bg='white'
				width={['90%', '90%', '50%']}
				alignItems='center'
				boxShadow='0px 0px 25px 10px #F6F4FD'
				p='10px'
				initial={{ opacity: 0, x: '-90%' }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: '-90%' }}
			>
				<Formik
					initialValues={{
						name: '',
						pwd: '',
						age: '',
						phone: '',
						streetName: '',
						streetNumber: '',
						postalCode: '',
						floor: '',
						apt: '',
						avatar: null,
					}}
					validationSchema={editProfileValidation}
					onSubmit={(values) => {
						const formData = new FormData();
						values.name !== '' && formData.append('name', values.name);
						values.pwd !== '' && formData.append('pwd', values.pwd);
						values.age !== '' && formData.append('age', values.age);
						values.phone !== '' && formData.append('phone', values.phone);
						values.streetName !== '' &&
							formData.append('streetName', values.streetName);
						values.streetNumber !== '' &&
							formData.append('streetNumber', values.streetNumber);
						values.postalCode !== '' &&
							formData.append('postalCode', values.postalCode);
						values.floor !== '' && formData.append('floor', values.floor);
						values.apt !== '' && formData.append('apt', values.apt);
						values.avatar && formData.append('avatar', values.avatar);

						dispatch(editUser(formData));
						values.avatar = null;
					}}
				>
					{({ values, setFieldValue }) => (
						<Form
							style={{
								width: '100%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Title my='10px'>Your Profile</Title>
							<Text mb='10px' color='#A9ABBD'>
								Change everything you want, just click on edit field
							</Text>
							<Text color='#A9ABBD'>
								Click on the image to upload a new avatar
							</Text>
							<EditImage
								currentImage={userData.avatar}
								label='avatar'
								file={values.avatar}
								onCancel={() => setFieldValue('avatar', null)}
							/>
							<input
								id='avatar'
								type='file'
								onChange={(e) => setFieldValue('avatar', e.target.files[0])}
								hidden
							/>
							<ErrorMessage name='avatar'>
								{(msg) => <Text color='red'>{msg}</Text>}
							</ErrorMessage>
							<EditInput
								currentValue={userData.name}
								id='name'
								name='name'
								type='text'
								placeholder='Name'
								onCancel={() => setFieldValue('name', '')}
							/>
							<EditInput
								currentValue={'********'}
								id='pwd'
								name='pwd'
								type='password'
								placeholder='Password'
								onCancel={() => setFieldValue('pwd', '')}
							/>
							<EditInput
								currentValue={userData.age}
								id='age'
								name='age'
								type='number'
								placeholder='Age'
								onCancel={() => setFieldValue('age', '')}
							/>
							<EditInput
								currentValue={userData.phone}
								id='phone'
								name='phone'
								type='text'
								placeholder='Phone number'
								onCancel={() => setFieldValue('phone', '')}
							/>
							<EditInput
								currentValue={userData.deliveryAddress.streetName}
								id='streetName'
								name='streetName'
								type='text'
								placeholder='Street Name'
								onCancel={() => setFieldValue('streetName', '')}
							/>
							<EditInput
								currentValue={userData.deliveryAddress.streetNumber}
								id='streetNumber'
								name='streetNumber'
								type='number'
								placeholder='Street Number'
								onCancel={() => setFieldValue('streetNumber', '')}
							/>
							<EditInput
								currentValue={userData.deliveryAddress.postalCode}
								id='postalCode'
								name='postalCode'
								type='text'
								placeholder='Postal Code'
								onCancel={() => setFieldValue('postalCode', '')}
							/>
							<EditInput
								currentValue={userData.deliveryAddress.floor}
								id='floor'
								name='floor'
								type='number'
								placeholder='Floor'
								onCancel={() => setFieldValue('floor', '')}
							/>
							<EditInput
								currentValue={userData.deliveryAddress.apt}
								id='apt'
								name='apt'
								type='text'
								placeholder='Apartment'
								onCancel={() => setFieldValue('apt', '')}
							/>
							<Button>Save profile</Button>
						</Form>
					)}
				</Formik>
			</Section>
		</Main>
	);
}

export default EditUserPage;

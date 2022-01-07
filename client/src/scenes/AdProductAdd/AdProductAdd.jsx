import React from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addProductValidation } from '../../helpers/yup';
import { addProduct } from '../../reducers/products/productsReducer';
import { Main } from '../../components/Main/Main';
import { Text } from '../../components/Text/Text';
import { Title } from '../../components/Title/Title';
import { Section } from '../../components/Section/Section';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import EditImage from '../../components/EditImage/EditImage';
import Textarea from '../../components/Textarea/Textarea';
import uploadphoto from '../../services/svg/uploadphoto.svg';

const AdProductAdd = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.ui);

	return (
		<Main
			alignItems='center'
			justifyContent='center'
			width='100%'
			py='50px'
			flexDirection='column'
		>
			<Section
				bg='white'
				width={['90%', '90%', '70%']}
				alignItems='center'
				boxShadow='0px 0px 25px 10px #F6F4FD'
				p='20px'
				initial={{ opacity: 0, x: '-90%' }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: '-90%' }}
			>
				<Formik
					initialValues={{
						name: '',
						description: '',
						category: '',
						price: '',
						stock: '',
						thumbnail: null,
					}}
					validationSchema={addProductValidation}
					onSubmit={(values, { resetForm }) => {
						const formData = new FormData();
						values.name !== '' && formData.append('name', values.name);
						values.description !== '' &&
							formData.append('description', values.description);
						values.category !== '' &&
							formData.append('category', values.category);
						values.price !== '' && formData.append('price', values.price);
						values.stock !== '' && formData.append('stock', values.stock);
						values.thumbnail && formData.append('thumbnail', values.thumbnail);

						dispatch(addProduct(formData));
						resetForm();
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
							<Title my='10px'>Add a new product</Title>
							<Text color='#A9ABBD'>
								Click on the image to upload a new thumbnail
							</Text>
							<EditImage
								currentImage={uploadphoto}
								label='thumbnail'
								file={values.thumbnail}
								onCancel={() => setFieldValue('thumbnail', null)}
							/>
							<input
								id='thumbnail'
								name='thumbnail'
								type='file'
								onChange={(e) => setFieldValue('thumbnail', e.target.files[0])}
								hidden
							/>
							<ErrorMessage name='thumbnail'>
								{(msg) => <Text color='red'>{msg}</Text>}
							</ErrorMessage>
							<Input
								id='name'
								name='name'
								type='text'
								placeholder='Name*'
								disabled={loading}
							/>
							<Textarea
								id='description'
								name='description'
								type='text'
								placeholder='Description*'
								disabled={loading}
							/>
							<Input
								id='category'
								name='category'
								type='text'
								placeholder='Category*'
								disabled={loading}
							/>
							<Input
								id='price'
								name='price'
								type='number'
								placeholder='Price*'
								disabled={loading}
							/>
							<Input
								id='stock'
								name='stock'
								type='number'
								placeholder='Stock*'
								disabled={loading}
							/>
							<Button>Add Product</Button>
						</Form>
					)}
				</Formik>
			</Section>
			<Text m='30px' cursor='pointer' onClick={() => history.go(-1)}>
				Go Back
			</Text>
		</Main>
	);
};

export default AdProductAdd;

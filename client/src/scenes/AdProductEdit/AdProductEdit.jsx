import React, { useEffect } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editProductValidation } from '../../helpers/yup';
import {
	editProduct,
	getProductById,
} from '../../reducers/products/productsReducer';
import { Text } from '../../components/Text/Text';
import { Title } from '../../components/Title/Title';
import Button from '../../components/Button/Button';
import EditImage from '../../components/EditImage/EditImage';
import EditInput from '../../components/EditInput/EditInput';
import EditTextarea from '../../components/EditTextarea/EditTextarea';
import { Main } from '../../components/Main/Main';
import { Section } from '../../components/Section/Section';

const AdProductEdit = () => {
	const { id } = useParams();

	const history = useHistory();
	const dispatch = useDispatch();
	const { product } = useSelector((state) => state.products);

	useEffect(() => {
		dispatch(getProductById(id));
	}, [dispatch, id]);

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
					validationSchema={editProductValidation}
					onSubmit={(values) => {
						const formData = new FormData();
						values.name !== '' && formData.append('name', values.name);
						values.description !== '' &&
							formData.append('description', values.description);
						values.category !== '' &&
							formData.append('category', values.category);
						values.price !== '' && formData.append('price', values.price);
						values.stock !== '' && formData.append('stock', values.stock);
						values.thumbnail && formData.append('thumbnail', values.thumbnail);

						dispatch(editProduct({ id, formData }));
						values.thumbnail = null
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
							<Title my='10px'>Edit Product</Title>

							<Text color='#A9ABBD'>
								Click on the image to upload a new thumbnail
							</Text>
							{product.map((product) => (
								<>
									<EditImage
										currentImage={product.thumbnail}
										label='thumbnail'
										file={values.thumbnail}
										onCancel={() => setFieldValue('thumbnail', null)}
									/>
									<input
										id='thumbnail'
										type='file'
										onChange={(e) =>
											setFieldValue('thumbnail', e.target.files[0])
										}
										hidden
									/>
									<ErrorMessage name='thumbnail'>
										{(msg) => <Text color='red'>{msg}</Text>}
									</ErrorMessage>
									<EditInput
										currentValue={product.name}
										id='name'
										name='name'
										type='text'
										placeholder='Name'
										onCancel={() => setFieldValue('name', '')}
									/>
									<EditTextarea
										currentValue={product.description}
										id='description'
										name='description'
										type='text'
										placeholder='Description'
										onCancel={() => setFieldValue('description', '')}
									/>

									<EditInput
										currentValue={product.category}
										id='category'
										name='category'
										type='text'
										placeholder='Category'
										onCancel={() => setFieldValue('category', '')}
									/>
									<EditInput
										currentValue={product.price}
										id='price'
										name='price'
										type='number'
										placeholder='Price'
										onCancel={() => setFieldValue('price', '')}
									/>
									<EditInput
										currentValue={product.stock}
										min='0'
										id='stock'
										name='stock'
										type='number'
										placeholder='Stock'
										onCancel={() => setFieldValue('stock', '')}
									/>
								</>
							))}
							<Button>Save</Button>
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

export default AdProductEdit;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useField } from 'formik';
import { Box } from '../Box/Box';
import { Text } from '../Text/Text';
import { TextareaBase } from '../Textarea/TexareaBase/TextareaBase';
import { ButtonBase } from '../Button/ButtonBase/ButtonBase';

function EditTextarea({ onCancel, currentValue, width, ...props }) {
	const [field, meta] = useField(props);
	const [edit, setEdit] = useState(false);

	const { successMsg } = useSelector((state) => state.ui);

	const handleClick = () => {
		setEdit(!edit);
		onCancel();
	};

	useEffect(() => {
		setEdit(false);
	}, [successMsg]);

	return (
		<Box flexDirection='column' m='5px'>
			<Box mb='5px'>
				{edit ? (
					<TextareaBase width={width ? width : '80%'} {...field} {...props} />
				) : (
					<Box
						p='10px'
						cursor='pointer'
						onClick={handleClick}
						alignItems='center'
						justifyContent='center'
						width={width ? width : '230px'}
						borderBottom='1px solid #C2C5E1'
					>
						<Text fontSize='13px' color='#9b9b9b'>{currentValue}</Text>
					</Box>
				)}
				<ButtonBase ml='10px' width='30px' onClick={handleClick} type='button'>
					{edit ? 'Cancel' : 'Edit'}
				</ButtonBase>
			</Box>
			{meta.touched && meta.error && <Text color='red'>{meta.error}</Text>}
		</Box>
	);
}

export default EditTextarea;

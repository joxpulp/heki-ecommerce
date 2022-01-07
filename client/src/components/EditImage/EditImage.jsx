import React, { useEffect, useState } from 'react';
import { Box } from '../Box/Box';
import { Image } from '../Image/Image';
import { MdDelete } from 'react-icons/md';
import { useSelector } from 'react-redux';

function EditImage({ currentImage, file, label, onCancel }) {
	const [previewImage, setPreviewImage] = useState(null);
	const mimeType = ['image/png', 'image/jpeg', 'image/jpg'];
	const { successMsg } = useSelector((state) => state.ui);

	const reader = new FileReader();
	file && reader.readAsDataURL(file);
	reader.onload = () => {
	 	mimeType.includes(file.type) && setPreviewImage(reader.result);
	};

	const handleOnCancel = () => {
		setPreviewImage(null);
		onCancel();
	};

	useEffect(() => {
		setPreviewImage(null);
	}, [successMsg]);

	return (
		<Box position='relative'>
			{previewImage && (
				<Box
					position='absolute'
					right='0'
					cursor='pointer'
					zIndex={2}
					onClick={handleOnCancel}
				>
					<MdDelete color='#fa6868' fontSize='35px' />
				</Box>
			)}
			<label htmlFor={label}>
				<Image
					cursor='pointer'
					width='150px'
					m='10px'
					borderRadius='10px'
					src={previewImage ? previewImage : currentImage}
				/>
			</label>
		</Box>
	);
}

export default EditImage;

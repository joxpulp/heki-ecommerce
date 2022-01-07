import styled from 'styled-components';
import { space, color, typography, layout, flexbox, position } from 'styled-system';
import { motion } from 'framer-motion';

export const InputBase = styled(motion.input)`
	${space}
	${color}
	${typography}
	${layout}
	${flexbox}
	${position}
	font-size: 20px;
	color: ${(props) =>
		props.color ? props.color : props.theme.colors.secondary};
	padding: ${(props) => (props.padding ? props.padding : '10px')};
	width: ${(props) => (props.width ? props.width : '50%')};
	height: ${(props) => (props.height ? props.height : 'auto')};
	border: ${(props) => (props.border ? props.border : '1px solid #C2C5E1')};
	border-radius: ${(props) =>
		props.borderRadius ? props.borderRadius : '2px'};
	transition: all 0.2s ease-in-out;
	outline: none;
	
	&:focus {
		box-shadow: 0px 0px 5px 2px rgb(29, 31, 39, 0.1);
	}

	&:invalid {
		border: 1px solid #ff7d87;
	}

	&::placeholder {
		color: ${(props) => props.theme.colors.subtext};
	}
`;
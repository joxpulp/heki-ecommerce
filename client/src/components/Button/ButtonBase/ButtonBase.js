import styled from 'styled-components';
import { space, color, typography, layout, flexbox, position } from 'styled-system';
import { motion } from 'framer-motion';

export const ButtonBase = styled(motion.button)`
	${space}
	${color}
	${typography}
	${layout}
	${flexbox}
	${position}
	display: -webkit-flex;
	align-items: center;
	justify-content: center;
	-webkit-justify-content: center;
	width: ${(props) => (props.width ? props.width : '120px')};
	height: ${(props) => (props.height ? props.height : '48px')};
	padding: ${(props) => (props.padding ? props.padding : '24px')};
	background-color: ${(props) => (props.bg ? props.bg : '#EDEDED')};
	color: ${(props) => (props.color ? props.color : '#A3A3A3')};
	border-radius: ${(props) =>
		props.borderRadius ? props.borderRadius : '3px'};
	outline: none;
	border: none;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	backdrop-filter: ${(props) => props.glass && 'blur( 30px)'};
	-webkit-backdrop-filter: ${(props) => props.glass && 'blur(30px)'};
	&:focus {
		box-shadow: 0px 0px 5px 2px
			${(props) => (props.focusColor ? props.focusColor : 'rgb(29,31,39, .2)')};
		${(props) => props.focusScale && 'transform: scale(1.1);'}
	}
	&:hover {
		background-color: ${(props) => props.hover && props.focusColor};
		color: ${(props) => props.hover && props.bg};
		${(props) => props.focusScale && 'transform: scale(1.2);'}
	}

	&:disabled {
		background-color: ${(props) => props.theme.colors.subtext};
		color: ${(props) => props.theme.colors.secondary};
	}
`;

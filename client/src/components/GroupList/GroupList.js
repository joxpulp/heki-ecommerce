import styled from 'styled-components';
import { space, layout, flexbox, position, color } from 'styled-system';
import { motion } from 'framer-motion';

export const GroupList = styled(motion.ul)`
	${space}
	${layout}
	${flexbox}
	${position}
	${color}
	z-index: 100;
	transition: all .2s ease-in-out;
`;

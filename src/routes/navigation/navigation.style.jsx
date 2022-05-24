import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const NavigationContainer = styled.div`
	height: 70px;
	margin: 20px 0;
	padding: 0 30px;
	width: 100%;
	display: flex;
	justify-content: space-between;
`;

export const LogoContainer = styled(Link)`
	display: flex;
	align-items: center;
`;

export const NavLinks = styled.div`
	width: 70%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

export const NavLink = styled(Link)`
	padding: 10px 15px;
	// 			cursor: pointer;
`;

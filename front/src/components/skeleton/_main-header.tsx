import { bignumber, round } from 'mathjs';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import PH from '../loaders/ph';

const MainHeader = () => {
	const gp = useAppSelector((state) => state.gasPrice.value);
	return (
		<div className='main-header'>
			<div className='main-header-title'>
				<Link to={'/'}>Simple Ethereum blockchain explorer</Link>
			</div>
			<div className='main-header-gasprice'>
				<div className='text'>⛽ Gas Price:</div>
				<div className='val'>
					{gp !== null ? round(bignumber(gp), 4).toString() + ' Gwei' : <PH />}
				</div>
			</div>
		</div>
	);
};

export default MainHeader;

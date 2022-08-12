import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { CTE } from '../cts';
import HomeLayout from '../layouts/_home-layout';
import { BlockTransactionString } from 'web3-eth';
import nProgress from 'nprogress';
import PH from '../components/loaders/ph';
import { bignumber, format, multiply } from 'mathjs';

interface BlockDataResult {
	hasError: boolean;
	data?: BlockTransactionString | null;
	nodeError: boolean;
	synError: boolean;
}

const BlockPage = () => {
	const params = useParams();
	const [blockData, setBlockData] = useState<null | BlockDataResult>(null);
	const [done, setDone] = useState<boolean>(false);
	useEffect(() => {
		const id = params.id;
		if (typeof id === 'undefined') {
			toast.error('No block identifier was found.');
		}
		nProgress.start();
		axios.get(CTE.api + 'block/' + id).then((res) => {
			nProgress.done();
			if (res.status === 200) {
				setBlockData(res.data);
			} else {
				toast.error('Backend not working properly');
			}
		});
	}, []);
	useEffect(() => {
		if (blockData !== null) {
			if (blockData.synError) {
				toast.error('Block identifier (number or hash) is not valid');
				return;
			}
			if (blockData.nodeError) {
				toast.error('Node is working properly');
				return;
			}
			if (blockData.hasError) {
				toast.error('Block was not found in the blockchain');
				return;
			}
			setDone(true);
		}
	}, [blockData]);
	return (
		<>
			<HomeLayout>
				<div className='block-page'>
					<div className='block-page-title'>Block Data</div>
					{!done ? (
						<PH />
					) : (
						(() => {
							return (
								<div className='block-data'>
									<div className='item'>
										<div className='label'>Block Height:</div>
										<div className='val'>{blockData?.data?.number}</div>
									</div>
									<div className='item'>
										<div className='label'>Timestamp:</div>
										<div className='val'>
											{new Intl.DateTimeFormat('en-US', {
												timeStyle: 'full',
												dateStyle: 'full',
												timeZone: 'UTC',
											}).format((blockData?.data?.timestamp as number) * 1000)}
										</div>
									</div>
									<div className='item'>
										<div className='label'>Transactions:</div>
										<div className='val'>
											{blockData?.data?.transactions.length}
										</div>
									</div>
									<div className='item'>
										<div className='label'>Mined by:</div>
										<div className='val'>{blockData?.data?.miner}</div>
									</div>
									<div className='item'>
										<div className='label'>Size:</div>
										<div className='val'>
											{blockData?.data?.size.toLocaleString()} bytes
										</div>
									</div>
									<div className='item'>
										<div className='label'>Gas Used:</div>
										<div className='val'>
											{blockData?.data?.gasUsed.toLocaleString()}
										</div>
									</div>
									<div className='item'>
										<div className='label'>Gas Limit:</div>
										<div className='val'>
											{blockData?.data?.gasLimit.toLocaleString()}
										</div>
									</div>
									<div className='item'>
										<div className='label'>Base Fee Per Gas:</div>
										<div className='val'>
											{format(
												multiply(
													bignumber(blockData?.data?.baseFeePerGas),
													bignumber(1e-9)
												),
												{
													notation: 'fixed',
												}
											)}{' '}
											Gwei
										</div>
									</div>
									<div className='item'>
										<div className='label'>Hash:</div>
										<div className='val'>{blockData?.data?.hash}</div>
									</div>
									<div className='item'>
										<div className='label'>All Transactions:</div>
										<div className='val'>12546745</div>
									</div>
								</div>
							);
						})()
					)}
				</div>
			</HomeLayout>
		</>
	);
};

export default BlockPage;

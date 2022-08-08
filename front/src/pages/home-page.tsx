import HomeLayout from '../layouts/_home-layout';
import axios from 'axios';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { CTE } from '../cts';
import nProgress from 'nprogress';
import PH from '../components/loaders/ph';
import { multiply, bignumber, format } from 'mathjs';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const HomePage = () => {
	const tbody_ref = useRef() as MutableRefObject<HTMLTableSectionElement>;
	const lb_ph_ref = useRef() as MutableRefObject<HTMLDivElement>;
	const [latest_blocks, setLatestBlocks] = useState<
		| null
		| {
				number: number;
				txs_count: number;
				burnt: number;
		  }[]
	>(null);
	const [nodeStatus, setNodeStatus] = useState<null | {
		is_node_running: boolean;
		has_peers: boolean;
		is_synced: boolean;
	}>(null);
	useEffect(() => {
		nProgress.start();
		axios.get(CTE.api + 'latestblocks').then((response) => {
			nProgress.done();
			if (response.status === 200) {
				if (!response.data.node_status) {
					toast.error('Node not working properly');
				} else {
					setLatestBlocks(response.data.data);
				}
			} else {
				toast.error('Backend not working properly');
			}
		});
	}, []);
	useEffect(() => {
		if (latest_blocks !== null) {
			lb_ph_ref.current.style.display = 'none';
			tbody_ref.current.style.display = '';
		}
	}, [latest_blocks]);
	useEffect(() => {
		axios
			.get(CTE.api + 'status')
			.then((res) => {
				if (res.status === 200) {
					setNodeStatus(res.data);
				} else {
					toast.error('Backend not working properly');
				}
			})
			.catch(() => {
				toast.error('Backend not working properly');
			});
	}, []);
	useEffect(() => {
		if (nodeStatus !== null) {
			if (
				!nodeStatus.has_peers ||
				!nodeStatus.is_node_running ||
				!nodeStatus.is_synced
			) {
				toast.error(
					'Eth node is down or out of sync or there are no available peers at the moment'
				);
			} else {
				toast.success('Node is working properly');
			}
		}
	}, [nodeStatus]);
	return (
		<HomeLayout>
			<div className='home-page'>
				<div className='latest-blocks'>
					<h4 className='latest-blocks-title'>Latest blocks</h4>
					<table>
						<thead>
							<tr>
								<th>Number</th>
								<th>Txs Count</th>
								<th className='last-lb'>Burnt 🔥</th>
							</tr>
						</thead>
						<tbody style={{ display: 'none' }} ref={tbody_ref}>
							{latest_blocks !== null
								? latest_blocks.map((e, index) => {
										return (
											<tr key={index}>
												<td>
													<Link to={'/block'}>{e.number}</Link>
												</td>
												<td>{e.txs_count}</td>
												<td className='last-lb'>
													{format(
														multiply(bignumber(e.burnt), bignumber(1e-18)),
														{ notation: 'fixed' }
													)}{' '}
													ETH
												</td>
											</tr>
										);
								  })
								: null}
						</tbody>
					</table>
					<div ref={lb_ph_ref} className='latest-blocks-ph'>
						<PH />
					</div>
				</div>
				<div className='right-panel'>
					<div className='node-status'>
						<div className='node-status-title'>🌐 Node Status</div>
						<div className='node-status-details'>
							<div className='text-line'>
								Node up and running :{' '}
								<div className='res'>
									{nodeStatus === null ? (
										<PH />
									) : !nodeStatus.is_node_running ? (
										'❌'
									) : (
										'✔️'
									)}
								</div>
							</div>
							<div className='text-line'>
								Node has peers:{' '}
								<div className='res'>
									{nodeStatus === null ? (
										<PH />
									) : !nodeStatus.has_peers ? (
										'❌'
									) : (
										'✔️'
									)}
								</div>
							</div>
							<div className='text-line'>
								Node is synced:{' '}
								<div className='res'>
									{nodeStatus === null ? (
										<PH />
									) : !nodeStatus.is_synced ? (
										'❌'
									) : (
										'✔️'
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</HomeLayout>
	);
};

export default HomePage;

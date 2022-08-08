import axios from 'axios';
import { ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';
import { CTE } from './cts';
import { useAppDispatch } from './redux/hooks';
import { update } from './redux/slices/gas-price-slice';

const ContextWrap = (props: { children: ReactNode }) => {
	const dispatch = useAppDispatch();
	useEffect(() => {
		axios.get(CTE.api + 'gasprice').then((res) => {
			if (res.status === 200) {
				if (!res.data.node_status) {
					toast.error('Node not working properly');
				} else {
					dispatch(update(res.data.data));
				}
			} else {
				toast.error('Backend not working properly');
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return <>{props.children}</>;
};

export default ContextWrap;

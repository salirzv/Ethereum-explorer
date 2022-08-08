import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import BlockPage from './pages/block-page';
import HomePage from './pages/home-page';
import store from './redux/store';
import { Provider } from 'react-redux';
import ContextWrap from './context';

function App() {
	return (
		<>
			<Provider store={store}>
				<ContextWrap>
					<BrowserRouter>
						<ToastContainer />
						<Routes>
							<Route path='/' element={<HomePage />} />
							<Route path='/block' element={<BlockPage />} />
						</Routes>
					</BrowserRouter>
				</ContextWrap>
			</Provider>
		</>
	);
}

export default App;

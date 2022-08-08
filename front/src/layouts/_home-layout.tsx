import MainHeader from '../components/skeleton/_main-header';

const HomeLayout = (props: { children: React.ReactNode }) => {
	return (
		<>
			<div className='_rez_container'>
				<MainHeader />
				{props.children}
			</div>
		</>
	);
};

export default HomeLayout;

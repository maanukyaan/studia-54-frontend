export default function Button({
	children,
}: {
	children: string | React.JSX.Element;
}) {
	return (
		<div>
			<button className='text-black px-[50px] py-[20px] border border-black rounded-[57px] hover:bg-[#2969CA] hover:text-white hover:border-transparent active:bg-[#15458D] transition-all'>
				{children}
			</button>
		</div>
	);
}

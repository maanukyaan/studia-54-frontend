export default function Tab({
	active,
	children,
}: {
	active?: boolean;
	children: string | React.JSX.Element;
}) {
	return (
		<button
			className={`text-white bg-transparent border-2 border-transparent px-[50px] py-[25.5px] rounded-[57px] text-[18px] font-normal leading-[21.78px] hover:border-[#2969CA] active:border-white transition-all ${
				active ? 'border-white' : ''
			}`}
		>
			{children}
		</button>
	);
}

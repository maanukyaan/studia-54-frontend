import Link from 'next/link';
import { navItems } from '../../config/navItems';

export default function Footer() {
	return (
		<footer className='py-[40px] px-[60px] border border-[#5B5C5D] border-l-0 border-r-0 border-b-0 flex items-center justify-between'>
			<div>
				<Link
					href='/'
					className='font-normal text-[36px] leading-[43.57px] mr-[15px]'
				>
					architecture
				</Link>
				<span className='text-[#5B5C5D] font-normal text-[16px] leading-[19.36px]'>
					(с) 2024, all rights reserved
				</span>
			</div>
			<div className={`flex items-center`}>
				<ul className='flex items-center gap-x-[35px]'>
					{navItems?.map(item => (
						<li key={item.href}>
							<Link href={item.href}>{item.label}</Link>
						</li>
					))}
				</ul>
				<div className='h-[19px] w-[1px] bg-white mx-[24px]'></div>
				<button
				// onClick={() => toast.success('We are calling you right now...')}
				>
					Call me
				</button>
				<div className='h-[19px] w-[1px] bg-white mx-[24px]'></div>
				<a href='tel:+79118183410'>+7 (911) 818-34-10</a>
			</div>
		</footer>
	);
}

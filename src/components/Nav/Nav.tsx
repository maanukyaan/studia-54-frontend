'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '../../../config/navItems';

import classes from './Nav.module.css';

function Nav() {
	const pathname = usePathname();

	return (
		<nav className='flex justify-between items-center w-full h-[90px] bg-headerBackground text-navTextBlack border border-b border-navBorder py-[27px] px-[60px]'>
			<div>
				<Link href='/' className='font-normal text-[36px] leading-[43.57px]'>
					architecture
				</Link>
			</div>
			<div className={`flex items-center ${classes.nav__menu}`}>
				<ul className='flex items-center gap-x-[35px]'>
					{navItems?.map(item => (
						<li key={item.href}>
							<Link
								href={item.href}
								className={`${
									pathname.startsWith(item.href) ? classes.active : ''
								} ${classes.link}`}
							>
								{item.label}
							</Link>
						</li>
					))}
				</ul>
				<div className='h-[19px] w-[1px] bg-[#9C9393] mx-[24px]'></div>
				<button
				// onClick={() => toast.success('We are calling you right now...')}
				>
					Call me
				</button>
				<div className='h-[19px] w-[1px] bg-[#9C9393] mx-[24px]'></div>
				<a href='tel:+79118183410' className={classes.link}>
					+7 (911) 818-34-10
				</a>
			</div>
		</nav>
	);
}

export default Nav;

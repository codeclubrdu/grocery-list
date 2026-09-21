'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu } from 'lucide-react';

export default function Navbar({ pageTitle, logOut }: { pageTitle: string; logOut: () => void }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const buttonFormat =
		'rounded-lg font-bold bg-amber-600 text-white px-3 py-2 transition hover:bg-amber-700 hover:shadow-md hover:shadow-black/25';

	return (
		<div className="bg-lime-700 drop-shadow">
			<header className="mx-auto flex w-full max-w-188 items-center justify-between rounded bg-lime-700 px-4 py-6 text-black">
				<p className="text-4xl font-bold tracking-tight text-white">{pageTitle}</p>

				<ul className="hidden items-center gap-8 md:flex">
					<Link href="/main-list" className={buttonFormat}>
						Shopping List
					</Link>
					<Link href="/history" className={buttonFormat}>
						History
					</Link>
					<button onClick={logOut} className={buttonFormat}>
						Log Out
					</button>
				</ul>

				<Menu
					size={40}
					className="me-6 hover:shadow-md hover:shadow-black/25 md:hidden"
					onClick={() => setIsMenuOpen(!isMenuOpen)}
				></Menu>

				<div
					className={`absolute top-24 left-0 flex w-full transform flex-col items-center bg-white text-lg font-semibold transition-transform md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
					style={{ transition: 'transform 0.2s ease, opacity 0.2s ease' }}
				>
					<Link
						href="/main-list"
						className="w-full list-none p-4 text-center transition hover:bg-amber-300"
					>
						Shopping List
					</Link>

					<Link
						href="/history"
						className="w-full list-none p-4 text-center transition hover:bg-amber-300"
					>
						History
					</Link>

					<button
						onClick={logOut}
						type="submit"
						className="w-full list-none p-4 text-center transition hover:bg-amber-300"
					>
						Log Out
					</button>
				</div>
			</header>
		</div>
	);
}

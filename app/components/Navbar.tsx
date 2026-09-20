'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu } from 'lucide-react';

export default function Navbar({ pageTitle, logOut }: { pageTitle: string; logOut: () => void }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<>
			<header className="m-2 flex items-center justify-between rounded bg-amber-200 px-8 py-6 text-black shadow md:px-32">
				<p className="text-4xl font-bold tracking-tight text-gray-900">{pageTitle}</p>

				<ul className="hidden items-center gap-12 md:flex">
					<Link
						href="/main-list"
						className="rounded border bg-amber-50 p-3 transition hover:bg-amber-300"
					>
						Shopping List
					</Link>
					<Link
						href="/history"
						className="rounded border bg-amber-50 p-3 transition hover:bg-amber-300"
					>
						History
					</Link>
					<button
						onClick={logOut}
						className="rounded border bg-amber-50 p-3 transition hover:bg-amber-300"
					>
						Log Out
					</button>
				</ul>

				<Menu size={40} className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}></Menu>

				<div
					className={`absolute top-24 left-0 m-2 flex w-full transform flex-col items-center rounded bg-white text-lg font-semibold transition-transform md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
					style={{ transition: 'transform 0.3s ease, opacity 0.3s ease' }}
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
		</>
	);
}

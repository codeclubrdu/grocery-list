'use client';
import { useState } from 'react';
import { Menu } from 'lucide-react';

export default function Navbar({ pageTitle }: { pageTitle: string }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<>
			<header className="m-2 flex items-center justify-between rounded bg-amber-200 px-8 py-6 text-black shadow md:px-32">
				<p className="text-4xl font-bold tracking-tight text-gray-900">{pageTitle}</p>

				<ul className="hidden items-center gap-12 md:flex">
					<li className="rounded border bg-amber-50 p-3 transition hover:bg-amber-300">
						Shopping List
					</li>
					<li className="rounded border bg-amber-50 p-3 transition hover:bg-amber-300">History</li>
					<li className="rounded border bg-amber-50 p-3 transition hover:bg-amber-300">Log Out</li>
				</ul>

				<Menu className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}></Menu>

				<div
					className={`absolute top-24 left-0 flex w-full transform flex-col items-center gap-6 border bg-amber-50 text-lg font-semibold transition-transform md:hidden ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
					style={{ transition: 'transform 0.3s ease, opacity 0.3s ease' }}
				>
					<li className="w-full list-none p-4 text-center transition hover:bg-amber-300">
						Shopping List
					</li>
					<li className="w-full list-none p-4 text-center transition hover:bg-amber-300">
						History
					</li>
					<li className="w-full list-none p-4 text-center transition hover:bg-amber-300">
						Log Out
					</li>
				</div>
			</header>
		</>
	);
}

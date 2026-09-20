'use client';

export default function Navbar({ pageTitle }: { pageTitle: string }) {
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
			</header>
		</>
	);
}

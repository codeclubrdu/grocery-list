import Link from 'next/link';

export default function AddToList({
	setActive,
	removeChecks,
	logOut,
}: {
	setActive: () => Promise<void>;
	removeChecks: () => Promise<void>;
	logOut: () => void;
}) {
	return (
		// Passing in handleSubmit prop to trigger addItem function on form submission

		<div className="mx-auto my-2 flex w-fit flex-col rounded border bg-amber-50 p-3">
			<div className="mx-auto flex w-full max-w-2xl flex-wrap">
				<div className="flex flex-col justify-end p-2">
					<button type="button" onClick={setActive} className="rounded-lg border bg-gray-200 p-1">
						Move Items to List
					</button>
				</div>
				<div className="flex flex-col justify-end p-2">
					<Link href="/main-list" className="rounded-lg border bg-gray-200 p-1">
						Go to List Page
					</Link>
				</div>
				<div className="flex flex-col justify-end p-2">
					<button
						type="button"
						onClick={removeChecks}
						className="rounded-lg border bg-gray-200 p-1"
					>
						Delete Checked Items
					</button>
				</div>
				<div className="flex flex-col justify-end p-2">
					<button type="button" onClick={logOut} className="rounded-lg border bg-gray-200 p-1">
						Log Out
					</button>
				</div>
			</div>
		</div>
	);
}

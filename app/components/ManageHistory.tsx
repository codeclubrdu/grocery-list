export default function AddToList({
	setActive,
	removeChecks,
}: {
	setActive: () => Promise<void>;
	removeChecks: () => Promise<void>;
	logOut: () => void;
}) {
	return (
		// Passing in handleSubmit prop to trigger addItem function on form submission

		<div className="mb-3 flex w-full max-w-3xl min-w-0 flex-col self-center px-2">
			<div className="flex flex-col rounded-3xl bg-zinc-200 px-4 py-6">
				<div className="flex w-full flex-row justify-between gap-4">
					<button
						type="button"
						onClick={setActive}
						className="w-full rounded-lg bg-amber-600 px-3 py-2 font-medium text-white hover:bg-amber-700 hover:shadow-md hover:shadow-black/25"
					>
						Move Items to List
					</button>

					<button
						type="button"
						onClick={removeChecks}
						className="w-full rounded-lg bg-amber-600 px-3 py-2 font-medium text-white hover:bg-amber-700 hover:shadow-md hover:shadow-black/25"
					>
						Remove From History
					</button>
				</div>
			</div>
		</div>
	);
}

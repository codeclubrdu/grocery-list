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
			<div className="flex flex-wrap rounded-3xl bg-amber-50 p-3">
				<div className="flex flex-col justify-end p-2">
					<button
						type="button"
						onClick={setActive}
						className="rounded-xl bg-lime-600 px-3 py-2 font-medium text-white"
					>
						Move Items to List
					</button>
				</div>
				<div className="flex flex-col justify-end p-2">
					<button
						type="button"
						onClick={removeChecks}
						className="rounded-xl bg-lime-600 px-3 py-2 font-medium text-white"
					>
						Delete Checked Items
					</button>
				</div>
			</div>
		</div>
	);
}

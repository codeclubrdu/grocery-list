import Form from 'next/form';

export default function AddToList({
	handleSubmit,
	removeChecks,
	warning,
}: {
	handleSubmit: (formData: FormData) => Promise<void>;
	removeChecks: () => Promise<void>;
	warning: string;
}) {
	return (
		// Passing in handleSubmit prop to trigger addItem function on form submission

		<div className="flex flex-col">
			<div id="warner" className="mx-auto flex w-full max-w-2xl flex-wrap px-2 text-red-500">
				{warning}
			</div>
			<Form action={handleSubmit} className="mx-auto flex w-full max-w-2xl flex-wrap">
				<div className="flex flex-col p-2">
					<label htmlFor="itemName">Item</label>
					<input
						type="text"
						id="itemName"
						name="itemName"
						placeholder="Milk"
						className="rounded-lg border p-1"
					/>
				</div>
				<div className="flex flex-col p-2">
					<label htmlFor="quantity">Quantity</label>
					<input
						type="text"
						id="quantity"
						name="quantity"
						defaultValue="1"
						className="rounded-lg border p-1"
					/>
				</div>
				<div className="flex flex-col p-2">
					<label htmlFor="store">Store</label>
					<input
						type="text"
						id="store"
						name="store"
						placeholder="Wegman's"
						defaultValue="Food Lion"
						className="rounded-lg border p-1"
					/>
				</div>
				<div className="flex flex-col p-2">
					<label htmlFor="section">Section</label>
					<input
						type="text"
						id="section"
						name="section"
						placeholder="Dairy"
						className="rounded-lg border p-1"
					/>
				</div>
				<div className="flex flex-col justify-end p-2">
					<button type="submit" className="rounded-lg border bg-gray-200 p-1">
						Submit
					</button>
				</div>
				<div className="flex flex-col justify-end p-2">
					<button
						formAction={removeChecks}
						type="submit"
						className="rounded-lg border bg-gray-200 p-1"
					>
						Clear Checked Items
					</button>
				</div>
			</Form>
		</div>
	);
}

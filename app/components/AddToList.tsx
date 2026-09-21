import Form from 'next/form';

export default function AddToList({
	handleSubmit,
	moveChecks,
	warning,
}: {
	handleSubmit: (formData: FormData) => Promise<void>;
	moveChecks: () => Promise<void>;
	warning: string;
}) {
	return (
		// Passing in handleSubmit prop to trigger addItem function on form submission

		<div className="mb-3 flex w-full max-w-3xl min-w-0 flex-col self-center px-2">
			<Form action={handleSubmit} className="flex flex-wrap rounded-3xl bg-lime-200 p-3 shadow">
				<div id="warner" className="mx-auto flex w-full max-w-2xl flex-wrap px-2 text-red-500">
					{warning}
				</div>
				<div className="flex flex-col p-2">
					<label htmlFor="itemName">Item</label>
					<input
						type="text"
						id="itemName"
						name="itemName"
						placeholder="Milk"
						className="rounded-lg border bg-white p-1"
					/>
				</div>
				<div className="flex flex-col p-2">
					<label htmlFor="quantity">Quantity</label>
					<input
						type="text"
						id="quantity"
						name="quantity"
						defaultValue="1"
						className="rounded-lg border bg-white p-1"
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
						className="rounded-lg border bg-white p-1"
					/>
				</div>
				<div className="flex flex-col p-2">
					<label htmlFor="section">Section</label>
					<input
						type="text"
						id="section"
						name="section"
						placeholder="Dairy"
						className="rounded-lg border bg-white p-1"
						list="sectionList"
					/>
					<datalist id="sectionList">
						<option>Bakery</option>
						<option>Beverages</option>
						<option>Bread & Cereal</option>
						<option>Canned Goods</option>
						<option>Condiments</option>
						<option>Dairy</option>
						<option>Deli</option>
						<option>Frozen</option>
						<option>International</option>
						<option>Meat & Seafood</option>
						<option>Pasta & Rice</option>
						<option>Produce</option>
						<option>Snacks</option>
						<option>Spices</option>
						<option>Other</option>
					</datalist>
				</div>
				<div className="flex flex-col justify-end p-2">
					<button
						type="submit"
						className="rounded-lg bg-lime-600 px-3 py-2 font-medium text-white hover:bg-lime-700 hover:shadow-md hover:shadow-black/25"
					>
						Add Item
					</button>
				</div>
				<div className="flex flex-col justify-end p-2">
					<button
						formAction={moveChecks}
						type="submit"
						className="rounded-lg bg-lime-600 px-3 py-2 font-medium text-white hover:bg-lime-700 hover:shadow-md hover:shadow-black/25"
					>
						Clear Checked Items
					</button>
				</div>
			</Form>
		</div>
	);
}

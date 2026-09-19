import Form from 'next/form';
import Link from 'next/link';

export default function AddToList({
	handleSubmit,
	moveChecks,
	logOut,
	warning,
}: {
	handleSubmit: (formData: FormData) => Promise<void>;
	moveChecks: () => Promise<void>;
	logOut: () => void;
	warning: string;
}) {
	return (
		// Passing in handleSubmit prop to trigger addItem function on form submission

		<div className="mx-auto my-2 flex w-fit flex-col rounded border bg-amber-50 p-3">
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
					<button type="submit" className="rounded-lg border bg-gray-200 p-1">
						Add Item
					</button>
				</div>
				<div className="flex flex-col justify-end p-2">
					<button
						formAction={moveChecks}
						type="submit"
						className="rounded-lg border bg-gray-200 p-1"
					>
						Clear Checked Items
					</button>
				</div>
				<div className="flex flex-col justify-end p-2">
					<Link href="/history" className="rounded-lg border bg-gray-200 p-1">
						Go to History Page
					</Link>
				</div>
				<div className="flex flex-col justify-end p-2">
					<button formAction={logOut} type="submit" className="rounded-lg border bg-gray-200 p-1">
						Log Out
					</button>
				</div>
			</Form>
		</div>
	);
}

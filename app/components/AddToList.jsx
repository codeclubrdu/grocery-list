import Form from 'next/form';

export default function AddToList({ handleSubmit, removeChecks }) {
	return (
		// Passing in handleSubmit prop to trigger addItem function on form submission

		<div className="flex flex-row flex-wrap">
			<Form action={handleSubmit} className="flex flex-wrap w-full max-w-2xl mx-auto">
				<div className="flex flex-col p-2">
					<label htmlFor="itemName">Item</label>
					<input type="text" required id="itemName" name="itemName" placeholder="Milk" className="border p-1 rounded-lg" />
				</div>
				<div className="flex flex-col p-2">
					<label htmlFor="quantity">Quantity</label>
					<input type="text" id="quantity" name="quantity" defaultValue="1" className="border p-1 rounded-lg" />
				</div>
				<div className="flex flex-col p-2">
					<label htmlFor="store">Store</label>
					<input type="text" id="store" name="store" placeholder="Wegman's" defaultValue="Food Lion" className="border p-1 rounded-lg" />
				</div>
				<div className="flex flex-col p-2">
					<label htmlFor="section">Section</label>
					<input type="text" id="section" name="section" placeholder="Dairy" className="border p-1 rounded-lg" />
				</div>
				<div className="flex flex-col justify-end p-2">
					<button type="submit" className="rounded-lg border bg-gray-200 p-1">
						Submit
					</button>
				</div>
				<div className="flex flex-col justify-end p-2">
					<button formAction={removeChecks} type="submit" className="rounded-lg border bg-gray-200 p-1">Clear Checked Items</button>
				</div>
			</Form>
		</div>	
	);
}

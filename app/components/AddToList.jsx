import Form from 'next/form';


export default function AddToList() {
	// Need to make a function to add items to list or update list.  Ad ?? to Form action="??"
    

	return (
		<Form action="" className="flex flex-wrap">
			<div className="flex flex-col p-2">
				<label htmlFor="itemName">Item</label>
				<input type="text" id="itemName" name="itemName" placeholder="Milk" className="border" />
			</div>
			<div className="flex flex-col p-2">
				<label htmlFor="quantity">Quantity</label>
				<input type="text" id="quantity" name="quantity" defaultValue="1" className="border" />
			</div>
			<div className="flex flex-col p-2">
				<label htmlFor="store">Store</label>
				<input
					type="text"
					id="store"
					name="store"
					placeholder="Wegman's"
					className="border"
				/>
			</div>
			<div className="flex flex-col p-2">
				<label htmlFor="section">Section</label>
				<input type="text" id="section" name="section" placeholder="Dairy" className="border" />
			</div>
			<div className="flex flex-col justify-end p-2">
				<button type="submit" className="rounded-md border bg-gray-200 px-2">
					Submit
				</button>
			</div>
		</Form>
	);
}
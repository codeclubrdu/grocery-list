import Form from 'next/form';

type groceryObject = {
	name: string;
	quantity: number;
	section: string;
	store: string;
};

const groceryList: groceryObject[] = [
	{
		name: 'Milk',
		quantity: 2,
		section: 'dairy',
		store: 'Wegmans',
	},
	{
		name: "Frank's Red Hot",
		quantity: 1,
		section: 'contiments',
		store: 'Food Lion',
	},
	{
		name: 'Buffalo wings',
		quantity: 3,
		section: 'deli',
		store: 'Wegmans',
	},
];

export function ToBuyList() {
	return (
		<div className="m-10 flex flex-col text-center">
			<p className="m-5 text-2xl font-bold">Buy Now:</p>
			<ul>
				{groceryList.map((listItem) => (
					<li
						className="text-xl"
						key={listItem.name}
					>{`${listItem.name} x ${listItem.quantity}`}</li>
				))}
			</ul>
		</div>
	);
}

export function AddToList() {
	// Need to make a function to add items to list or update list.  Ad ?? to Form action="??"

	return (
		<Form action="" className="flex flex-wrap">
			<div className="flex flex-col p-2">
				<label htmlFor="itemName">Item</label>
				<input type="text" id="itemName" name="itemName" placeholder="Milk" className="border" />
			</div>
			<div className="flex flex-col p-2">
				<label htmlFor="itemName">Quantity</label>
				<input type="text" id="itemName" name="itemName" defaultValue="1" className="border" />
			</div>
			<div className="flex flex-col p-2">
				<label htmlFor="itemName">Store</label>
				<input
					type="text"
					id="itemName"
					name="itemName"
					placeholder="Wegman's"
					className="border"
				/>
			</div>
			<div className="flex flex-col p-2">
				<label htmlFor="itemName">Section</label>
				<input type="text" id="itemName" name="itemName" placeholder="Dairy" className="border" />
			</div>
			<div className="flex flex-col justify-end p-2">
				<button type="submit" className="rounded-md border bg-gray-200 px-2">
					Submit
				</button>
			</div>
		</Form>
	);
}

export default function Home() {
	return (
		<>
			<h1 className="m-8 text-center text-4xl font-bold tracking-tight text-gray-900">
				Grocery List
			</h1>
			<p className="text-center text-gray-500">
				Brought to you by Carl&apos;s Jr. <br />
				(and Code Club RDU)
			</p>
			<ToBuyList></ToBuyList>
			<AddToList></AddToList>
		</>
	);
}

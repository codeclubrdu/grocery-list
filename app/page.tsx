const groceryList = [
	{
		name: 'Milk',
		quantity: 2,
		section: 'dairy',
	},
	{
		name: "Frank's Red Hot",
		quantity: 1,
		section: 'contiments',
	},
	{
		name: 'Buffalo wings',
		quantity: 3,
		section: 'deli',
	},
];

function List() {
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
			<List></List>
		</>
	);
}

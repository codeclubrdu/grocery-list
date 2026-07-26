'use client';

import { useState } from 'react';
import AddToList from '@/app/components/AddToList.jsx';
import IntroStatement from '@/app/components/introStatement.jsx';

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

// Component to render the list. For some reason I left it in with the main page component.
export function ToBuyList({ listToRender }: { listToRender: groceryObject[] }) {
	// Create a list of each store with no duplicates
	// Get an array containing only the stores
	let storeList = listToRender.map((listItem) => listItem.store);
	// Remove duplicates
	storeList = storeList.filter((store, index) => storeList.indexOf(store) === index);

	return (
		<div className="mb-10 flex w-fit flex-col self-center">
			<ul>
				{storeList.map((store) => {
					const perStoreList = listToRender.filter((grocery) => grocery.store === store);

					return (
						<div key={store}>
							<p className="mt-8 mb-2 text-2xl font-bold">{store}</p>
							<ul>
								{perStoreList.map((listItem) => {
									const itemDisplay =
										listItem.quantity > 1
											? `${listItem.name} x ${listItem.quantity}`
											: `${listItem.name}`;

									return (
										<li className="flex text-xl" key={listItem.name}>
											<input
												type="checkbox"
												id="{listItem.name}"
												className="me-3 h-4 w-4 self-center"
											></input>
											<label htmlFor="{listItem.name}">{itemDisplay}</label>
										</li>
									);
								})}
							</ul>
						</div>
					);
				})}
			</ul>
		</div>
	);
}

// This is the actual main page component
export default function Home() {
	const [list, setList] = useState(groceryList);

	function addItem(formData: FormData) {
		const newGrocery: groceryObject = {
			name: formData.get('itemName') as string,
			quantity: Number(formData.get('quantity')),
			section: formData.get('section') as string,
			store: formData.get('store') as string,
		};

		setList([...list, newGrocery]);
	}

	return (
		<>
			<h1 className="m-8 text-center text-4xl font-bold tracking-tight text-gray-900">
				Grocery List
			</h1>
			<IntroStatement sponsor={"Carl's Jr."}></IntroStatement>
			<ToBuyList listToRender={list}></ToBuyList>
			<AddToList handleSubmit={addItem}></AddToList>
		</>
	);
}

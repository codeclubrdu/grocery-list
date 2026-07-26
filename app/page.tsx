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

// Initial list for development testing.  Sorted by section (code at end of array)
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
		name: 'Cheese',
		quantity: 1,
		section: 'dairy',
		store: 'Food Lion',
	},
	{
		name: 'Gritz',
		quantity: 1,
		section: 'cereal',
		store: 'Food Lion',
	},
	{
		name: 'Pickles',
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
].sort((a, b) => {
	const sectionA = a.section.toUpperCase();
	const sectionB = b.section.toUpperCase();
	if (sectionA < sectionB) {
		return -1;
	}
	if (sectionA > sectionB) {
		return 1;
	}
	return 0;
});

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
											<div className="flex gap-x-4 sm:col-span-2">
												<div className="flex items-center">
													<div className="group relative inline-flex w-8 shrink-0 rounded-full bg-gray-200 p-px inset-ring inset-ring-gray-900/5 outline-offset-2 outline-indigo-600 transition-colors duration-200 ease-in-out has-checked:bg-indigo-600 has-focus-visible:outline-2">
														<span className="size-4 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5"></span>
														<input
															type="checkbox"
															id="{listItem.name}"
															className="absolute inset-0 size-full appearance-none focus:outline-hidden"
														></input>
													</div>
												</div>
												<label htmlFor="{listItem.name}">{itemDisplay}</label>
											</div>
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

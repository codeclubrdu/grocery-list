'use client';

import { useState } from 'react';
import AddToList from '@/app/components/AddToList.jsx';
import IntroStatement from '@/app/components/introStatement.jsx';
import { Preahvihear } from 'next/font/google';

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
];

// Component to render the list. For some reason I left it in with the main page component.
export function ToBuyList({ listToRender, saveChecks }: { listToRender: groceryObject[] }) {
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
															name={listItem.name}

															onChange={saveChecks}
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

		// set list to add new item and sort first by section then by store
		setList(
			[...list, newGrocery]
				.sort((a, b) => {
					const sectionA = a.section.toUpperCase();
					const sectionB = b.section.toUpperCase();
					if (sectionA < sectionB) {
						return -1;
					}
					if (sectionA > sectionB) {
						return 1;
					}
					return 0;
				})
				.sort((a, b) => {
					const storeA = a.store.toUpperCase();
					const storeB = b.store.toUpperCase();
					if (storeA < storeB) {
						return -1;
					}
					if (storeA > storeB) {
						return 1;
					}
					return 0;
				}),
		);
	}

	// Keeping track of which checkboxes are checked
	const [checkedList, setCheckedList] = useState({});

	function saveCheckState(e) {
		const name = e.target.name;
		const isChecked = e.target.checked;
		setCheckedList((prev) => ({ ...prev, [name]: isChecked }));
	}
	console.log(checkedList);

	// Function to delete checked items from list
	// Dude.  Just add an isChecked property to the list items and manage through that.
	function deleteChecks() {
		for (const item of list) {
			//console.log(item);
			if (item.name in checkedList && checkedList[item.name]) {
				console.log(item.name);
				const updatedList = list.filter((grocery) => grocery['name'] != item.name);
				console.log(updatedList);
				setList(updatedList);
			}
		}
	}

	return (
		<>
			<h1 className="m-8 text-center text-4xl font-bold tracking-tight text-gray-900">
				Grocery List
			</h1>
			<IntroStatement sponsor={"Carl's Jr."}></IntroStatement>
			<ToBuyList listToRender={list} saveChecks={saveCheckState}></ToBuyList>
			<AddToList handleSubmit={addItem} removeChecks={deleteChecks}></AddToList>
		</>
	);
}

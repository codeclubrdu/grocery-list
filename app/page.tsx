'use client';

import { useState, useEffect, type ChangeEvent, type ChangeEventHandler } from 'react';
import AddToList from '@/app/components/AddToList.jsx';
import IntroStatement from '@/app/components/IntroStatement.jsx';
import { addToDB, deleteFromDB, checkDB, fullList } from '@/app/components/TursoAuth';

type groceryObject = {
	name: string;
	quantity: number;
	section: string;
	store: string;
	isChecked: boolean;
};

// Initial list for development testing.  Sorted by section (code at end of array)
const groceryList: groceryObject[] = [];

// Component to render the list. For some reason I left it in with the main page component.
export function ToBuyList({
	listToRender,
	saveChecks,
}: {
	listToRender: groceryObject[];
	saveChecks: ChangeEventHandler<HTMLInputElement>;
}) {
	// Create a list of each store with no duplicates
	// Get an array containing only the stores
	let storeList = listToRender.map((listItem) => listItem.store);
	// Remove duplicates
	storeList = storeList.filter((store, index) => storeList.indexOf(store) === index);

	return (
		<div className="mb-10 flex w-fit flex-col self-center">
			<ul>
				{
					// For each store, list each store and for each do all the stuff below
					storeList.map((store) => {
						// Get list of items specific to each store
						const perStoreList = listToRender.filter((grocery) => grocery.store === store);

						return (
							<div key={store}>
								<p className="mt-8 mb-2 text-2xl font-bold">{store}</p>
								<ul>
									{
										// List items under their coresponding stores
										perStoreList.map((listItem) => {
											const itemDisplay =
												listItem.quantity > 1
													? `${listItem.name} x ${listItem.quantity}`
													: `${listItem.name}`;

											const preCheck = listItem.isChecked ? true : false;

											return (
												<li className="flex text-xl" key={listItem.name}>
													<div className="flex gap-x-4 sm:col-span-2">
														<div className="flex items-center">
															<div className="group relative inline-flex w-8 shrink-0 rounded-full bg-gray-200 p-px inset-ring inset-ring-gray-900/5 outline-offset-2 outline-indigo-600 transition-colors duration-200 ease-in-out has-checked:bg-indigo-600 has-focus-visible:outline-2">
																<span className="size-4 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5"></span>
																<input
																	id={listItem.name}
																	type="checkbox"
																	checked={preCheck}
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
										})
									}
								</ul>
							</div>
						);
					})
				}
			</ul>
		</div>
	);
}

// This is the actual main page component
export default function Home() {
	const [list, setList] = useState(groceryList);

	async function addItem(formData: FormData) {
		const newGrocery: groceryObject = {
			name: formData.get('itemName') as string,
			quantity: Number(formData.get('quantity')),
			section: formData.get('section') as string,
			store: formData.get('store') as string,
			isChecked: false,
		};

		console.log(newGrocery);
		await addToDB(newGrocery);

		// set list to add new item and sort first by section then by store
		setList([...list, newGrocery]);
	}

	useEffect(() => {
		async function loadGroceries() {
			const groceryDB = await fullList();
			console.log(groceryDB);
			setList(
				groceryDB
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

		void loadGroceries();
	}, []);

	// Keeping track of which checkboxes are checked

	async function saveCheckState(e: ChangeEvent<HTMLInputElement>) {
		const name = e.target.name;
		const isChecked = e.target.checked;
		const updatedList = list.map((item) => {
			if (item.name === name) {
				return {
					...item,
					isChecked: isChecked,
				};
			}

			return item;
		});

		setList(updatedList);
		//console.log(updatedList);
		await checkDB(name, isChecked);
	}

	// Function to delete checked items from list
	async function deleteChecks() {
		const keepList = list.filter((grocery) => !grocery.isChecked);
		setList(keepList);

		const deleteList = list.filter((grocery) => grocery.isChecked);
		//console.log(deleteList);

		await deleteFromDB(deleteList);
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

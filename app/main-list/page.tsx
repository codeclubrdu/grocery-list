'use client';

import { useState, useEffect, type ChangeEvent } from 'react';
import AddToList from '@/app/components/AddToList';
import IntroStatement from '@/app/components/IntroStatement';
import ToBuyList from '@/app/components/ToBuyList';
import { addToDB, deleteFromDB, checkDB, fullList } from '@/app/components/TursoAuth';
import { type groceryObject } from '@/app/components/TypeDefinitions';

// Initial list for development testing.  Sorted by section (code at end of array)
const groceryList: groceryObject[] = [];

// This is the actual main page component
export default function Home() {
	const [list, setList] = useState(groceryList);
	const [warning, setWarning] = useState('');

	async function addItem(formData: FormData) {
		const newGrocery: groceryObject = {
			name: formData.get('itemName') as string,
			quantity: Number(formData.get('quantity')),
			section: formData.get('section') as string,
			store: formData.get('store') as string,
			isChecked: false,
		};

		if (!newGrocery.name) {
			setWarning('Please add an item!');
			setTimeout(() => {
				setWarning('');
			}, 5000);
			return;
		} else {
			console.log(newGrocery.name);
			await addToDB(newGrocery);

			// set list to add new item and sort first by section then by store
			setList([...list, newGrocery]);
		}
	}

	useEffect(() => {
		async function loadGroceries() {
			const groceryDB = await fullList();
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
			<AddToList handleSubmit={addItem} removeChecks={deleteChecks} warning={warning}></AddToList>
		</>
	);
}

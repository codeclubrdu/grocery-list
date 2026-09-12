'use client';

import { useState, type ChangeEvent } from 'react';
import AddToList from '@/app/components/AddToList';
import IntroStatement from '@/app/components/IntroStatement';
import ToBuyList from '@/app/components/ToBuyList';
import { addToDB, deleteFromDB, checkDB } from '@/app/components/TursoAuth';
import { type groceryObject } from '@/app/components/TypeDefinitions';

// This is the actual main page component
export default function Home({
	initialList,
	userName,
}: {
	initialList: groceryObject[];
	userName: string;
}) {
	const [list, setList] = useState<groceryObject[]>(initialList);
	const [warning, setWarning] = useState('');

	async function addItem(formData: FormData) {
		const newGrocery: groceryObject = {
			name: formData.get('itemName') as string,
			quantity: Number(formData.get('quantity')),
			section: formData.get('section') as string,
			store: formData.get('store') as string,
			isChecked: false,
			userName: userName,
		};

		if (!newGrocery.name) {
			setWarning('Please add an item!');
			setTimeout(() => {
				setWarning('');
			}, 5000);
			return;
		} else {
			await addToDB(newGrocery);
			setList([...list, newGrocery]);
		}
	}

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
		await checkDB(name, isChecked);
	}

	// Function to delete checked items from list
	async function deleteChecks() {
		const keepList = list.filter((grocery) => !grocery.isChecked);
		setList(keepList);

		const deleteList = list.filter((grocery) => grocery.isChecked);

		await deleteFromDB(deleteList);
	}

	function logOut() {
		document.cookie = 'userName=; Path=/; Max-Age=0;';
		window.location.replace('/');
	}

	return (
		<>
			<h1 className="m-8 text-center text-4xl font-bold tracking-tight text-gray-900">
				Grocery List
			</h1>
			<IntroStatement sponsor={"Carl's Jr."}></IntroStatement>
			<ToBuyList listToRender={list} saveChecks={saveCheckState}></ToBuyList>
			<AddToList
				handleSubmit={addItem}
				removeChecks={deleteChecks}
				logOut={logOut}
				warning={warning}
			></AddToList>
		</>
	);
}

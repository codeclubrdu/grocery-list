'use client';

import { useState, type ChangeEvent } from 'react';
import Navbar from '@/app/components/Navbar';
import AddToList from '@/app/components/AddToList';
import IntroStatement from '@/app/components/IntroStatement';
import ToBuyList from '@/app/components/ToBuyList';
import { addToDB, checkDB, setActiveStateDB } from '@/app/components/TursoAuth';
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
			active: 1,
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

	async function moveToHistory() {
		const keepList = list.filter((grocery) => !grocery.isChecked);
		setList(keepList);

		const moveList = list.filter((grocery) => grocery.isChecked);

		// Inactivating tasks and unchecking to give to DB update functions.
		const updatedMoveList = moveList.map((item) => {
			if (item.isChecked) {
				return {
					...item,
					isChecked: false,
					active: 0,
				};
			}
			return item;
		});

		for (const item of updatedMoveList) {
			await checkDB(item.name, item.isChecked);
		}

		await setActiveStateDB(updatedMoveList);
	}

	function logOut() {
		document.cookie = 'userName=; Path=/; Max-Age=0;';
		window.location.replace('/');
	}

	return (
		<>
			<Navbar pageTitle={'Grocery List'}></Navbar>
			<ToBuyList listToRender={list} saveChecks={saveCheckState}></ToBuyList>
			<AddToList
				handleSubmit={addItem}
				moveChecks={moveToHistory}
				logOut={logOut}
				warning={warning}
			></AddToList>
			<IntroStatement sponsor={"Carl's Jr."}></IntroStatement>
		</>
	);
}

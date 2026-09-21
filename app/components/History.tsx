'use client';
import Navbar from '@/app/components/Navbar';
import ToBuyList from '@/app/components/ToBuyList';
import ManageHistory from '@/app/components/ManageHistory';
import IntroStatement from '@/app/components/IntroStatement';
import { type groceryObject } from '@/app/components/TypeDefinitions';
import { useState, type ChangeEvent } from 'react';
import { checkDB, deleteFromDB, setActiveStateDB } from '@/app/components/TursoAuth';

export default function History({ initialList }: { initialList: groceryObject[] }) {
	const [historyList, setHistoryList] = useState<groceryObject[]>(initialList);

	// Keeping track of which checkboxes are checked
	async function saveCheckState(e: ChangeEvent<HTMLInputElement>) {
		const name = e.target.name;
		const isChecked = e.target.checked;
		const updatedList = historyList.map((item) => {
			if (item.name === name) {
				return {
					...item,
					isChecked: isChecked,
				};
			}

			return item;
		});

		setHistoryList(updatedList);
		await checkDB(name, isChecked);
	}

	// *** PLACEHOLDER FOR: Need functon to set checked items active status to active (which will move them to active list)
	async function moveToActive() {
		const keepList = historyList.filter((grocery) => !grocery.isChecked);
		setHistoryList(keepList);

		const moveList = historyList.filter((grocery) => grocery.isChecked);

		// Inactivating tasks and unchecking to give to DB update functions.
		const updatedMoveList = moveList.map((item) => {
			if (item.isChecked) {
				return {
					...item,
					isChecked: false,
					active: 1,
				};
			}
			return item;
		});

		for (const item of updatedMoveList) {
			await checkDB(item.name, item.isChecked);
		}

		await setActiveStateDB(updatedMoveList);
	}

	// Function to delete checked items from list
	async function deleteChecks() {
		const keepList = historyList.filter((grocery) => !grocery.isChecked);
		setHistoryList(keepList);

		const deleteList = historyList.filter((grocery) => grocery.isChecked);

		await deleteFromDB(deleteList);
	}

	function logOut() {
		document.cookie = 'userName=; Path=/; Max-Age=0;';
		window.location.replace('/');
	}

	return (
		<>
			<Navbar pageTitle={'Purchase History'} logOut={logOut}></Navbar>
			<ToBuyList listToRender={historyList} saveChecks={saveCheckState}></ToBuyList>
			<ManageHistory
				removeChecks={deleteChecks}
				logOut={logOut}
				setActive={moveToActive}
			></ManageHistory>
			<IntroStatement sponsor={"Carl's Jr."}></IntroStatement>
		</>
	);
}

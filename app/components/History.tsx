'use client';
import ToBuyList from '@/app/components/ToBuyList';
import ManageHistory from '@/app/components/ManageHistory';
import { type groceryObject } from '@/app/components/TypeDefinitions';
import { useState, type ChangeEvent } from 'react';
import { checkDB, deleteFromDB } from '@/app/components/TursoAuth';

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
	async function moveToActive() {}

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
			<h1 className="m-8 text-center text-4xl font-bold tracking-tight text-gray-900">
				Purchase History
			</h1>
			<ToBuyList listToRender={historyList} saveChecks={saveCheckState}></ToBuyList>
			<ManageHistory
				removeChecks={deleteChecks}
				logOut={logOut}
				handleSubmit={moveToActive}
			></ManageHistory>
		</>
	);
}

'use server';

import { connect } from '@tursodatabase/serverless';
import { type groceryObject } from '@/app/components/TypeDefinitions';
import { cookies } from 'next/headers';

const databaseUrl = process.env.TURSO_DATABASE_URL;
const token = process.env.TURSO_AUTH_TOKEN;
if (!databaseUrl) {
	throw new Error('TURSO_DATABASE_URL is not defined');
}
if (!token) {
	throw new Error('TURSO_AUTH_TOKEN is not defined');
}

const conn = connect({
	url: databaseUrl,
	authToken: token,
});

// Functions for grocerylist table
export async function fullList(userName: string, activeStatus: number) {
	const selectAll = await conn.prepare(
		'SELECT * FROM grocerylist WHERE (username, active) = (?, ?)',
	);
	const selectRows = await selectAll.all([userName, activeStatus]);

	const boolCorrectedRows = selectRows.map((row) => {
		if (row.isChecked === 1) {
			row.isChecked = true;
		} else {
			row.isChecked = false;
		}
		return row;
	});

	const sortedBoolCorrectedRows = boolCorrectedRows
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
		});

	return sortedBoolCorrectedRows;
}

export async function addToDB(groceryObject: groceryObject) {
	const { name, quantity, section, store, isChecked, userName } = groceryObject;

	const addObject = await conn.prepare(
		'INSERT INTO grocerylist (name, quantity, section, store, ischecked, username) VALUES (?, ?, ?, ?, ?, ?)',
	);
	await addObject.run([name, quantity, section, store, isChecked, userName]);
}

export async function deleteFromDB(groceryObjects: groceryObject[]) {
	for (const grocery of groceryObjects) {
		const deleteObject = await conn.prepare('DELETE FROM grocerylist WHERE name = (?)');
		await deleteObject.run([grocery.name]);
	}
}

export async function checkDB(checkedItem: string, checkState: boolean) {
	if (checkState === true) {
		const checkObject = await conn.prepare('UPDATE grocerylist SET isChecked = 1 WHERE name = (?)');
		await checkObject.run([checkedItem]);
	} else if (checkState === false) {
		const checkObject = await conn.prepare('UPDATE grocerylist SET isChecked = 0 WHERE name = (?)');
		await checkObject.run([checkedItem]);
	}
}

export async function setActiveStateDB(groceryObjects: groceryObject[]) {
	for (const grocery of groceryObjects) {
		if (grocery.active === 1) {
			const statement = await conn.prepare('UPDATE grocerylist SET active = 1 WHERE name = (?)');
			await statement.run([grocery.name]);
		} else if (grocery.active === 0) {
			const statement = await conn.prepare('UPDATE grocerylist SET active = 0 WHERE name = (?)');
			await statement.run([grocery.name]);
		}
	}
}

// Non-database general use functions.  Shameful bad practice.
export async function getUser() {
	const cookieStore = await cookies();
	const userName: string | undefined = cookieStore.get('userName')?.value;
	console.log(userName);

	if (!userName) {
		throw new Error('No userName cookie!');
	}

	return userName;
}

//export async function logOut() {
//		document.cookie = 'userName=; Path=/; Max-Age=0;';
//		window.location.replace('/');
//	}

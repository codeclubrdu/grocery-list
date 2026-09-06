'use server';

import { connect } from '@tursodatabase/serverless';
import { type groceryObject } from '@/app/components/TypeDefinitions';

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

export async function fullList() {
	const selectAll = await conn.prepare('SELECT * FROM grocerylist');
	const selectRows = await selectAll.all();

	const boolCorrectedRows = selectRows.map((row) => {
		if (row.isChecked === 1) {
			row.isChecked = true;
		} else {
			row.isChecked = false;
		}
		return row;
	});

	return boolCorrectedRows;
}

export async function addToDB(groceryObject: groceryObject) {
	const { name, quantity, section, store, isChecked } = groceryObject;

	const addObject = await conn.prepare(
		'INSERT INTO grocerylist (name, quantity, section, store, ischecked) VALUES (?, ?, ?, ?, ?)',
	);
	await addObject.run([name, quantity, section, store, isChecked]);
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

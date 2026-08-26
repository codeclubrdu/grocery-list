'use server';

import { connect } from '@tursodatabase/serverless';

type groceryObject = {
	name: string;
	quantity: number;
	section: string;
	store: string;
	isChecked: boolean;
};

const databaseUrl = process.env.TURSO_DATABASE_URL;
if (!databaseUrl) {
	throw new Error('TURSO_DATABASE_URL is not defined');
}

const conn = connect({
	url: process.env.TURSO_DATABASE_URL as string,
	authToken: process.env.TURSO_AUTH_TOKEN,
});

export async function fullList() {
	const selectAll = await conn.prepare('SELECT * FROM grocerylist');
	const selectRows = await selectAll.all();

	return selectRows;
}

export async function addToDB(groceryObject: groceryObject) {
	const { name, quantity, section, store, isChecked } = groceryObject;

	const addObject = await conn.prepare(
		'INSERT INTO grocerylist (name, quantity, section, store, ischecked) VALUES (?, ?, ?, ?, ?)',
	);
	const result = await addObject.run([name, quantity, section, store, isChecked]);

	return result;
}

export async function deleteFromDB(groceryObjects: groceryObject[]) {
	for (const grocery of groceryObjects) {
		const deleteObject = await conn.prepare('DELETE FROM grocerylist WHERE name = (?)');
		await deleteObject.run([grocery.name]);
	}
}

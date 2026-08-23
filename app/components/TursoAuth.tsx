'use server';

import { connect } from '@tursodatabase/serverless';

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

	console.log(selectRows);

	return selectRows;
}

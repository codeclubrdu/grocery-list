import { connect } from '@tursodatabase/serverless';

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

export async function GET() {
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

	return Response.json(boolCorrectedRows);
}

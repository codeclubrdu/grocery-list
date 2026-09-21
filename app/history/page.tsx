import History from '@/app/components/History';
import { fullList, getUser } from '@/app/components/TursoAuth';

export default async function Page() {
	const userName = await getUser();

	const activeStatus: number = 0;

	const groceryDB = await fullList(userName, activeStatus);

	return <History initialList={groceryDB}></History>;
}

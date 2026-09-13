import Home from '@/app/components/Home';
import { fullList, getUser } from '@/app/components/TursoAuth';

export default async function Page() {
	const userName = await getUser();

	const activeStatus: number = 1;

	const groceryDB = await fullList(userName, activeStatus);

	return <Home initialList={groceryDB} userName={userName}></Home>;
}

import Home from '@/app/components/Home';
import { fullList } from '@/app/components/TursoAuth';
import { cookies } from 'next/headers';

export default async function Page() {
	const cookieStore = await cookies();
	const userName: string | undefined = cookieStore.get('userName')?.value;
	console.log(userName);

	if (!userName) {
		throw new Error('No userName cookie!');
	}

	const groceryDB = await fullList(userName);
	const initialList = groceryDB
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

	return <Home initialList={initialList} userName={userName}></Home>;
}

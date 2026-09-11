import Home from '@/app/components/Home';
import { fullList } from '@/app/components/TursoAuth';

export default async function Page() {
	const groceryDB = await fullList();
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

	return <Home initialList={initialList}></Home>;
}

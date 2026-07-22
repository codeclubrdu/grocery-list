import AddToList from '@/app/components/AddToList.jsx';
import IntroStatement from '@/app/components/introStatement.jsx';

type groceryObject = {
	name: string;
	quantity: number;
	section: string;
	store: string;
};

const groceryList: groceryObject[] = [
	{
		name: 'Milk',
		quantity: 2,
		section: 'dairy',
		store: 'Wegmans',
	},
	{
		name: "Frank's Red Hot",
		quantity: 1,
		section: 'contiments',
		store: 'Food Lion',
	},
	{
		name: 'Buffalo wings',
		quantity: 3,
		section: 'deli',
		store: 'Wegmans',
	},
];

export function ToBuyList() {
	return (
		<div className="m-10 flex flex-col text-center">
			<p className="m-5 text-2xl font-bold">Buy Now:</p>
			<ul>
				{groceryList.map((listItem) => (
					<li
						className="text-xl"
						key={listItem.name}
					>{`${listItem.name} x ${listItem.quantity}`}</li>
				))}
			</ul>
		</div>
	);
}

export default function Home() {
	return (
		<>
			<h1 className="m-8 text-center text-4xl font-bold tracking-tight text-gray-900">
				Grocery List
			</h1>
			<IntroStatement sponsor={"Carl's Jr."}></IntroStatement>
			<ToBuyList></ToBuyList>
			<AddToList></AddToList>
		</>
	);
}

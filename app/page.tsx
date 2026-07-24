'use client';

import { useState } from 'react';
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

export function ToBuyList({ listToRender }: { listToRender: groceryObject[] }) {
	return (
		<div className="m-10 flex flex-col text-center">
			<p className="m-5 text-2xl font-bold">Buy Now:</p>
			<ul>
				{listToRender.map((listItem) => (
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
	const [list, setList] = useState(groceryList);

	function addItem(formData: FormData) {
		const newGrocery: groceryObject = {
			name: formData.get('itemName') as string,
			quantity: Number(formData.get('quantity')),
			section: formData.get('section') as string,
			store: formData.get('store') as string,
		};

		setList([...list, newGrocery]);
	}

	return (
		<>
			<h1 className="m-8 text-center text-4xl font-bold tracking-tight text-gray-900">
				Grocery List
			</h1>
			<IntroStatement sponsor={"Carl's Jr."}></IntroStatement>
			<ToBuyList listToRender={list}></ToBuyList>
			<AddToList handleSubmit={addItem}></AddToList>
		</>
	);
}

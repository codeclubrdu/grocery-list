import ToBuyList from '@/app/components/ToBuyList';
import AddToList from '@/app/components/AddToList';

export default function History() {
	return (
		<>
			<ToBuyList listToRender={list} saveChecks={saveCheckState}></ToBuyList>
			<AddToList
				handleSubmit={addItem}
				removeChecks={deleteChecks}
				logOut={logOut}
				warning={warning}
			></AddToList>
		</>
	);
}

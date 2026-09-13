import Form from 'next/form';
import Link from 'next/link';

export default function AddToList({
	handleSubmit,
	removeChecks,
	logOut,
}: {
	handleSubmit: (formData: FormData) => Promise<void>;
	removeChecks: () => Promise<void>;
	logOut: () => void;
}) {
	return (
		// Passing in handleSubmit prop to trigger addItem function on form submission

		<div className="flex flex-col">
			<Form action={handleSubmit} className="mx-auto flex w-full max-w-2xl flex-wrap">
				<div className="flex flex-col justify-end p-2">
					<button
						formAction={removeChecks}
						type="submit"
						className="rounded-lg border bg-gray-200 p-1"
					>
						Delete Checked Items
					</button>
				</div>
				<div className="flex flex-col justify-end p-2">
					<Link href="/main-list" className="rounded-lg border bg-gray-200 p-1">
						To List Page
					</Link>
				</div>
				<div className="flex flex-col justify-end p-2">
					<button formAction={logOut} type="submit" className="rounded-lg border bg-gray-200 p-1">
						Log Out
					</button>
				</div>
			</Form>
		</div>
	);
}

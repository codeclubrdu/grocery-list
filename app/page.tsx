'use client';

import Form from 'next/form';
import { useRouter } from 'next/navigation';

export default function LogIn() {
	const router = useRouter();

	async function getUserName(formData: FormData) {
		const userName = formData.get('userName');
		console.log(userName);

		if (typeof userName !== 'string' || !userName.trim()) {
			return;
		}

		document.cookie = `userName=${userName.trim()}; path=/; SameSite=Lax; Secure`;

		router.push('/main-list');
	}

	return (
		<div>
			<h1 className="m-8 text-center text-4xl font-bold tracking-tight text-gray-900">
				Good Morning!
			</h1>
			<p className="mt-8 mb-2 text-center text-xl">Please log in with your username</p>
			<div className="mx-auto flex w-full max-w-xl flex-wrap justify-center">
				<Form action={getUserName} className="flex w-1/2 flex-col gap-2 p-4">
					<label htmlFor="userName">User Name</label>
					<input
						type="text"
						id="userName"
						name="userName"
						placeholder="username"
						className="rounded-lg border p-1"
					/>
					<button type="submit" className="rounded-lg border bg-gray-200 p-1">
						Submit
					</button>
				</Form>
			</div>
		</div>
	);
}

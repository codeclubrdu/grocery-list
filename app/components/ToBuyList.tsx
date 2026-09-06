import { type ChangeEventHandler } from 'react';
import { type groceryObject } from '@/app/components/TypeDefinitions';

// Component to render the list. For some reason I left it in with the main page component.
export default function ToBuyList({
	listToRender,
	saveChecks,
}: {
	listToRender: groceryObject[];
	saveChecks: ChangeEventHandler<HTMLInputElement>;
}) {
	// Create a list of each store with no duplicates
	// Get an array containing only the stores
	let storeList = listToRender.map((listItem) => listItem.store);
	// Remove duplicates
	storeList = storeList.filter((store, index) => storeList.indexOf(store) === index);

	return (
		<div className="mb-10 flex w-fit flex-col self-center">
			<ul>
				{
					// For each store, list each store and for each do all the stuff below
					storeList.map((store) => {
						// Get list of items specific to each store
						const perStoreList = listToRender.filter((grocery) => grocery.store === store);

						return (
							<div key={store}>
								<p className="mt-8 mb-2 text-2xl font-bold">{store}</p>
								<ul>
									{
										// List items under their coresponding stores
										perStoreList.map((listItem) => {
											const itemDisplay =
												listItem.quantity > 1
													? `${listItem.name} x ${listItem.quantity}`
													: `${listItem.name}`;

											const preCheck = listItem.isChecked ? true : false;

											return (
												<li className="flex text-xl" key={listItem.name}>
													<div className="flex gap-x-4 sm:col-span-2">
														<div className="flex items-center">
															<div className="group relative inline-flex w-8 shrink-0 rounded-full bg-gray-200 p-px inset-ring inset-ring-gray-900/5 outline-offset-2 outline-indigo-600 transition-colors duration-200 ease-in-out has-checked:bg-indigo-600 has-focus-visible:outline-2">
																<span className="size-4 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-3.5"></span>
																<input
																	id={listItem.name}
																	type="checkbox"
																	checked={preCheck}
																	name={listItem.name}
																	onChange={saveChecks}
																	className="absolute inset-0 size-full appearance-none focus:outline-hidden"
																></input>
															</div>
														</div>
														<label htmlFor="{listItem.name}">{itemDisplay}</label>
													</div>
												</li>
											);
										})
									}
								</ul>
							</div>
						);
					})
				}
			</ul>
		</div>
	);
}

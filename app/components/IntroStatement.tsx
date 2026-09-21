import Image from 'next/image';

export default function IntroStatement({ sponsor }: { sponsor: string }) {
	return (
		<div className="flex flex-row justify-center gap-5 bg-amber-200 p-2 text-gray-500">
			<p className="flex flex-col justify-center">
				Brought to you by {sponsor} <br />
			</p>
			<p className="flex flex-col justify-center">AND</p>
			<Image src="/codeClubLogo.png" alt="Code Club RDU logo" width={100} height={100} />
		</div>
	);
}

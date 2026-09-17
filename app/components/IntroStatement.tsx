import Image from 'next/image';

export default function IntroStatement({ sponsor }: { sponsor: string }) {
	return (
		<div className="justify-items-center text-center text-gray-500">
			<p>
				Brought to you by {sponsor} <br />
			</p>
			<p className="mt-4">AND</p>
			<Image src="/codeClubLogo.webp" alt="Code Club RDU logo" width={150} height={150} />
		</div>
	);
}

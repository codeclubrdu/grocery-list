export default function IntroStatement({ sponsor }: { sponsor: string }) {
	return (
		<p className="text-center text-gray-500">
			Brought to you by {sponsor} <br />
			(and Code Club RDU)
		</p>
	);
}

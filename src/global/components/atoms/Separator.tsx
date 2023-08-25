type SeparatorTypes = {
	className? : string;
}
export default function Separator({className}:SeparatorTypes) {
	return <hr className={`bg-neutral-100 w-full my-2 rounded-full ${className}`}></hr>;
}

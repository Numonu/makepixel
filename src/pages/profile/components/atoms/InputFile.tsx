import { useState } from "react";
import { BsCardImage } from "react-icons/bs";
import { toastError } from "../../../../global/utilities/comunToast";

type InputFileTypes = {
	onChange: (e: string) => void;
	amount: number;
    mbLimit : number;
    tip : string;
};
export default function InputFile({
	onChange,
	amount,
    mbLimit,
    tip
}: InputFileTypes) {
	const [smallerThat, setSmallerThat] = useState(true);

	const setFile = (file: FileList | null) => {
		const reader = new FileReader();
		reader.onload = (event: ProgressEvent<FileReader>) => {
			if (file && event.target && event.target.result) {
				const imageData = event.target.result as string;
				const base64Image = imageData.split(",")[1];
                const imageSize = file[0].size / 1000;
				if (imageSize > mbLimit * 1000) {
					setSmallerThat(false);
					return;
				}
                setSmallerThat(true);
				onChange(base64Image);
			} else toastError.base();
		};
		reader.onerror = toastError.base;
		if (file) reader.readAsDataURL(file[0]);
	};

	return (
		<div className={`px-2 flex items-center gap-4 ${smallerThat ? "text-description" : "text-red-500"}`}>
			<span>
				<BsCardImage />
			</span>
			<input
				className="min-w-0 grow"
				type="file"
				accept=".jpg, .jpeg, .png"
				maxLength={amount}
				onChange={(e) => setFile(e.target.files)}
			/>
			<span className="w-max shrink-0 text-xs">{tip}</span>
		</div>
	);
}

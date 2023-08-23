import { useState } from "react";

export default function useModal() {
	const [modal, setModal] = useState(false);

	const closeModal = () => setModal(false);
	const openModal = () => setModal(true);
	const toggleModal = () => (modal ? closeModal() : openModal());

	return {
		modal,
		setModal,
		toggleModal,
        openModal,
        closeModal
	};
}

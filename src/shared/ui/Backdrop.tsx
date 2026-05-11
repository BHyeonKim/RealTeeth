import { type MouseEvent, type ReactNode } from 'react';

type BackdropProps = {
	children: ReactNode;
	onClickBackdrop: () => void;
};

const Backdrop = ({ children, onClickBackdrop: onClose }: BackdropProps) => {
	const handleClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget) onClose();
	};

	return (
		<button
			type="button"
			className="fixed inset-0 z-50 w-full bg-black/50"
			onClick={handleClick}
		>
			{children}
		</button>
	);
};

export default Backdrop;

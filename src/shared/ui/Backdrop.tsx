/** biome-ignore-all lint/a11y/useSemanticElements: false positive */
import { type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';

type BackdropProps = {
	children: ReactNode;
	onClickBackdrop: () => void;
};

const Backdrop = ({ children, onClickBackdrop }: BackdropProps) => {
	const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Escape') onClickBackdrop();
	};

	const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
		if (e.target !== e.currentTarget) return;
		onClickBackdrop();
	};

	return (
		<div
			className="fixed inset-0 z-50 bg-black/50"
			tabIndex={0}
			aria-label="모달 닫기"
			onClick={handleBackdropClick}
			onKeyDown={handleKeyDown}
			role="button"
		>
			{children}
		</div>
	);
};

export default Backdrop;

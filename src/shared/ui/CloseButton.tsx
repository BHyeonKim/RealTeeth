type CloseButtonProps = {
	onClick: () => void;
};

const CloseButton = ({ onClick }: CloseButtonProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white/60"
		>
			✕
		</button>
	);
};

export default CloseButton;

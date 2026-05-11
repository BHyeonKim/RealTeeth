type FavoriteButtonProps = {
	onClick?: () => void;
};

const FavoriteButton = ({ onClick }: FavoriteButtonProps) => {
	return (
		<button
			type="button"
			onClick={onClick}
			className="w-full rounded-xl border border-violet-400/30 bg-violet-400/20 py-3 font-semibold text-sm text-violet-300"
		>
			☆ 즐겨찾기 추가
		</button>
	);
};

export default FavoriteButton;

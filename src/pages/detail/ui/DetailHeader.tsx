import CloseButton from '@/shared/ui/CloseButton';

type DetailHeaderProps = {
	region: string;
	name: string;
	onClose: () => void;
};

const DetailHeader = ({ region, name, onClose }: DetailHeaderProps) => {
	return (
		<div className="mb-5 flex items-center justify-between">
			<div className="flex items-center gap-2">
				<span className="rounded-full bg-violet-400/20 px-2 py-0.5 text-[11px] text-violet-300">
					{region}
				</span>
				<span className="font-bold text-lg text-white">{name}</span>
			</div>
			<CloseButton onClick={onClose} />
		</div>
	);
};

export default DetailHeader;

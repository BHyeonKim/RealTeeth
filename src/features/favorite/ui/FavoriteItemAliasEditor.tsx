import { type KeyboardEvent, type SubmitEvent, useState } from 'react';

type FavoriteItemAliasEditorProps = {
	initialValue: string;
	onSave: (alias: string) => void;
	onCancel: () => void;
};

const FavoriteItemAliasEditor = ({
	initialValue,
	onSave,
	onCancel,
}: FavoriteItemAliasEditorProps) => {
	const [value, setValue] = useState(initialValue);

	const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		onSave(value);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Escape') onCancel();
	};

	return (
		<form onSubmit={handleSubmit} className="flex items-center gap-1">
			<input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={handleKeyDown}
				maxLength={20}
				placeholder="별칭 입력..."
				className="min-w-0 flex-1 rounded bg-white/10 px-2 py-0.5 text-[13px] text-white outline-none ring-1 ring-violet-400/50 placeholder:text-white/30"
			/>
			<button
				type="submit"
				className="shrink-0 cursor-pointer text-emerald-400 text-xs"
				aria-label="별칭 저장"
			>
				✓
			</button>
			<button
				type="button"
				onClick={onCancel}
				className="shrink-0 cursor-pointer text-white/40 text-xs"
				aria-label="편집 취소"
			>
				✕
			</button>
		</form>
	);
};

export default FavoriteItemAliasEditor;

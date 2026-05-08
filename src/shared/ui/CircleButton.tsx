import type { HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type CircleButtonProps = PropsWithChildren<HTMLAttributes<HTMLButtonElement>>;

export const CircleButton = ({
	children,
	className,
	...props
}: CircleButtonProps) => {
	return (
		<button
			type="button"
			className={twMerge(
				'absolute z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]',
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
};

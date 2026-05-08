import type { HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type CircleButtonProps = PropsWithChildren<HTMLAttributes<HTMLButtonElement>>;

/**
 * 원형 플로팅 버튼 컴포넌트.
 * 기본적으로 `absolute` 포지션으로 배치되며, `className`으로 위치를 지정한다.
 *
 * @param children - 버튼 내부에 렌더링할 콘텐츠 (아이콘 등)
 * @param className - 추가 Tailwind 클래스 (위치, z-index 등 오버라이드 가능)
 * @param props - button 엘리먼트에 전달할 추가 props (onClick 등)
 *
 * @example
 * <CircleButton className="right-4 bottom-4" onClick={handleClick}>
 *   <Icon name="IconLocationOutline" width={24} height={24} />
 * </CircleButton>
 */
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

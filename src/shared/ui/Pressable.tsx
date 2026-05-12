import type { HTMLAttributes, PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';

type PressableProps = PropsWithChildren<HTMLAttributes<HTMLDivElement>>;

/**
 * hover, active 등 인터랙션 스타일을 제공하는 div 래퍼 컴포넌트.
 *
 * @param children - 래핑할 콘텐츠
 * @param className - 추가 Tailwind 클래스로 기본 인터랙션 스타일 오버라이드 가능
 * @param props - div 엘리먼트에 전달할 추가 props
 *
 * @example
 * <Pressable className="rounded-full">
 *   <CurrentLocationButton coordinates={location} />
 * </Pressable>
 */
const Pressable = ({ children, className, ...props }: PressableProps) => {
	return (
		<div
			className={twMerge(
				'fixed right-4 bottom-4 z-10 h-fit w-fit cursor-pointer drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-transform hover:scale-103 active:scale-95',
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
};

export default Pressable;

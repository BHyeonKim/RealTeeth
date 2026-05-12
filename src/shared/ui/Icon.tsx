import type { ComponentType, SVGProps } from 'react';
import * as Icons from '@/shared/assets/svgs';

type IconProps = {
	name: keyof typeof Icons;
} & SVGProps<SVGSVGElement>;

/**
 * SVG 아이콘을 이름으로 렌더링하는 컴포넌트.
 * `@/shared/assets/svgs`에 등록된 아이콘만 사용 가능하다.
 *
 * @param name - 렌더링할 아이콘 이름 (`svgs/index.ts`에 export된 키)
 * @param props - SVGElement에 전달할 추가 props (className, width, height 등)
 *
 * @example
 * <Icon name="LocationPin" width={24} height={24} className="text-blue-500" />
 */
const Icon = ({ name, ...props }: IconProps) => {
	const IconComponent = Icons[name] as ComponentType<SVGProps<SVGSVGElement>>;
	return <IconComponent {...props} />;
};

export default Icon;

---
description: 코드 작성 시 따라야 하는 네이밍, 타입, 컴포넌트 컨벤션
globs: src/**/*
---

# 코드 컨벤션

## 식별자 네이밍

- 변수, 함수명은 camelCase로 작성
- 상수는 UPPER_CASE로 작성
- 변수, 함수명은 길더라도 구체적으로 작성
  - isOpen X → isErrorModalOpen O
  - handleSubmit X → handleFormSubmit O → handleCommentFormSubmit O
- 약어 금지 (ex. Button → Btn)

## 함수 작성

- 함수와 컴포넌트는 화살표 함수(arrow function)로 작성
- 함수의 인자값은 2개 이상을 피하고, 여러 개면 객체로 묶는다
- 함수는 1가지 행동만 하도록 작성 (단일 책임의 원칙)

```tsx
// X
const createMenu = (title, body, text, cancellable) => { ... }

// O
const createMenu = ({ title, body, buttonText, cancellable }: CreateMenuParams) => { ... }
```

## TypeScript

### 타입 규칙

- 모든 변수와 함수에 타입을 명시한다 (tsconfig strict: true)
- any는 절대 사용하지 않는다
- 함수 인자와 반환값에 타입을 명시한다
- 타입 선언은 type 별칭(type alias)을 사용한다 (interface 대신 type 사용)

```tsx
const add = (a: number, b: number): number => a + b
```

### 타입 네이밍

- type, enum, class 등은 PascalCase로 선언
- 헝가리안 표기법(T 접두사 등) 사용 금지
  - 단, 클래스와 타입명이 충돌할 경우 타입에 `I` 접두사를 허용한다

```tsx
type Activity = {
  id: string
  title: string
}

enum ActivityItem {
  // ...
}
```

## React

### 컴포넌트 내부 코드 순서

```tsx
type ComponentProps = {
  // ...
}

const Component = ({ data, onSubmit }: ComponentProps) => {
  // 1. hooks
  const [state, setState] = useState<boolean>(false)

  // 2. query / mutation hooks
  const { data, error } = useQuery({ ... })

  // 3. variables
  const isLastPage = data?.pageCount === 5

  // 4. useEffect
  useEffect(() => { ... }, [])

  // 5. return
  return (
    // JSX
  )
}

export default Component
```

### 컴포넌트 타입

- 컴포넌트 파일 상단에 Props 타입을 정의하고 파라미터에 명시한다

```tsx
type ScreenChannelProps = {
  className?: string
}

const ScreenChannel = ({ className }: ScreenChannelProps) => {
  return <div className={className}>children</div>
}

export default ScreenChannel
```

### 컴포넌트 분리

- 한 컴포넌트는 250줄 이내로 작성
- 세부 구현 로직은 모듈로 분리하여 import
- 같은 관심사는 모으고, 다른 관심사는 분리

### 모듈 파일 분리

- 두 번 이상 쓰이는 함수는 모듈로 분리
- 특정 컴포넌트에서만 사용하면 해당 컴포넌트와 가까운 위치에 배치
- 모듈 이름은 함수 이름과 동일하게 작성하여 export
- React 관련 파일(커스텀 훅, 컴포넌트)은 export default 사용

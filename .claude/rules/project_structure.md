# 프로젝트 구조

이 프로젝트는 **FSD(Feature-Sliced Design)** 아키텍처를 사용한다.

## 레이어 구조 (상위 → 하위 의존 방향)

```
src/
├── app/        # 앱 초기화, 프로바이더, 라우터, 전역 스타일
├── pages/      # 라우트와 1:1 매핑되는 페이지 컴포넌트 (위젯 조합)
├── widgets/    # 독립적인 UI 블록 (여러 엔티티/피처를 조합)
├── features/   # 비즈니스 로직 단위 기능 (좋아요, 검색, 인증 등)
├── entities/   # 도메인 엔티티 (User, Car, Station 등)
└── shared/     # 재사용 가능한 기반 코드 (도메인 무관)
```

> **의존 규칙**: 상위 레이어만 하위 레이어를 import할 수 있다.
> `app` → `pages` → `widgets` → `features` → `entities` → `shared`
> 같은 레이어 간 import는 금지한다.

---

## 레이어별 역할

| 레이어 | 역할 |
|--------|------|
| `app/` | 앱 진입점, 전역 프로바이더(QueryClient, Router 등), 전역 CSS |
| `pages/` | 라우트 단위 페이지, 위젯을 조합하여 화면을 구성 |
| `widgets/` | 페이지에서 독립적으로 동작하는 큰 UI 단위 (Header, Feed 등) |
| `features/` | 비즈니스 로직 단위 기능 — API 호출, 상태 관리, 유저 인터랙션 흐름 (auth, add-to-favorites, search 등) |
| `entities/` | 도메인 핵심 규칙과 모델 — 순수 타입, 계산, 도메인 UI (user, car, station 등) |
| `shared/` | 도메인 무관 공용 모듈 (ui, api, lib, consts, configs, types) |

---

## 슬라이스 내부 세그먼트 구조

각 레이어의 슬라이스(도메인)는 아래 세그먼트로 구성된다.

```
{layer}/{slice}/
├── ui/       # React 컴포넌트
├── api/      # API 호출 함수, TanStack Query hooks
├── model/    # 상태(Zustand), Zod 스키마, TypeScript 타입
├── lib/      # 슬라이스 전용 유틸 함수
└── index.ts  # Public API (외부에 노출할 것만 re-export)
```

> 모든 슬라이스는 `index.ts`를 통해서만 외부에 노출한다.
> 내부 파일을 직접 import하는 것은 금지한다.

---

## shared 레이어 구조

`shared`는 슬라이스 없이 세그먼트 단위로 구성된다.

```
src/shared/
├── ui/       # 공용 UI 컴포넌트 (Button, Input, Modal 등)
├── api/      # axios 인스턴스, supabase 클라이언트 등 외부 API 설정
├── lib/      # 순수 유틸 함수 (formatDistance, calcPrice 등)
├── consts/   # 공용 상수
├── configs/  # 외부 라이브러리 설정 (kakao, naver, opinet 등)
└── types/    # 여러 곳에서 공유되는 공용 타입
```

---

## 예시 구조

```
src/
├── app/
│   ├── providers/
│   │   ├── QueryProvider.tsx
│   │   └── RouterProvider.tsx
│   └── styles/
│       └── global.css
│
├── pages/
│   ├── home/
│   │   └── index.tsx
│   └── station-detail/
│       └── index.tsx
│
├── widgets/
│   ├── header/
│   │   ├── ui/Header.tsx
│   │   └── index.ts
│   └── station-map/
│       ├── ui/StationMap.tsx
│       └── index.ts
│
├── features/
│   ├── auth/
│   │   ├── ui/LoginForm.tsx
│   │   ├── api/useLogin.ts
│   │   ├── model/auth.schema.ts
│   │   └── index.ts
│   └── add-to-favorites/
│       ├── ui/FavoriteButton.tsx
│       ├── api/useFavorite.ts
│       └── index.ts
│
├── entities/
│   ├── user/
│   │   ├── ui/UserCard.tsx
│   │   ├── api/userApi.ts
│   │   ├── model/user.types.ts
│   │   └── index.ts
│   └── station/
│       ├── ui/StationCard.tsx
│       ├── api/stationApi.ts
│       ├── model/station.types.ts
│       └── index.ts
│
└── shared/
    ├── ui/
    │   ├── Button.tsx
    │   └── Input.tsx
    ├── api/
    │   ├── axios.config.ts
    │   └── supabase.config.ts
    ├── lib/
    │   └── formatDistance.ts
    ├── consts/
    │   └── map.const.ts
    └── types/
        └── common.types.ts
```

---

## 파일명 규칙

| 종류 | 형식 | 예시 |
|-----|------|------|
| 컴포넌트 | `PascalCase.tsx` | `UserCard.tsx` |
| 훅 | `useXxx.ts` | `useUserInfo.ts` |
| 유틸 | `camelCase.ts` | `calcDistance.ts` |
| 타입 | `xxx.types.ts` | `station.types.ts` |
| 스키마 | `xxx.schema.ts` | `auth.schema.ts` |
| 상수 | `xxx.const.ts` | `map.const.ts` |
| 설정 | `xxx.config.ts` | `axios.config.ts` |
| Public API | `index.ts` | `index.ts` |

---

## Import 경로

`@/` alias로 `src/`를 참조한다.
반드시 슬라이스의 `index.ts`를 통해 import한다 (내부 파일 직접 접근 금지).

```ts
// O - Public API를 통한 import
import { UserCard } from '@/entities/user'
import { LoginForm } from '@/features/auth'
import { Button } from '@/shared/ui'

// X - 내부 파일 직접 import 금지
import UserCard from '@/entities/user/ui/UserCard'
import { loginSchema } from '@/features/auth/model/auth.schema'
```

# RealTeeth Weather

지도 기반 대한민국 행정구역 날씨 조회 앱입니다. 리얼티쓰 프론트엔드 채용과제로 구현했으며, 현재 위치 기반 날씨 조회, 행정구역 검색, 즐겨찾기 관리, 상세 예보 조회, 데스크탑/모바일 반응형 UI를 제공합니다.

## 배포 및 저장소

- GitHub Repository: https://github.com/BHyeonKim/RealTeeth
- 배포 URL: https://real-teeth-gamma.vercel.app
- 과제 원문: `docs/리얼티쓰 프론트엔드 채용과제.pdf`

## 주요 기능

- 대한민국 행정구역 데이터를 기반으로 시·군·구·동 단위 지역 검색을 지원합니다.
- 지도 위 날씨 마커에서 현재 기온, 당일 최저 기온, 당일 최고 기온을 확인할 수 있습니다.
- 지역 마커나 즐겨찾기 카드를 클릭하면 상세 페이지에서 현재 기온, 최저/최고 기온, 시간대별 예보를 확인할 수 있습니다.
- 장소를 즐겨찾기에 추가/삭제할 수 있고, 최대 6개까지 저장할 수 있습니다.
- 즐겨찾기 카드의 별칭을 인라인으로 수정할 수 있습니다.
- 데스크탑에서는 즐겨찾기를 사이드바로, 모바일에서는 하단 바텀시트로 제공합니다.

## 과제 요구사항 충족

| 요구사항 | 구현 내용 |
| --- | --- |
| Open API 기반 날씨 정보 조회 | 기상청 API Hub의 단기예보 API 사용 |
| 현재 기온 표시 | 지도 마커, 즐겨찾기 카드, 상세 페이지에서 표시 |
| 당일 최저/최고 기온 표시 | 지도 마커, 즐겨찾기 카드, 상세 페이지에서 표시 |
| 시간대별 기온 표시 | 상세 페이지에서 시간대별 예보 목록으로 표시 |
| 장소 검색 | 제공된 대한민국 행정구역 JSON 기반 검색 |
| 검색 결과 리스트 표시 | 검색어 입력 시 매칭 지역 리스트 표시 |
| 즐겨찾기 추가/삭제 | Zustand 기반 즐겨찾기 상태 관리 |
| 즐겨찾기 최대 6개 제한 | `MAX_FAVORITES` 기준으로 제한 및 안내 |
| 즐겨찾기 별칭 수정 | 카드 내 인라인 편집 폼 제공 |
| 즐겨찾기 카드 날씨 정보 표시 | 현재 기온, 최저/최고 기온 표시 |
| 즐겨찾기 카드 클릭 시 상세 이동 | 카드 클릭 시 해당 지역 상세 페이지로 이동 |
| FSD 아키텍처 | `app`, `pages`, `widgets`, `features`, `entities`, `shared` 계층 구성 |
| TanStack Query 사용 | 날씨 API 서버 상태 조회 및 캐싱 |
| 데스크탑/모바일 반응형 | `useDeviceSize` 기반 UI 분기 |

## 기술 스택

- React 19
- TypeScript
- Vite
- React Router
- TanStack Query
- Zustand
- Tailwind CSS
- React Naver Maps
- Axios
- Motion
- react-modal-sheet
- Biome
- Vercel

## 프로젝트 구조

```text
src
├── app        # 라우터, 프로바이더, 전역 스타일
├── pages      # 페이지 단위 화면
├── widgets    # 지도 등 복합 UI 블록
├── features   # 검색, 위치, 즐겨찾기 기능
├── entities   # 날씨 API, 타입, 도메인 로직
└── shared     # 공용 UI, hooks, config, data, utils
```

FSD 구조를 기준으로 화면, 기능, 도메인, 공용 모듈을 분리했습니다. 날씨 API와 관련된 서버 상태는 `entities/whether`에 두고, 검색·현재 위치·즐겨찾기처럼 사용자 액션 중심 기능은 `features`로 분리했습니다.

## 실행 방법

### 요구 환경

- Node.js `>=24`
- pnpm `11.0.8`

### 설치

```bash
pnpm install
```

### 개발 서버 실행

```bash
pnpm dev
```

기본 개발 서버 주소는 `http://localhost:5173`입니다.

### 프로덕션 빌드

```bash
pnpm build
```

### 빌드 결과 미리보기

```bash
pnpm preview
```

## 환경변수

프로젝트 루트에 `.env` 파일을 만들고 아래 값을 설정합니다.
```env
VITE_NAVER_MAP_CLIENT_ID=네이버_지도_Client_ID
VITE_KOREA_METEOROLOGICAL_ADMINISTRATION_SERVER_URL=http://localhost:5173
VITE_KOREA_METEOROLOGICAL_ADMINISTRATION_API_KEY=기상청_API_Hub_인증키
```

로컬 개발에서는 Vite dev server proxy가 `/api` 요청을 `https://apihub.kma.go.kr`로 전달합니다. Vercel 배포에서는 `vercel.json`의 rewrite가 같은 역할을 수행해 브라우저 CORS 문제를 피합니다.

## 기술적 의사결정

### FSD 아키텍처
화면 단위는 `pages`, 독립 기능은 `features`, 날씨 API 도메인은 `entities`에 배치해 변경 범위를 좁혔습니다.

### TanStack Query

날씨 데이터는 서버에서 받아오는 비동기 상태이므로 TanStack Query로 관리했습니다. 단기예보 데이터는 발표 시각 기준으로 재사용 가능성이 높아 query key에 격자 좌표와 기준 시각을 포함하고, 캐시와 refetch를 서버 상태 레이어에서 처리했습니다.

### Zustand

즐겨찾기는 서버 데이터가 아니라 사용자가 앱 안에서 관리하는 클라이언트 상태입니다. 여러 컴포넌트에서 추가, 삭제, 별칭 수정이 필요하므로 Zustand store로 분리했습니다.

### Web Worker 기반 검색

대한민국 행정구역 데이터는 항목 수가 많아 입력마다 메인 스레드에서 필터링하면 UI 반응성이 떨어질 수 있습니다. 검색 필터링을 Web Worker로 분리해 입력과 지도 조작의 반응성을 유지하도록 했습니다.

### 반응형 UI

데스크탑과 모바일은 즐겨찾기 접근 방식이 다릅니다. 데스크탑에서는 좌측 사이드바가 지도와 함께 보기 좋고, 모바일에서는 하단 바텀시트가 한 손 조작에 적합하다고 판단했습니다. 화면 구분은 `useSyncExternalStore` 기반 `useDeviceSize` 훅으로 media query를 구독합니다.

### Vercel rewrite

기상청 API 응답에 브라우저 CORS 허용 헤더가 없을 수 있어, 배포 환경에서는 Vercel rewrite를 사용해 `/api` 요청을 기상청 API로 프록시합니다. API key를 숨기는 목적이 아니라 브라우저 same-origin 요청으로 CORS 문제를 피하기 위한 설정입니다.
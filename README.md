# 🦷 RealTeeth Weather

대한민국 행정구역 기반 날씨 조회 웹 앱입니다. 리얼티쓰 프론트엔드 채용과제로 구현했습니다.

## 🔗 배포 및 저장소

- GitHub Repository: https://github.com/BHyeonKim/RealTeeth
- 배포 URL: https://real-teeth-gamma.vercel.app
- 과제 원문: `docs/리얼티쓰 프론트엔드 채용과제.pdf`

## ✨ 주요 기능

### 🔍 지역 검색
검색창에 시·군·구·동 이름을 입력하면 대한민국 행정구역 데이터를 기반으로 매칭되는 지역 목록이 표시됩니다.

### 🗺️ 지도 위 날씨 마커
검색 결과나 즐겨찾기를 선택하면 해당 위치에 지도 마커가 표시되고, 마커에서 현재 기온·당일 최저 기온·당일 최고 기온을 바로 확인할 수 있습니다.

### 🌤️ 상세 날씨 조회
지도 마커 또는 즐겨찾기 카드를 클릭하면 상세 페이지로 이동합니다. 상세 페이지에서는 현재 기온, 최저/최고 기온, 시간대별 예보를 확인할 수 있습니다.

### ⭐ 즐겨찾기
자주 확인하는 지역을 즐겨찾기에 추가하거나 삭제할 수 있습니다. 최대 6개까지 저장되며, 카드 내에서 별칭을 인라인으로 수정할 수 있습니다.

### 📱 반응형 UI
데스크탑에서는 즐겨찾기가 좌측 사이드바로, 모바일에서는 하단 바텀시트로 표시됩니다. 화면 크기에 따라 `useDeviceSize` 훅이 분기를 처리합니다.

## 🛠️ 기술 스택

| 기술 | 역할 |
|------|------|
| React 19 | UI 렌더링 |
| TypeScript | 정적 타입 검사 |
| Vite | 빌드 도구 및 개발 서버 (CORS 프록시 포함) |
| React Router | 페이지 라우팅 |
| TanStack Query | 날씨 API 서버 상태 관리 및 캐싱 |
| Zustand | 즐겨찾기 클라이언트 상태 관리 |
| Tailwind CSS | 유틸리티 기반 스타일링 |
| React Naver Maps | 네이버 지도 렌더링 및 마커 |
| Axios | HTTP 클라이언트 |
| Motion | 바텀시트·마커 전환 애니메이션 |
| react-modal-sheet | 모바일 바텀시트 컴포넌트 |
| Biome | 린터 및 포매터 |
| Vercel | 배포 및 API 프록시 rewrite |

## 📁 프로젝트 구조

FSD(Feature-Sliced Design) 아키텍처를 적용했습니다.

```text
src
├── app        # 라우터, 프로바이더, 전역 스타일
├── pages      # 페이지 단위 화면
├── widgets    # 지도 등 복합 UI 블록
├── features   # 검색, 위치, 즐겨찾기 기능
├── entities   # 날씨 API, 타입, 도메인 로직
└── shared     # 공용 UI, hooks, config, data, utils
```

날씨 API와 관련된 서버 상태는 `entities/whether`에 두고, 검색·현재 위치·즐겨찾기처럼 사용자 액션 중심 기능은 `features`로 분리했습니다. 상위 레이어만 하위 레이어를 import하며, 같은 레이어 간 import는 금지합니다.

## 🚀 실행 방법

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

> ⚠️ 기상청 API는 CORS 허용 헤더가 없어 브라우저에서 직접 호출할 수 없습니다. 로컬에서는 Vite dev server의 프록시가 이를 처리하므로 **`pnpm dev`로만 실행 가능**합니다. `pnpm preview`는 프록시가 없어 API 호출이 차단됩니다.

## ⚙️ 환경변수

프로젝트 루트에 `.env` 파일을 만들고 아래 값을 설정합니다.

```env
VITE_NAVER_MAP_CLIENT_ID=네이버_지도_Client_ID

VITE_KOREA_METEOROLOGICAL_ADMINISTRATION_API_KEY=기상청_API_Hub_인증키
```

| 환경변수 | 설명 | 발급 |
|---------|------|------|
| `VITE_NAVER_MAP_CLIENT_ID` | 네이버 지도 API Client ID | [네이버 클라우드 플랫폼](https://www.ncloud.com/) → Application 등록 |
| `VITE_KOREA_METEOROLOGICAL_ADMINISTRATION_API_KEY` | 기상청 단기예보 API 인증키 | [기상청 API Hub](https://apihub.kma.go.kr/) → 활용신청 |

Vercel 배포 환경에서는 `vercel.json`의 rewrite 규칙이 같은 역할을 수행합니다.

## 💡 기술적 의사결정

### FSD 아키텍처
화면 단위는 `pages`, 독립 기능은 `features`, 날씨 API 도메인은 `entities`에 배치해 변경 범위를 좁혔습니다.

### TanStack Query — 서버 상태 분리
날씨 데이터는 서버에서 받아오는 비동기 상태이므로 TanStack Query로 관리했습니다.

**Query options 분리**  
`queryFn`, `queryKey`, `staleTime`, `gcTime`을 `UseQueryOptions`를 반환하는 팩토리 함수로 분리했습니다. `useQuery`에 직접 옵션을 인라인으로 작성하면 컴포넌트가 바뀔 때마다 설정을 함께 복사해야 합니다. 팩토리로 분리하면 동일한 쿼리 설정을 여러 훅에서 spread해서 재사용할 수 있고, `useSuspenseQuery` 등 다른 쿼리 훅으로 교체하기도 쉽습니다.

**Query key 구조**  
```
['whether', 'vilageForecast', nx, ny, baseDate, baseTime]
```
격자 좌표(`nx`, `ny`)를 포함해 위치별로 독립된 캐시 엔트리를 가집니다. 여기에 발표 날짜(`baseDate`)와 발표 시각(`baseTime`)을 추가해, 같은 위치라도 다른 시각의 예보는 별도 캐시로 관리합니다. 계층 구조(`whetherQueryKeys.vilageForecastAll()`)를 두어 특정 예보 유형 전체를 한 번에 무효화할 수 있도록 했습니다.

**staleTime · gcTime 설정**  
단기예보 데이터는 발표 시각이 바뀌지 않는 한 값이 변하지 않습니다. query key에 발표 시각이 담겨 있으므로 새 발표가 나오면 key 자체가 달라져 새 요청이 발생합니다. 이전 발표 데이터는 refetch할 이유가 없어 `staleTime: Infinity`로 설정했습니다. 단기예보가 3시간 간격으로 발표되는 점을 고려해 `gcTime`은 3시간으로 두어 이전 발표 캐시를 자동으로 정리합니다.

**예보 캐시 무효화**  
기상청 단기예보는 매일 02:00, 05:00, 08:00, 11:00, 14:00, 17:00, 20:00, 23:00에 발표됩니다. 앱을 켜둔 채로 발표 시각이 지나도 화면이 갱신되도록 `useWeatherInvalidation` 훅을 구현했습니다.

`setInterval`로 주기적으로 polling하면 불필요한 API 호출이 발생합니다. 대신 현재 시각에서 다음 발표 예정 시각까지의 밀리초를 계산해 `setTimeout`을 정확히 그 시점에 발화시킵니다. 발표 직후 API에 데이터가 반영되기까지 시간이 필요하므로 발표 시각 기준 10분 뒤를 실제 invalidation 시점으로 삼습니다.

타이머가 발화하면 `queryClient.invalidateQueries({ queryKey: whetherQueryKeys.vilageForecastAll() })`로 단기예보 캐시 전체를 한 번에 무효화하고, 곧바로 다음 발표 시각까지의 타이머를 재스케줄링합니다. 이 훅은 UI를 렌더링하지 않는 headless 컴포넌트 `WhetherInvalidator`에 담아 앱 루트에 마운트해 생명주기를 앱 전체와 동기화했습니다.

### Zustand — 클라이언트 상태 분리
즐겨찾기는 서버 데이터가 아니라 사용자가 앱 안에서 관리하는 클라이언트 상태입니다. 여러 컴포넌트에서 추가, 삭제, 별칭 수정이 필요하므로 Zustand store로 분리했습니다.

**슬라이스 패턴 적용**  
상태와 액션을 `StateCreator`로 정의한 슬라이스(`createFavoritesSlice`)로 분리하고, store에서 spread해 조합하는 구조를 택했습니다. 현재는 즐겨찾기 슬라이스 하나뿐이지만, 이후 선택된 지역 상태 등 관심사가 다른 상태가 추가될 때 슬라이스 파일을 추가하고 store에서 spread만 하면 기존 슬라이스를 건드리지 않고 확장할 수 있습니다.

**persist 미들웨어**  
즐겨찾기는 페이지를 새로고침해도 유지되어야 합니다. `persist` 미들웨어로 `localStorage`에 저장하되, `partialize`로 `favorites` 배열만 직렬화 대상으로 지정해 액션 함수가 저장에 포함되지 않도록 했습니다.

### Web Worker 기반 검색
초기에는 메인 스레드에서 필터링했는데, 대상 항목이 너무 많아 입력할 때마다 UI 업데이트가 실제로 지연됐습니다. 이를 해결하기 위해 필터링 작업을 Web Worker로 위임해 메인 스레드를 확보했습니다.

### 반응형 UI — 미디어 쿼리 구독
데스크탑과 모바일은 즐겨찾기 접근 방식이 다릅니다. 데스크탑에서는 좌측 사이드바가 지도와 함께 보기 좋고, 모바일에서는 하단 바텀시트가 한 손 조작에 적합하다고 판단했습니다. 화면 구분은 `useSyncExternalStore` 기반 `useDeviceSize` 훅으로 media query를 구독합니다.

**왜 `useState` + `useEffect`가 아닌가**

`window.addEventListener('resize', () => setState(...))` 방식은 리사이즈 이벤트마다 `setState`가 호출되어 breakpoint를 넘지 않는 리사이즈에서도 불필요한 리렌더가 누적됩니다. 또한 React 18 Concurrent Mode에서 렌더링이 중단-재개되는 사이에 값이 바뀌면 같은 렌더 트리 안에서 컴포넌트마다 다른 값을 읽는 tearing이 발생할 수 있습니다.

이 구현은 `mediaQueryList.addEventListener('change', ...)`를 사용하므로 `resize` 이벤트와 달리 440px 경계를 실제로 넘는 순간에만 이벤트가 발화합니다. `useSyncExternalStore`는 여기에 더해 `getSnapshot`의 반환값(`'mobile'` / `'desktop'`)이 바뀌었을 때만 리렌더를 발생시킵니다. 결과적으로 리렌더는 화면 크기가 440px 기준을 넘나들 때만 발생합니다. 이러한 이유로 `useSyncExternalStore`를 사용하여 구현했습니다.

### Vercel rewrite — CORS 우회
기상청 API 응답에 브라우저 CORS 허용 헤더가 없어, 배포 환경에서는 Vercel rewrite를 사용해 `/api` 요청을 기상청 API로 프록시합니다. API key를 숨기는 목적이 아니라 브라우저 same-origin 요청으로 CORS 문제를 피하기 위한 설정입니다.

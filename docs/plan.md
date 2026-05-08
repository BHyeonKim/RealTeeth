# 지도 기반 날씨 앱 — UI 설계 플랜

## 앱 개념

지도를 중심으로 한 날씨 조회 앱. 행정구역 polygon에 날씨 데이터를 시각화하여 직관적 탐색 제공.

---

## 화면 구성

### 데스크탑 뷰 (≥ 1024px)

```
┌─────────────────────────────────────────────────┐
│ [★ 즐겨찾기]                                      │
│ [🔍 검색창 ___________________]                   │
│                                                   │
│         지도 (전체 화면)                           │
│                                                   │
│                                    [📍 내 위치]   │
└─────────────────────────────────────────────────┘

즐겨찾기 열렸을 때:
┌──────────────┬────────────────────────────────────┐
│  ★ 즐겨찾기  │                                    │
│ ┌──────────┐ │          지도 (계속 보임)           │
│ │카드1     │ │                                    │
│ │카드2     │ │                      [📍 내 위치]  │
│ └──────────┘ │                                    │
└──────────────┴────────────────────────────────────┘
```

### 모바일 뷰 (< 1024px)

```
┌───────────────────────┐
│ [🔍 검색창 _________] │  ← 최상단 고정
│                       │
│    지도 (전체 화면)    │
│                       │
│           [📍 내 위치]│
├───────────────────────┤  ← 바텀시트 핸들
│  ▲ 즐겨찾기 (축소)    │
└───────────────────────┘

바텀시트 올렸을 때:
┌───────────────────────┐
│ [🔍 검색창 _________] │
│  (지도 일부 보임)     │
├───────────────────────┤
│ ★ 즐겨찾기            │
│ ┌────────────────────┐│
│ │ 카드 1             ││
│ │ 카드 2             ││
└─┴────────────────────┘┘
```

### 공통 인터랙션

| 동작 | 결과 |
| ---- | ---- |
| 검색창에 지역명 입력 | 매칭 장소 드롭다운 리스트 표시 |
| 드롭다운에서 장소 선택 | 해당 지역으로 지도 이동 + polygon 색칠 |
| 지도 드래그/이동 | 지도 중앙 행정구역 polygon 색칠 (자동 갱신) |
| Zoom 변경 | 단위 전환: 동 → 구 → 시/도 |
| Polygon 위 marker | 현재 기온, 당일 최저/최고 표시 / 날씨 정보 없으면 `"해당 장소의 정보가 제공되지 않습니다."` |
| Polygon 클릭 | modal: 현재 기온, 최저/최고, **시간대별 기온**, 발표시각, 예보시각 |
| 내 위치 버튼 클릭 | 지도가 사용자 현재 위치로 이동 |

### 즐겨찾기

- 최대 6개, 카드 UI 형태
- 카드 표시: 별칭, 현재 기온, 당일 최저/최고
- 별칭 수정 가능 (인라인 편집 또는 별도 input)
- 카드 클릭 → **상세 Modal** 오픈 (즐겨찾기 상세 페이지 = Modal)
  - Modal 표시: 현재 기온, 최저/최고, **시간대별 기온**, 발표시각, 예보시각

---

## 요구사항 검증

### ✅ 충족 항목

| 요구사항 | 계획 내 구현 |
| -------- | ----------- |
| 현재 기온 표시 | Polygon marker + modal |
| 당일 최저/최고 기온 | Polygon marker + modal + 즐겨찾기 카드 |
| 앱 첫 진입 시 현재 위치 감지 | 내 위치 버튼 + 첫 로드 시 Geolocation API 자동 실행 |
| 장소 검색 (시·군·구·동 모든 단위) | 검색창 + korea_districts.json 활용 |
| 검색 시 매칭 리스트 표시 | 드롭다운 리스트 |
| 즐겨찾기 추가/삭제 | 카드 UI + 삭제 버튼 |
| 즐겨찾기 최대 6개 제한 | 카드 6개 초과 시 추가 버튼 비활성화 |
| 즐겨찾기 별칭 수정 | 카드 내 인라인 편집 |
| 즐겨찾기 카드에 날씨 정보 | 현재 기온, 최저/최고 표시 |
| 데스크탑/모바일 반응형 | 사이드 패널 ↔ 바텀시트 전환 |

### ⚠️ 보완 필요 항목

모든 요구사항 충족 — ⚠️ 보완 항목 없음

---

## Google Stitch 프롬프트

아래 프롬프트를 [Google Stitch](https://stitch.withgoogle.com)에 그대로 붙여넣기하세요.

---

```
Design a responsive map-based weather app with the following specifications:

## App Overview
A full-screen interactive map weather app for South Korea. The map displays administrative district polygons colored with weather data. Users can search locations, view weather overlays on polygons, and manage up to 6 favorite locations.

## Visual Style
- Full-screen map as the base layer (dark/satellite style preferred)
- Glassmorphism UI panels (semi-transparent, blurred background)
- Clean and modern weather app aesthetic
- Temperature displayed prominently with color-coded indicators (blue = cold, red = hot)
- Smooth transitions for panel open/close animations

## Desktop Layout (1280px+)

**Default state:**
- Top-left corner: A compact favorites toggle button (star icon + "즐겨찾기" label)
- Below the favorites button: A search bar with magnifying glass icon, rounded pill shape, white glassmorphism background, placeholder text "지역명 검색 (예: 종로구, 청운동)"
- Full-screen map behind all UI elements
- Bottom-right corner: A circular "My Location" button with GPS/location pin icon

**Search active state:**
- Search bar expands slightly
- Below search bar: A dropdown list of matching location results, max 5 items, glassmorphism card style

**Favorites panel open:**
- A side panel slides in from the LEFT edge, taking up about 320px width
- Panel does NOT cover the full screen — the map remains visible to the right
- Panel header: "즐겨찾기" title with close (X) button
- Panel content: Vertical list of favorite location cards (max 6)
- Each card: Location name/alias (editable with pencil icon), current temperature (large, bold), min/max temperature for today (smaller text below)
- Empty state: "즐겨찾기를 추가하세요 (최대 6개)" with a plus button

**Map polygon overlay:**
- When a region is selected or hovered: The administrative district polygon is filled with a semi-transparent blue/teal color
- On top of each active polygon: A floating card/chip showing current temperature and today's min/max temp

**Weather modal (appears when clicking a polygon):**
- Centered modal, 480px wide, glassmorphism style
- Header: District name + close button
- Content sections:
  - Current temperature (very large, prominent)
  - Today's min/max temperature
  - Announcement time (발표시각) and forecast time (예보시각)
  - Hourly temperature list/chart (시간대별 기온) — horizontal scrollable row of time + temp chips

## Mobile Layout (375px)

**Default state:**
- Full-screen map
- Top: Sticky search bar, full width with padding, rounded, glassmorphism style
- Bottom: Bottom sheet in collapsed state — shows just a handle bar and a subtle "즐겨찾기" label, peeking about 64px from the bottom
- Bottom-right (above bottom sheet): Circular "My Location" button

**Bottom sheet expanded:**
- Sheet slides up to cover ~60% of the screen
- Map still visible at the top portion
- Sheet header: Handle bar + "즐겨찾기" title
- Scrollable list of favorite location cards (same card style as desktop)

**Search active state (mobile):**
- Search bar in focus with keyboard up
- Dropdown results list appears below the search bar

## Component Details

**Favorite Card:**
- Rounded rectangle, white glassmorphism on dark panel
- Left: Location alias name (editable, tap pencil icon to edit inline)
- Center: Large current temperature
- Right column: ↑ max temp / ↓ min temp
- Bottom-right: Remove (trash) icon
- Tapping the card (not icons): Opens the Favorite Detail Modal

**Favorite Detail Modal / Location Detail Modal (shared component):**
- Centered modal, 480px wide, glassmorphism style
- Header: District/location name + close (X) button
- Content sections:
  - Current temperature (very large, prominent)
  - Today's min/max temperature
  - Announcement time (발표시각) and forecast time (예보시각) — small gray text
  - Hourly temperature horizontal scroll (시간대별 기온): time blocks at 06:00, 09:00, 12:00, 15:00, 18:00, 21:00, 24:00 — each block shows time label, weather icon, temperature
- Footer: "즐겨찾기 추가" button (or "즐겨찾기 제거" if already saved)

## States to Design
1. Default map view (desktop + mobile)
2. Favorites panel open (desktop) / Bottom sheet expanded (mobile)
3. Search dropdown active
4. Polygon selected with weather overlay
5. Weather/Favorite detail modal open (same modal component for both polygon click and favorite card click)
6. Favorite card with alias editing mode

Please create high-fidelity mockups for all 6 states in both desktop and mobile.
```

---

## 기타 메모

- 지도 라이브러리: Kakao Maps, Naver Maps, Leaflet 중 선택 필요 (polygon 지원 + 한국 지도 데이터 퀄리티 기준)
- `korea_districts.json`에서 polygon 좌표(GeoJSON) 포함 여부 확인 필요 — 없으면 별도 GeoJSON 소스 필요
- 즐겨찾기 상태는 localStorage에 저장 (서버 없이 구현)
- 날씨 API: 기상청 API 사용

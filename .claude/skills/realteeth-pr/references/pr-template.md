# PR 템플릿

## 기본 템플릿

```markdown
## 개요
<!--변경 사항 및 관련 이슈에 대해 간단하게 작성해주세요. 어떻게보다 무엇을 왜 수정했는지 설명해주세요.-->

## 유형
<!--어떤 변경 사항이 있나요?-->
- [ ] 새로운 기능 추가
- [ ] 버그 수정
- [ ] CSS 등 사용자 UI 디자인 변경
- [ ] 코드에 영향을 주지 않는 변경사항(오타 수정, 탭 사이즈 변경, 변수명 변경)
- [ ] 코드 리팩토링
- [ ] 주석 추가 및 수정
- [ ] 문서 수정
- [ ] 테스트 추가, 테스트 리팩토링
- [ ] 빌드 부분 혹은 패키지 매니저 수정
- [ ] 파일 혹은 폴더명 수정
- [ ] 파일 혹은 폴더 삭제

## 변경점
<!--변경 사항을 작성해주세요.-->

## 스크린샷
<!--스크린샷을 첨부해주세요.-->

## PR Checklist
<!--PR이 다음 요구 사항을 충족하는지 확인하세요.-->
- [ ] 커밋 메시지 컨벤션에 맞게 작성했습니다.
- [ ] 변경 사항에 대한 테스트를 했습니다.
```

---

## 작성 규칙

### 유형
모든 체크박스를 그대로 유지하고 해당하는 항목에만 `[x]`로 체크한다. 항목을 추가하거나 삭제하지 않는다.

### 변경점 — 카테고리가 여러 개일 때

변경 파일이 여러 도메인/카테고리에 걸쳐 있으면 `###`으로 카테고리를 분리한다.

````markdown
## 변경점
### `mantang-pr` 스킬 (`.claude/skills/mantang-pr/`)
- `/mantang-pr` 커맨드로 PR 생성/업데이트 자동화
  - 열린 PR 존재 시 업데이트 모드, 없으면 생성 모드 자동 분기

### 설정 (`.claude/settings.json`)
- git/gh 명령어 권한 추가
````

### 변경점 — 컴포넌트 추가 시

컴포넌트가 추가됐으면 사용 예시를 코드 블록으로 함께 작성한다.

````markdown
## 변경점
- `CarCard` 컴포넌트 추가

```tsx
<CarCard
  carId="abc123"
  onPress={handleCarCardPress}
/>
```

- `useCarList` 훅 추가

```tsx
const { data, isLoading } = useCarList({ page: 1 })
```
````

#### 프로젝트 공통 컴포넌트 예시

**Tossface (이모지 폰트)**

```tsx
<span style={{ fontFamily: 'Tossface' }}>🚗</span>
```

**PageHeader**

```tsx
// 타이틀만
<PageHeader title="마이페이지" />

// 타이틀 + 하단 보더
<PageHeader title="마이페이지" showBorder />

// 뒤로가기 + 타이틀
<PageHeader title="검색" showBackButton />

// 뒤로가기 + 타이틀 + 하단 보더
<PageHeader title="상세" showBackButton showBorder />

// 뒤로가기만
<PageHeader showBackButton />
```

### 변경점 — 함수 추가 시

유틸 함수나 API 함수가 추가됐을 때도 동일하게 코드 블록으로 사용 예시를 작성한다.

````markdown
## 변경점
- `formatCarDistance` 유틸 함수 추가

```ts
const label = formatCarDistance(12000) // "12,000km"
```

- `fetchCarDetail` API 함수 추가

```ts
const car = await fetchCarDetail({ carId: 'abc123' })
```
````

### 변경점 — 수정/삭제 시

코드 블록 없이 변경 내용을 간결하게 서술한다.

```markdown
## 변경점
- `CarList` 컴포넌트의 스크롤 이벤트 핸들러 최적화
- 사용하지 않는 `OldCarCard` 컴포넌트 삭제
```

### 스크린샷
- UI 변경이 있으면 스크린샷 첨부를 요청한다.
- UI 변경이 없으면 `해당 없음`으로 표기한다.

---
name: realteeth-pr
description: PR(Pull Request)을 작성·생성·업데이트하는 스킬. 이 프로젝트의 브랜치 전략(main → feature/(기능) → feature/(하위기능))과 PR 템플릿을 따라 PR을 작성한다. 열린 PR이 없으면 생성, 있으면 업데이트한다. "PR 작성", "PR 만들어", "pull request 생성", "PR 올려줘", "PR 업데이트", "PR 수정해줘" 등 PR 관련 요청 시 사용.
---

# PR 작성 스킬

- 브랜치 전략 상세: `references/branch-strategy.md`
- PR 템플릿 및 변경점 작성 예시: `references/pr-template.md`

## 1단계: 현황 파악 및 작업 모드 결정

```bash
git branch --show-current                          # 현재 브랜치 확인
gh pr list --head $(git branch --show-current) --state open --json number,title,baseRefName
# 결과가 있으면 → PR 업데이트 모드
# 결과가 없으면 → PR 생성 모드
```

**PR 업데이트 모드** (열린 PR이 이미 존재): 2~5단계를 거쳐 6단계에서 `gh pr edit`으로 PR 본문을 덮어쓴다.

**PR 생성 모드** (열린 PR 없음): 아래 분기 원점 확인 후 2~6단계를 진행한다.

```bash
.claude/skills/realteeth-pr/scripts/check-branch-origin.sh
```

브랜치 이름 + 분기 원점을 함께 보고 PR 유형 결정:
- 다른 `feature/` 브랜치에서 분기 → `feature/(하위기능)` → `feature/(기능)` PR
- `main`에서 직접 분기 → `feature/(기능)` → `develop` 또는 `main` PR
- 불분명한 경우 사용자에게 타겟 브랜치 확인

## 2단계: 변경 사항 상세 분석

변경된 파일 목록을 확인하고 각 파일을 직접 읽어 내용을 파악한다.

```bash
.claude/skills/realteeth-pr/scripts/analyze-changes.sh <target-branch>
```

변경된 파일을 Read 도구로 직접 열어 다음 항목을 파악한 뒤 `tmp/pr-memo.md`에 기록한다:

| 항목 | 확인 내용 |
|------|----------|
| 추가된 컴포넌트/함수 | 이름, props/파라미터, 역할 |
| 수정된 컴포넌트/함수 | 무엇이 어떻게 바뀌었는지 |
| 삭제된 항목 | 무엇을 왜 삭제했는지 |
| 유형 분류 | 새 기능/버그수정/리팩토링/UI/문서 등 |
| UI 변경 여부 | 스크린샷이 필요한지 판단 |

`tmp/pr-memo.md` 형식 예시:

```markdown
## 변경 파일
- src/features/user/UserCard.tsx (추가)
- src/features/user/useUserQuery.ts (수정)

## 추가된 컴포넌트/함수
- `UserCard`: 사용자 정보를 카드 형태로 표시. props: userId, onPress

## 수정된 항목
- `useUserQuery`: 캐시 전략을 stale-while-revalidate로 변경

## 유형
- 새로운 기능 추가, CSS 등 사용자 UI 디자인 변경

## UI 변경
- 있음 (스크린샷 필요)

## Labels
- frontend
- feature
- ui
```

**Labels 결정 규칙** (메모에 기록):
- `frontend`: 항상 포함
- `release`: target 브랜치가 `main`이면 추가
- `feature`: 새로운 기능 추가에 해당하면 추가
- `fix`: 버그 수정에 해당하면 추가
- `refactoring`: 코드 리팩토링에 해당하면 추가
- `ui`: UI 디자인 변경에 해당하면 추가
- `enhancement`: 성능 개선에 해당하면 추가

이후 단계는 `tmp/pr-memo.md`를 참조해서 작성한다.

## 3단계: 관련 PR 조회 (develop/main 대상 PR만)

```bash
gh pr list --state all --limit 30
```

- develop 대상: 해당 feature에서 올라간 하위 feature PR들을 태깅
- main 대상: develop에 병합했던 PR을 태깅
- 관련 PR이 없으면 커밋 해시로 태깅

## 4단계: PR 제목 작성

변경 사항의 핵심을 간결하게 표현한다. `feat:`, `fix:`, `refactor:` 등 커밋 prefix는 **포함하지 않는다**.

| PR 유형 | 제목 형식 |
|---------|----------|
| feature → feature | 변경 내용 요약 |
| feature → develop | 변경 내용 요약 |
| feature → main | 변경 내용 요약 **상용 배포** ← 필수 |

## 5단계: PR 본문 작성

`.github/PULL_REQUEST_TEMPLATE.md` 모든 섹션을 유지하고 내용을 채운다. 섹션을 삭제하면 안 된다.

### 개요

변경된 **무엇을**, **왜** 했는지 서술한다.

### 유형

모든 체크박스를 표시하고, 해당하는 항목에 체크한다:

```markdown
## 유형
- [x] 새로운 기능 추가
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
```

### 변경점

변경 사항을 목록으로 작성한다. 작성 패턴은 `references/pr-template.md`를 참조한다:
- 카테고리가 여러 개 → `###`으로 분리
- 컴포넌트/함수 추가 → 코드 블록으로 사용 예시 포함
- 수정/삭제 → 코드 블록 없이 간결하게 서술

### 스크린샷

UI 변경이 있으면 스크린샷 첨부를 요청한다. 없으면 "해당 없음"으로 표기한다.

### PR Checklist

템플릿 그대로 유지한다. 체크 여부는 수정하지 않는다.

### 관련 PR / 커밋 (develop, main 대상만)

본문 마지막에 추가:

```markdown
## 관련 PR
- #42 feat: 사용자 카드 UI 구현
- #43 feat: 사용자 카드 API 연동
```

관련 PR이 없으면:

```markdown
## 관련 커밋
- abc1234 feat: 사용자 카드 UI 구현
```

## 6단계: PR 생성 또는 업데이트 및 메모 삭제

1단계에서 확인한 모드에 따라 분기한다.

### PR 생성 모드 (열린 PR 없음)

```bash
# 1) 자신을 제외한 리뷰어를 쉼표로 join (현재 미사용)
# REVIEWERS=$(.claude/skills/realteeth-pr/scripts/get-reviewers.sh)

# 2) PR 생성
gh pr create \
  --base <target-branch> \
  --title "<PR 제목>" \
  # --reviewer "$REVIEWERS" \
  --assignee "@me" \
  --label "frontend" \
  --label "<추가 label1>" \
  --body "$(cat <<'EOF'
<작성한 본문>
EOF
)"
```

라벨이 여러 개면 `--label` 플래그를 반복한다.

### PR 업데이트 모드 (열린 PR 존재)

기존 PR 본문 전체를 덮어쓴다. 제목도 변경이 필요하면 함께 업데이트한다.

```bash
# 1) PR 번호 확인 (1단계에서 이미 확인했으면 생략)
gh pr list --head $(git branch --show-current) --state open --json number -q '.[0].number'

# 2) 자신을 제외한 리뷰어를 쉼표로 join (현재 미사용)
# REVIEWERS=$(.claude/skills/realteeth-pr/scripts/get-reviewers.sh)

# 3) 본문 업데이트
gh pr edit <PR번호> \
  --title "<업데이트된 제목>" \
  # --add-reviewer "$REVIEWERS" \
  --add-assignee "@me" \
  --add-label "frontend" \
  --add-label "<추가 label1>" \
  --body "$(cat <<'EOF'
<새로 작성한 본문>
EOF
)"
```

### 메모 삭제

```bash
rm -rf tmp
```

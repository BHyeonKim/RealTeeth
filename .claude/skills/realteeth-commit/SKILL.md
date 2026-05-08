---
name: realteeth-commit
description: 변경된 파일을 분석해 작업 단위로 묶어 커밋하는 스킬. "커밋해줘", "커밋 해줘", "commit 해줘", "변경사항 커밋" 등 커밋 요청 시 사용. 커밋 컨벤션 및 scope 규칙은 references/commit-convention.md 참고.
---

# Mantang Commit 스킬

커밋 컨벤션 상세: `references/commit-convention.md`

## 1단계: 현황 파악

```bash
git status                        # staged / unstaged 파일 구분
git diff --cached --name-only     # staged 파일 목록
git diff --name-only              # unstaged 파일 목록
```

**staging 상태에 따른 커밋 대상 결정:**
- 모든 변경 파일이 staged → staged 파일 전체를 작업 단위로 분류
- 일부만 staged → staged 파일만 커밋 대상 (unstaged는 건드리지 않음)

## 2단계: 변경 사항 상세 분석

커밋 대상 파일을 Read 도구로 열어 내용을 파악한 뒤 `tmp/commit-memo.md`에 기록한다.

```bash
git diff --cached                 # staged 변경 내용 전체 확인
```

파악할 항목:
- 어떤 기능/컴포넌트/함수가 추가·수정·삭제됐는지
- 파일들이 어떤 작업 단위로 묶이는지
- 각 그룹의 tag와 scope

## 3단계: 작업 단위로 그룹핑

관련 있는 파일끼리 묶어 커밋 단위를 결정한다.

그룹핑 기준:
- 같은 기능/화면에 속하는 파일 → 한 커밋
- 다른 기능이지만 같은 성격(예: 여러 화면의 스타일 수정) → 나눠서 커밋
- 설정 파일·유틸·공통 컴포넌트 변경 → 별도 커밋

## 4단계: 커밋 메시지 작성 및 커밋

각 그룹별로 staged에 올리고 커밋한다.

```bash
# 특정 파일만 stage에 올릴 때
git add <file1> <file2>

# 커밋
git commit -m "$(cat <<'EOF'
tag(scope): 제목

- 세부 변경사항 1
- 세부 변경사항 2
EOF
)"
```

변경이 단순하면 본문 없이 제목만 커밋한다:
```bash
git commit -m "tag(scope): 제목"
```

## 5단계: 메모 삭제

```bash
rm -rf tmp
```

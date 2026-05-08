#!/bin/bash
# 자신을 제외한 협업자 목록을 쉼표로 join해서 출력
CURRENT_USER=$(gh api user -q '.login')
REPO=$(gh repo view --json owner,name -q '.owner.login + "/" + .name')
gh api repos/$REPO/collaborators | jq -r --arg me "$CURRENT_USER" '[.[].login | select(. != $me)] | join(",")'

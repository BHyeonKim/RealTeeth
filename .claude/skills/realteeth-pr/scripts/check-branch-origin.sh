#!/bin/bash
# HEAD와 main/develop의 분기점 및 추가 커밋 목록 출력
git merge-base HEAD main
git merge-base HEAD develop
git log --oneline main..HEAD
git log --oneline develop..HEAD

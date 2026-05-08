#!/bin/bash
# 사용법: bash analyze-changes.sh <target-branch>
git diff $1...HEAD --name-only
git diff $1...HEAD --stat
git log $1...HEAD --format="%s"

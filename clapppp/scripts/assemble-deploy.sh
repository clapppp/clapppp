#!/usr/bin/env bash
# next build 결과(standalone)에 정적 파일과 커스텀 서버를 합쳐서 서버에 올릴 폴더(deploy/)를 만든다.
set -euo pipefail

rm -rf deploy
cp -r .next/standalone deploy
mkdir -p deploy/.next
cp -r .next/static deploy/.next/static
cp -r public deploy/public
cp server.js deploy/server.js   # Next 가 만든 server.js 를 우리 커스텀 서버로 교체한다.

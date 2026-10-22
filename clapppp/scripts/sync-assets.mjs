// 프로젝트 패키지가 들고 있는 정적 파일(glTF 모델 등)을 public/ 으로 복사한다.
import { cpSync, existsSync, mkdirSync } from "node:fs";

const assets = [
  ["node_modules/websocket-playground/public/model", "public/model"],
  ["node_modules/peercon-docs/docs/images", "public/projects/peercon"],
];

for (const [from, to] of assets) {
  if (!existsSync(from)) {
    console.error(`sync-assets: ${from} not found. run npm install first.`);
    process.exit(1);
  }
  mkdirSync(to, { recursive: true });
  cpSync(from, to, { recursive: true });
}

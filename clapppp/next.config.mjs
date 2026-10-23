/** @type {import('next').NextConfig} */
const nextConfig = {
  // 서버에서 npm 설치 없이 실행할 수 있도록 필요한 node_modules 만 .next/standalone 에 묶는다.
  output: "standalone",
  // 커스텀 server.js 가 직접 쓰는 패키지는 Next 가 자동으로 추적하지 못하므로 명시한다.
  outputFileTracingIncludes: {
    "/*": [
      "./node_modules/next/**/*",
      "./node_modules/ws/**/*",
      "./node_modules/websocket-playground/package.json",
      "./node_modules/websocket-playground/src/server/**/*",
    ],
  },
  // 프로젝트 레포(npm 의존성)는 TS 소스 그대로 배포되므로 Next 가 직접 컴파일한다.
  transpilePackages: ["websocket-playground", "next-mdx-remote"],
};

export default nextConfig;

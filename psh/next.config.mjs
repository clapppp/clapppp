/** @type {import('next').NextConfig} */
const nextConfig = {
  // 프로젝트 레포(npm 의존성)는 TS 소스 그대로 배포되므로 Next 가 직접 컴파일한다.
  transpilePackages: ["websocket-playground", "next-mdx-remote"],
};

export default nextConfig;

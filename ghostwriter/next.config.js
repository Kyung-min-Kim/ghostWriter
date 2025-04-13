const nextConfig = {
  // Next.js 설정...
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["covers.openlibrary.org"], // ✅ 외부 이미지 도메인 허용
  },
};

module.exports = {
  ...nextConfig, // 기존의 Next.js 설정을 유지하면서
  // 웹팩 설정 추가

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // 브라우저에서 fs, child_process, net 모듈을 요청하지 않도록 설정
    // if (!isServer) {
    //   config.resolve.fallback = {
    //     fs: false,
    //     child_process: false,
    //     net: false,
    //     tls: false,
    //     dns: false,
    //   };
    // }

    // html-loader를 사용하여 .html 파일을 처리하는 웹팩 rule 추가
    config.module.rules.push({
      test: /\.html$/,
      use: {
        loader: "html-loader",
      },
    });

    return config;
  },
};

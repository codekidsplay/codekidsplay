import type { NextConfig } from "next";

const DOMENIU = "https://codekidsplay.ro";

const nextConfig: NextConfig = {
  // Un singur domeniu canonic: www și .vercel.app → codekidsplay.ro
  async redirects() {
    return ["www.codekidsplay.ro", "codekidsplay.vercel.app"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: `${DOMENIU}/:path*`,
      permanent: true,
    }));
  },
};

export default nextConfig;

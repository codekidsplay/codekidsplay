import type { NextConfig } from "next";

const DOMENIU = "https://codemakerclub.ro";

const nextConfig: NextConfig = {
  // Un singur domeniu canonic: www → codemakerclub.ro
  async redirects() {
    return ["www.codemakerclub.ro"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: `${DOMENIU}/:path*`,
      permanent: true,
    }));
  },
  // Antete de securitate (CSP lăsat deoparte intenționat: necesită testare pe toate paginile)
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
        ],
      },
    ];
  },
};

export default nextConfig;

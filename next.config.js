/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        domains: [
            "links.papareact.com",
            "fakestoreapi.com"
        ]
    },
    async headers() {
        return [
          {
            source: "/api/create-checkout-session",
            headers: [
              {
                key: "Access-Control-Allow-Origin",
                value: "http://localhost:3000",
              },
            ],
          },
        ];
      }, 
}

module.exports = nextConfig

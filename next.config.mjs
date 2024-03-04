import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "firebasestorage.googleapis.com",
      "res.cloudinary.com",
      "images.unsplash.com",
      "cdn.pixabay",
      "unsplash.com",
    ],
  },
};

export default withNextIntl(nextConfig);

import React from "react";

const Robots = () => {
  return <div />;
};

export async function getServerSideProps(context: any) {
  try {
    const content: string = `User-agent: *\nDisallow: /payment-vnpay\nDisallow: /tai-khoan\nDisallow: /tai-khoan/*\nDisallow: /gio-hang\nDisallow: /checkout\nDisallow: /checkout/*\nDisallow: /success\nDisallow: /success/*\nDisallow: /don-hang\nDisallow: /don-hang/*\nDisallow: /taikhoan\nDisallow: /apple-app-site-association\n\n# Google adsbot ignores robots.txt unless specifically named!\nUser-agent: adsbot-google\nDisallow: /tai-khoan\nDisallow: /tai-khoan/*\nDisallow: /gio-hang\nDisallow: /checkout\nDisallow: /checkout/*\nDisallow: /success\nDisallow: /success/*\nDisallow: /don-hang\nDisallow: /don-hang/*\nDisallow: /taikhoan\nDisallow: /apple-app-site-association\n\nUser-agent: Nutch\nDisallow: /\n\nUser-agent: MJ12bot\nCrawl-delay: 10\n\nUser-agent: Pinterest\nCrawl-delay: 1\n\nSitemap: ${process.env.NEXT_PUBLIC_FULL_URL}/sitemap.xml\nSitemap: ${process.env.NEXT_PUBLIC_FULL_URL}/product-sitemap.xml\nSitemap: ${process.env.NEXT_PUBLIC_FULL_URL}/brand-sitemap.xml\nSitemap: ${process.env.NEXT_PUBLIC_FULL_URL}/group-sitemap.xml\nSitemap: ${process.env.NEXT_PUBLIC_FULL_URL}/category-sitemap.xml\nSitemap: ${process.env.NEXT_PUBLIC_FULL_URL}/static-sitemap.xml`;
    const { res } = context;
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.write(content);
    context.res.end();
    return { props: {} };
  } catch (e) {
    return { props: {} };
  }
}

export default Robots;

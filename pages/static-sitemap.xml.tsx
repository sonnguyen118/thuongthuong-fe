import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (ctx: any) => {
  try {
    const fields: any = [
      {
        loc: `${process.env.NEXT_PUBLIC_FULL_URL}/chinh-sach-bao-mat-thong-tin`, // Absolute url
        lastmod: new Date().toISOString(),
        changefreq: "daily",
      },
      {
        loc: `${process.env.NEXT_PUBLIC_FULL_URL}/dieu-kien-giao-dich-chung`, // Absolute url
        lastmod: new Date().toISOString(),
        changefreq: "daily",
      },
      {
        loc: `${process.env.NEXT_PUBLIC_FULL_URL}/gioi-thieu`, // Absolute url
        lastmod: new Date().toISOString(),
        changefreq: "daily",
      },
      {
        loc: `${process.env.NEXT_PUBLIC_FULL_URL}/ly-do-ban-nen-mua-hang-tai-30shine-shop`, // Absolute url
        lastmod: new Date().toISOString(),
        changefreq: "daily",
      },
      {
        loc: `${process.env.NEXT_PUBLIC_FULL_URL}/lien-he`, // Absolute url
        lastmod: new Date().toISOString(),
        changefreq: "daily",
      },
      {
        loc: `${process.env.NEXT_PUBLIC_FULL_URL}/them`, // Absolute url
        lastmod: new Date().toISOString(),
        changefreq: "daily",
      },
      {
        loc: `${process.env.NEXT_PUBLIC_FULL_URL}/tim-kiem`, // Absolute url
        lastmod: new Date().toISOString(),
        changefreq: "daily",
      },
      {
        loc: `${process.env.NEXT_PUBLIC_FULL_URL}/timkiem`, // Absolute url
        lastmod: new Date().toISOString(),
        changefreq: "daily",
      },
    ];

    return getServerSideSitemap(ctx, fields);
  } catch (e) {
    console.log("Sitemap Static Error: ", e);
    return getServerSideSitemap(ctx, []);
  }
};

const StaticSitemap = () => {};
export default StaticSitemap;

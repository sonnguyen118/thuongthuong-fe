import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";
import SITEMAP_API from "@repository/sitemapRepostiories";

export const getServerSideProps = async (ctx: any) => {
  try {
    const { data } = await SITEMAP_API.getProductSlugSitemap();
    const fields: any = data.map(
      (item: { slug: string; name: string; image: string }) => {
        return {
          loc: `${process.env.NEXT_PUBLIC_FULL_URL}/chi-tiet-san-pham/${item.slug}`, // Absolute url
          lastmod: new Date().toISOString(),
          changefreq: "daily",
        };
      }
    );

    return getServerSideSitemap(ctx, fields);
  } catch (e) {
    console.log("Sitemap Product Error: ", e);
    return getServerSideSitemap(ctx, []);
  }
};

const ProductSitemap = () => {};
export default ProductSitemap;

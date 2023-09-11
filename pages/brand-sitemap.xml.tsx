import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import SITEMAP_API from "@repository/sitemapRepostiories";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {

        const { data } = await SITEMAP_API.getProductBrandSlugSitemap();
        const fields: any = data.map((item: { slug: string, name: string, image: string }) => {
            return {
                loc: `${process.env.NEXT_PUBLIC_FULL_URL}/thuong-hieu/${item.slug}`, // Absolute url
                lastmod: new Date().toISOString(),
                changefreq: "daily"
            }
        })

        return getServerSideSitemap(ctx, fields)
    } catch (e) {
        console.log("Sitemap Brand Error: ", e);
        return getServerSideSitemap(ctx, [])
    }
}

const ProductBrandSitemap = () => {};
export default ProductBrandSitemap;
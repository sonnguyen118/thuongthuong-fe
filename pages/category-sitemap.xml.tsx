import { getServerSideSitemap } from 'next-sitemap'
import { GetServerSideProps } from 'next'
import SITEMAP_API from "@repository/sitemapRepostiories";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {

        const { data } = await SITEMAP_API.getProductCategorySlugSitemap();
        const fields: any = data.map((item: { currentSlug: string, parentSlug: string, name: string, image: string }) => {
            return {
                loc: item.parentSlug ? `${process.env.NEXT_PUBLIC_FULL_URL}/danh-muc/${item.parentSlug}/${item.currentSlug}`: `${process.env.NEXT_PUBLIC_FULL_URL}/nhom-san-pham/${item.currentSlug}`, // Absolute url
                lastmod: new Date().toISOString(),
                changefreq: "daily"
            }
        })

        return getServerSideSitemap(ctx, fields)
    } catch (e) {
        console.log("Sitemap Category Error: ", e);
        return getServerSideSitemap(ctx, [])
    }
}

const ProductCategorySitemap = () => {};
export default ProductCategorySitemap;
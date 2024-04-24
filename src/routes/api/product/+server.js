
import Client from "shopify-buy";
const client = Client.buildClient({
	domain: "shop-sherpagoods.myshopify.com",
	apiVersion: "2024-04",
	storefrontAccessToken: "d9b2dd5e8577369c07bd46e6534b9476",
});
/** @type {import('./$types').RequestHandler} */
export async function GET() {
	let products = await client.product.fetchAll()
	return new Response(JSON.stringify(products));
}
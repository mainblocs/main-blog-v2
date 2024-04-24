/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck



export const ssr = true;
export const prerender = true;
/** @type {import('./$types').LayoutLoad} */
export async function load({fetch}) {
    let data = await fetch('/api/product');
    let json = await data.json();
    return { products: json };
}
import{a as o,t as s,c as p}from"../chunks/disclose-version.BD2IXOaX.js";import{p as d,a as l,r as u,O as m}from"../chunks/runtime.KHPTfT0h.js";import{s as f}from"../chunks/render.CR8dV1-2.js";import{e as v,i as _}from"../chunks/each.COBTARdN.js";import{i as g}from"../chunks/lifecycle.DBI0busB.js";const h=!0,j=!0;async function x({fetch:t}){return{products:await(await t("/api/product")).json()}}const P=Object.freeze(Object.defineProperty({__proto__:null,load:x,prerender:j,ssr:h},Symbol.toStringTag,{value:"Module"}));var b=s('<a href="/"> </a>'),w=s('<div class="mt-56"></div>');function T(t,a){l(a,!1),console.log(a.data.products),g();var e=w();v(e,9,()=>a.data.products,_,(n,i,y)=>{var r=b(),c=p(r);u(()=>f(c,m(i).title)),o(n,r)}),o(t,e),d()}export{T as component,P as universal};
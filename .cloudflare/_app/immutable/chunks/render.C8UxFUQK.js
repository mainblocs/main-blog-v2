import{k as R,g as p,j as V,l as x,m as A,n as D,h as M,i as O}from"./disclose-version.CVnN-KyV.js";import{r as k,f as b,h as C,P as E,x as H,Q as I,R as N,T as w,v as P,p as B,a as Y,c as $}from"./runtime.CzIsSfB-.js";function z(n,e,a,t,o){var r={capture:t,passive:o};function i(s){if(t||y(e,s),!s.cancelBubble)return a.call(this,s)}e.addEventListener(n,i,r),(e===document.body||e===window||e===document)&&k(()=>()=>{e.removeEventListener(n,i,r)})}function F(n){for(var e=0;e<n.length;e++)T.add(n[e]);for(var a of v)a(n)}function y(n,e){var u;var a=n.ownerDocument,t=e.type,o=((u=e.composedPath)==null?void 0:u.call(e))||[],r=o[0]||e.target;e.target!==r&&b(e,"target",{configurable:!0,value:r});var i=0,s=e.__root;if(s){var f=o.indexOf(s);if(f!==-1&&(n===document||n===window)){e.__root=n;return}var g=o.indexOf(n);if(g===-1)return;f<=g&&(i=f+1)}for(r=o[i]||e.target,b(e,"currentTarget",{configurable:!0,get(){return r||a}});r!==null;){var d=r.parentNode||r.host||null,_="__"+t,l=r[_];if(l!==void 0&&!r.disabled)if(C(l)){var[c,...h]=l;c.apply(r,[e,...h])}else l.call(r,e);if(e.cancelBubble||d===n||r===n)break;r=d}e.__root=n,r=n}const T=new Set,v=new Set;let m=!0;function G(n,e){const a=n.__nodeValue,t=j(e);M&&n.nodeValue===t?n.__nodeValue=t:a!==t&&(n.nodeValue=t,n.__nodeValue=t)}function J(n,e,a,t){e===void 0?t!==null&&t(n):e(n,a)}function j(n){return typeof n=="string"?n:n==null?"":n+""}function Q(n,e){const a=e.anchor??e.target.appendChild(R());return E(()=>S(n,{...e,anchor:a}),!1)}function K(n,e){const a=e.target,t=O;let o=!1;try{return E(()=>{p(!0);for(var r=a.firstChild;r&&(r.nodeType!==8||r.data!==H);)r=r.nextSibling;if(!r)throw new Error("Missing hydration marker");const i=V(r),s=S(n,{...e,anchor:i});return p(!1),o=!0,s},!1)}catch(r){if(!o&&e.recover!==!1)return console.error("ERR_SVELTE_HYDRATION_MISMATCH",r),x(a),p(!1),Q(n,e);throw r}finally{p(!!t),D(t)}}function S(n,{target:e,anchor:a,props:t={},events:o,context:r,intro:i=!1}){A();const s=new Set,f=y.bind(null,e),g=y.bind(null,document),d=c=>{for(let h=0;h<c.length;h++){const u=c[h];s.has(u)||(s.add(u),e.addEventListener(u,f,w.includes(u)?{passive:!0}:void 0),document.addEventListener(u,g,w.includes(u)?{passive:!0}:void 0))}};d(I(T)),v.add(d);let _;const l=N(()=>(P(()=>{if(r){B({});var c=$;c.c=r}o&&(t.$$events=o),m=i,_=n(a,t)||{},m=!0,r&&Y()}),()=>{for(const c of s)e.removeEventListener(c,f);v.delete(d)}));return L.set(_,l),_}let L=new WeakMap;function U(n){const e=L.get(n);e==null||e()}export{j as a,m as b,J as c,F as d,z as e,K as h,Q as m,G as s,U as u};
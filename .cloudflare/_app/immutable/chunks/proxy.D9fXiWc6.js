import{i as g,S as o,o as P,e as R,f as x,s as h,h as I,b as c,j as m,m as w,g as y,U as u,k as j,d as D,l as O}from"./runtime.BCQlBliF.js";function _(e,t=!0,s){if(typeof e=="object"&&e!=null&&!g(e)){if(o in e){const n=e[o];if(n.t===e||n.p===e)return n.p}const i=O(e);if(i===P||i===R){const n=new Proxy(e,S);return x(e,o,{value:{s:new Map,v:h(0),a:I(e),i:t,p:n,t:e},writable:!0,enumerable:!1}),n}}return e}function b(e,t=1){c(e,e.v+t)}const S={defineProperty(e,t,s){if(s.value){const i=e[o],n=i.s.get(t);n!==void 0&&c(n,_(s.value,i.i,i.o))}return Reflect.defineProperty(e,t,s)},deleteProperty(e,t){const s=e[o],i=s.s.get(t),n=s.a,f=delete e[t];if(n&&f){const a=s.s.get("length"),l=e.length-1;a!==void 0&&a.v!==l&&c(a,l)}return i!==void 0&&c(i,u),f&&b(s.v),f},get(e,t,s){var f;if(t===o)return Reflect.get(e,o);const i=e[o];let n=i.s.get(t);if(n===void 0&&(!(t in e)||(f=m(e,t))!=null&&f.writable)&&(n=(i.i?h:w)(_(e[t],i.i,i.o)),i.s.set(t,n)),n!==void 0){const a=y(n);return a===u?void 0:a}return Reflect.get(e,t,s)},getOwnPropertyDescriptor(e,t){const s=Reflect.getOwnPropertyDescriptor(e,t);if(s&&"value"in s){const n=e[o].s.get(t);n&&(s.value=y(n))}return s},has(e,t){var f;if(t===o)return!0;const s=e[o],i=Reflect.has(e,t);let n=s.s.get(t);return(n!==void 0||j!==null&&(!i||(f=m(e,t))!=null&&f.writable))&&(n===void 0&&(n=(s.i?h:w)(i?_(e[t],s.i,s.o):u),s.s.set(t,n)),y(n)===u)?!1:i},set(e,t,s,i){const n=e[o];let f=n.s.get(t);f===void 0&&(D(()=>i[t]),f=n.s.get(t)),f!==void 0&&c(f,_(s,n.i,n.o));const a=n.a,l=!(t in e);if(a&&t==="length")for(let r=s;r<e.length;r+=1){const d=n.s.get(r+"");d!==void 0&&c(d,u)}if(e[t]=s,l){if(a){const r=n.s.get("length"),d=e.length;r!==void 0&&r.v!==d&&c(r,d)}b(n.v)}return!0},ownKeys(e){const t=e[o];return y(t.v),Reflect.ownKeys(e)}};export{_ as p};

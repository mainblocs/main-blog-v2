import{n as P,E as J,h as k,H as W,q as Z,x as $,t as K,v as Q,w as j,y as ee,d as re,z as I,b as B,A as M,B as O,m as ae,s as V,C as te,D as ne,F as fe,G as se,i as le,S as ie,J as ue}from"./runtime.KHPTfT0h.js";import{h as c,i as q,j as ve,e as b,g as F}from"./disclose-version.BD2IXOaX.js";let w=null;function me(a,t){return t}function oe(a,t,f){for(var l=[],u=a.length,_=0;_<u;_++)te(a[_].e,l,!0);if(u>0&&l.length===0&&t!==null){var d=t.parentNode;d.textContent="",d.append(t)}ne(l,()=>{for(var E=0;E<u;E++)fe(a[E].e);f!==void 0&&f()})}function Ae(a,t,f,l,u,_=null){var d={flags:t,items:new Map,next:null},E=(t&J)!==0;if(E){var g=a;a=c?q(g.firstChild):g.appendChild(ve())}var v=null;P(()=>{var C=f(),e=k(C)?C:C==null?[]:Array.from(C),o=e.length,n=d.flags;n&O&&!le(e)&&!(ie in e)&&(n^=O,n&ue&&!(n&I)&&(n^=I));let h=!1;if(c){var p=a.data===W;p!==(o===0)&&(Z(F),b(!1),h=!0)}if(c){for(var s=F[0],A=d,m,r=0;r<o;r++){if(s.nodeType!==8||s.data!==$){h=!0,b(!1);break}s=q(s);var i=e[r],x=l(i,r);m=U(s,A,null,i,x,r,u,n),d.items.set(x,m),s=s.nextSibling,A=m}if(o>0)for(;s!==a;){var D=s.nextSibling;s.remove(),s=D}}c||_e(e,d,a,u,n,l),_!==null&&(o===0?v?K(v):v=Q(()=>_(a)):v!==null&&j(v,()=>{v=null})),h&&b(!0)})}function _e(a,t,f,l,u,_){var z;var d=(u&se)!==0,E=(u&(I|M))!==0,g=a.length,v=t.items,C=t.next,e=C,o=new Set,n=t,h=[],p=[],s=[],A,m,r,i;if(d)for(i=0;i<g;i+=1)A=a[i],m=_(A,i),r=v.get(m),r!==void 0&&((z=r.a)==null||z.measure(),h.push(r));for(i=0;i<g;i+=1){if(A=a[i],m=_(A,i),r=v.get(m),r===void 0){n=U(e?L(e):f,n,n.next,A,m,i,l,u),v.set(m,n),p=[],s=[],e=n.next;continue}if(E&&de(r,A,i,u),K(r.e),r!==e){if(o.has(r)){if(p.length<s.length){var x=s[0],D=L(x),T;n=x.prev;var Y=p[0],N=p[p.length-1];for(S(Y.prev,N.next),S(n,Y),S(N,x),T=0;T<p.length;T+=1)G(p[T],D);for(T=0;T<s.length;T+=1)o.delete(s[T]);e=x,n=N,i-=1,p=[],s=[]}else o.delete(r),G(r,e?L(e):f),S(r.prev,r.next),S(r,n.next),S(n,r),n=r;continue}for(p=[],s=[];e!==null&&e.k!==m;)o.add(e),s.push(e),e=e.next;if(e===null)continue;r=e}p.push(r),n=r,e=r.next}const H=Array.from(o);for(;e;)H.push(e),e=e.next;var X=u&J&&g===0?f:null;oe(H,X,()=>{for(var y=0;y<H.length;y+=1){var R=H[y];v.delete(R.k),S(R.prev,R.next)}}),d&&ee(()=>{re(()=>{var y;for(r of h)(y=r.a)==null||y.apply()})})}function L(a){var t=a.e.dom;return k(t)?t[0]:t}function de(a,t,f,l){l&I&&B(a.v,t),l&M?B(a.i,f):a.i=f}function U(a,t,f,l,u,_,d,E){var g=w;try{var v=(E&I)!==0,C=(E&O)===0,e=v?C?ae(l):V(l):l,o=E&M?V(_):_,n={i:o,v:e,k:u,a:null,e:null,prev:t,next:f};return t.next=n,f!==null&&(f.prev=n),w=n,n.e=Q(()=>d(a,e,o)),n}finally{w=g}}function G(a,t){var f=a.e.dom;if(f!==null)if(k(f))for(var l=0;l<f.length;l++)t.before(f[l]);else t.before(f)}function S(a,t){a.next=t,t!==null&&(t.prev=a)}export{Ae as e,me as i};
import{q as P,E as F,e as M,H as W,t as Z,D as $,v as G,w as J,x as j,F as ee,a as re,G as y,f as Q,J as k,K as b,m as ae,s as V,L as te,M as ne,N as fe,O as se,i as le,S as ie,Q as ue}from"./runtime.C8x5QdD1.js";import{h as c,l as q,m as ve,i as w,j as z}from"./disclose-version.Dd1ZGuiJ.js";let L=null;function me(a,t){return t}function oe(a,t,f){for(var l=[],u=a.length,_=0;_<u;_++)te(a[_].e,l,!0);if(u>0&&l.length===0&&t!==null){var p=t.parentNode;p.textContent="",p.append(t)}ne(l,()=>{for(var E=0;E<u;E++)fe(a[E].e);f!==void 0&&f()})}function Ae(a,t,f,l,u,_=null){var p={flags:t,items:new Map,next:null},E=(t&F)!==0;if(E){var g=a;a=c?q(g.firstChild):g.appendChild(ve())}var v=null;P(()=>{var T=f(),e=M(T)?T:T==null?[]:Array.from(T),o=e.length,n=p.flags;n&b&&!le(e)&&!(ie in e)&&(n^=b,n&ue&&!(n&y)&&(n^=y));let h=!1;if(c){var d=a.data===W;d!==(o===0)&&(Z(z),w(!1),h=!0)}if(c){for(var s=z[0],A=p,m,r=0;r<o;r++){if(s.nodeType!==8||s.data!==$){h=!0,w(!1);break}s=q(s);var i=e[r],C=l(i,r);m=U(s,A,null,i,C,r,u,n),p.items.set(C,m),s=s.nextSibling,A=m}if(o>0)for(;s!==a;){var D=s.nextSibling;s.remove(),s=D}}c||_e(e,p,a,u,n,l),_!==null&&(o===0?v?G(v):v=J(()=>_(a)):v!==null&&j(v,()=>{v=null})),h&&w(!0)})}function _e(a,t,f,l,u,_){var K;var p=(u&se)!==0,E=(u&(y|k))!==0,g=a.length,v=t.items,T=t.next,e=T,o=new Set,n=t,h=[],d=[],s=[],A,m,r,i;if(p)for(i=0;i<g;i+=1)A=a[i],m=_(A,i),r=v.get(m),r!==void 0&&((K=r.a)==null||K.measure(),h.push(r));for(i=0;i<g;i+=1){if(A=a[i],m=_(A,i),r=v.get(m),r===void 0){n=U(e?O(e):f,n,n.next,A,m,i,l,u),v.set(m,n),d=[],s=[],e=n.next;continue}if(E&&pe(r,A,i,u),G(r.e),r!==e){if(o.has(r)){if(d.length<s.length){var C=s[0],D=O(C),x;n=C.prev;var Y=d[0],N=d[d.length-1];for(S(Y.prev,N.next),S(n,Y),S(N,C),x=0;x<d.length;x+=1)B(d[x],D);for(x=0;x<s.length;x+=1)o.delete(s[x]);e=C,n=N,i-=1,d=[],s=[]}else o.delete(r),B(r,e?O(e):f),S(r.prev,r.next),S(r,n.next),S(n,r),n=r;continue}for(d=[],s=[];e!==null&&e.k!==m;)o.add(e),s.push(e),e=e.next;if(e===null)continue;r=e}d.push(r),n=r,e=r.next}const H=Array.from(o);for(;e;)H.push(e),e=e.next;var X=u&F&&g===0?f:null;oe(H,X,()=>{for(var I=0;I<H.length;I+=1){var R=H[I];v.delete(R.k),S(R.prev,R.next)}}),p&&ee(()=>{re(()=>{var I;for(r of h)(I=r.a)==null||I.apply()})})}function O(a){var t=a.e.dom;return M(t)?t[0]:t}function pe(a,t,f,l){l&y&&Q(a.v,t),l&k?Q(a.i,f):a.i=f}function U(a,t,f,l,u,_,p,E){var g=L;try{var v=(E&y)!==0,T=(E&b)===0,e=v?T?ae(l):V(l):l,o=E&k?V(_):_,n={i:o,v:e,k:u,a:null,e:null,prev:t,next:f};return t.next=n,f!==null&&(f.prev=n),L=n,n.e=J(()=>p(a,e,o)),n}finally{L=g}}function B(a,t){var f=a.e.dom;if(f!==null)if(M(f))for(var l=0;l<f.length;l++)t.before(f[l]);else t.before(f)}function S(a,t){a.next=t,t!==null&&(t.prev=a)}export{Ae as e,me as i};

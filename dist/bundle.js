var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function o(t){t.forEach(e)}function a(t){return"function"==typeof t}function s(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}function i(t,e){t.appendChild(e)}function r(t,e,n){t.insertBefore(e,n||null)}function l(t){t.parentNode.removeChild(t)}function c(t){return document.createElement(t)}function u(t){return document.createTextNode(t)}function p(){return u(" ")}function d(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function h(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}let m;function f(t){m=t}function g(t){(function(){if(!m)throw new Error("Function called outside component initialization");return m})().$$.on_mount.push(t)}const $=[],w=[],b=[],k=[],v=Promise.resolve();let y=!1;function x(t){b.push(t)}const I=new Set;let _=0;function E(){const t=m;do{for(;_<$.length;){const t=$[_];_++,f(t),S(t.$$)}for(f(null),$.length=0,_=0;w.length;)w.pop()();for(let t=0;t<b.length;t+=1){const e=b[t];I.has(e)||(I.add(e),e())}b.length=0}while($.length);for(;k.length;)k.pop()();y=!1,I.clear(),f(t)}function S(t){if(null!==t.fragment){t.update(),o(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(x)}}const M=new Set;function T(t,e){t&&t.i&&(M.delete(t),t.i(e))}function j(t,e,n,o){if(t&&t.o){if(M.has(t))return;M.add(t),undefined.c.push((()=>{M.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}function C(t){t&&t.c()}function L(t,n,s,i){const{fragment:r,on_mount:l,on_destroy:c,after_update:u}=t.$$;r&&r.m(n,s),i||x((()=>{const n=l.map(e).filter(a);c?c.push(...n):o(n),t.$$.on_mount=[]})),u.forEach(x)}function A(t,e){const n=t.$$;null!==n.fragment&&(o(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function F(t,e){-1===t.$$.dirty[0]&&($.push(t),y||(y=!0,v.then(E)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function J(e,a,s,i,r,c,u,p=[-1]){const d=m;f(e);const h=e.$$={fragment:null,ctx:null,props:c,update:t,not_equal:r,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(a.context||(d?d.$$.context:[])),callbacks:n(),dirty:p,skip_bound:!1,root:a.target||d.$$.root};u&&u(h.root);let g=!1;if(h.ctx=s?s(e,a.props||{},((t,n,...o)=>{const a=o.length?o[0]:n;return h.ctx&&r(h.ctx[t],h.ctx[t]=a)&&(!h.skip_bound&&h.bound[t]&&h.bound[t](a),g&&F(e,t)),n})):[],h.update(),g=!0,o(h.before_update),h.fragment=!!i&&i(h.ctx),a.target){if(a.hydrate){const t=function(t){return Array.from(t.childNodes)}(a.target);h.fragment&&h.fragment.l(t),t.forEach(l)}else h.fragment&&h.fragment.c();a.intro&&T(e.$$.fragment),L(e,a.target,a.anchor,a.customElement),E()}f(d)}class N{$destroy(){A(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function H(e){let n,o,a,s,d,m,f,g,$,w,b,k,v,y,x,I,_,E,S,M;return{c(){n=c("div"),o=c("div"),a=c("div"),s=c("span"),s.textContent="👋",d=p(),m=c("span"),f=c("span"),g=c("span"),g.textContent=`Hello! I am ${R}`,$=p(),w=c("br"),b=p(),k=c("span"),v=c("span"),v.textContent=`${B}`,y=u(",\n                    "),x=c("a"),I=u(O),_=u(","),E=p(),S=u(q),M=u("."),h(s,"class","hello-hand svelte-1o3onme"),h(g,"class","hello-text svelte-1o3onme"),h(x,"class","cta"),h(x,"target","_blank"),h(x,"href",P),h(a,"class","about-me svelte-1o3onme"),h(o,"class","introduction svelte-1o3onme"),h(n,"class","section")},m(t,e){r(t,n,e),i(n,o),i(o,a),i(a,s),i(a,d),i(a,m),i(m,f),i(f,g),i(m,$),i(m,w),i(m,b),i(m,k),i(k,v),i(k,y),i(k,x),i(x,I),i(k,_),i(m,E),i(m,S),i(m,M)},p:t,i:t,o:t,d(t){t&&l(n)}}}const R="Jatin Tiwari",B="Software Engineer",O="Atlassian",P="https://www.google.com/search?q=atlassian";let q="India";class D extends N{constructor(t){super(),J(this,t,null,H,s,{})}}function U(e){let n;return{c(){n=c("section"),n.innerHTML='<section class="container"><section><span class="mark">I am passionately curious!</span> \n            <span>These days I am making lamps during my free time. I ❤️ dogs and like to train them 🦮.</span> \n            <span>I have learnt cooking from youtube and now I sometimes feel like a Chef. I do cardio on Ted talks.</span> \n            <span>I sometimes play video games over weekend.</span></section> \n        <p>I am also avidly looking out for building projects on <span class="highlight">Raspberry Pi</span>.</p> \n        <p>I like reading tech books and articles. I aspire to write a blog to simplify the technology.</p> \n        \n        <p class="text-center">I will be happy to connect for new opportunities or consultation✌🏽</p></section>',h(n,"class","section passion-container")},m(t,e){r(t,n,e)},p:t,i:t,o:t,d(t){t&&l(n)}}}class W extends N{constructor(t){super(),J(this,t,null,U,s,{})}}function Y(e){let n,o,a,s,u,d,m,f,g,$,w,b,k;return{c(){n=c("section"),o=c("section"),a=c("p"),a.textContent=`I have ${e[0]}+ years of experience in frontend development. For approximately 5 years I have worked with small to very large scale e-commerce companies.`,s=p(),u=c("p"),u.textContent="I have advance knowledge in Web and App development.",d=p(),m=c("p"),m.innerHTML='I have expertise in <span class="text-bold">Javascript</span>. I have started working with\n            <span class="highlight">React JS</span> during my days with <a class="cta" href="https://en.wikipedia.org/wiki/Furlenco" target="_blank">Furlenco</a> and instantly liked it. I also have prior experience with <span class="highlight">Angular JS</span> and <span class="highlight">Backbone JS</span>.',f=p(),g=c("p"),g.innerHTML='I am enthusiastic about <span class="highlight">Puppeteer JS</span> and can very quickly build a scalable API in\n            <span class="highlight">NodeJS</span>. While working with\n            <a class="cta" href="https://en.wikipedia.org/wiki/Flipkart" target="_blank">Flipkart</a>, I had created a Visual Regression tool which\n            was able to take screenshots of all the app workflows and then assert baseline with checkpoint images. This tool solved problems involved with manual testing.',$=p(),w=c("p"),w.innerHTML='I ❤️ <span class="text-italic">building apps from scratch</span> and then scale them to serve millions of customers. I also believe\n            that it takes time to build such apps and use of technology is as per need basis.',b=p(),k=c("p"),k.innerHTML='I have helped a few friends to kick off their startup dream with native apps in <span class="highlight">Flutter</span>\n            and <span class="highlight">React native</span>.',h(o,"class","container"),h(n,"class","section")},m(t,e){r(t,n,e),i(n,o),i(o,a),i(o,s),i(o,u),i(o,d),i(o,m),i(o,f),i(o,g),i(o,$),i(o,w),i(o,b),i(o,k)},p:t,i:t,o:t,d(t){t&&l(n)}}}function z(t){const e=new Date,n=new Date("July 21, 2014");return[e.getFullYear()-n.getFullYear()-(e.getMonth()>n.getMonth()?0:1)]}class G extends N{constructor(t){super(),J(this,t,z,Y,s,{})}}function K(t,e,n){const o=t.slice();return o[3]=e[n],o}function V(t){let e,n,o=t[2],a=[];for(let e=0;e<o.length;e+=1)a[e]=Q(K(t,o,e));return{c(){e=c("div"),n=c("div");for(let t=0;t<a.length;t+=1)a[t].c();h(n,"class","container contacts bg-blue svelte-d3lop6"),h(e,"class","section sticky-bottom border-dark svelte-d3lop6")},m(t,o){r(t,e,o),i(e,n);for(let t=0;t<a.length;t+=1)a[t].m(n,null)},p(t,e){if(6&e){let s;for(o=t[2],s=0;s<o.length;s+=1){const i=K(t,o,s);a[s]?a[s].p(i,e):(a[s]=Q(i),a[s].c(),a[s].m(n,null))}for(;s<a.length;s+=1)a[s].d(1);a.length=o.length}},d(t){t&&l(e),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(a,t)}}}function Q(e){let n,o,a,s,d,m=e[3]+"";return{c(){n=c("span"),o=c("a"),a=u(m),d=p(),h(o,"class","cta"),h(o,"target","_blank"),h(o,"href",s=e[1][e[3]])},m(t,e){r(t,n,e),i(n,o),i(o,a),i(n,d)},p:t,d(t){t&&l(n)}}}function X(e){let n,o=e[0]&&V(e);return{c(){o&&o.c(),n=u("")},m(t,e){o&&o.m(t,e),r(t,n,e)},p(t,[e]){t[0]?o?o.p(t,e):(o=V(t),o.c(),o.m(n.parentNode,n)):o&&(o.d(1),o=null)},i:t,o:t,d(t){o&&o.d(t),t&&l(n)}}}function Z(t,e,n){let o;const a={LINKEDIN:"https://www.linkedin.com/in/jatin-tiwari-3783aa50",GITHUB:"https://www.github.com/jatintiwari",EMAIL:"mailto:mail@jatintiwari.com",RESUME:"https://www.jatintiwari.com/knowmore"},s=Object.keys(a);return setTimeout((()=>{n(0,o=!0)}),100),n(0,o=!1),[o,a,s]}class tt extends N{constructor(t){super(),J(this,t,Z,X,s,{})}}function et(e){let n,a,s,u,m,f;return{c(){n=c("div"),a=c("span"),a.textContent="☀️",s=p(),u=c("span"),u.textContent="🌚",h(a,"class","theme-button sun svelte-1derer7"),h(u,"class","theme-button moon svelte-1derer7"),h(n,"class","theme-container svelte-1derer7")},m(t,o){r(t,n,o),i(n,a),i(n,s),i(n,u),m||(f=[d(a,"click",e[0]),d(u,"click",e[0])],m=!0)},p:t,i:t,o:t,d(t){t&&l(n),m=!1,o(f)}}}const nt="dark",ot="light";function at(t){let e;g((()=>{let t=localStorage.getItem("mode");t||(t=e?nt:ot),document.documentElement.classList.add(t),localStorage.setItem("mode",t)}));return e=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,[()=>{const t=localStorage.getItem("mode")===nt?ot:nt;e=t===nt,document.documentElement.className=t,localStorage.setItem("mode",t)}]}class st extends N{constructor(t){super(),J(this,t,at,et,s,{})}}function it(e){let n,o,a,s,u,d,m,f,g,$,w;return o=new st({}),s=new D({}),d=new G({}),f=new W({}),$=new tt({}),{c(){n=c("main"),C(o.$$.fragment),a=p(),C(s.$$.fragment),u=p(),C(d.$$.fragment),m=p(),C(f.$$.fragment),g=p(),C($.$$.fragment),h(n,"id","app"),h(n,"class","svelte-blhg4c")},m(t,e){r(t,n,e),L(o,n,null),i(n,a),L(s,n,null),i(n,u),L(d,n,null),i(n,m),L(f,n,null),i(n,g),L($,n,null),w=!0},p:t,i(t){w||(T(o.$$.fragment,t),T(s.$$.fragment,t),T(d.$$.fragment,t),T(f.$$.fragment,t),T($.$$.fragment,t),w=!0)},o(t){j(o.$$.fragment,t),j(s.$$.fragment,t),j(d.$$.fragment,t),j(f.$$.fragment,t),j($.$$.fragment,t),w=!1},d(t){t&&l(n),A(o),A(s),A(d),A(f),A($)}}}const rt=document.getElementById("jatintiwari");return new class extends N{constructor(t){super(),J(this,t,null,it,s,{})}}({target:rt,props:{}})}();
//# sourceMappingURL=bundle.js.map

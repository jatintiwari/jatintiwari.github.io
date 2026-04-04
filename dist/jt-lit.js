(()=>{var U=globalThis,M=U.ShadowRoot&&(U.ShadyCSS===void 0||U.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Z=Symbol(),Y=new WeakMap,T=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==Z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o,t=this.t;if(M&&e===void 0){let i=t!==void 0&&t.length===1;i&&(e=Y.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Y.set(t,e))}return e}toString(){return this.cssText}},Q=n=>new T(typeof n=="string"?n:n+"",void 0,Z);var I=(n,e)=>{if(M)n.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(let t of e){let i=document.createElement("style"),s=U.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,n.appendChild(i)}},N=M?n=>n:n=>n instanceof CSSStyleSheet?(e=>{let t="";for(let i of e.cssRules)t+=i.cssText;return Q(t)})(n):n;var{is:me,defineProperty:ue,getOwnPropertyDescriptor:fe,getOwnPropertyNames:ge,getOwnPropertySymbols:ye,getPrototypeOf:ve}=Object,D=globalThis,X=D.trustedTypes,$e=X?X.emptyScript:"",be=D.reactiveElementPolyfillSupport,x=(n,e)=>n,L={toAttribute(n,e){switch(e){case Boolean:n=n?$e:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,e){let t=n;switch(e){case Boolean:t=n!==null;break;case Number:t=n===null?null:Number(n);break;case Object:case Array:try{t=JSON.parse(n)}catch{t=null}}return t}},te=(n,e)=>!me(n,e),ee={attribute:!0,type:String,converter:L,reflect:!1,hasChanged:te};Symbol.metadata??=Symbol("metadata"),D.litPropertyMetadata??=new WeakMap;var f=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=ee){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&ue(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){let{get:s,set:o}=fe(this.prototype,e)??{get(){return this[t]},set(r){this[t]=r}};return{get(){return s?.call(this)},set(r){let m=s?.call(this);o.call(this,r),this.requestUpdate(e,m,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??ee}static _$Ei(){if(this.hasOwnProperty(x("elementProperties")))return;let e=ve(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(x("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(x("properties"))){let t=this.properties,i=[...ge(t),...ye(t)];for(let s of i)this.createProperty(s,t[s])}let e=this[Symbol.metadata];if(e!==null){let t=litPropertyMetadata.get(e);if(t!==void 0)for(let[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[t,i]of this.elementProperties){let s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let t=[];if(Array.isArray(e)){let i=new Set(e.flat(1/0).reverse());for(let s of i)t.unshift(N(s))}else e!==void 0&&t.push(N(e));return t}static _$Eu(e,t){let i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,t=this.constructor.elementProperties;for(let i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return I(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EC(e,t){let i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){let o=(i.converter?.toAttribute!==void 0?i.converter:L).toAttribute(t,i.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){let i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){let o=i.getPropertyOptions(s),r=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:L;this._$Em=s,this[s]=r.fromAttribute(t,o.type),this._$Em=null}}requestUpdate(e,t,i){if(e!==void 0){if(i??=this.constructor.getPropertyOptions(e),!(i.hasChanged??te)(this[e],t))return;this.P(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,t,i){this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Em!==e&&(this._$Ej??=new Set).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,o]of i)o.wrapped!==!0||this._$AL.has(s)||this[s]===void 0||this.P(s,this[s],o)}let e=!1,t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(t)):this._$EU()}catch(i){throw e=!1,this._$EU(),i}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&=this._$Ej.forEach(t=>this._$EC(t,this[t])),this._$EU()}updated(e){}firstUpdated(e){}};f.elementStyles=[],f.shadowRootOptions={mode:"open"},f[x("elementProperties")]=new Map,f[x("finalized")]=new Map,be?.({ReactiveElement:f}),(D.reactiveElementVersions??=[]).push("2.0.4");var W=globalThis,H=W.trustedTypes,ie=H?H.createPolicy("lit-html",{createHTML:n=>n}):void 0,le="$lit$",y=`lit$${Math.random().toFixed(9).slice(2)}$`,de="?"+y,Ae=`<${de}>`,A=document,C=()=>A.createComment(""),O=n=>n===null||typeof n!="object"&&typeof n!="function",G=Array.isArray,_e=n=>G(n)||typeof n?.[Symbol.iterator]=="function",J=`[ 	
\f\r]`,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,se=/-->/g,ne=/>/g,$=RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),oe=/'/g,re=/"/g,ce=/^(?:script|style|textarea|title)$/i,q=n=>(e,...t)=>({_$litType$:n,strings:e,values:t}),h=q(1),Re=q(2),Ue=q(3),_=Symbol.for("lit-noChange"),c=Symbol.for("lit-nothing"),ae=new WeakMap,b=A.createTreeWalker(A,129);function pe(n,e){if(!G(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return ie!==void 0?ie.createHTML(e):e}var Se=(n,e)=>{let t=n.length-1,i=[],s,o=e===2?"<svg>":e===3?"<math>":"",r=E;for(let m=0;m<t;m++){let a=n[m],d,p,l=-1,u=0;for(;u<a.length&&(r.lastIndex=u,p=r.exec(a),p!==null);)u=r.lastIndex,r===E?p[1]==="!--"?r=se:p[1]!==void 0?r=ne:p[2]!==void 0?(ce.test(p[2])&&(s=RegExp("</"+p[2],"g")),r=$):p[3]!==void 0&&(r=$):r===$?p[0]===">"?(r=s??E,l=-1):p[1]===void 0?l=-2:(l=r.lastIndex-p[2].length,d=p[1],r=p[3]===void 0?$:p[3]==='"'?re:oe):r===re||r===oe?r=$:r===se||r===ne?r=E:(r=$,s=void 0);let g=r===$&&n[m+1].startsWith("/>")?" ":"";o+=r===E?a+Ae:l>=0?(i.push(d),a.slice(0,l)+le+a.slice(l)+y+g):a+y+(l===-2?m:g)}return[pe(n,o+(n[t]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),i]},P=class n{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,r=0,m=e.length-1,a=this.parts,[d,p]=Se(e,t);if(this.el=n.createElement(d,i),b.currentNode=this.el.content,t===2||t===3){let l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(s=b.nextNode())!==null&&a.length<m;){if(s.nodeType===1){if(s.hasAttributes())for(let l of s.getAttributeNames())if(l.endsWith(le)){let u=p[r++],g=s.getAttribute(l).split(y),R=/([.?@])?(.*)/.exec(u);a.push({type:1,index:o,name:R[2],strings:g,ctor:R[1]==="."?B:R[1]==="?"?F:R[1]==="@"?V:w}),s.removeAttribute(l)}else l.startsWith(y)&&(a.push({type:6,index:o}),s.removeAttribute(l));if(ce.test(s.tagName)){let l=s.textContent.split(y),u=l.length-1;if(u>0){s.textContent=H?H.emptyScript:"";for(let g=0;g<u;g++)s.append(l[g],C()),b.nextNode(),a.push({type:2,index:++o});s.append(l[u],C())}}}else if(s.nodeType===8)if(s.data===de)a.push({type:2,index:o});else{let l=-1;for(;(l=s.data.indexOf(y,l+1))!==-1;)a.push({type:7,index:o}),l+=y.length-1}o++}}static createElement(e,t){let i=A.createElement("template");return i.innerHTML=e,i}};function S(n,e,t=n,i){if(e===_)return e;let s=i!==void 0?t._$Co?.[i]:t._$Cl,o=O(e)?void 0:e._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(n),s._$AT(n,t,i)),i!==void 0?(t._$Co??=[])[i]=s:t._$Cl=s),s!==void 0&&(e=S(n,s._$AS(n,e.values),s,i)),e}var z=class{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??A).importNode(t,!0);b.currentNode=s;let o=b.nextNode(),r=0,m=0,a=i[0];for(;a!==void 0;){if(r===a.index){let d;a.type===2?d=new k(o,o.nextSibling,this,e):a.type===1?d=new a.ctor(o,a.name,a.strings,this,e):a.type===6&&(d=new j(o,this,e)),this._$AV.push(d),a=i[++m]}r!==a?.index&&(o=b.nextNode(),r++)}return b.currentNode=A,s}p(e){let t=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}},k=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=c,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,t=this._$AM;return t!==void 0&&e?.nodeType===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=S(this,e,t),O(e)?e===c||e==null||e===""?(this._$AH!==c&&this._$AR(),this._$AH=c):e!==this._$AH&&e!==_&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):_e(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==c&&O(this._$AH)?this._$AA.nextSibling.data=e:this.T(A.createTextNode(e)),this._$AH=e}$(e){let{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=P.createElement(pe(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{let o=new z(s,this),r=o.u(this.options);o.p(t),this.T(r),this._$AH=o}}_$AC(e){let t=ae.get(e.strings);return t===void 0&&ae.set(e.strings,t=new P(e)),t}k(e){G(this._$AH)||(this._$AH=[],this._$AR());let t=this._$AH,i,s=0;for(let o of e)s===t.length?t.push(i=new n(this.O(C()),this.O(C()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e&&e!==this._$AB;){let i=e.nextSibling;e.remove(),e=i}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},w=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=c,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=c}_$AI(e,t=this,i,s){let o=this.strings,r=!1;if(o===void 0)e=S(this,e,t,0),r=!O(e)||e!==this._$AH&&e!==_,r&&(this._$AH=e);else{let m=e,a,d;for(e=o[0],a=0;a<o.length-1;a++)d=S(this,m[i+a],t,a),d===_&&(d=this._$AH[a]),r||=!O(d)||d!==this._$AH[a],d===c?e=c:e!==c&&(e+=(d??"")+o[a+1]),this._$AH[a]=d}r&&!s&&this.j(e)}j(e){e===c?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},B=class extends w{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===c?void 0:e}},F=class extends w{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==c)}},V=class extends w{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=S(this,e,t,0)??c)===_)return;let i=this._$AH,s=e===c&&i!==c||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==c&&(i===c||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},j=class{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){S(this,e)}};var we=W.litHtmlPolyfillSupport;we?.(P,k),(W.litHtmlVersions??=[]).push("3.2.1");var he=(n,e,t)=>{let i=t?.renderBefore??e,s=i._$litPart$;if(s===void 0){let o=t?.renderBefore??null;i._$litPart$=s=new k(e.insertBefore(C(),o),o,void 0,t??{})}return s._$AI(n),s};var v=class extends f{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=he(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return _}};v._$litElement$=!0,v.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:v});var xe=globalThis.litElementPolyfillSupport;xe?.({LitElement:v});(globalThis.litElementVersions??=[]).push("4.1.1");var K=class extends v{static properties={data:{type:Object},isConcise:{type:Boolean},yearsExperience:{type:Number}};constructor(){super(),this.data={},this.isConcise=!0,this.yearsExperience=this.calculateYearsExperience()}calculateYearsExperience(){let e=new Date,t=new Date("July 21, 2014");return e.getFullYear()-t.getFullYear()-(e.getMonth()>=t.getMonth()?0:1)}toggleConcise(){this.isConcise=!this.isConcise}createRenderRoot(){return this}render(){return this.data.personalInfo?h`
                  <div class="know-more-app" style="max-width: 800px; margin: 0 auto; padding-top: 20px;">
                      <div class="hide-print" id="updated">Last updated in ${this.data.personalInfo.lastUpdated}</div>
                      <button class="hide-print" id="print" @click=${()=>window.print()}>Print</button>
                      <button class="hide-print" @click=${()=>this.toggleConcise()}>
                          ${this.isConcise?"Show Full":"Concise Mode"}
                      </button>

                      <div
                          class="heading-container"
                          style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #333; margin-bottom: 25px; padding-bottom: 15px;"
                      >
                          <div class="left-col" style="flex: 1; text-align: left;">
                              <h2
                                  class="heading"
                                  style="font-size: 2rem; font-weight: 700; text-transform: uppercase; line-height: 1.1; margin: 0;text-align: left;"
                              >
                                  ${this.data.personalInfo.name}
                              </h2>
                          </div>
                          <div
                              class="right-col"
                              style="flex: 1; display: flex; flex-direction: column; align-items: flex-end; justify-content: center; text-align: right; font-size: 1rem; line-height: 1.5;"
                          >
                              <div class="subheading">
                                  <a
                                      href="mailto:${this.data.personalInfo.email}"
                                      style="text-decoration: none; color: inherit;"
                                      >${this.data.personalInfo.email}</a
                                  >
                              </div>
                              <div class="subheading">
                                  <a
                                      href="tel:${this.data.personalInfo.phone}"
                                      style="text-decoration: none; color: inherit;"
                                      >${this.data.personalInfo.phone}</a
                                  >
                              </div>
                              <div class="subheading">
                                  <a
                                      href="https://${this.data.personalInfo.website}"
                                      target="_blank"
                                      style="text-decoration: none; color: inherit;"
                                      >${this.data.personalInfo.website}</a
                                  >
                              </div>
                          </div>
                      </div>

                      <div class="content-container" style="display: block;">
                          ${this.data.summary?h`
                                    <div class="section" style="margin-bottom: 20px;">
                                        <p style="line-height: 1.6;">${this.data.summary}</p>
                                    </div>
                                `:""}

                          <div class="section" style="margin-bottom: 20px;">
                              <div
                                  class="section-heading"
                                  style="border-bottom: 1px solid #ddd; margin-bottom: 15px; font-weight: bold; text-transform: uppercase;"
                              >
                                  Experience (${this.yearsExperience}+ Years)
                              </div>
                              ${(this.isConcise?this.data.experience.slice(0,3):this.data.experience).map(e=>this.renderJob(e))}
                          </div>

                          <div class="section" style="margin-bottom: 20px;">
                              <div
                                  class="section-heading"
                                  style="border-bottom: 1px solid #ddd; margin-bottom: 15px; font-weight: bold; text-transform: uppercase;"
                              >
                                  Education
                              </div>
                              <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                                  <span style="font-weight: bold;">${this.data.education.degree}</span>
                                  <span>${this.data.education.period}</span>
                              </div>
                              <div>${this.data.education.university}</div>
                          </div>

                          <div class="section" style="margin-bottom: 20px;">
                              <div
                                  class="section-heading"
                                  style="border-bottom: 1px solid #ddd; margin-bottom: 15px; font-weight: bold; text-transform: uppercase;"
                              >
                                  Skills
                              </div>
                              <div
                                  style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 10px;"
                              >
                                  ${this.data.skills.map(e=>h`
                                          <div>
                                              <span style="font-weight: bold;">${e.category}:</span>
                                              <span>${e.items}</span>
                                          </div>
                                      `)}
                              </div>
                          </div>

                          ${this.data.previousExperience&&this.data.previousExperience.length>0?h`
                                    <div class="section" style="margin-bottom: 20px;">
                                        <div
                                            class="section-heading"
                                            style="border-bottom: 1px solid #ddd; margin-bottom: 15px; font-weight: bold; text-transform: uppercase;"
                                        >
                                            Previous Experience
                                        </div>
                                        <ul style="padding-left: 20px; margin-top: 5px;">
                                            ${this.data.previousExperience.map(e=>h`
                                                    <li style="margin-bottom: 5px;">
                                                        <a
                                                            href="${e.url}"
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            style="font-weight: bold;"
                                                            >${e.company}</a
                                                        >, ${e.position}.
                                                        <span style="font-style: italic;">${e.period}</span>
                                                    </li>
                                                `)}
                                        </ul>
                                    </div>
                                `:""}
                      </div>
                  </div>
              `:h``}renderJob(e){return h`
            <div style="margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    ${e.company?h`<h3 style="margin: 0; font-size: 1.3rem; font-weight: 700;">${e.company}</h3>`:h`<div></div>`}
                    <div style="font-style: italic;">${e.period||""}</div>
                </div>
                ${e.position?h`<div style="font-weight: 500; margin-bottom: 5px;">${e.position}</div>`:""}

                <ul style="margin-top: 5px; padding-left: 20px;">
                    ${e.projects?e.projects.map(t=>h`
                                  ${t.name?h`<li
                                            style="list-style-type: none; margin-left: -20px; font-weight: bold; margin-top: 10px; margin-bottom: 5px;"
                                        >
                                            ${t.name}
                                        </li>`:""}
                                  ${t.responsibilities?t.responsibilities.map(i=>h`<li style="margin-bottom: 5px;">${i}</li>`):""}
                              `):e.responsibilities?e.responsibilities.map(t=>h`<li style="margin-bottom: 5px;">${t}</li>`):""}
                </ul>
            </div>
        `}};customElements.define("resume-app",K);document.addEventListener("DOMContentLoaded",function(){let n=document.querySelector("resume-app");n&&(n.data={personalInfo:{name:"JATIN TIWARI",email:"mail@jatintiwari.com",phone:"+91-7675807450",website:"www.jatintiwari.com",lastUpdated:"April 2026"},education:{degree:"B.E. - ECE",university:"Chitkara university, Himachal Pradesh",period:"2009 - 2013"},skills:[{category:"Languages",items:"Javascript, TypeScipt"},{category:"Web services",items:"REST, GraphQl, Websockets, Service Worker"},{category:"JS",items:"ES6, React Native, ReactJS, AngularJS, RelayJS"},{category:"Build Tools",items:"Webpack, Rollup"},{category:"Frontend Technologies",items:"HTML 5, CSS 3, SASS, Bootstrap, Material Design"},{category:"Framework",items:"Express JS, NextJS"},{category:"Automation",items:"Appium, Puppeteer"}],experience:[{company:"Google",position:"Senior Software Engineer",period:"March, 2025 - Present",projects:[{name:"AI Data and Engines",responsibilities:["Architected dataset lineage frameworks for large-scale pre-training, ensuring all data utilized in Gemini models strictly adheres to global AI Act guidelines and safety protocols.","Collaborated cross-functionally with Google DeepMind to engineer infrastructure for dataset registration and automated compliance auditing, streamlining the path from raw data to model ingestion.","Developed a mission-critical internal platform that enables researchers to trace provenance and perform automated remediation of datasets, preventing non-compliant data from entering the training pipeline."]}]},{company:"ServiceNow",position:"Sr. Staff Software Engineer",period:"August, 2024 - March, 2025",projects:[{name:"Application platform",responsibilities:["Revamped ServiceNow e-commerce store - https://store.servicenow.com.","The new React-based website enhanced the SEO, UX and web vitals, leading to higher conversions and lower drop rates. It also reduced the number of support tickets related to content discovery and information gaps.","Drove substantial improvements in system efficiency by optimizing slow queries, which reduced average response time by approximately 60%."]}]},{company:"Amazon",position:"Frontend Engineer 2",period:"July, 2022 - August, 2024",projects:[{name:"Fire TV Devices (Stealth mode)",responsibilities:["Served as the sole frontend engineer, providing technical leadership and mentoring cross-functional teams in JavaScript and modern frontend practices.","Led end-to-end development of a React Native TV application using Amazon\u2019s Vega Script, and architected the Network and Onboarding apps\u2014enabling efficient code reuse across key modules like Language, TZ Selector, Network, and Accessibility.","Introduced the MVVM design pattern to improve scalability and maintainability, and documented best practices for globally distributed teams.","Developed turbomodules to leverage native device capabilities and optimize performance by offloading resource-intensive tasks from the JavaScript thread.  It was a critical performance optimization for resource-limited environments on memory-constrained TV devices (1GB RAM).","Implemented proxy patterns for common libraries, enabling seamless compatibility between Kepler Script and Vanilla React Native, enhancing code flexibility and reusability.","Developed monotonic timers to prevent time sync issues while using defered functions in JS."]}]},{company:"Atlassian",position:"Software Engineer 2",period:"December, 2021 - July, 2022",responsibilities:["Mentored a summer intern for 6 months, guiding the implementation of visual diffing for E2E test cases, evolving from a Hackday project.","Atlassian initiative from scratch: an interface connecting help providers and seekers. Owned GraphQL implementation using Relay."]},{company:"Flipkart",position:"Front End Engineer 2",period:"April, 2018 \u2014 November, 2021",projects:[{name:"Ease of Order discovery",responsibilities:["Completely revamped the My Orders module to add Search, Filters, and recommendations.","The Goodness of 15% more click-throughs from My Orders to Order Details. Total Event of interaction with search > 1Cr in 1 month after launch."]},{name:"Cancellation Nudges",responsibilities:["Introduced nudges to assist the user during reason-based cancellations.","~25% goodness achieved while enabling nudge and taking action on order instead of canceling it."]},{name:"Other Achievements",responsibilities:["Completed migration from order level item grouping to unit/item level for My Orders and Order Details Page for Desktop.","Migrated apps to use Brotli compression and reduced the Over the network transfer size by ~20%."],hidden:["Created many internal google chatbots to integrate JIRA, GitHub, and Jenkins."]},{name:"Automated the entire process for regression and sanity across Apps.",responsibilities:["Used Appium to automate the regression and sanity of the Android, iOS and mobile site apps. Wrote ~1200 test cases.","Single code base for all the apps removes the effort of maintenance.","Onboarded QAs and removed the manual verification process. Reduced the time from 2 hours to a couple of minutes."],hidden:["Set up the complete VM infra and dashboard to execute test cases on the fly with one click."]},{name:"Created multiple automation tools using Puppeteer for",responsibilities:["User interaction events - mimic and assert user GA and Omniture events.","Verify GUI - compare baseline screenshots with Post UI deployment."]},{name:"Added a feasibility to change order address and add an alternate phone number.Overall improvement in cancellation metrics. 15% fewer orders are canceled."}]},{projects:[{name:"Developed Order in transit widget for native apps(Android, iOS) and mobile site for the home page presence of users' orders. Used native Android + React Native for Android and AsyncDisplayKit for iOS.",responsibilities:["~15% increase in customer awareness and self-serve effectiveness."]},{name:"Other Achievements",responsibilities:["Developed consoles for monitoring CX agents status.","Converted single tenant Smart Assist app to multi tenant and extended our software to support Myntra operations. This removed third party dependencies and trimmed annual expense by 6 cr.","Developed return and refund flows on flipkart.com to refund the amount to the users' selected source. Increased the adaption rate for NEFT and EGV as they are the fastest.","Introduced Pull to Refresh in webview pages of the Native app and mobile app which has reduced the order status related tickets by 6%.","Modified React components to share them across various platforms. Almost all of the 2gud.com client components are replica of Flipkart.","Developed a tool to mimic users App state - My Order, Order Details, Help Centre, Order Confirmation page, using actual users' account ID. Reduced manual work of copying API response and take screenshots. Reduced the TAT for customer query.","Reduced deployment man hours via optimising Jenkins groovy scripts and precompiled dependencies with custom docker image.","Developed request for reschedule of delivery with slot date and time, address change request and added/edited alternate phone number. Bringing all the actions to the client side to reduce the turn around time and improve CX.","Developed schedule a call back for help. Reduced the waiting time for the user via providing capability to schedule a callback within range of their suitable frame."]}]},{company:"Furlenco",position:"Senior Software Engineer",period:"October, 2015 \u2014 April, 2018",responsibilities:["I was responsible for developing and maintaining company's own e-commerce portal \u2014 www.furlenco.com."]},{company:"Lexnimble Solutions",position:"Junior Programmer Analyst",period:"July, 2014 \u2014 October, 2015",responsibilities:["Designed and Developed Full duplex chat mechanism using Spring Sockets, Sock.js, Stromp.js.","Developed and maintained www.simplelaw.com."]}],previousExperience:[{company:"Servicenow",position:"Sr. Staff Software Engineer",period:"Aug 2024 - Mar 2025",url:"http://store.servicenow.com"},{company:"Amazon",position:"FEE 2",period:"Jul 2022 - Aug 2024",url:"http://www.amazon.in"},{company:"Atlassian",position:"SDE 2",period:"Dec 2021 - Jul 2022",url:"http://www.atlassian.com"},{company:"Flipkart",position:"UI 2",period:"Apr 2018 - Dec 2021",url:"http://www.flipkart.com"},{company:"Furlenco",position:"Sen. Software Engg.",period:"Oct 2015 - Apr 2018",url:"http://www.furlenco.com"},{company:"LexNimble Solutions",position:"Junior Programmer Analyst",period:"Jul 2014 - Oct 2015",url:"http://simplelaw.com"}]})});})();
/*! Bundled license information:

@lit/reactive-element/css-tag.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit/reactive-element/reactive-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/lit-html.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-element/lit-element.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/is-server.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)
*/

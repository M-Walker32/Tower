import{r as F,c as f,a as b,o as l,b as d,d as o,e as p,F as I,f as K,S as D,g as x,t as v,w as O,h as w,i as G,j as Q,k as J,l as X,u as Z,M as ee,m as k,v as E,n as te,p as oe,q as ne,s as T,x as N,y as q,z as L,A as M,B as se,C as ae}from"./vendor.4b88c9a2.js";const re=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const a of c.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerpolicy&&(c.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?c.credentials="include":r.crossorigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function n(r){if(r.ep)return;r.ep=!0;const c=t(r);fetch(r.href,c)}};re();const i=F({user:{},account:{},activeEvent:{},currentPage:1,totalPages:0,towers:[],comments:[],tickets:[],myTickets:[]});var h=(s,e)=>{for(const[t,n]of e)s[t]=n;return s};const ce={name:"App",setup(){return{appState:f(()=>i)}}},ie={class:"sticky-top shadow"},le=o("footer",null,[o("div",{class:"bg-primary text-light text-center mt-2 p-4"})],-1);function de(s,e,t,n,r,c){const a=b("Navbar"),g=b("router-view");return l(),d(I,null,[o("header",ie,[p(a)]),o("main",null,[p(g)]),le],64)}var ue=h(ce,[["render",de]]);const j=window.location.origin.includes("localhost"),R=j?"http://localhost:3000":"",_e="dev-cqipusvi.us.auth0.com",me="A5W8kG3Elb7hKFWQANsciWYCaMO5WwtL",ge="https://MariaDev.com";function $(s,e){if(j)console[s](`[${s}] :: ${new Date().toLocaleTimeString()} :: `,...e);else{switch(s){case"log":case"assert":return}console[s](`[${s}] :: ${new Date().toLocaleTimeString()} :: `,...e)}}const u={log(){$("log",arguments)},error(){$("error",arguments)},warn(){$("warn",arguments)},assert(){$("assert",arguments)},trace(){$("trace",arguments)}},_=K.create({baseURL:R,timeout:8e3});class ve{async getComments(e){const t=await _.get(`api/events/${e}/comments`);i.comments=t.data,u.log("comments",t.data)}async createComment(e){u.log(e);const t=await _.post("api/comments",e);return this.getComments(t.data.eventId),t.data}async deleteComment(e){await _.delete("api/comments/"+e.id),this.getComments(e.eventId)}}const pe=new ve;class y{static async confirm(e="Are you sure?",t="You won't be able to revert this!",n="warning",r="Yes, delete it!"){try{return!!(await D.fire({title:e,text:t,icon:n,showCancelButton:!0,confirmButtonColor:"#3085d6",cancelButtonColor:"#d33",confirmButtonText:r})).isConfirmed}catch{return!1}}static toast(e="Warning!",t="warning",n="top-end",r=3e3,c=!0){D.fire({title:e,icon:t,position:n,timer:r,timerProgressBar:c,toast:!0,showConfirmButton:!1})}}const he={props:{comment:{type:Object,required:!0}},setup(s){return{account:f(()=>i.account),async deleteComment(){try{await y.confirm()&&await pe.deleteComment(s.comment)}catch(e){u.error(e),y.toast(e.message,"error")}}}}},fe={class:"container my-4 srounded bg-primary darken-10 rounded p-3"},be={class:"d-flex m-2"},ye={class:"me-2"},we=["src"],ke={class:"p-1 w-100 bg-white"},xe={class:"text-primary d-flex font-weight-bold m-1"},Ee={class:"m-1 text-dark p-0"};function Te(s,e,t,n,r,c){return l(),d("div",fe,[o("div",be,[o("div",ye,[o("img",{src:t.comment.creator.picture,class:"img-fluid profile-img"},null,8,we)]),o("div",ke,[o("h6",xe,[x(v(t.comment.creator.name)+" ",1),t.comment.creator.id==n.account.id?(l(),d("i",{key:0,class:"mdi mdi-delete-outline selectable",title:"Delete comment",onClick:e[0]||(e[0]=O((...a)=>n.deleteComment&&n.deleteComment(...a),["prevent"]))})):w("",!0)]),o("p",Ee,v(t.comment.body),1)])])])}var $e=h(he,[["render",Te]]),Ce=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:$e});class Pe{async getEventTickets(e){const t=await _.get(`api/events/${e}/tickets`);i.tickets=t.data}async getMyTickets(){const e=await _.get("account/tickets");u.log("is this the error?"),i.myTickets=e.data}async deleteTicket(e){await _.delete("api/tickets/"+e._id),this.getMyTickets()}async deleteTickets(e){}async createTicket(e,t){const n=i.tickets.find(c=>c.accountId===t),r=i.tickets.find(c=>c.eventId===e);if(n&&r)y.toast("You can only have one ticket.");else{let c={};c.accountId=t,c.eventId=e,c.creatorId=t,u.log(c);const a=await _.post("api/tickets",c);i.myTickets.unshift(a.data)}}}const Se=new Pe;class Ae{async getAllTowers(){const e=await _.get("api/events");i.towers=e.data,u.log(e.data)}async getTower(e){const t=await _.get("api/events/"+e.id);i.activeEvent=t.data}async createEvent(e){u.log(e);const t=await _.post("api/events",e);return u.log(t.data),t.data}async cancelEvent(e){let t=this.getTower(e);t.isCanceled=!0,await _.delete(`api/events/${e.id}`,t),i.towers=i.towers,i.tickets=[]}async changePage(e){const t=await _.get("api/events/",e);i.towers=t.data,i.currentPage=e}}const V=new Ae,Oe="modulepreload",U={},Ie="/",C=function(e,t){return!t||t.length===0?e():Promise.all(t.map(n=>{if(n=`${Ie}${n}`,n in U)return;U[n]=!0;const r=n.endsWith(".css"),c=r?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${n}"]${c}`))return;const a=document.createElement("link");if(a.rel=r?"stylesheet":Oe,r||(a.as="script",a.crossOrigin=""),a.href=n,document.head.appendChild(a),r)return new Promise((g,A)=>{a.addEventListener("load",g),a.addEventListener("error",A)})})).then(()=>e())};function De(s){switch(s){case"./pages/AboutPage.vue":return C(()=>import("./AboutPage.d860d709.js"),["assets/AboutPage.d860d709.js","assets/vendor.4b88c9a2.js"]);case"./pages/AccountPage.vue":return C(()=>import("./AccountPage.c96c890d.js"),["assets/AccountPage.c96c890d.js","assets/vendor.4b88c9a2.js"]);case"./pages/EventPage.vue":return C(()=>import("./EventPage.b9559c8f.js"),["assets/EventPage.b9559c8f.js","assets/EventPage.e48d0e5a.css","assets/vendor.4b88c9a2.js"]);case"./pages/HomePage.vue":return C(()=>import("./HomePage.2679087c.js"),["assets/HomePage.2679087c.js","assets/HomePage.6ddff53c.css","assets/vendor.4b88c9a2.js"]);default:return new Promise(function(e,t){(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(t.bind(null,new Error("Unknown variable dynamic import: "+s)))})}}function P(s){return()=>De(`./pages/${s}.vue`)}const Ne=[{path:"/",name:"Home",component:P("HomePage")},{path:"/:id",name:"EventPage",component:P("EventPage")},{path:"/about",name:"About",component:P("AboutPage")},{path:"/account",name:"Account",component:P("AccountPage"),beforeEnter:J}],H=G({linkActiveClass:"router-link-active",linkExactActiveClass:"router-link-exact-active",history:Q(),routes:Ne}),qe={setup(){const s=X({}),e=Z();return{editable:s,async createEvent(){try{const t=await V.createEvent(s.value);s.value="",ee.getOrCreateInstance(document.getElementById("create-event-modal")).toggle(),e.push({name:"EventPage",params:{id:t.id}})}catch(t){s.value="",u.error(t),y.toast(t.message,"error")}}}}},Le={class:"mb-3"},Me=o("label",{for:"event-name",class:"form-label"},"Event Name:",-1),je={class:"mb-3"},Re=o("label",{for:"event-description",class:"form-label"},"Event Description:",-1),Ve={class:"mb-3"},Ue=o("label",{for:"event-img",class:"form-label"},"Event Image URL:",-1),He={class:"mb-3"},ze=o("label",{for:"event-location",class:"form-label"},"Event Location:",-1),Be={class:"mb-3"},We=o("label",{for:"event-capacity",class:"form-label"},"Event Capacity:",-1),Ye={class:"mb-3"},Fe=o("label",{for:"event-startDate",class:"form-label"},"Event Date:",-1),Ke={class:"mb-3"},Ge=o("label",{for:"event-type",class:"form-label"},"Event Type:",-1),Qe=oe('<option selected disabled>Type</option><option value="concert">concert</option><option value="convention">convention</option><option value="sport">sport</option><option value="digital">digital</option>',5),Je=[Qe],Xe=o("button",{type:"submit",class:"btn btn-primary"},"Create",-1);function Ze(s,e,t,n,r,c){return l(),d("form",{onSubmit:e[7]||(e[7]=O((...a)=>n.createEvent&&n.createEvent(...a),["prevent"]))},[o("div",Le,[Me,k(o("input",{type:"text",class:"form-control","onUpdate:modelValue":e[0]||(e[0]=a=>n.editable.name=a),required:""},null,512),[[E,n.editable.name]])]),o("div",je,[Re,k(o("input",{type:"text",class:"form-control","onUpdate:modelValue":e[1]||(e[1]=a=>n.editable.description=a),required:""},null,512),[[E,n.editable.description]])]),o("div",Ve,[Ue,k(o("input",{type:"text",class:"form-control",max:"200","onUpdate:modelValue":e[2]||(e[2]=a=>n.editable.coverImg=a),required:""},null,512),[[E,n.editable.coverImg]])]),o("div",He,[ze,k(o("input",{type:"text",class:"form-control","onUpdate:modelValue":e[3]||(e[3]=a=>n.editable.location=a),required:""},null,512),[[E,n.editable.location]])]),o("div",Be,[We,k(o("input",{type:"number",class:"form-control","onUpdate:modelValue":e[4]||(e[4]=a=>n.editable.capacity=a),required:""},null,512),[[E,n.editable.capacity]])]),o("div",Ye,[Fe,k(o("input",{type:"date",class:"form-control","onUpdate:modelValue":e[5]||(e[5]=a=>n.editable.startDate=a),required:""},null,512),[[E,n.editable.startDate]])]),o("div",Ke,[Ge,k(o("select",{class:"form-select my-button","aria-label":"select event type","onUpdate:modelValue":e[6]||(e[6]=a=>n.editable.type=a),required:""},Je,512),[[te,n.editable.type]])]),Xe],32)}var et=h(qe,[["render",Ze]]),tt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:et});class ot{async getAccount(){try{const e=await _.get("/account");i.account=e.data}catch(e){u.error("HAVE YOU STARTED YOUR SERVER YET???",e)}}}const nt=new ot,st={connection:"connection",connected:"connected",disconnect:"disconnect",authenticate:"authenticate",authenticated:"authenticated",userConnected:"userConnected",userDisconnected:"userDisconnected",error:"error"};class at{constructor(e=!1,t=R){}on(e,t){var n;return(n=this.socket)==null||n.on(e,t.bind(this)),this}onConnected(e){u.log("[SOCKET_CONNECTION]",e),this.connected=!0,this.playback()}onAuthenticated(e){u.log("[SOCKET_AUTHENTICATED]",e),this.authenticated=!0,this.playback()}authenticate(e){var t;(t=this.socket)==null||t.emit(st.authenticate,e)}onError(e){u.error("[SOCKET_ERROR]",e)}enqueue(e,t){u.log("[ENQUEING_ACTION]",{action:e,payload:t}),this.queue.push({action:e,payload:t})}playback(){u.log("[SOCKET_PLAYBACK]");const e=[...this.queue];this.queue=[],e.forEach(t=>{this.emit(t.action,t.payload)})}emit(e,t=void 0){if(this.requiresAuth&&!this.authenticated)return this.enqueue(e,t);if(!this.connected)return this.enqueue(e,t);this.socket.emit(e,t)}}class rt extends at{constructor(){super();this.on("error",this.onError)}onError(e){y.toast(e.message,"error")}}const z=new rt,m=ne({domain:_e,clientId:me,audience:ge,useRefreshTokens:!0,onRedirectCallback:s=>{H.push(s&&s.targetUrl?s.targetUrl:window.location.pathname)}});m.on(m.AUTH_EVENTS.AUTHENTICATED,async function(){_.defaults.headers.authorization=m.bearer,_.interceptors.request.use(ct),i.user=m.user,await nt.getAccount(),z.authenticate(m.bearer)});async function ct(s){if(!m.isAuthenticated)return s;const e=m.identity.exp*1e3,t=e<Date.now(),n=e<Date.now()+1e3*60*60*12;return t?await m.loginWithPopup():n&&(await m.getTokenSilently(),_.defaults.headers.authorization=m.bearer,z.authenticate(m.bearer)),s}const it={setup(){return{user:f(()=>i.user),account:f(()=>i.account),async login(){m.loginWithPopup()},async logout(){m.logout({returnTo:window.location.origin})}}}},B=s=>(N("data-v-f7b5cf20"),s=s(),q(),s),lt={class:"navbar-text"},dt={key:1,class:"dropdown my-2 my-lg-0"},ut={class:"dropdown-toggle selectable","data-bs-toggle":"dropdown","aria-expanded":"false",id:"authDropdown"},_t={key:0},mt=["src"],gt={class:"mx-3 text-success lighten-30"},vt={class:"dropdown-menu p-0 list-group w-100","aria-labelledby":"authDropdown"},pt=B(()=>o("div",{class:"list-group-item list-group-item-action hoverable"}," Manage Account ",-1)),ht=B(()=>o("i",{class:"mdi mdi-logout"},null,-1)),ft=x(" logout "),bt=[ht,ft];function yt(s,e,t,n,r,c){const a=b("router-link");return l(),d("span",lt,[n.user.isAuthenticated?(l(),d("div",dt,[o("div",ut,[n.account.picture?(l(),d("div",_t,[o("img",{src:n.account.picture,alt:"account photo",height:"40",class:"rounded"},null,8,mt),o("span",gt,v(n.account.name),1)])):w("",!0)]),o("div",vt,[p(a,{to:{name:"Account"}},{default:T(()=>[pt]),_:1}),o("div",{class:"list-group-item list-group-item-action hoverable text-danger",onClick:e[1]||(e[1]=(...g)=>n.logout&&n.logout(...g))},bt)])])):(l(),d("button",{key:0,class:"btn selectable text-success lighten-30 text-uppercase my-2 my-lg-0",onClick:e[0]||(e[0]=(...g)=>n.login&&n.login(...g))}," Login "))])}var wt=h(it,[["render",yt],["__scopeId","data-v-f7b5cf20"]]),kt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:wt});const xt={},Et={class:"modal",id:"create-event-modal",tabindex:"-1"},Tt={class:"modal-dialog"},$t={class:"modal-content"},Ct={class:"modal-header"},Pt=o("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"},null,-1),St={class:"modal-body"};function At(s,e){return l(),d("div",Et,[o("div",Tt,[o("div",$t,[o("div",Ct,[L(s.$slots,"modal-title-slot",{class:"modal-title"}),Pt]),o("div",St,[L(s.$slots,"modal-body-slot")])])])])}var Ot=h(xt,[["render",At]]),It=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Ot});const Dt={setup(){return{account:f(()=>i.account)}}},S=s=>(N("data-v-498591da"),s=s(),q(),s),Nt={class:"navbar-expand-lg"},qt={class:"container-fluid"},Lt={class:"row"},Mt={class:"bg-primary shadow d-flex justify-content-between px-3 col-12"},jt=S(()=>o("h1",{class:"mdi mdi-rocket h-20 logo"},"Events",-1)),Rt=S(()=>o("button",{class:"navbar-toggler",type:"button","data-bs-toggle":"collapse","data-bs-target":"#navbarText","aria-controls":"navbarText","aria-expanded":"false","aria-label":"Toggle navigation"},[o("span",{class:"text-light mdi mdi-arrow-expand-down",title:"open navigator"})],-1)),Vt={class:"row bg-primary darken-10"},Ut={class:"col-12"},Ht={class:"collapse navbar-collapse",id:"navbarText"},zt={class:"navbar-nav me-auto"},Bt={class:"d-flex"},Wt=x(" Home "),Yt=x(" Account "),Ft=S(()=>o("h2",{title:"Create New Event",class:"btn h-font text-success selectable text-uppercase","data-bs-toggle":"modal","data-bs-target":"#create-event-modal"}," + ",-1)),Kt=S(()=>o("h4",null,"Create an Event",-1));function Gt(s,e,t,n,r,c){const a=b("Login"),g=b("router-link"),A=b("EventForm"),Y=b("Modal");return l(),d(I,null,[o("nav",Nt,[o("div",qt,[o("div",Lt,[o("div",Mt,[jt,Rt,p(a)])]),o("div",Vt,[o("div",Ut,[o("div",Ht,[o("ul",zt,[o("li",Bt,[p(g,{to:{name:"Home"},class:"btn h-font text-success selectable text-uppercase",title:"Navigate Home"},{default:T(()=>[Wt]),_:1}),p(g,{to:{name:"Account"},class:"btn h-font text-success selectable text-uppercase",title:"Navigate to Account"},{default:T(()=>[Yt]),_:1}),Ft])])])])])])]),p(Y,{id:"create-event-modal"},{"modal-title-slot":T(()=>[Kt]),"modal-body-slot":T(()=>[p(A)]),_:1})],64)}var Qt=h(Dt,[["render",Gt],["__scopeId","data-v-498591da"]]),Jt=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Qt});const Xt={setup(){return{currentPage:f(()=>i.currentPage),totalPages:f(()=>i.totalPages),async changePage(s){let e=i.currentPage+s;if(e>i.totalPages||e<=0){y.toast("You're' there","warning");return}V.changePage(e)}}}},Zt={key:0,class:"mt-3"},eo={class:"d-flex text-right justify-content-end"},to={class:"h5 px-2"};function oo(s,e,t,n,r,c){return n.totalPages>1?(l(),d("div",Zt,[o("div",eo,[o("h5",{class:M(["text-dark",{selectable:n.currentPage>1,"lighten-10":n.currentPage==1}]),onClick:e[0]||(e[0]=a=>n.changePage(-1))}," back ",2),o("div",to,v(n.currentPage),1),o("h5",{class:M(["text-dark",{selectable:n.currentPage!=n.totalPages,"lighten-10":n.currentPage==n.totalPages}]),onClick:e[1]||(e[1]=a=>n.changePage(1))}," next ",2)])])):w("",!0)}var no=h(Xt,[["render",oo]]),so=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:no});const ao={props:{ticket:{type:Object,required:!0}},setup(s){return{async deleteTicket(){if(await y.confirm())try{await Se.deleteTicket(s.ticket)}catch(e){u.error(e),y.toast(e.message,"error")}}}}},ro={class:"ticket"},co={class:"d-flex text-light shadow my-4 h-100"},io=["src"],lo={class:"row"},uo={class:"d-flex col-12 justify-content-between"},_o={class:"m-2 px-2 text-color"},mo={class:"col-12"},go={class:"m-2 px-2 pe-5"};function vo(s,e,t,n,r,c){return l(),d("div",ro,[o("div",co,[o("img",{class:"ticket-img",src:t.ticket.event.coverImg},null,8,io),o("div",lo,[o("div",uo,[o("h5",_o,v(t.ticket.event.name),1),o("div",{title:"delete ticket to {{ticket.event.name}}",class:"mx-1 text-end selectable mdi mdi-close-circle-outline",onClick:e[0]||(e[0]=O((...a)=>n.deleteTicket&&n.deleteTicket(...a),["prevent"]))})]),o("div",mo,[o("p",go,v(t.ticket.event.description),1)])])])])}var po=h(ao,[["render",vo],["__scopeId","data-v-141d547d"]]),ho=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:po});const fo={props:{tower:{type:Object,required:!0}},setup(s){return se(),{account:f(()=>i.account||null)}}},bo={class:"col-md-3 my-4"},yo={class:"m-2 h-100 bg-light align-items-center shadow"},wo=["src","alt"],ko={class:"p-2"},xo={class:"text-secondary m-0 p-0"},Eo={key:0,class:"text-danger darken-10"},To={key:1,class:"text-danger darken-10"},$o={class:"text-primary m-0 p-0"},Co={class:"m-0 p-0"},Po=o("br",null,null,-1),So=["title"],Ao=["title"];function Oo(s,e,t,n,r,c){const a=b("router-link");return l(),d("div",bo,[o("div",yo,[o("img",{src:t.tower.coverImg,alt:t.tower.name,class:"event-img pb-1"},null,8,wo),o("div",ko,[o("h5",xo,v(t.tower.name),1),t.tower.isCanceled?(l(),d("div",Eo," This event is cancelled ")):w("",!0),t.tower.capacity==0?(l(),d("div",To," This event is sold out ")):w("",!0),o("p",$o," remaining seats: "+v(t.tower.capacity),1),o("p",Co,[x(v(new Date(t.tower.startDate).toDateString())+" ",1),Po,x(" "+v(t.tower.location),1)]),p(a,{to:{name:"EventPage",params:{id:t.tower.id}}},{default:T(()=>[t.tower.isCanceled?(l(),d("button",{key:0,class:"my-button bg-warning darken-10 w-100 mt-4",title:t.tower.name+" details"}," Details ",8,So)):w("",!0),t.tower.isCanceled?w("",!0):(l(),d("button",{key:1,class:"my-button w-100 mt-4",title:t.tower.name+" details"}," Details ",8,Ao))]),_:1},8,["to"])])])])}var Io=h(fo,[["render",Oo]]),Do=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:Io});function No(s){Object.entries({"./components/Comment.vue":Ce,"./components/EventForm.vue":tt,"./components/Login.vue":kt,"./components/Modal.vue":It,"./components/Navbar.vue":Jt,"./components/Paginator.vue":so,"./components/Ticket.vue":ho,"./components/Tower.vue":Do}).forEach(([t,n])=>{const r=n.name||t.substr(t.lastIndexOf("/")+1).replace(/\.\w+$/,"");s.component(r,n.default)})}const W=ae(ue);No(W);W.use(H).mount("#app");export{i as A,y as P,h as _,V as a,pe as c,u as l,Se as t};

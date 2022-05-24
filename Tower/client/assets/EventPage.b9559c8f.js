import{l as x,B as b,D as C,H as E,c as l,a as T,o as c,b as n,d as e,t as m,h as i,F as g,E as p,g as w,w as S,m as D,v as I,x as P,y as B,G as M}from"./vendor.4b88c9a2.js";import{_ as j,t as v,c as k,l as _,P as h,a as u,A as d}from"./index.4f4c2e3c.js";const N={name:"EventPage",setup(){const r=x({}),s=b();return C(async()=>{s.params;try{_.log(s.params),s.params=="EventPage"&&(d.tickets,await u.getTower(s.params),await v.getMyTickets(),await v.getEventTickets(s.params.id))}catch(a){_.error(a),h.toast(a.message,"error")}}),E(async()=>{try{s.name=="EventPage"&&(await v.getEventTickets(s.params.id),await k.getComments(s.params.id),await v.getMyTickets())}catch(a){_.error(a),h.toast(a.message,"error")}}),{formData:r,async cancelEvent(){try{await u.cancelEvent(s.params)}catch(a){_.error(a),h.toast(a.message,"error")}},async attend(){try{await v.createTicket(this.tower.id,this.account.id)}catch(a){_.error(a),h.toast(a.message,"error")}},async createComment(){try{r.value.eventId=s.params.id,await k.createComment(r.value),r.value={}}catch(a){_.error(a),h.toast(a.message,"error")}},tower:l(()=>d.activeEvent),account:l(()=>d.account),tickets:l(()=>d.tickets),comments:l(()=>d.comments),myTickets:l(()=>d.myTickets),patron:l(()=>d.myTickets.find(a=>a.eventId==d.activeEvent.id))}}},y=r=>(P("data-v-4d45e30c"),r=r(),B(),r),V={class:"container"},A={class:"row"},F={class:"col-12 my-3"},L={class:"d-flex align-items-end"},R={class:"type-box p-2"},q={class:"h-font px-3"},G=y(()=>e("div",{class:"line w-100 my-4"},null,-1)),H={key:0,class:"bg-danger text-light my-2"},O=["src","alt"],U={class:"event-details p-2 my-2 h-font col-12 shadow justify-content-between d-flex"},z={class:"col-4"},J=w(" Date: "),K={class:"text-primary"},Q={class:"col-4"},W=w(" Location: "),X={class:"text-primary"},Y={class:"col-4 text-end"},Z=w(" Seats left: "),$={class:"text-primary"},tt={key:1,class:"p-3 bg-primary lighten-20 shadow d-flex"},et=["tickets"],st=["src","title"],at={class:"d-flex justify-content-between my-4"},ot={key:0},ct={key:0},nt={key:0},rt={key:1,class:"div"},it={key:0},dt={class:"my-2 text-dark bg-light"},lt={class:"m-3 p-3"},mt=y(()=>e("span",{class:"text-secondary darken-10"},"DESCRIPTION:",-1)),_t=y(()=>e("div",{class:"line w-100 my-4"},null,-1)),vt={class:"row"},ht={class:"col-12"},yt=y(()=>e("h5",{class:"d-flex text-light col-12"},"Comments:",-1)),wt=y(()=>e("i",{type:"submit",title:"create a comment",class:"text-primary lighten-20 mx-2 selectable"}," + ",-1));function gt(r,s,a,t,pt,kt){const f=T("Comment");return c(),n("div",V,[e("div",A,[e("div",F,[e("div",L,[e("div",R,m(t.tower.type),1),e("h1",q,m(t.tower.name),1)]),G,t.tower.isCanceled?(c(),n("h1",H," This event has been cancelled. ")):i("",!0),e("img",{src:t.tower.coverImg,class:"events-header shadow my-2",alt:t.tower.name},null,8,O),e("div",U,[e("div",z,[J,e("span",K,m(new Date(t.tower.startDate).toDateString()),1)]),e("div",Q,[W,e("span",X,m(t.tower.location),1)]),e("div",Y,[Z,e("span",$,m(t.tower.capacity),1)])]),t.tickets[0]?(c(),n("div",tt,[(c(!0),n(g,null,p(t.tickets,o=>(c(),n("div",{class:"m-2",key:o.id,tickets:o},[e("img",{src:o.creator.picture,title:o.creator.name+" is attending",class:"patron-img shadow"},null,8,st)],8,et))),128))])):i("",!0),e("div",at,[t.account.id?(c(),n("div",ot,[t.patron?i("",!0):(c(),n("div",ct,[t.tower.capacity>0?(c(),n("div",nt,[t.tower.isCanceled?i("",!0):(c(),n("button",{key:0,class:"attend my-button",title:"attend this event",onClick:s[0]||(s[0]=(...o)=>t.attend&&t.attend(...o))}," Attend "))])):i("",!0)]))])):i("",!0),t.account.id==t.tower.creatorId?(c(),n("div",rt,[t.tower.isCanceled?i("",!0):(c(),n("div",it,[t.account.id==t.tower.creatorId?(c(),n("button",{key:0,title:"cancel {{tower.name}}",onClick:s[1]||(s[1]=(...o)=>t.cancelEvent&&t.cancelEvent(...o)),class:"my-button"}," Cancel ")):i("",!0)]))])):i("",!0)]),e("div",dt,[e("p",lt,[mt,w(" "+m(t.tower.description),1)])])])]),_t,e("div",vt,[e("div",ht,[yt,e("form",{class:"col-12",onSubmit:s[3]||(s[3]=S((...o)=>t.createComment&&t.createComment(...o),["prevent"]))},[D(e("input",{name:"add-note-input",class:"mr-2 rounded",type:"text","onUpdate:modelValue":s[2]||(s[2]=o=>t.formData.body=o),required:""},null,512),[[I,t.formData.body]]),wt],32),(c(!0),n(g,null,p(t.comments,o=>(c(),M(f,{key:o.id,comment:o},null,8,["comment"]))),128))])])])}var xt=j(N,[["render",gt],["__scopeId","data-v-4d45e30c"]]);export{xt as default};

(this.webpackJsonprooms=this.webpackJsonprooms||[]).push([[7],{100:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var c=n(2),o=n(0),r=n(24),i=n.n(r),s=n(1),a=function(e){var t=e.isOpen,n=(e.onClose,e.children);e.enabled;return t?i.a.createPortal(Object(s.jsx)("div",{style:{height:"100vh",background:"rgba(20, 20, 20, 0.677)",width:"100vw",position:"fixed",top:"0"},children:n}),document.body):null};function l(e){var t=e.open,n=(e.setOpen,e.text),r=Object(o.useState)(!0),i=Object(c.a)(r,2),l=i[0],u=i[1];return Object(o.useEffect)((function(){setTimeout((function(){u(!1)}),2e3)}),[]),Object(s.jsx)("div",{children:Object(s.jsx)(a,{isOpen:t,enabled:l,children:Object(s.jsx)("div",{style:{width:"25rem",background:"white",position:"absolute",height:"30rem",marginTop:"20vh",marginLeft:"50%",transform:"translateX(-50%)",textAlign:"center",padding:"2rem"},children:Object(s.jsxs)("h1",{children:[n," "]})})})})}},101:function(e,t,n){var c=n(58);function o(e,t){var n=t;return e.forEach((function(e){n=n.replace(e,"")})),n}function r(e,t){for(var n,c="",o=0;o<t;o+=1)c+=e[(n=e.length,Math.floor(Math.random()*n).toString())];return c}e.exports=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.length,n=void 0===t?20:t,i=e.useLetters,s=void 0===i||i,a=e.useNumbers,l=void 0===a||a,u=e.includeSymbols,b=void 0===u?[]:u,j=e.excludeSymbols,d=void 0===j?[]:j,h="abcdefghijklmnopqrstuvwxyz",p="0123456789",O=[],x=[];return s&&(d.length&&(h=o(d,h)),O=h.split("")),l&&(d.length&&(p=o(d,p)),x=p.split("")),r([].concat(c(O),c(x),c(b)),n)}},132:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return p}));var c=n(2),o=n(0),r=n(20),i=n.n(r),s=n(101),a=n.n(s),l=n(3),u=n(57),b=n(100),j=n(5),d=n(1),h=i()(window.location.origin,{secure:!0});function p(){var e=Object(o.useState)(""),t=Object(c.a)(e,2),n=t[0],r=t[1],i=Object(o.useState)(""),s=Object(c.a)(i,2),p=s[0],O=s[1],x=Object(o.useState)(!1),f=Object(c.a)(x,2),m=f[0],g=f[1],v=Object(o.useState)(2),y=Object(c.a)(v,2),w=y[0],S=y[1],k=Object(o.useState)(!1),C=Object(c.a)(k,2),L=C[0],N=C[1],E=Object(o.useState)(null),T=Object(c.a)(E,2),J=T[0],M=T[1],P=Object(j.c)(u.pop),q=Object(c.a)(P,2),z=q[0],A=q[1],D=a()({length:8});Object(o.useEffect)((function(){M(D)}),[]);return Object(d.jsxs)("div",{className:"cre",children:[Object(d.jsx)(b.a,{open:z,setOpen:A,text:"Please fill form correctly :)"}),Object(d.jsx)("h1",{children:"Create Room"}),Object(d.jsx)("input",{placeholder:"Name",type:"text",maxLength:"20",name:"name",value:n,onChange:function(e){return r(e.target.value)}})," ",Object(d.jsx)("br",{}),Object(d.jsx)("input",{placeholder:"Description (optional)",type:"text",maxLength:"40",name:"description",value:p,onChange:function(e){return O(e.target.value)}})," ",Object(d.jsx)("br",{}),Object(d.jsx)("label",{children:"Number of guests:"})," ",Object(d.jsxs)("select",{value:w,onChange:function(e){return S(e.target.value)},style:{border:"1px solid gray",width:"3rem"},children:[Object(d.jsx)("option",{children:"2"}),Object(d.jsx)("option",{children:"3"}),Object(d.jsx)("option",{children:"4"}),Object(d.jsx)("option",{children:"5"}),Object(d.jsx)("option",{children:"6"}),Object(d.jsx)("option",{children:"7"})]})," ",Object(d.jsx)("br",{}),Object(d.jsx)("label",{style:{position:"absolute",top:"13rem"},children:" Hidden (optional) "})," ",Object(d.jsx)("input",{type:"checkbox",value:m,onChange:function(e){return g(!m)},style:{width:"1.5rem",position:"absolute",left:"9.8rem",top:"12.5rem",border:"1px solid gray"}})," ",Object(d.jsx)("br",{}),Object(d.jsx)("button",{type:"submit",onClick:function(){""!=n?(h.emit("create",J,n,p,w,m),N(!0)):(A(!0),setTimeout((function(){A(!1)}),2e3))},children:" Submit "}),L?Object(d.jsx)(l.a,{to:"/room/".concat(J)}):null]})}}}]);
//# sourceMappingURL=7.d07a653e.chunk.js.map
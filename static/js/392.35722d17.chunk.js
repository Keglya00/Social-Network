"use strict";(self.webpackChunkmy_app=self.webpackChunkmy_app||[]).push([[392],{392:(s,e,a)=>{a.r(e),a.d(e,{default:()=>k});var t=a(487),r=a(420),d=a(791);const l="Dialogs_dialogs__QWDer",c="Dialogs_dialogs__chats__Opjc5",n="Dialogs_dialogs__messages__AeTPA",i="Dialogs_message__CirTE",_="Dialogs_mymessage__Y9tf2",g="Dialogs_dialogs__addMessages_textarea__AG7mQ",m="Dialogs_dialogs__messages_addMessage__E+qYV",o="Dialogs_dialogs__addMessages_button__oMR8J",u="Chat_chat__pSHfW";var h=a(87),j=a(184);const x=s=>(0,j.jsx)(h.OL,{to:"/dialogs/".concat(s.userid),className:u,children:s.username}),N="Message_message__ZY+wS",v="Message_message__inner__YllRJ",M="Message_message__photo__cv1PH",p="Message_message__name__-kunO",D="Message_mymessage__inner__nYWNE",f=s=>(0,j.jsxs)("div",{className:N,children:[(0,j.jsx)("img",{className:M}),(0,j.jsxs)("div",{className:v,children:[(0,j.jsx)("div",{className:p,children:s.userName}),s.message]})]}),C=s=>(0,j.jsx)("div",{className:D,children:s.message});var b=a(759),S=a(610),w=a(411);const y=d.memo((s=>{(0,d.useEffect)((()=>{s.setChats()}),[]),(0,d.useEffect)((()=>{s.currentUserId&&s.setMessages(s.currentUserId)}),[s.currentUserId]);const e=(0,d.useRef)(null);(0,d.useEffect)((()=>{var s;a&&(null===(s=e.current)||void 0===s||s.scrollIntoView())}),[s.messagesData]);const[a,t]=(0,d.useState)(!0);let r=s.chatsData.map((e=>(0,j.jsx)("li",{onClick:()=>{var a;a=e.id,s.setCurrentUserId(a),(0,w.j)(e.id)},children:(0,j.jsx)(x,{username:e.userName,userid:""})}))),g=s.messagesData.map((e=>e.senderId===s.id?(0,j.jsx)("div",{className:_,children:(0,j.jsx)(C,{message:e.body})}):(0,j.jsx)("div",{className:i,children:(0,j.jsx)(f,{message:e.body,userName:e.senderName})})));return(0,j.jsxs)("div",{className:l,children:[(0,j.jsx)("ul",{className:c,children:r}),(0,j.jsxs)("div",{className:n,onScroll:s=>{let e=s.currentTarget;Math.abs(e.scrollHeight-e.scrollTop-e.clientHeight)<10?t(!0):t(!1)},children:[g,(0,j.jsx)(I,{addMessage:e=>{e&&s.sendMessage(s.currentUserId,e)},wsStatus:s.wsStatus}),(0,j.jsx)("div",{ref:e})]})]})})),I=s=>(0,j.jsx)(b.l0,{onSubmit:e=>{s.addMessage(e.newMessageBody)},children:e=>{let{handleSubmit:a,form:t}=e;return(0,j.jsxs)("form",{onSubmit:a,className:m,children:[(0,j.jsx)(b.gN,{validate:S.C,placeholder:"Enter your message",component:"textarea",name:"newMessageBody",className:g}),(0,j.jsx)("button",{disabled:"ready"!==s.wsStatus,onClick:()=>{a(),t.reset()},className:o})]})}}),U=y;var R=a(932);const k=(0,a(154).qC)((0,r.$j)((s=>({chatsData:s.dialogsReducer.chatsData,messagesData:s.dialogsReducer.messagesData,id:s.authReducer.data.id,wsStatus:s.dialogsReducer.wsStatus,currentUserId:s.dialogsReducer.currentUserId})),{startWsChannel:t.ig,stopWsChannel:t.FU,sendMessage:t.bG,setChats:t.Nv,setMessages:t.Z,setCurrentUserId:t.ui}),R.l)(U)}}]);
//# sourceMappingURL=392.35722d17.chunk.js.map
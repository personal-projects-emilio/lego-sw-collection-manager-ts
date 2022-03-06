(this["webpackJsonplego-sw-collection-manager-ts"]=this["webpackJsonplego-sw-collection-manager-ts"]||[]).push([[0],{179:function(e,t,n){},192:function(e,t,n){"use strict";n.r(t);var a,i,r=n(0),c=n.n(r),o=n(44),s=n.n(o),l=(n(179),n(273)),u=n(274),d=n(202),j=n(257),b=n(20),f=n(88),m=function(){return Object(f.b)()},h=f.c,p=function(e){var t=Object(r.useRef)();return Object(r.useEffect)((function(){t.current=e}),[e]),t.current},g=n(11),O=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=Object(r.useState)(e),n=Object(g.a)(t,2),a=n[0],i=n[1],c=Object(r.useCallback)((function(e){return i("undefined"!==typeof e?e:function(e){return!e})}),[]);return[a,c]},x=n(15),v=n.n(x),y=n(12),w=n(18),k=n(24),C=n(105),S=n(31),P=Object(S.a)({basename:"/lego-sw-collection-manager-ts"}),I=P,A={token:null,userId:null,error:null,isLoading:!1},N=Object(k.c)("auth/authenticate",function(){var e=Object(w.a)(v.a.mark((function e(t,n){var a,i;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.rejectWithValue,e.prev=1,e.next=4,C.a.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAdpqxJlqETb5zQ155SHnoel4UWUPZejkA",{json:Object(y.a)(Object(y.a)({},t),{},{returnSecureToken:!0})}).json();case 4:return i=e.sent,I.push("/minifigs"),e.abrupt("return",i);case 9:return e.prev=9,e.t0=e.catch(1),console.error("Unable to authenticate",e.t0),e.abrupt("return",a(e.t0.response.data));case 13:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t,n){return e.apply(this,arguments)}}()),M=Object(k.b)("auth/tryAutoSignIn"),T=Object(k.d)({name:"auth",initialState:A,reducers:{logout:function(){return A},autoSignIn:function(e,t){var n=t.payload,a=n.userId,i=n.token;e.token=i,e.userId=a}},extraReducers:function(e){e.addCase(N.pending,(function(e){e.isLoading=!0})),e.addCase(N.fulfilled,(function(e,t){var n=t.payload;e.isLoading=!1,e.token=n.idToken,e.userId=n.localId})),e.addCase(N.rejected,(function(e,t){var n=t.payload;e.isLoading=!1,e.error=n}))}}),L=T.actions,D=L.logout,W=L.autoSignIn,q=T.reducer,z=function(e){return!!e.auth.token},E=function(e){return e.auth.isLoading},F=function(){localStorage.removeItem("token"),localStorage.removeItem("expirationDate"),localStorage.removeItem("userId")},R=function(e,t){a=setTimeout((function(){t(D())}),new Date(e).getTime()-(new Date).getTime())},V=function(e){var t=e.dispatch;return function(e){return function(n){if(D.match(n)&&(F(),clearTimeout(a)),M.match(n)){var i=localStorage.getItem("token"),r=localStorage.getItem("expirationDate"),c=localStorage.getItem("userId");return i&&r&&c?new Date(r)<=new Date?F():(R(r,t),e(W({token:i,userId:c}))):clearTimeout(a)}if((null===n||void 0===n?void 0:n.type.match(/^auth/))&&Object(k.e)(n)){var o=n.payload,s=o.idToken,l=o.localId,u=o.expiresIn,d=new Date((new Date).getTime()+1e3*parseInt(u,10)).toISOString();R(d,t),localStorage.setItem("token",s),localStorage.setItem("expirationDate",d),localStorage.setItem("userId",l)}return e(n)}}},U=q,B=n(270),H=n(144),Z=n(263),J=n(135),$=n.n(J),_=n(54),G=n(1),Q=function(e){var t=e.isAuthenticate,n=e.logoutHandler,a=Object(b.h)().pathname,i=c.a.useState(null),o=Object(g.a)(i,2),s=o[0],l=o[1],u=Boolean(s),d=Object(r.useCallback)((function(){return l(null)}),[]),j=Object(r.useCallback)((function(){d(),n()}),[n,d]);return Object(G.jsxs)(G.Fragment,{children:[Object(G.jsx)(B.a,{id:"application-menu-icon","aria-label":"application menu icon","aria-controls":u?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":u?"true":void 0,onClick:function(e){l(e.currentTarget)},color:"inherit",children:Object(G.jsx)($.a,{})}),Object(G.jsxs)(H.a,{id:"menu-header",anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},anchorEl:s,open:u,onClose:d,sx:{display:"flex",padding:"0 0.5rem","& .Mui-selected":{color:"primary.main",fontWeight:"fontWeightBold"}},MenuListProps:{"aria-labelledby":"application-menu-icon"},children:[Object(G.jsx)(Z.a,{component:_.a,to:"/minifigs",selected:"/minifigs"===a,onClick:d,children:"Minifigs"}),t?Object(G.jsx)(Z.a,{onClick:j,children:"Logout"}):Object(G.jsx)(Z.a,{component:_.a,to:"/auth",selected:"/auth"===a,onClick:d,children:"Authentication"})]})]})},X=n(256),Y=n(272),K=function(e){return{id:"tab-nav-".concat(e),"aria-controls":"tab-nav-".concat(e)}},ee=function(e){var t=e.isAuthenticate,n=e.logoutHandler,a=Object(b.h)().pathname;return Object(G.jsxs)(X.a,{value:a,"aria-label":"Tab Navigation menu",children:[Object(G.jsx)(Y.a,Object(y.a)({"data-testid":"minifigs",label:"Minifigs",value:"/minifigs",component:_.a,to:"/minifigs"},K(0))),t?Object(G.jsx)(Y.a,{label:"Logout",onClick:n}):Object(G.jsx)(Y.a,Object(y.a)({label:"Authentication",component:_.a,to:"/auth",value:"/auth"},K(1)))]})},te=function(){var e=h(z),t=m(),n=Object(b.g)().push,a=Object(r.useCallback)((function(){t(D()),n("/auth")}),[t,n]);return Object(G.jsx)(l.a,{position:"sticky",children:Object(G.jsxs)(u.a,{variant:"dense",children:[Object(G.jsxs)(d.a,{variant:"h6",sx:{flexGrow:1},children:["Lego SW",Object(G.jsx)(j.a,{smDown:!0,children:" Collection Manager"})]}),Object(G.jsx)(j.a,{mdUp:!0,children:Object(G.jsx)(Q,{isAuthenticate:e,logoutHandler:a})}),Object(G.jsx)(j.a,{smDown:!0,children:Object(G.jsx)(ee,{isAuthenticate:e,logoutHandler:a})})]})})},ne=n(265),ae=n(275),ie=function(){return Object(G.jsxs)(ne.a,{container:!0,justifyContent:"center",alignItems:"center",direction:"column",sx:{position:"fixed",height:"calc(100vh - 48px)"},children:[Object(G.jsx)(ae.a,{size:200,thickness:2,disableShrink:!0}),Object(G.jsx)(d.a,{variant:"h5",color:"primary",children:"Loading..."})]})},re=C.a.create({prefixUrl:"https://lego-sw-collection-manager-default-rtdb.europe-west1.firebasedatabase.app"}),ce=function(e,t){return null===e||void 0===e?void 0:e.filter((function(e){var n=t.show,a=t.characName,i=t.tag,r=e.possessed,c=e.tags,o=e.characterName,s="all"===n||"owned"===n&&r||"missing"===n&&!r,l=!i||(null===c||void 0===c?void 0:c.includes(i));return s&&(!a||a===o)&&l}))},oe=function(){var e=Object(w.a)(v.a.mark((function e(t,n){return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,re.put("minifigs.json?auth=".concat(n),{json:t}).json();case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),se=function(e,t){return null===e||void 0===e?void 0:e.findIndex((function(e){return e.id===t}))},le=Object(k.c)("minifigs/fetchMinifigs",function(){var e=Object(w.a)(v.a.mark((function e(t,n){var a,i;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=n.rejectWithValue,e.prev=1,e.next=4,re.get("minifigs.json").json();case 4:return i=e.sent,e.abrupt("return",i);case 8:return e.prev=8,e.t0=e.catch(1),console.error("Unable to fetch minifigs",e.t0),e.abrupt("return",a(e.t0.message));case 12:case"end":return e.stop()}}),e,null,[[1,8]])})));return function(t,n){return e.apply(this,arguments)}}()),ue=Object(k.c)("minifigs/toggleMinifigOwned",function(){var e=Object(w.a)(v.a.mark((function e(t,n){var a,i,r,c,o,s;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=n.getState,i=n.rejectWithValue,r=a(),c=r.auth.token){e.next=5;break}return e.abrupt("return",t);case 5:if(o=r.minifigs.list,void 0!==(s=se(o,t))&&-1!==s&&o){e.next=9;break}return e.abrupt("return",i("No minifig with that id"));case 9:return e.prev=9,e.next=12,re.patch("minifigs/".concat(s,".json?auth=").concat(c),{json:{possessed:!o[s].possessed}});case 12:return e.abrupt("return",t);case 15:return e.prev=15,e.t0=e.catch(9),console.error("Unable to toggle minifig owned",e.t0),e.abrupt("return",i(e.t0.message));case 19:case"end":return e.stop()}}),e,null,[[9,15]])})));return function(t,n){return e.apply(this,arguments)}}()),de=Object(k.c)("minifigs/editMinifig",function(){var e=Object(w.a)(v.a.mark((function e(t,n){var a,i,r,c,o,s;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=n.getState,i=n.rejectWithValue,r=a(),c=r.auth.token,o=r.minifigs.list,Array.isArray(o)){e.next=6;break}return e.abrupt("return",i("No minifigs list in the store"));case 6:if(s=o.map((function(e){return e.id===t.id?t:e})),c){e.next=9;break}return e.abrupt("return",s);case 9:return e.prev=9,e.next=12,oe(s,c);case 12:return e.abrupt("return",e.sent);case 15:return e.prev=15,e.t0=e.catch(9),console.error("Unable to edit the minifig",e.t0),e.abrupt("return",i(e.t0.message));case 19:case"end":return e.stop()}}),e,null,[[9,15]])})));return function(t,n){return e.apply(this,arguments)}}()),je=Object(k.c)("minifigs/addMinifig",function(){var e=Object(w.a)(v.a.mark((function e(t,n){var a,i,r,c,o,s;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=n.getState,i=n.rejectWithValue,r=a(),c=r.auth.token,o=r.minifigs.list,Array.isArray(o)){e.next=6;break}return e.abrupt("return",i("No minifigs list in the store"));case 6:if(s=o.concat(t).sort((function(e,t){return e.id>t.id?1:-1})),c){e.next=9;break}return e.abrupt("return",s);case 9:return e.prev=9,e.next=12,oe(s,c);case 12:return e.abrupt("return",e.sent);case 15:return e.prev=15,e.t0=e.catch(9),console.error("Unable to add the minifig",e.t0),e.abrupt("return",i(e.t0.message));case 19:case"end":return e.stop()}}),e,null,[[9,15]])})));return function(t,n){return e.apply(this,arguments)}}()),be=Object(k.c)("minifigs/deleteMinifig",function(){var e=Object(w.a)(v.a.mark((function e(t,n){var a,i,r,c,o,s,l;return v.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=n.getState,i=n.rejectWithValue,r=a(),c=r.auth.token,o=r.minifigs.list,void 0!==(s=se(o,t))&&-1!==s&&o){e.next=7;break}return e.abrupt("return",i("No minifig with that id"));case 7:if(l=o.filter((function(e){return e.id!==t})),c){e.next=10;break}return e.abrupt("return",l);case 10:return e.prev=10,e.next=13,oe(l,c);case 13:return e.abrupt("return",e.sent);case 16:return e.prev=16,e.t0=e.catch(10),console.error("Unable to delete minifig",e.t0),e.abrupt("return",i(e.t0.message));case 20:case"end":return e.stop()}}),e,null,[[10,16]])})));return function(t,n){return e.apply(this,arguments)}}()),fe=Object(k.f)(le,ue,de,je,be),me=Object(k.e)(le,ue,de,je,be),he=Object(k.g)(le,ue,de,je,be),pe=Object(k.d)({name:"minifigs",initialState:{list:null,tags:null,characNames:null,isLoading:!1,error:null,filters:{show:"all",characName:null,tag:null},pagination:{activePage:0,total:0,nbPerPage:50}},reducers:{setMinifigsFilters:function(e,t){var n=Object(y.a)(Object(y.a)({},e.filters),t.payload),a=ce(e.list,n);e.filters=n,e.pagination.activePage=0,e.pagination.total=(null===a||void 0===a?void 0:a.length)||0},resetMinifigsFilters:function(e){var t;e.filters={show:"all",tag:null,characName:null},e.pagination.total=(null===(t=e.list)||void 0===t?void 0:t.length)||0,e.pagination.activePage=0},setMinifigsPagination:function(e,t){e.pagination=t.payload}},extraReducers:function(e){e.addCase(ue.fulfilled,(function(e,t){var n,a=t.payload,i=null===(n=e.list)||void 0===n?void 0:n.findIndex((function(e){return e.id===a}));-1!==i&&e.list&&void 0!==i&&(e.list[i].possessed=!e.list[i].possessed)})),e.addMatcher(Object(k.e)(je,le,be,de),(function(e,t){var n=t.payload,a=function(e){var t=e.reduce((function(e,t){var n=t.characterName,a=t.tags,i=e.characNames.findIndex((function(e){return e.name===n}));return-1===i?e.characNames.push({name:n,amount:1}):e.characNames[i].amount++,a&&a.length&&a.forEach((function(t){var n=e.tags.findIndex((function(e){return e.name===t}));-1===n?e.tags.push({name:t,amount:1}):e.tags[n].amount++})),e}),{tags:[],characNames:[]});return t.tags.sort((function(e,t){return e.name>t.name?1:-1})),t.characNames.sort((function(e,t){return e.name>t.name?1:-1})),t}(n),i=a.tags,r=a.characNames;e.list=n,e.pagination.activePage=0,e.pagination.total=n.length,e.tags=i,e.characNames=r,e.filters.characName=r.map((function(e){return e.name})).includes(e.filters.characName||"")?e.filters.characName:null,e.filters.tag=i.map((function(e){return e.name})).includes(e.filters.tag||"")?e.filters.tag:null})),e.addMatcher(fe,(function(e){e.isLoading=!0})),e.addMatcher(me,(function(e){e.isLoading=!1})),e.addMatcher(he,(function(e,t){e.isLoading=!1,e.error=t.payload}))}}),ge=pe.actions,Oe=ge.setMinifigsFilters,xe=ge.resetMinifigsFilters,ve=ge.setMinifigsPagination,ye=pe.reducer,we=function(e){return e.minifigs.list},ke=function(e){return{tags:e.minifigs.tags,characNames:e.minifigs.characNames}},Ce=function(e){return e.minifigs.filters},Se=function(e){return e.minifigs.pagination},Pe=function(e){return e.minifigs.isLoading},Ie=function(e){var t=e.minifigs.pagination,n=t.nbPerPage,a=t.activePage,i=ce(e.minifigs.list,e.minifigs.filters),r=a*n,c=r+n;return null===i||void 0===i?void 0:i.slice(r,c)},Ae=ye,Ne=n(268),Me=n(284),Te=n(254),Le=function(){var e=h(Se),t=m(),n=e.activePage,a=e.nbPerPage,i=e.total,c=Object(r.useCallback)((function(e){var t=e.from,n=e.to,r=e.count;return i<=a?"".concat(t," - ").concat(n):"".concat(t," - ").concat(n," of ").concat(r)}),[a,i]);return Object(G.jsx)(Te.a,{"data-testid":"minifigs-pagination",count:i,page:n,component:"div",labelRowsPerPage:"",SelectProps:{"aria-label":"Minifigs per page","data-testid":"minifigs-pagination-select"},rowsPerPageOptions:[{value:25,label:"25/page"},{value:50,label:"50/page"},{value:100,label:"100/page"},{value:200,label:"200/page"}],labelDisplayedRows:c,rowsPerPage:a,onPageChange:function(n,a){t(ve(Object(y.a)(Object(y.a)({},e),{},{activePage:a})))},onRowsPerPageChange:function(n){var a=parseInt(n.target.value,10);t(ve(Object(y.a)(Object(y.a)({},e),{},{nbPerPage:a,activePage:0})))},sx:{"& .MuiTablePagination-spacer":{display:"none",flex:"none"},"& .MuiTablePagination-toolbar":{justifyContent:"center"}}})},De=n(3),We=n(34),qe=n(271),ze=n(248),Ee=n(283),Fe=n(51),Re=n(266),Ve=n(5),Ue=Object(Ve.a)(Re.a)((function(e){var t=e.theme;return{margin:t.spacing(.5),borderRadius:"12px",height:"auto",padding:"".concat(t.spacing(.75)," 0"),maxWidth:"calc(100% - ".concat(t.spacing(1),")"),"& .MuiChip-label":{textOverflow:"ellipsis",overflow:"hidden",whiteSpace:"nowrap",display:"block"},"& .MuiChip-deleteIcon":{height:t.spacing(1.4),width:t.spacing(1.4)}}})),Be=function(e){var t=e.tags,n=e.characterName,a=h(Ce),i=m(),c=Object(r.useCallback)((function(e){i(Oe({characName:e}))}),[i]),o=Object(r.useCallback)((function(e){i(Oe({tag:e}))}),[i]);return Object(G.jsxs)(G.Fragment,{children:[Object(G.jsx)(Ue,{label:n,"data-testid":"character-name-chip",clickable:n!==a.characName,color:n===a.characName?"primary":"default",onClick:function(){return c(n)},onDelete:n===a.characName?function(){return c(null)}:void 0}),Array.isArray(t)&&t.length>0&&Object(G.jsx)(ze.a,{variant:"fullWidth"}),null===t||void 0===t?void 0:t.map((function(e){return Object(G.jsx)(Ue,{"data-testid":"tag-".concat(e,"-chip"),label:e,clickable:e!==a.tag,color:e===a.tag?"primary":"default",onClick:function(){return o(e)},onDelete:e===a.tag?function(){return o(null)}:void 0},"".concat(n,"-").concat(e))}))]})},He=n(138),Ze=n.n(He),Je=n(137),$e=n.n(Je),_e=n(280),Ge=n(282),Qe=n(251),Xe=n(277),Ye=n(249),Ke=n(267),et=n(278),tt=n(258),nt=["value","label","options","row"],at=c.a.forwardRef((function(e,t){var n=e.value,a=e.label,i=e.options,r=e.row,c=Object(We.a)(e,nt);return Object(G.jsxs)(Xe.a,{children:[Object(G.jsx)(Ye.a,{id:a,children:a}),Object(G.jsx)(Ke.a,Object(y.a)(Object(y.a)({ref:t,row:r,"aria-labelledby":a,name:a,value:n},c),{},{children:i.map((function(e){return Object(G.jsx)(et.a,{sx:{textTransform:"capitalize"},value:e,control:Object(G.jsx)(tt.a,{}),label:e},e)}))}))]})})),it=n(250),rt=n(262),ct=n(259),ot=Object(it.a)(),st=c.a.forwardRef((function(e,t){var n=e.label,a=e.value,i=e.options,c=e.multiple,o=e.creatable,s=e.placeholder,l=e.muiProps,u=e.onChange,d=Object(r.useState)(c?[]:null),j=Object(g.a)(d,2),b=j[0],f=j[1];Object(r.useEffect)((function(){var e=null;Array.isArray(a)&&c&&!o&&(e=i.filter((function(e){return a.includes(e.value)}))),Array.isArray(a)&&c&&o&&(e=a.map((function(e){return{value:e,label:e,added:!i.map((function(e){return e.value})).includes(e)}}))),!a||Array.isArray(a)||c||(void 0===(e=i.find((function(e){return e.value===a})))&&o&&(e={label:a,value:a,added:!0}),void 0!==e||o||(e=null)),f(e)}),[a,i,c,o]);var m=Object(r.useCallback)((function(e){f(e),Array.isArray(e)?u(e.map((function(e){return e.value}))):u(e?e.value:null)}),[f,u]);return Object(G.jsx)(rt.a,{id:n,multiple:!!c,options:i,autoHighlight:!0,freeSolo:!!o,openOnFocus:!0,value:b,filterOptions:function(e,t){var n=ot(e,t),a=t.inputValue.trim();return""===a||!o||(!Array.isArray(b)||b.find((function(e){return e.value===a}))||e.find((function(e){return e.value===a})))&&Array.isArray(b)||n.push({value:a,label:'Add "'.concat(a,'"'),added:!0}),n},getOptionLabel:function(e){return e.label},onChange:function(e,t){m(t)},renderInput:function(e){return Object(G.jsx)(ct.a,Object(y.a)(Object(y.a)({},e),{},{ref:t,variant:"outlined",label:n,placeholder:s,InputLabelProps:{shrink:!0}},l))}})})),lt=["muiProps"],ut=c.a.forwardRef((function(e,t){var n=e.muiProps,a=Object(We.a)(e,lt);return Object(G.jsx)(ct.a,Object(y.a)(Object(y.a)({variant:"outlined",ref:t,InputLabelProps:{shrink:!0}},n),a))})),dt=n(279),jt=c.a.forwardRef((function(e,t){var n=e.value,a=e.label,i=e.muiProps,r=e.onChange,c=Object(G.jsx)(dt.a,Object(y.a)(Object(y.a)({ref:t,checked:n,value:n,color:"primary"},i),{},{onChange:r}));return a?Object(G.jsx)(et.a,{control:c,labelPlacement:"start",label:a}):c})),bt=["type"],ft=["type"],mt=["type"],ht=["type"],pt=c.a.forwardRef((function(e,t){if("textfield"===e.type){e.type;var n=Object(We.a)(e,bt);return Object(G.jsx)(ut,Object(y.a)(Object(y.a)({},n),{},{ref:t}))}if("switch"===e.type){e.type;var a=Object(We.a)(e,ft);return Object(G.jsx)(jt,Object(y.a)(Object(y.a)({},a),{},{ref:t}))}if("autocomplete"===e.type){e.type;var i=Object(We.a)(e,mt);return Object(G.jsx)(st,Object(y.a)(Object(y.a)({},i),{},{ref:t}))}if("radiobuttons"===e.type){e.type;var r=Object(We.a)(e,ht);return Object(G.jsx)(at,Object(y.a)(Object(y.a)({},r),{},{ref:t}))}return Object(G.jsx)("span",{children:"Input not supported"})})),gt=n(281),Ot=n(28),xt=["isLoading","children","disabled"],vt=function(e){var t=e.isLoading,n=e.children,a=e.disabled,i=Object(We.a)(e,xt);return Object(G.jsxs)(Ne.a,Object(y.a)(Object(y.a)({disabled:a||t},i),{},{children:[n,t&&Object(G.jsx)(ae.a,{sx:{marginLeft:1},size:"1em",thickness:3})]}))},yt=function(e){var t=e.handleClose,n=e.editMinifigData,a=h(ke),i=a.tags,c=a.characNames,o=h(we),s=h(Pe),l=m(),u=Object(Ot.b)({defaultValues:n||{id:"",name:"",characterName:"",tags:[],possessed:!1},mode:"onChange"}),d=u.control,j=u.reset,b=u.unregister,f=u.handleSubmit,p=u.formState.isValid,g=Object(r.useMemo)((function(){return(null===c||void 0===c?void 0:c.map((function(e){return{label:e.name,value:e.name}})))||[]}),[c]),O=Object(r.useMemo)((function(){return(null===i||void 0===i?void 0:i.map((function(e){return{label:e.name,value:e.name}})))||[]}),[i]),x=Object(r.useMemo)((function(){return(null===o||void 0===o?void 0:o.map((function(e){return e.id})))||[]}),[o]),v=function(){t(),j(),b()};return Object(G.jsx)(_e.a,{open:!0,onClose:v,"aria-labelledby":"minifig-form-dialog",maxWidth:"md",fullWidth:!0,children:Object(G.jsxs)("form",{onSubmit:f((function(e){return l(n?de(e):je(e))})),children:[Object(G.jsx)(Qe.a,{id:"minifig-form-dialog",children:n?"Edit ".concat(n.id):"Add a minifig"}),Object(G.jsx)(gt.a,{dividers:!0,children:Object(G.jsxs)(ne.a,{container:!0,direction:"column",spacing:2,children:[Object(G.jsx)(ne.a,{item:!0,xs:12,children:Object(G.jsx)(Ot.a,{name:"id",control:d,rules:{required:"This field is required",pattern:{value:/^sw[0-9]{4}[abcds]?$/,message:"This need to be a minifig reference (/^sw[0-9]{4}[abcds]?$/)"},validate:function(e){return!x.includes(e)||e===(null===n||void 0===n?void 0:n.id)||"This minifig already exists"}},render:function(e){var t,a=e.field,i=e.fieldState;return Object(G.jsx)(pt,Object(y.a)(Object(y.a)({},a),{},{label:"Id",placeholder:"Minifig id (ex: sw0001a)",type:"textfield",muiProps:{disabled:!!n,error:i.invalid,helperText:null===(t=i.error)||void 0===t?void 0:t.message,required:!0,fullWidth:!0}}))}})}),Object(G.jsx)(ne.a,{item:!0,xs:12,children:Object(G.jsx)(Ot.a,{name:"name",control:d,rules:{required:"This field is required"},render:function(e){var t,n=e.field,a=e.fieldState;return Object(G.jsx)(pt,Object(y.a)(Object(y.a)({},n),{},{label:"Name",placeholder:"Minifig name (ex: Battle Droid Tan with Back Plate)",type:"textfield",muiProps:{error:a.invalid,helperText:null===(t=a.error)||void 0===t?void 0:t.message,required:!0,fullWidth:!0}}))}})}),Object(G.jsx)(ne.a,{item:!0,xs:12,children:Object(G.jsx)(Ot.a,{name:"characterName",control:d,rules:{required:"This field is required"},render:function(e){var t,n=e.field,a=e.fieldState;return Object(G.jsx)(pt,Object(y.a)(Object(y.a)({},n),{},{label:"Character Name",placeholder:"Character name (ex: Battle Droid)",type:"autocomplete",creatable:!0,options:g,muiProps:{error:a.invalid,helperText:null===(t=a.error)||void 0===t?void 0:t.message,required:!0,fullWidth:!0}}))}})}),Object(G.jsx)(ne.a,{item:!0,xs:12,children:Object(G.jsx)(Ot.a,{name:"tags",control:d,render:function(e){var t=e.field;return Object(G.jsx)(pt,Object(y.a)(Object(y.a)({},t),{},{label:"Tags",placeholder:"Minifig tags (ex: Battle Droid, CIS, Droid)",type:"autocomplete",creatable:!0,options:O,multiple:!0,muiProps:{fullWidth:!0}}))}})}),Object(G.jsx)(ne.a,{item:!0,xs:12,children:Object(G.jsx)(Ot.a,{name:"possessed",control:d,render:function(e){var t=e.field;return Object(G.jsx)(pt,Object(y.a)(Object(y.a)({},t),{},{label:"Possessed",type:"switch"}))}})})]})}),Object(G.jsxs)(Ge.a,{children:[Object(G.jsx)(vt,{onClick:v,color:"primary",disabled:s,children:"Cancel"}),Object(G.jsx)(vt,{type:"submit",color:"primary",variant:"contained","aria-label":"Submit",disabled:!p,isLoading:s,children:"Submit"})]})]})})},wt=function(e){var t=e.possessed,n=e.id,a=O(),i=Object(g.a)(a,2),r=i[0],c=i[1],o=O(),s=Object(g.a)(o,2),l=s[0],u=s[1],d=h(Pe),j=m();return Object(G.jsxs)(ne.a,{container:!0,justifyContent:"space-evenly",alignItems:"center",sx:{paddingTop:.5},children:[Object(G.jsx)(Ee.a,{title:"Switch possession","aria-label":"Switch possession tooltip",children:Object(G.jsx)("span",{children:Object(G.jsx)(pt,{type:"switch",value:t,onChange:function(){return j(ue(n))},muiProps:{disabled:d}})})}),Object(G.jsx)(Ee.a,{title:"Edit","aria-label":"Edit tooltip",children:Object(G.jsx)(B.a,{onClick:function(){return c()},"arial-label":"edit",children:Object(G.jsx)($e.a,{})})}),r&&Object(G.jsx)(yt,{handleClose:function(){return c()},editMinifigData:e}),Object(G.jsx)(Ee.a,{title:"Delete","aria-label":"Delete tooltip",children:Object(G.jsx)(B.a,{disabled:d,"aria-label":"delete",onClick:function(){return u()},children:Object(G.jsx)(Ze.a,{})})}),l&&Object(G.jsxs)(_e.a,{open:!0,onClose:function(){return u()},"aria-labelledby":"minifig-delete-dialog",maxWidth:"md",children:[Object(G.jsx)(Qe.a,{id:"minifig-delete-dialog",children:"Are you sure you want to delete ".concat(n,"?")}),Object(G.jsxs)(Ge.a,{children:[Object(G.jsx)(vt,{onClick:function(){return u()},color:"primary",disabled:d,children:"Cancel"}),Object(G.jsx)(vt,{type:"submit",color:"secondary",variant:"contained",isLoading:d,onClick:function(){return j(be(n))},children:"Confirm"})]})]})]})},kt=n.p+"static/media/brickset.cdd8ff5b.png",Ct=n.p+"static/media/bricklink.7488f58e.png",St=function(e){var t=e.bricklink,n=e.minifig,a=e.id,i=Object(r.useMemo)((function(){return t?"https://www.bricklink.com/v2/catalog/catalogitem.page?".concat(n?"M":"S","=").concat(a):"https://brickset.com/".concat(n?"minifigs":"sets","/").concat(a)}),[t,n,a]);return Object(G.jsx)(B.a,{href:i,sx:{"& img":{height:"2rem",width:"2rem"},margin:.5,padding:.7},children:Object(G.jsx)("img",{alt:t?"bricklink-logo":"brickset-logo",src:t?Ct:kt})})},Pt=["className"],It=Object(Ve.a)("img")((function(){return{width:"auto",maxWidth:"90%",maxHeight:"100%"}})),At=Object(Ve.a)((function(e){var t=e.className,n=Object(We.a)(e,Pt);return Object(G.jsx)(Ee.a,Object(y.a)(Object(y.a)({},n),{},{classes:{popper:t}}))}))(Object(De.a)({},"& .".concat(Fe.a.tooltip),{maxWidth:"15em",textAlign:"center"})),Nt=function(e){var t=e.id,n=e.characterName,a=e.name,i=e.tags;return Object(G.jsx)(qe.a,{sx:{display:"flex",textAlign:"center",margin:1,padding:.5,boxSizing:"border-box",height:function(e){return"calc(100% - ".concat(e.spacing(1),")")},width:function(e){return"calc(100% - ".concat(e.spacing(1),")")}},children:Object(G.jsxs)(ne.a,{container:!0,direction:"column",justifyContent:"space-between",children:[Object(G.jsx)(ne.a,{item:!0,children:Object(G.jsx)(At,{title:a,children:Object(G.jsx)(It,{src:"https://img.bricklink.com/ItemImage/MN/0/".concat(t,".png"),alt:"".concat(t,"-bricklink-png")})})}),Object(G.jsxs)(ne.a,{item:!0,sx:{width:1,"& .MuiDivider-root":{width:function(e){return"calc(100% + ".concat(e.spacing(1),")")},marginLeft:-.5}},children:[Object(G.jsx)(d.a,{sx:{textTransform:"uppercase"},children:t}),Object(G.jsx)(ze.a,{variant:"fullWidth"}),Object(G.jsx)(Be,{characterName:n,tags:i}),Object(G.jsx)(ze.a,{variant:"fullWidth"}),Object(G.jsx)(St,{id:t,bricklink:!0,minifig:!0}),Object(G.jsx)(St,{id:t,brickset:!0,minifig:!0}),Object(G.jsx)(ze.a,{variant:"fullWidth"}),Object(G.jsx)(wt,Object(y.a)({},e))]})]})})},Mt=Nt,Tt=function(){var e=h(Ie),t=m();return Array.isArray(e)?0===e.length?Object(G.jsxs)(ne.a,{container:!0,justifyContent:"center",direction:"column",alignItems:"center",sx:{marginTop:2},children:[Object(G.jsx)(d.a,{align:"center",variant:"h6",children:"There are no minifigs with those filters"}),Object(G.jsx)(Ne.a,{variant:"contained",onClick:function(){return t(xe())},children:"Reset filters"})]}):Object(G.jsxs)(Me.a,{sx:{marginX:2},children:[Object(G.jsx)(Le,{}),Object(G.jsx)(ne.a,{container:!0,spacing:2,children:e.map((function(e){return Object(G.jsx)(ne.a,{item:!0,xs:6,sm:4,md:3,lg:2,children:Object(G.jsx)(Mt,Object(y.a)({},e))},e.id)}))}),Object(G.jsx)(Le,{})]}):null},Lt=n(90),Dt=n.n(Lt),Wt=function(){var e=h(ke),t=e.tags,n=e.characNames,a=m(),i=h(Ce),c=p(i),o=Object(Ot.b)({defaultValues:i}),s=o.control,l=o.reset,u=Object(Ot.c)({control:s,defaultValue:i}),d=p(u);Object(r.useEffect)((function(){Dt()(i,u)||Dt()(d,u)||a(Oe(u))}),[a,u,d,i]),Object(r.useEffect)((function(){Dt()(i,c)||Dt()(i,u)||l(i)}),[i,c,u,l]);var j=Object(r.useMemo)((function(){return(null===n||void 0===n?void 0:n.map((function(e){return{label:"".concat(e.name," (").concat(e.amount,")"),value:e.name}})))||[]}),[n]),b=Object(r.useMemo)((function(){return(null===t||void 0===t?void 0:t.map((function(e){return{label:"".concat(e.name," (").concat(e.amount,")"),value:e.name}})))||[]}),[t]);return Object(G.jsxs)(ne.a,{container:!0,direction:"column",spacing:2,children:[Object(G.jsx)(ne.a,{item:!0,children:Object(G.jsx)(Ot.a,{name:"show",control:s,render:function(e){var t=e.field;return Object(G.jsx)(pt,Object(y.a)(Object(y.a)({},t),{},{label:"Show",type:"radiobuttons",row:!0,options:["all","owned","missing"]}))}})}),Object(G.jsx)(ne.a,{item:!0,children:Object(G.jsx)(Ot.a,{name:"characName",control:s,render:function(e){var t=e.field;return Object(G.jsx)(pt,Object(y.a)(Object(y.a)({},t),{},{label:"Character Name",type:"autocomplete",placeholder:"Filter by character name",options:j}))}})}),Object(G.jsx)(ne.a,{item:!0,children:Object(G.jsx)(Ot.a,{name:"tag",control:s,render:function(e){var t=e.field;return Object(G.jsx)(pt,Object(y.a)(Object(y.a)({},t),{},{label:"Tag",type:"autocomplete",placeholder:"Filter by tag",options:b}))}})})]})},qt=n(139),zt=n.n(qt),Et=n(140),Ft=n.n(Et),Rt=function(){var e=O(!1),t=Object(g.a)(e,2),n=t[0],a=t[1],i=h(we),r=function(e){var t=e.length,n=e.filter((function(e){return e.possessed})).length;return{totalNumber:t,numberOwned:n,percentageOwned:Math.round(n/t*1e4)/100}}(i||[]),c=r.totalNumber,o=r.numberOwned,s=r.percentageOwned;return Object(G.jsxs)(ne.a,{container:!0,direction:"column",rowSpacing:3,children:[Object(G.jsx)(ne.a,{item:!0,children:Object(G.jsx)(d.a,{align:"center",variant:"h6",sx:{marginBottom:1.5},children:"You owned ".concat(o," of the ").concat(c," minifigs in our database (").concat(s,"%)")})}),Object(G.jsx)(ze.a,{}),Object(G.jsx)(ne.a,{item:!0,children:Object(G.jsxs)(ne.a,{container:!0,justifyContent:"space-evenly",children:[Object(G.jsx)(Ne.a,{variant:"contained",color:"primary",onClick:function(){return a()},endIcon:Object(G.jsx)(zt.a,{}),children:"Add a minifig"}),n&&Object(G.jsx)(yt,{handleClose:function(){return a(!1)}}),Object(G.jsx)(Ne.a,{variant:"contained",color:"primary",endIcon:Object(G.jsx)(Ft.a,{}),href:"data:text/json;charset=utf-8,".concat(encodeURIComponent(JSON.stringify(i))),download:"minifigsList.json",target:"_blank",rel:"noopener noreferrer",children:"Download minifigs"})]})})]})},Vt=Object(Ve.a)(qe.a)((function(e){var t=e.theme;return{padding:t.spacing(2),margin:t.spacing(2),boxSizing:"border-box",minHeight:"calc(100% - ".concat(t.spacing(4),")")}})),Ut=function(){return Object(G.jsxs)(ne.a,{container:!0,children:[Object(G.jsx)(ne.a,{item:!0,xs:12,md:6,children:Object(G.jsx)(Vt,{children:Object(G.jsx)(Rt,{})})}),Object(G.jsx)(ne.a,{item:!0,xs:12,md:6,children:Object(G.jsx)(Vt,{children:Object(G.jsx)(Wt,{})})})]})},Bt=function(){var e=m(),t=h(we),n=h(Pe);return Object(r.useEffect)((function(){!t&&e(le())}),[t,e]),!Array.isArray(t)&&n?Object(G.jsx)(ie,{}):Object(G.jsxs)(Me.a,{children:[Object(G.jsx)(Ut,{}),Object(G.jsx)(Tt,{})]})},Ht=n(285),Zt=n(141),Jt=n.n(Zt),$t=n(142),_t=n.n($t),Gt=function(){var e=O(),t=Object(g.a)(e,2),n=t[0],a=t[1],i=m(),r=h(E),c=Object(Ot.b)({defaultValues:{email:"",password:""},mode:"onChange"}),o=c.control,s=c.handleSubmit,l=c.formState.isValid;return Object(G.jsx)(qe.a,{component:"form",onSubmit:s((function(e){return i(N(e))})),sx:{padding:2,margin:2,boxSizing:"border-box",minHeight:function(e){return"calc(100% - ".concat(e.spacing(4),")")}},children:Object(G.jsxs)(ne.a,{container:!0,justifyContent:"center",spacing:2,children:[Object(G.jsx)(ne.a,{item:!0,xs:12,children:Object(G.jsx)(Ot.a,{name:"email",control:o,rules:{required:"This field is required",pattern:{value:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,message:"This need to be a valid email"}},render:function(e){var t,n=e.field,a=e.fieldState;return Object(G.jsx)(pt,Object(y.a)(Object(y.a)({},n),{},{label:"Email",id:"email",placeholder:"Email@exemple.com",type:"textfield",muiProps:{error:a.invalid,helperText:null===(t=a.error)||void 0===t?void 0:t.message,required:!0,fullWidth:!0}}))}})}),Object(G.jsx)(ne.a,{item:!0,xs:12,children:Object(G.jsx)(Ot.a,{name:"password",control:o,rules:{required:"This field is required"},render:function(e){var t,i=e.field,r=e.fieldState;return Object(G.jsx)(pt,Object(y.a)(Object(y.a)({},i),{},{label:"Password",id:"password",type:"textfield",muiProps:{error:r.invalid,helperText:null===(t=r.error)||void 0===t?void 0:t.message,required:!0,fullWidth:!0,type:n?"text":"password",InputProps:{endAdornment:Object(G.jsx)(Ht.a,{position:"end",children:Object(G.jsx)(B.a,{"aria-label":"toggle password visibility",onClick:function(){return a()},onMouseDown:function(e){return e.preventDefault()},children:n?Object(G.jsx)(Jt.a,{}):Object(G.jsx)(_t.a,{})})})}}}))}})}),Object(G.jsx)(vt,{type:"submit",color:"primary",variant:"contained",disabled:!l,isLoading:r,children:"Submit"})]})})},Qt=Gt,Xt=function(){return Object(G.jsxs)(b.d,{children:[Object(G.jsx)(b.b,{path:"/minifigs",component:Bt}),Object(G.jsx)(b.b,{exact:!0,path:"/auth",component:Qt}),Object(G.jsx)(b.a,{to:"/minifigs"})]})},Yt=function(){var e=m();return Object(r.useEffect)((function(){e(M())}),[e]),Object(G.jsxs)(G.Fragment,{children:[Object(G.jsx)(te,{}),Object(G.jsx)(Xt,{})]})},Kt=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,286)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,r=t.getLCP,c=t.getTTFB;n(e),a(e),i(e),r(e),c(e)}))},en=function(e){var t=e.children;return Object(G.jsx)(b.c,{history:I,children:t})},tn=n(143),nn=n(269),an=n(252),rn=Object(tn.a)({spacing:function(e){return"".concat(.5*e,"em")},palette:{mode:"dark"}}),cn=function(e){var t=e.children;return Object(G.jsxs)(nn.a,{theme:rn,children:[Object(G.jsx)(an.a,{}),t]})},on=n(47),sn=Object(on.b)({minifigs:Ae,auth:U}),ln=Object(k.a)({reducer:sn,preloadedState:i,middleware:function(e){return e().concat(V)}}),un=function(e){var t=e.children;return Object(G.jsx)(f.a,{store:ln,children:t})},dn=function(e){var t=e.children;return Object(G.jsx)(en,{children:Object(G.jsx)(un,{children:Object(G.jsx)(cn,{children:t})})})};s.a.render(Object(G.jsx)(c.a.StrictMode,{children:Object(G.jsx)(dn,{children:Object(G.jsx)(Yt,{})})}),document.getElementById("root")),Kt()}},[[192,1,2]]]);
//# sourceMappingURL=main.00502abd.chunk.js.map
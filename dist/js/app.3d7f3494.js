(function(){"use strict";var t={6639:function(t,e,n){var o=n(9242),s=n(3396);function a(t,e){const n=(0,s.up)("router-link"),o=(0,s.up)("router-view");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("nav",null,[(0,s.Wm)(n,{to:"/"},{default:(0,s.w5)((()=>[(0,s.Uk)("Calculator")])),_:1})]),(0,s.Wm)(o)],64)}var r=n(89);const i={},l=(0,r.Z)(i,[["render",a]]);var c=l,u=n(2483);const d={key:0,style:{"font-size":"3em"}},m={key:1},p={class:"statement-components-list"};function h(t,e,n,o,a,r){const i=(0,s.up)("AddDataWindow"),l=(0,s.up)("StatementComponent"),c=(0,s.up)("ControlsBarComponent");return(0,s.wg)(),(0,s.iD)(s.HY,null,[r.hasPyodideLoaded?(0,s.kq)("",!0):((0,s.wg)(),(0,s.iD)("div",d,"Loading...")),r.hasPyodideLoaded?((0,s.wg)(),(0,s.iD)("div",m,[(0,s.Wm)(i,{onNewStatementAdded:r.pushStatement},null,8,["onNewStatementAdded"]),(0,s._)("div",p,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(r.getStatements,(t=>((0,s.wg)(),(0,s.iD)("div",{class:"greeting",key:t.id},[(0,s.Wm)(l,{statement:t,workspace:a.workspace,onWorkspaceUpdate:r.updateWorkspace,onNewStatementAdded:r.pushStatement,onStatementDeleted:r.deleteStatement,onStatementUpdated:r.onStatementUpdated},null,8,["statement","workspace","onWorkspaceUpdate","onNewStatementAdded","onStatementDeleted","onStatementUpdated"])])))),128))]),(0,s.Wm)(c,{class:"cntls-bar-cmp",onWorkspaceUpdate:r.updateWorkspace},null,8,["onWorkspaceUpdate"])])):(0,s.kq)("",!0)],64)}n(7658);const w=t=>((0,s.dD)("data-v-615d46ce"),t=t(),(0,s.Cn)(),t),g={class:"bottom-bar"},f=w((()=>(0,s._)("div",{class:"frmt-as-cbc-text"}," Format as: ",-1)));function v(t,e,n,o,a,r){return(0,s.wg)(),(0,s.iD)("div",g,[(0,s._)("button",{class:"btn",onClick:e[0]||(e[0]=t=>r.setOpenDataWindow(!0))},"Add data"),(0,s._)("button",{class:"btn",onClick:e[1]||(e[1]=(...t)=>r.clearWorkspace&&r.clearWorkspace(...t))},"Deselect"),f,(0,s._)("button",{class:"btn",onClick:e[2]||(e[2]=t=>this.$store.state.formatStyle=0)},"Long Float"),(0,s._)("button",{class:"btn",onClick:e[3]||(e[3]=t=>this.$store.state.formatStyle=1)},"Fraction")])}var y={name:"ControlsBarComponent",methods:{setOpenDataWindow(t){this.$store.commit("setOpenDataWindow",t)},clearWorkspace(){this.$emit("workspaceUpdate",[])}},emits:["workspaceUpdate"]};const b=(0,r.Z)(y,[["render",v],["__scopeId","data-v-615d46ce"]]);var k=b;const x=t=>((0,s.dD)("data-v-68243fb2"),t=t(),(0,s.Cn)(),t),S={key:0,class:"floating-window"},A=x((()=>(0,s._)("div",{class:"message"},[(0,s.Uk)(' Vicalial uses Python to evaluate mathematical expressions. Please use Python syntax when writing an expression. For example, if you want to write "sum of two and two in a power of three", write "(2 + 2)**3". To define a matrix, separate elements on a line with "," and move to a new line to define a new matrix line. For example: '),(0,s._)("br"),(0,s._)("br"),(0,s._)("code",null,[(0,s.Uk)("1, 2, 1/3"),(0,s._)("br"),(0,s.Uk)("5.5, 7, 6"),(0,s._)("br"),(0,s.Uk)("4, 5, -10")])],-1))),C={class:"buttons"};function N(t,e,n,a,r,i){return i.isOpenAddDataWindow?((0,s.wg)(),(0,s.iD)("div",S,[A,(0,s.wy)((0,s._)("textarea",{class:"txt-box","onUpdate:modelValue":e[0]||(e[0]=t=>r.textValue=t)},null,512),[[o.nr,r.textValue]]),(0,s._)("div",C,[(0,s._)("button",{class:"btn confirm",onClick:e[1]||(e[1]=(...t)=>i.addNewMatrixAndCloserWindow&&i.addNewMatrixAndCloserWindow(...t))},"Confirm"),(0,s._)("button",{class:"btn cancel",onClick:e[2]||(e[2]=t=>i.setOpenDataWindow(!1))},"Cancel")])])):(0,s.kq)("",!0)}class D extends Error{}var _=n(4870);async function O(){const t=await window.loadPyodide({indexURL:"https://cdn.jsdelivr.net/pyodide/dev/full/"});return await t.loadPackage("numpy"),await t.loadPackage("sympy"),t.runPython("import numpy \nimport sympy \n"),t}let E;const M=(0,_.qj)({hasLoaded:!1});O().then((t=>{E=t,M.hasLoaded=!0}));var $=n(7327);class L{constructor(t){(0,$.Z)(this,"rowsAmount",void 0),(0,$.Z)(this,"columnsAmount",void 0),(0,$.Z)(this,"asList2D",void 0),(0,$.Z)(this,"asList2DFractions",void 0),this.rowsAmount=t.length,this.columnsAmount=t[0].length;const e=this;t.map((function(t){if(t.length!==e.columnsAmount)throw new D("Matrix has inconsistent amount of elements in rows");return t.forEach((function(t){if(isNaN(Number(t)))throw new D("Matrix has non-numeric elements")}))})),this.asList2D=t,this.asList2DFractions=t.map((t=>t.map((t=>{E.globals.set("x",t),E.runPython("result = sympy.Rational(x).limit_denominator()");const e=E.globals.get("result").toJs();return{numerator:e.numerator,denominator:e.denominator}}))))}getName(){return"unnamed"}getRelative(){return""}groupSelectionByRow(t){const e=new Map;return t.slice().sort((function(t,e){return t.row-e.row!==0?t.row-e.row:t.col-e.col})).forEach((({row:t,col:n})=>{const o=e.get(t);void 0===o?e.set(t,new Array({row:t,col:n})):(o.push({row:t,col:n}),e.set(t,o))})),e}setElementsBySelection(t,e){const n=this.groupSelectionByRow(t),o=Array.from(n.values());if(o.map((t=>t.length!==e.columnsAmount)).reduce(((t,e)=>t||e))||o.length!==e.rowsAmount)throw new Error("Dimension of matrix to replace doesn't match with dimensions of matrix to be replaced with.");const s=this.copy();return o.forEach(((t,n)=>{t.forEach(((t,o)=>{s.asList2D[t.row][t.col]=e.asList2D[n][o]}))})),new L(s.asList2D)}toString(){let t="";return this.asList2D.forEach(((e,n)=>{let o="";e.forEach(((t,e)=>{o+=t,e<this.columnsAmount-1&&(o+=",")})),t+=o,n<this.rowsAmount-1&&(t+=";")})),t}copy(){const t=this.asList2D.map((t=>t.slice()));return new L(t)}}let R=0;class W extends L{constructor(t,e=undefined){super(t),(0,$.Z)(this,"id",void 0),(0,$.Z)(this,"name",void 0),this.id=R,R++,this.name=void 0===e?"object "+this.id:e}getName(){return this.name}getRelative(){return""}changeNameUnsafe(t){this.name=t}}class F extends W{constructor(t,e){super(q(t,e)),(0,$.Z)(this,"parentLeft",void 0),(0,$.Z)(this,"parentRight",void 0),this.parentLeft=t,this.parentRight=e}getRelative(){return this.parentLeft.getName()+" + "+this.parentRight.getName()}}class U extends W{constructor(t,e){super(Y(t,e)),(0,$.Z)(this,"parentLeft",void 0),(0,$.Z)(this,"parentRight",void 0),this.parentLeft=t,this.parentRight=e}getRelative(){return this.parentLeft.getName()+" - "+this.parentRight.getName()}}class I extends W{constructor(t,e){super(z(t,e)),(0,$.Z)(this,"parentLeft",void 0),(0,$.Z)(this,"parentRight",void 0),this.parentLeft=t,this.parentRight=e}getRelative(){return this.parentLeft.getName()+" * "+this.parentRight.getName()}}class T extends W{constructor(t){super(V(t)),(0,$.Z)(this,"parent",void 0),this.parent=t}getRelative(){return"transposed "+this.parent.getName()}}class P extends W{constructor(t){super(J(t)),(0,$.Z)(this,"parent",void 0),this.parent=t}getRelative(){return this.parent.getName()+"^-1"}}class Z extends W{constructor(t,e){super(K(t,e)),(0,$.Z)(this,"parentLeft",void 0),(0,$.Z)(this,"parentRight",void 0),this.parentLeft=t,this.parentRight=e}getRelative(){return this.parentLeft.getName()+" .* "+this.parentRight.getName()}}class B extends W{constructor(t,e){super(G(t,e)),(0,$.Z)(this,"parent",void 0),(0,$.Z)(this,"selection",void 0),this.parent=t,this.selection=e}getRelative(){return this.parent.getName()+""+this.describeSelection()}describeSelection(){if(this.selection.filter((t=>t.col===this.selection[0].col)).length===this.selection.length){if(this.selection.length===this.parent.rowsAmount)return"[]:, "+this.selection[0].col+"]";{let t=Number.MAX_SAFE_INTEGER,e=Number.MIN_SAFE_INTEGER;return this.selection.forEach((n=>{n.row<t&&(t=n.row),n.row>e&&(e=n.row)})),"["+t+":"+e+", "+this.selection[0].col+"]"}}if(this.selection.filter((t=>t.row===this.selection[0].row)).length===this.selection.length){if(this.selection.length===this.parent.columnsAmount)return"["+this.selection[0].row+", :]";{let t=Number.MAX_SAFE_INTEGER,e=Number.MIN_SAFE_INTEGER;return this.selection.forEach((n=>{n.col<t&&(t=n.col),n.col>e&&(e=n.col)})),"["+this.selection[0].col+", "+t+":"+e+"]"}}{let t="[";return this.selection.forEach((e=>{t+="("+e.row+", "+e.col+")"})),t+"]"}}getName(){return this.getRelative()}}function j(t){const e=/^[0-9+\-*/^().\s]+$/,n=e.test(t);if(!n)throw new D("Mathematical expression is unsafe.");return E.runPython(t)}function H(t,e){switch(t){case 0:{const t=new B(e[0].parent,e[0].selected),n=new B(e[1].parent,e[1].selected);return[new F(t,n)]}case 1:{const t=new B(e[0].parent,e[0].selected),n=new B(e[1].parent,e[1].selected);return[new U(t,n)]}case 2:{const t=new B(e[0].parent,e[0].selected),n=new B(e[1].parent,e[1].selected);return[new I(t,n)]}case 3:{const t=new B(e[0].parent,e[0].selected);return[new T(t)]}case 4:{const t=new B(e[0].parent,e[0].selected);return[new P(t)]}case 5:{const t=new B(e[1].parent,e[1].selected),n=e[0].parent.setElementsBySelection(e[0].selected,t);return[new W(n.asList2D)]}case 6:{const t=new B(e[0].parent,e[0].selected),n=new B(e[1].parent,e[1].selected),o=[e[0].parent.setElementsBySelection(e[0].selected,n)];return e[0].parent.id!==e[1].parent.id?o.push(e[1].parent.setElementsBySelection(e[1].selected,t)):o[0]=o[0].setElementsBySelection(e[1].selected,t),o.map((t=>new W(t.asList2D)))}case 7:break;case 8:break;case 9:{const t=new B(e[0].parent,e[0].selected);return[new W([[t.rowsAmount,t.columnsAmount]])]}case 10:{const t=e.reduce(((t,e)=>t.parent.id===e.parent.id?{parentId:t.parent.id,parent:t.parent,selected:t.selected.concat(e.selected)}:t)).selected;return[new B(e[0].parent,t)]}case 16:{const t=new B(e[0].parent,e[0].selected),n=new B(e[1].parent,e[1].selected);return[new Z(t,n)]}}throw new Error("This operation is not implemented yet.")}function q(t,e){return E.globals.set("x",t.toString()),E.globals.set("y",e.toString()),E.runPython("mx = numpy.matrix(x) \nmy = numpy.matrix(y) \nresult = numpy.add(mx, my).tolist()"),E.globals.get("result").toJs()}function Y(t,e){return E.globals.set("x",t.toString()),E.globals.set("y",e.toString()),E.runPython("mx = numpy.matrix(x) \nmy = numpy.matrix(y) \nresult = numpy.subtract(mx, my).tolist()"),E.globals.get("result").toJs()}function z(t,e){return E.globals.set("x",t.toString()),E.globals.set("y",e.toString()),E.runPython("mx = numpy.matrix(x) \nmy = numpy.matrix(y) \nresult =  numpy.matmul(mx, my).tolist()"),E.globals.get("result").toJs()}function K(t,e){return E.globals.set("x",t.toString()),E.globals.set("y",e.toString()),E.runPython("mx = numpy.matrix(x) \nmy = numpy.matrix(y) \nresult = numpy.multiply(mx, my).tolist()"),E.globals.get("result").toJs()}function V(t){return E.globals.set("x",t.toString()),E.runPython("mx = numpy.matrix(x) \nresult = numpy.transpose(mx).tolist()"),E.globals.get("result").toJs()}function J(t){return E.globals.set("x",t.toString()),E.runPython("mx = numpy.matrix(x) \nresult = numpy.linalg.inv(mx).tolist()"),E.globals.get("result").toJs()}function G(t,e){const n=t.groupSelectionByRow(e);return Array.from(n.values()).map((e=>e.map((({row:e,col:n})=>t.asList2D[e][n]))))}var X={name:"AddDataWindow",computed:{isOpenAddDataWindow(){return this.$store.state.isOpenAddDataWindow}},methods:{setOpenDataWindow(t){this.$store.commit("setOpenDataWindow",t)},addNewMatrixAndCloserWindow(){try{const t=this.$data.textValue.split("\n").map((t=>t.split(",").map((t=>j(t))))),e=new W(t);this.$emit("newStatementAdded",e),this.setOpenDataWindow(!1)}catch(t){if(!(t instanceof D))throw t;this.$data.textValue="temp: "+t.message}}},data(){return{textValue:""}},emits:["newStatementAdded"]};const Q=(0,r.Z)(X,[["render",N],["__scopeId","data-v-68243fb2"]]);var tt=Q,et=n(7139);const nt={class:"holder"},ot={class:"stt"},st={ref:"matrix",class:"matrix"},at=["onClick","onMouseover"],rt=["onClick","onMouseover"],it={class:"hld"},lt=["onClick","onMouseover"];function ct(t,e,n,o,a,r){const i=(0,s.up)("FunctionChoiceComponent");return(0,s.wg)(),(0,s.iD)("div",nt,[(0,s._)("button",{class:"st-cmp-del-button",onClick:e[0]||(e[0]=(...t)=>r.deleteStatementAndWorkspaceEntries&&r.deleteStatementAndWorkspaceEntries(...t))},"✖"),(0,s._)("div",ot,[(0,s._)("div",{contenteditable:"true",onInput:e[1]||(e[1]=(...t)=>r.onStatementNameEdit&&r.onStatementNameEdit(...t))},(0,et.zw)(n.statement.name),33),(0,s.Uk)(" = "),(0,s._)("div",null,(0,et.zw)(n.statement.getRelative()),1)]),(0,s._)("table",st,[(0,s._)("tr",null,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(n.statement.columnsAmount,(t=>((0,s.wg)(),(0,s.iD)("th",{key:t},[(0,s._)("button",{class:"row-col-selector-btn",onClick:e=>r.onColButtonClick(t-1),onMouseover:e=>r.onColMouseOver(t-1),onMouseout:e[2]||(e[2]=t=>r.onColMouseOut())},"⏺",40,at)])))),128)),(0,s._)("th",null,[(0,s._)("button",{class:"row-col-selector-btn",onClick:e[3]||(e[3]=t=>r.onAllButtonClick()),onMouseover:e[4]||(e[4]=t=>r.onAllMouseOver()),onMouseout:e[5]||(e[5]=t=>r.onAllMouseOut())},"◼",32)])]),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(r.getMatrixAccordingToFormatter(),((t,o)=>((0,s.wg)(),(0,s.iD)("tr",{key:o},[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(t,((t,a)=>((0,s.wg)(),(0,s.iD)("td",{style:(0,et.j5)(r.cellStyle(o,a)),key:o*n.statement.columnsAmount+a,onClick:t=>r.onSingleMouseClick(o,a),onMouseover:t=>r.onSingleMouseOver(o,a),onMouseout:e[6]||(e[6]=t=>r.onSingleMouseOut())},[(0,s._)("div",it,(0,et.zw)(t),1)],44,rt)))),128)),(0,s._)("td",null,[(0,s._)("button",{class:"row-col-selector-btn",onClick:t=>r.onRowButtonClick(o),onMouseover:t=>r.onRowMouseOver(o),onMouseout:e[7]||(e[7]=t=>r.onRowMouseOut())},"⏺",40,lt)])])))),128))],512),0!==n.workspace.filter((t=>t.parent.id===n.statement.id)).length?((0,s.wg)(),(0,s.j4)(i,{key:0,workspace:n.workspace,onNewStatementAdded:r.newStatementAdded,onWorkspaceUpdate:r.onWorkspaceUpdate},null,8,["workspace","onNewStatementAdded","onWorkspaceUpdate"])):(0,s.kq)("",!0)])}const ut={class:"tabs"},dt={class:"tab-buttons"},mt=["onClick"],pt={class:"tab-contents"},ht={class:"function-buttons"},wt=["onClick"],gt={key:0,class:"fun-arg-sel"},ft={class:"function-arguments"};function vt(t,e,n,a,r,i){return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s._)("div",ut,[(0,s._)("div",dt,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(i.tabs,((t,e)=>((0,s.wg)(),(0,s.iD)("button",{key:e,onClick:t=>r.activeTabIndex=e,class:(0,et.C_)({active:e===r.activeTabIndex})},(0,et.zw)(t.title),11,mt)))),128))]),(0,s._)("div",pt,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(i.tabs,((t,e)=>(0,s.wy)(((0,s.wg)(),(0,s.iD)("div",{key:e,class:(0,et.C_)({active:e===r.activeTabIndex})},[(0,s._)("div",ht,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(t.content,((t,e)=>((0,s.wg)(),(0,s.iD)("button",{class:"function-button",key:e,onClick:e=>r.activeFunctionChoiceIndex=t.id},(0,et.zw)(t.name),9,wt)))),128))])],2)),[[o.F8,i.isTabActive(e)]]))),128))])]),-1!==r.activeFunctionChoiceIndex?((0,s.wg)(),(0,s.iD)("div",gt,[(0,s._)("h3",null,(0,et.zw)(r.allFunctions.find((t=>t.id===r.activeFunctionChoiceIndex)).name)+":",1),(0,s._)("div",ft,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(Array.from({length:r.allFunctions.find((t=>t.id===r.activeFunctionChoiceIndex)).argNum},((t,e)=>e)),(t=>((0,s.wg)(),(0,s.iD)("div",{key:t},(0,et.zw)(this.pullFromWorkspace(t))+", ",1)))),128))]),(0,s.wy)((0,s._)("button",{onClick:e[0]||(e[0]=t=>i.runFunction()),class:"apply-button"},"Apply",512),[[o.F8,r.allFunctions.find((t=>t.id===r.activeFunctionChoiceIndex)).argNum<=n.workspace.length]])])):(0,s.kq)("",!0)],64)}var yt={name:"FunctionChoiceComponent",props:{workspace:{require:!0,type:Array}},methods:{pullFromWorkspace(t){return t<this.$props.workspace.length?"s"+t:"-"},runFunction(){H(this.$data.activeFunctionChoiceIndex,this.$props.workspace).forEach((t=>{this.$store.commit("incrementLastObjectId"),this.$emit("newStatementAdded",t)})),this.$emit("workspaceUpdate",[])}},data(){return{activeTabIndex:0,activeFunctionChoiceIndex:-1,allFunctions:[{id:0,shorthand:"+",name:"Addition",argNum:2},{id:1,shorthand:"-",name:"Subtraction",argNum:2},{id:2,shorthand:"*",name:"Multiplication",argNum:2},{id:3,shorthand:"T",name:"Transposition",argNum:1},{id:4,shorthand:"^-1",name:"Inversion",argNum:1},{id:5,shorthand:"+",name:"Replace",argNum:2},{id:6,shorthand:"-",name:"Swap",argNum:2},{id:7,shorthand:"*",name:"Map",argNum:2},{id:8,shorthand:"T",name:"Fold",argNum:2},{id:9,shorthand:"^-1",name:"Size",argNum:1},{id:10,shorthand:"+",name:"Selection",argNum:0},{id:11,shorthand:"+",name:"Plot",argNum:1},{id:12,shorthand:"-",name:"Export LaTex",argNum:1},{id:13,shorthand:"*",name:"Export Excel",argNum:1},{id:14,shorthand:"T",name:"Export .txt",argNum:1},{id:15,shorthand:"^-1",name:"To Abstract",argNum:1},{id:16,shorthand:"*",name:"Element-wise product",argNum:2}]}},computed:{isTabActive(){return t=>t===this.activeTabIndex},tabs(){return[{title:"Math",content:this.allFunctions.filter((t=>-1!==new Array(0,1,2,3,4,16).findIndex((e=>e===t.id))))},{title:"Code",content:this.allFunctions.filter((t=>-1!==new Array(5,6,7,8,9,10).findIndex((e=>e===t.id))))},{title:"Other",content:this.allFunctions.filter((t=>-1!==new Array(11,12,13,14,15).findIndex((e=>e===t.id))))}]}},emits:["newStatementAdded","workspaceUpdate"]};const bt=(0,r.Z)(yt,[["render",vt],["__scopeId","data-v-1875b86d"]]);var kt=bt,xt={name:"StatementComponent",data(){return{mouseoverRow:-1,mouseoverCol:-1,mouseoverAll:!1,mouseOverSingle:{row:-1,col:-1}}},components:{FunctionChoiceComponent:kt},methods:{onStatementNameEdit(){const t=event.target.value;this.statement.changeNameUnsafe(t),this.$emit("statementUpdated",this.statement)},deleteStatementAndWorkspaceEntries(){const t=this.$props.workspace.filter((t=>t.parentId!==this.statement.id));this.$emit("workspaceUpdate",t),this.$emit("statementDeleted",this.statement.id)},onWorkspaceUpdate(t){this.$emit("workspaceUpdate",t)},onRowButtonClick(t){console.log("Button clicked! ",t);for(var e=[],n=0;n<this.statement.columnsAmount;n++)e.push({row:t,col:n});const o=[...this.$props.workspace,{parent:this.statement,selected:e}];this.$emit("workspaceUpdate",o)},onRowMouseOver(t){this.$data.mouseoverRow=t},onRowMouseOut(){this.$data.mouseoverRow=-1},onColButtonClick(t){for(var e=[],n=0;n<this.statement.rowsAmount;n++)e.push({row:n,col:t});const o=[...this.$props.workspace,{parent:this.statement,selected:e}];this.$emit("workspaceUpdate",o)},onColMouseOver(t){this.$data.mouseoverCol=t},onColMouseOut(){this.$data.mouseoverCol=-1},onAllButtonClick(){for(var t=[],e=0;e<this.statement.rowsAmount;e++)for(var n=0;n<this.statement.columnsAmount;n++)t.push({row:e,col:n});const o=[...this.$props.workspace,{parent:this.statement,selected:t}];this.$emit("workspaceUpdate",o)},onAllMouseOver(){this.$data.mouseoverAll=!0},onAllMouseOut(){this.$data.mouseoverAll=!1},onSingleMouseClick(t,e){const n=[...this.$props.workspace,{parent:this.statement,selected:[{row:t,col:e}]}];this.$emit("workspaceUpdate",n)},onSingleMouseOver(t,e){this.$data.mouseOverSingle={row:t,col:e}},onSingleMouseOut(){this.$data.mouseOverSingle={row:-1,col:-1}},newStatementAdded(t){this.$emit("newStatementAdded",t)}},computed:{cellStyle(){return(t,e)=>this.mouseoverRow===t||this.mouseoverCol==e||this.mouseoverAll||this.mouseOverSingle.row===t&&this.mouseOverSingle.col===e?{backgroundColor:"grey",border:"1px solid grey"}:0!==this.$props.workspace.filter((t=>t.parent.id===this.statement.id)).filter((n=>0!==n.selected.filter((n=>n.row===t&&n.col===e)).length)).length?{backgroundColor:"white",border:"1px solid black"}:{backgroundColor:"white",border:"1px solid white"}},getMatrixAccordingToFormatter(){return()=>0===this.$store.state.formatStyle?this.statement.asList2D:1===this.$store.state.formatStyle?this.statement.asList2DFractions.map((t=>t.map((t=>1===t.denominator?t.numerator:t.numerator+"/"+t.denominator)))):this.statement.asList2D}},props:{statement:{required:!0},workspace:{type:Array,required:!0}},emits:["workspaceUpdate","newStatementAdded","statementDeleted","statementUpdated"]};const St=(0,r.Z)(xt,[["render",ct],["__scopeId","data-v-56665a16"]]);var At=St,Ct={name:"CalculatorView",components:{StatementComponent:At,ControlsBarComponent:k,AddDataWindow:tt},data(){return{statements:[],workspace:new Array}},computed:{getStatements(){return this.$data.statements},getWorkspace(){return this.$data.workspace},hasPyodideLoaded(){return M.hasLoaded}},methods:{pushStatement(t){this.$data.statements.push(t)},updateWorkspace(t){this.$data.workspace=t},deleteStatement(t){this.$data.statements=this.$data.statements.filter((e=>e.id!==t))},onStatementUpdated(t){this.$data.statements[this.$data.statements.findIndex((e=>e.id===t.id))]=t}}};const Nt=(0,r.Z)(Ct,[["render",h]]);var Dt=Nt;const _t=[{path:"/",name:"calculatorview",component:Dt},{path:"/about",name:"about",component:()=>n.e(443).then(n.bind(n,5494))},{path:"/style_guide.html",name:"style_guide.html",component:()=>n.e(443).then(n.bind(n,931))}],Ot=(0,u.p7)({history:(0,u.PO)("/~royako/iti0209/vicalial-vue/dist/"),routes:_t});var Et=Ot,Mt=n(65),$t=(0,Mt.MT)({state:{isOpenAddDataWindow:!1,lastObjectID:0,formatStyle:1},getters:{},mutations:{setOpenDataWindow(t,e){t.isOpenAddDataWindow=e},incrementLastObjectId(t){t.lastObjectID++}},actions:{},modules:{}}),Lt=(n(9773),n(8957)),Rt=n(1850),Wt=n(8600);const Ft=(0,Lt.Rd)({components:Rt,directives:Wt}),Ut=o.ri(c).use(Et).use(Ft).use($t);Ut.mount("#app")}},e={};function n(o){var s=e[o];if(void 0!==s)return s.exports;var a=e[o]={exports:{}};return t[o](a,a.exports,n),a.exports}n.m=t,function(){var t=[];n.O=function(e,o,s,a){if(!o){var r=1/0;for(u=0;u<t.length;u++){o=t[u][0],s=t[u][1],a=t[u][2];for(var i=!0,l=0;l<o.length;l++)(!1&a||r>=a)&&Object.keys(n.O).every((function(t){return n.O[t](o[l])}))?o.splice(l--,1):(i=!1,a<r&&(r=a));if(i){t.splice(u--,1);var c=s();void 0!==c&&(e=c)}}return e}a=a||0;for(var u=t.length;u>0&&t[u-1][2]>a;u--)t[u]=t[u-1];t[u]=[o,s,a]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var o in e)n.o(e,o)&&!n.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){n.f={},n.e=function(t){return Promise.all(Object.keys(n.f).reduce((function(e,o){return n.f[o](t,e),e}),[]))}}(),function(){n.u=function(t){return"js/about.6395e72a.js"}}(),function(){n.miniCssF=function(t){return"css/about.aebcb56b.css"}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={},e="vicalial-vue:";n.l=function(o,s,a,r){if(t[o])t[o].push(s);else{var i,l;if(void 0!==a)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var d=c[u];if(d.getAttribute("src")==o||d.getAttribute("data-webpack")==e+a){i=d;break}}i||(l=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,n.nc&&i.setAttribute("nonce",n.nc),i.setAttribute("data-webpack",e+a),i.src=o),t[o]=[s];var m=function(e,n){i.onerror=i.onload=null,clearTimeout(p);var s=t[o];if(delete t[o],i.parentNode&&i.parentNode.removeChild(i),s&&s.forEach((function(t){return t(n)})),e)return e(n)},p=setTimeout(m.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=m.bind(null,i.onerror),i.onload=m.bind(null,i.onload),l&&document.head.appendChild(i)}}}(),function(){n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){n.p="/~royako/iti0209/vicalial-vue/dist/"}(),function(){if("undefined"!==typeof document){var t=function(t,e,n,o,s){var a=document.createElement("link");a.rel="stylesheet",a.type="text/css";var r=function(n){if(a.onerror=a.onload=null,"load"===n.type)o();else{var r=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.href||e,l=new Error("Loading CSS chunk "+t+" failed.\n("+i+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=r,l.request=i,a.parentNode&&a.parentNode.removeChild(a),s(l)}};return a.onerror=a.onload=r,a.href=e,n?n.parentNode.insertBefore(a,n.nextSibling):document.head.appendChild(a),a},e=function(t,e){for(var n=document.getElementsByTagName("link"),o=0;o<n.length;o++){var s=n[o],a=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(a===t||a===e))return s}var r=document.getElementsByTagName("style");for(o=0;o<r.length;o++){s=r[o],a=s.getAttribute("data-href");if(a===t||a===e)return s}},o=function(o){return new Promise((function(s,a){var r=n.miniCssF(o),i=n.p+r;if(e(r,i))return s();t(o,i,null,s,a)}))},s={143:0};n.f.miniCss=function(t,e){var n={443:1};s[t]?e.push(s[t]):0!==s[t]&&n[t]&&e.push(s[t]=o(t).then((function(){s[t]=0}),(function(e){throw delete s[t],e})))}}}(),function(){var t={143:0};n.f.j=function(e,o){var s=n.o(t,e)?t[e]:void 0;if(0!==s)if(s)o.push(s[2]);else{var a=new Promise((function(n,o){s=t[e]=[n,o]}));o.push(s[2]=a);var r=n.p+n.u(e),i=new Error,l=function(o){if(n.o(t,e)&&(s=t[e],0!==s&&(t[e]=void 0),s)){var a=o&&("load"===o.type?"missing":o.type),r=o&&o.target&&o.target.src;i.message="Loading chunk "+e+" failed.\n("+a+": "+r+")",i.name="ChunkLoadError",i.type=a,i.request=r,s[1](i)}};n.l(r,l,"chunk-"+e,e)}},n.O.j=function(e){return 0===t[e]};var e=function(e,o){var s,a,r=o[0],i=o[1],l=o[2],c=0;if(r.some((function(e){return 0!==t[e]}))){for(s in i)n.o(i,s)&&(n.m[s]=i[s]);if(l)var u=l(n)}for(e&&e(o);c<r.length;c++)a=r[c],n.o(t,a)&&t[a]&&t[a][0](),t[a]=0;return n.O(u)},o=self["webpackChunkvicalial_vue"]=self["webpackChunkvicalial_vue"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=n.O(void 0,[998],(function(){return n(6639)}));o=n.O(o)})();
//# sourceMappingURL=app.3d7f3494.js.map
(function(a){if(typeof exports=="object"&&typeof module=="object"){a(require("../../lib/codemirror"))
}else{if(typeof define=="function"&&define.amd){define(["../../lib/codemirror"],a)
}else{a(CodeMirror)
}}})(function(a){a.defineMode("javascript",function(Y,ai){var k=Y.indentUnit;
var z=ai.statementIndent;
var ay=ai.jsonld;
var y=ai.json||ay;
var g=ai.typescript;
var ar=ai.wordCharacters||/[\w$\xa1-\uffff]/;
var ap=function(){function aO(aQ){return{type:aQ,style:"keyword"}
}var aJ=aO("keyword a"),aH=aO("keyword b"),aG=aO("keyword c");
var aI=aO("operator"),aM={type:"atom",style:"atom"};
var aK={"if":aO("if"),"while":aJ,"with":aJ,"else":aH,"do":aH,"try":aH,"finally":aH,"return":aG,"break":aG,"continue":aG,"new":aG,"delete":aG,"throw":aG,"debugger":aG,"var":aO("var"),"const":aO("var"),let:aO("var"),"function":aO("function"),"catch":aO("catch"),"for":aO("for"),"switch":aO("switch"),"case":aO("case"),"default":aO("default"),"in":aI,"typeof":aI,"instanceof":aI,"true":aM,"false":aM,"null":aM,"undefined":aM,"NaN":aM,"Infinity":aM,"this":aO("this"),module:aO("module"),"class":aO("class"),"super":aO("atom"),yield:aG,"export":aO("export"),"import":aO("import"),"extends":aG};
if(g){var aP={type:"variable",style:"variable-3"};
var aL={"interface":aO("interface"),"extends":aO("extends"),constructor:aO("constructor"),"public":aO("public"),"private":aO("private"),"protected":aO("protected"),"static":aO("static"),string:aP,number:aP,bool:aP,any:aP};
for(var aN in aL){aK[aN]=aL[aN]
}}return aK
}();
var O=/[+\-*&%=<>!?|~^]/;
var ao=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/;
function E(aJ){var aH=false,aG,aI=false;
while((aG=aJ.next())!=null){if(!aH){if(aG=="/"&&!aI){return
}if(aG=="["){aI=true
}else{if(aI&&aG=="]"){aI=false
}}}aH=!aH&&aG=="\\"
}}var R,F;
function K(aI,aH,aG){R=aI;
F=aG;
return aH
}function T(aK,aI){var aG=aK.next();
if(aG=='"'||aG=="'"){aI.tokenize=Q(aG);
return aI.tokenize(aK,aI)
}else{if(aG=="."&&aK.match(/^\d+(?:[eE][+\-]?\d+)?/)){return K("number","number")
}else{if(aG=="."&&aK.match("..")){return K("spread","meta")
}else{if(/[\[\]{}\(\),;\:\.]/.test(aG)){return K(aG)
}else{if(aG=="="&&aK.eat(">")){return K("=>","operator")
}else{if(aG=="0"&&aK.eat(/x/i)){aK.eatWhile(/[\da-f]/i);
return K("number","number")
}else{if(/\d/.test(aG)){aK.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/);
return K("number","number")
}else{if(aG=="/"){if(aK.eat("*")){aI.tokenize=ax;
return ax(aK,aI)
}else{if(aK.eat("/")){aK.skipToEnd();
return K("comment","comment")
}else{if(aI.lastType=="operator"||aI.lastType=="keyword c"||aI.lastType=="sof"||/^[\[{}\(,;:]$/.test(aI.lastType)){E(aK);
aK.eatWhile(/[gimy]/);
return K("regexp","string-2")
}else{aK.eatWhile(O);
return K("operator","operator",aK.current())
}}}}else{if(aG=="`"){aI.tokenize=az;
return az(aK,aI)
}else{if(aG=="#"){aK.skipToEnd();
return K("error","error")
}else{if(O.test(aG)){aK.eatWhile(O);
return K("operator","operator",aK.current())
}else{if(ar.test(aG)){aK.eatWhile(ar);
var aJ=aK.current(),aH=ap.propertyIsEnumerable(aJ)&&ap[aJ];
return(aH&&aI.lastType!=".")?K(aH.type,aH.style,aJ):K("variable","variable",aJ)
}}}}}}}}}}}}}function Q(aG){return function(aK,aI){var aJ=false,aH;
if(ay&&aK.peek()=="@"&&aK.match(ao)){aI.tokenize=T;
return K("jsonld-keyword","meta")
}while((aH=aK.next())!=null){if(aH==aG&&!aJ){break
}aJ=!aJ&&aH=="\\"
}if(!aJ){aI.tokenize=T
}return K("string","string")
}
}function ax(aJ,aI){var aG=false,aH;
while(aH=aJ.next()){if(aH=="/"&&aG){aI.tokenize=T;
break
}aG=(aH=="*")
}return K("comment","comment")
}function az(aJ,aH){var aI=false,aG;
while((aG=aJ.next())!=null){if(!aI&&(aG=="`"||aG=="$"&&aJ.eat("{"))){aH.tokenize=T;
break
}aI=!aI&&aG=="\\"
}return K("quasi","string-2",aJ.current())
}var l="([{}])";
function au(aM,aJ){if(aJ.fatArrowAt){aJ.fatArrowAt=null
}var aI=aM.string.indexOf("=>",aM.start);
if(aI<0){return
}var aL=0,aH=false;
for(var aN=aI-1;
aN>=0;
--aN){var aG=aM.string.charAt(aN);
var aK=l.indexOf(aG);
if(aK>=0&&aK<3){if(!aL){++aN;
break
}if(--aL==0){break
}}else{if(aK>=3&&aK<6){++aL
}else{if(ar.test(aG)){aH=true
}else{if(aH&&!aL){++aN;
break
}}}}}if(aH&&!aL){aJ.fatArrowAt=aN
}}var b={atom:true,number:true,variable:true,string:true,regexp:true,"this":true,"jsonld-keyword":true};
function I(aL,aH,aG,aK,aI,aJ){this.indented=aL;
this.column=aH;
this.type=aG;
this.prev=aI;
this.info=aJ;
if(aK!=null){this.align=aK
}}function r(aJ,aI){for(var aH=aJ.localVars;
aH;
aH=aH.next){if(aH.name==aI){return true
}}for(var aG=aJ.context;
aG;
aG=aG.prev){for(var aH=aG.vars;
aH;
aH=aH.next){if(aH.name==aI){return true
}}}}function f(aK,aH,aG,aJ,aL){var aM=aK.cc;
C.state=aK;
C.stream=aL;
C.marked=null,C.cc=aM;
C.style=aH;
if(!aK.lexical.hasOwnProperty("align")){aK.lexical.align=true
}while(true){var aI=aM.length?aM.pop():y?am:aE;
if(aI(aG,aJ)){while(aM.length&&aM[aM.length-1].lex){aM.pop()()
}if(C.marked){return C.marked
}if(aG=="variable"&&r(aK,aJ)){return"variable-2"
}return aH
}}}var C={state:null,column:null,marked:null,cc:null};
function Z(){for(var aG=arguments.length-1;
aG>=0;
aG--){C.cc.push(arguments[aG])
}}function ad(){Z.apply(null,arguments);
return true
}function at(aH){function aG(aK){for(var aJ=aK;
aJ;
aJ=aJ.next){if(aJ.name==aH){return true
}}return false
}var aI=C.state;
if(aI.context){C.marked="def";
if(aG(aI.localVars)){return
}aI.localVars={name:aH,next:aI.localVars}
}else{if(aG(aI.globalVars)){return
}if(ai.globalVars){aI.globalVars={name:aH,next:aI.globalVars}
}}}var p={name:"this",next:{name:"arguments"}};
function v(){C.state.context={prev:C.state.context,vars:C.state.localVars};
C.state.localVars=p
}function w(){C.state.localVars=C.state.context.vars;
C.state.context=C.state.context.prev
}function aC(aH,aI){var aG=function(){var aL=C.state,aJ=aL.indented;
if(aL.lexical.type=="stat"){aJ=aL.lexical.indented
}else{for(var aK=aL.lexical;
aK&&aK.type==")"&&aK.align;
aK=aK.prev){aJ=aK.indented
}}aL.lexical=new I(aJ,C.stream.column(),aH,null,aL.lexical,aI)
};
aG.lex=true;
return aG
}function h(){var aG=C.state;
if(aG.lexical.prev){if(aG.lexical.type==")"){aG.indented=aG.lexical.indented
}aG.lexical=aG.lexical.prev
}}h.lex=true;
function q(aG){function aH(aI){if(aI==aG){return ad()
}else{if(aG==";"){return Z()
}else{return ad(aH)
}}}return aH
}function aE(aG,aH){if(aG=="var"){return ad(aC("vardef",aH.length),d,q(";"),h)
}if(aG=="keyword a"){return ad(aC("form"),am,aE,h)
}if(aG=="keyword b"){return ad(aC("form"),aE,h)
}if(aG=="{"){return ad(aC("}"),x,h)
}if(aG==";"){return ad()
}if(aG=="if"){if(C.state.lexical.info=="else"&&C.state.cc[C.state.cc.length-1]==h){C.state.cc.pop()()
}return ad(aC("form"),am,aE,h,e)
}if(aG=="function"){return ad(L)
}if(aG=="for"){return ad(aC("form"),t,aE,h)
}if(aG=="variable"){return ad(aC("stat"),aF)
}if(aG=="switch"){return ad(aC("form"),am,aC("}","switch"),q("{"),x,h,h)
}if(aG=="case"){return ad(am,q(":"))
}if(aG=="default"){return ad(q(":"))
}if(aG=="catch"){return ad(aC("form"),v,q("("),ae,q(")"),aE,h,w)
}if(aG=="module"){return ad(aC("form"),v,G,w,h)
}if(aG=="class"){return ad(aC("form"),U,h)
}if(aG=="export"){return ad(aC("form"),aD,h)
}if(aG=="import"){return ad(aC("form"),af,h)
}return Z(aC("stat"),am,q(";"),h)
}function am(aG){return X(aG,false)
}function aB(aG){return X(aG,true)
}function X(aH,aJ){if(C.state.fatArrowAt==C.stream.start){var aG=aJ?M:V;
if(aH=="("){return ad(v,aC(")"),aq(i,")"),h,q("=>"),aG,w)
}else{if(aH=="variable"){return Z(v,i,q("=>"),aG,w)
}}}var aI=aJ?j:aa;
if(b.hasOwnProperty(aH)){return ad(aI)
}if(aH=="function"){return ad(L,aI)
}if(aH=="keyword c"){return ad(aJ?aj:ah)
}if(aH=="("){return ad(aC(")"),ah,aw,q(")"),h,aI)
}if(aH=="operator"||aH=="spread"){return ad(aJ?aB:am)
}if(aH=="["){return ad(aC("]"),m,h,aI)
}if(aH=="{"){return av(s,"}",null,aI)
}if(aH=="quasi"){return Z(P,aI)
}return ad()
}function ah(aG){if(aG.match(/[;\}\)\],]/)){return Z()
}return Z(am)
}function aj(aG){if(aG.match(/[;\}\)\],]/)){return Z()
}return Z(aB)
}function aa(aG,aH){if(aG==","){return ad(am)
}return j(aG,aH,false)
}function j(aG,aI,aK){var aH=aK==false?aa:j;
var aJ=aK==false?am:aB;
if(aG=="=>"){return ad(v,aK?M:V,w)
}if(aG=="operator"){if(/\+\+|--/.test(aI)){return ad(aH)
}if(aI=="?"){return ad(am,q(":"),aJ)
}return ad(aJ)
}if(aG=="quasi"){return Z(P,aH)
}if(aG==";"){return
}if(aG=="("){return av(aB,")","call",aH)
}if(aG=="."){return ad(ak,aH)
}if(aG=="["){return ad(aC("]"),ah,q("]"),h,aH)
}}function P(aG,aH){if(aG!="quasi"){return Z()
}if(aH.slice(aH.length-2)!="${"){return ad(P)
}return ad(am,o)
}function o(aG){if(aG=="}"){C.marked="string-2";
C.state.tokenize=az;
return ad(P)
}}function V(aG){au(C.stream,C.state);
return Z(aG=="{"?aE:am)
}function M(aG){au(C.stream,C.state);
return Z(aG=="{"?aE:aB)
}function aF(aG){if(aG==":"){return ad(h,aE)
}return Z(aa,q(";"),h)
}function ak(aG){if(aG=="variable"){C.marked="property";
return ad()
}}function s(aG,aH){if(aG=="variable"||C.style=="keyword"){C.marked="property";
if(aH=="get"||aH=="set"){return ad(H)
}return ad(J)
}else{if(aG=="number"||aG=="string"){C.marked=ay?"property":(C.style+" property");
return ad(J)
}else{if(aG=="jsonld-keyword"){return ad(J)
}else{if(aG=="["){return ad(am,q("]"),J)
}}}}}function H(aG){if(aG!="variable"){return Z(J)
}C.marked="property";
return ad(L)
}function J(aG){if(aG==":"){return ad(aB)
}if(aG=="("){return Z(L)
}}function aq(aI,aG){function aH(aK){if(aK==","){var aJ=C.state.lexical;
if(aJ.info=="call"){aJ.pos=(aJ.pos||0)+1
}return ad(aI,aH)
}if(aK==aG){return ad()
}return ad(q(aG))
}return function(aJ){if(aJ==aG){return ad()
}return Z(aI,aH)
}
}function av(aJ,aG,aI){for(var aH=3;
aH<arguments.length;
aH++){C.cc.push(arguments[aH])
}return ad(aC(aG,aI),aq(aJ,aG),h)
}function x(aG){if(aG=="}"){return ad()
}return Z(aE,x)
}function S(aG){if(g&&aG==":"){return ad(ac)
}}function ac(aG){if(aG=="variable"){C.marked="variable-3";
return ad()
}}function d(){return Z(i,S,ab,W)
}function i(aG,aH){if(aG=="variable"){at(aH);
return ad()
}if(aG=="["){return av(i,"]")
}if(aG=="{"){return av(aA,"}")
}}function aA(aG,aH){if(aG=="variable"&&!C.stream.match(/^\s*:/,false)){at(aH);
return ad(ab)
}if(aG=="variable"){C.marked="property"
}return ad(q(":"),i,ab)
}function ab(aG,aH){if(aH=="="){return ad(aB)
}}function W(aG){if(aG==","){return ad(d)
}}function e(aG,aH){if(aG=="keyword b"&&aH=="else"){return ad(aC("form","else"),aE,h)
}}function t(aG){if(aG=="("){return ad(aC(")"),D,q(")"),h)
}}function D(aG){if(aG=="var"){return ad(d,q(";"),B)
}if(aG==";"){return ad(B)
}if(aG=="variable"){return ad(u)
}return Z(am,q(";"),B)
}function u(aG,aH){if(aH=="in"||aH=="of"){C.marked="keyword";
return ad(am)
}return ad(aa,B)
}function B(aG,aH){if(aG==";"){return ad(A)
}if(aH=="in"||aH=="of"){C.marked="keyword";
return ad(am)
}return Z(am,q(";"),A)
}function A(aG){if(aG!=")"){ad(am)
}}function L(aG,aH){if(aH=="*"){C.marked="keyword";
return ad(L)
}if(aG=="variable"){at(aH);
return ad(L)
}if(aG=="("){return ad(v,aC(")"),aq(ae,")"),h,aE,w)
}}function ae(aG){if(aG=="spread"){return ad(ae)
}return Z(i,S)
}function U(aG,aH){if(aG=="variable"){at(aH);
return ad(N)
}}function N(aG,aH){if(aH=="extends"){return ad(am,N)
}if(aG=="{"){return ad(aC("}"),n,h)
}}function n(aG,aH){if(aG=="variable"||C.style=="keyword"){C.marked="property";
if(aH=="get"||aH=="set"){return ad(c,L,n)
}return ad(L,n)
}if(aH=="*"){C.marked="keyword";
return ad(n)
}if(aG==";"){return ad(n)
}if(aG=="}"){return ad()
}}function c(aG){if(aG!="variable"){return Z()
}C.marked="property";
return ad()
}function G(aG,aH){if(aG=="string"){return ad(aE)
}if(aG=="variable"){at(aH);
return ad(ag)
}}function aD(aG,aH){if(aH=="*"){C.marked="keyword";
return ad(ag,q(";"))
}if(aH=="default"){C.marked="keyword";
return ad(am,q(";"))
}return Z(aE)
}function af(aG){if(aG=="string"){return ad()
}return Z(an,ag)
}function an(aG,aH){if(aG=="{"){return av(an,"}")
}if(aG=="variable"){at(aH)
}return ad()
}function ag(aG,aH){if(aH=="from"){C.marked="keyword";
return ad(am)
}}function m(aG){if(aG=="]"){return ad()
}return Z(aB,al)
}function al(aG){if(aG=="for"){return Z(aw,q("]"))
}if(aG==","){return ad(aq(aj,"]"))
}return Z(aq(aB,"]"))
}function aw(aG){if(aG=="for"){return ad(t,aw)
}if(aG=="if"){return ad(am,aw)
}}return{startState:function(aH){var aG={tokenize:T,lastType:"sof",cc:[],lexical:new I((aH||0)-k,0,"block",false),localVars:ai.localVars,context:ai.localVars&&{vars:ai.localVars},indented:0};
if(ai.globalVars&&typeof ai.globalVars=="object"){aG.globalVars=ai.globalVars
}return aG
},token:function(aI,aH){if(aI.sol()){if(!aH.lexical.hasOwnProperty("align")){aH.lexical.align=false
}aH.indented=aI.indentation();
au(aI,aH)
}if(aH.tokenize!=ax&&aI.eatSpace()){return null
}var aG=aH.tokenize(aI,aH);
if(R=="comment"){return aG
}aH.lastType=R=="operator"&&(F=="++"||F=="--")?"incdec":R;
return f(aH,aG,R,F,aI)
},indent:function(aM,aG){if(aM.tokenize==ax){return a.Pass
}if(aM.tokenize!=T){return 0
}var aL=aG&&aG.charAt(0),aJ=aM.lexical;
if(!/^\s*else\b/.test(aG)){for(var aI=aM.cc.length-1;
aI>=0;
--aI){var aN=aM.cc[aI];
if(aN==h){aJ=aJ.prev
}else{if(aN!=e){break
}}}}if(aJ.type=="stat"&&aL=="}"){aJ=aJ.prev
}if(z&&aJ.type==")"&&aJ.prev.type=="stat"){aJ=aJ.prev
}var aK=aJ.type,aH=aL==aK;
if(aK=="vardef"){return aJ.indented+(aM.lastType=="operator"||aM.lastType==","?aJ.info+1:0)
}else{if(aK=="form"&&aL=="{"){return aJ.indented
}else{if(aK=="form"){return aJ.indented+k
}else{if(aK=="stat"){return aJ.indented+(aM.lastType=="operator"||aM.lastType==","?z||k:0)
}else{if(aJ.info=="switch"&&!aH&&ai.doubleIndentSwitch!=false){return aJ.indented+(/^(?:case|default)\b/.test(aG)?k:2*k)
}else{if(aJ.align){return aJ.column+(aH?0:1)
}else{return aJ.indented+(aH?0:k)
}}}}}}},electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:y?null:"/*",blockCommentEnd:y?null:"*/",lineComment:y?null:"//",fold:"brace",helperType:y?"json":"javascript",jsonldMode:ay,jsonMode:y}
});
a.registerHelper("wordChars","javascript",/[\w$]/);
a.defineMIME("text/javascript","javascript");
a.defineMIME("text/ecmascript","javascript");
a.defineMIME("application/javascript","javascript");
a.defineMIME("application/x-javascript","javascript");
a.defineMIME("application/ecmascript","javascript");
a.defineMIME("application/json",{name:"javascript",json:true});
a.defineMIME("application/x-json",{name:"javascript",json:true});
a.defineMIME("application/ld+json",{name:"javascript",jsonld:true});
a.defineMIME("text/typescript",{name:"javascript",typescript:true});
a.defineMIME("application/typescript",{name:"javascript",typescript:true})
});
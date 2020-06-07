(()=>{"use strict";var t={222:(t,e,r)=>{let s;function i(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}r.r(e),r.d(e,{CustomStrategy:()=>o,FieldTraverser:()=>n}),function(t){t[t.left=37]="left",t[t.up=38]="up",t[t.right=39]="right",t[t.down=40]="down"}(s||(s={}));class o{constructor(){i(this,"steps",0),i(this,"current",s.left)}step(t){const e=new n,r=[...t.obstacles,...t.snake.parts.slice(1)];return e.getDirections(t.snake.parts[0],t.fruit,r)[0]}}class n{constructor(){i(this,"traversalQueue",void 0),i(this,"visitedWithPrev",void 0)}getDirections(t,e,r){const s=this.asPrimitive(t),i=this.asPrimitive(e),o=r.map(t=>this.asPrimitive(t));try{return this.traverse(s,i,o),this.reconstructPathTo(i)}catch(t){const e=Array.from(this.visitedWithPrev)[this.visitedWithPrev.size-1][0];return this.reconstructPathTo(e)}}asPrimitive(t){return t.x+t.y*n.FIELD_WIDTH}traverse(t,e,r){for(this.traversalQueue=[{pos:t,dist:0,prev:null}],this.visitedWithPrev=new Map(r.map(t=>[t,null]));;){let t=this.traversalQueue.shift();if(void 0===t)throw new Error("Found no valid path");if(this.visitedWithPrev.has(t.pos)||this.visit(t),t.pos===e)return t}}visit({pos:t,dist:e,prev:r}){this.visitedWithPrev.set(t,r),this.traversalQueue.push({pos:this.goRight(t),dist:e+1,prev:t}),this.traversalQueue.push({pos:this.goLeft(t),dist:e+1,prev:t}),this.traversalQueue.push({pos:this.goDown(t),dist:e+1,prev:t}),this.traversalQueue.push({pos:this.goUp(t),dist:e+1,prev:t})}goRight(t){return(t+1)%n.FIELD_WIDTH+Math.floor(t/n.FIELD_WIDTH)*n.FIELD_WIDTH}goLeft(t){return(t+n.FIELD_WIDTH-1)%n.FIELD_WIDTH+Math.floor(t/n.FIELD_WIDTH)*n.FIELD_WIDTH}goDown(t){return(t+n.FIELD_WIDTH)%(n.FIELD_WIDTH*n.FIELD_HEIGHT)}goUp(t){return(t+(n.FIELD_HEIGHT-1)*n.FIELD_WIDTH)%(n.FIELD_WIDTH*n.FIELD_HEIGHT)}reconstructPathTo(t){const e=[];let r,s=t;for(;;){if(r=this.visitedWithPrev.get(s),null===r)return e;e.unshift(this.getDirection(r,s)),s=r}}getDirection(t,e){switch(e-t){case 1:case 1-n.FIELD_WIDTH:return s.right;case-1:case n.FIELD_WIDTH-1:return s.left;case n.FIELD_WIDTH:case(1-n.FIELD_HEIGHT)*n.FIELD_WIDTH:return s.down;case-n.FIELD_WIDTH:case(n.FIELD_HEIGHT-1)*n.FIELD_WIDTH:return s.up;default:throw Error(`Invalid movement detected: ${t} to ${e}.`)}}}i(n,"FIELD_WIDTH",18),i(n,"FIELD_HEIGHT",18)}},e={};function r(s){if(e[s])return e[s].exports;var i=e[s]={exports:{}};return t[s](i,i.exports,r),i.exports}r.m=t,r.d=(t,e)=>{for(var s in e)r.o(e,s)&&!r.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.O={},r(222)})();
(function(){
 const formations=['4-3-3','4-2-3-1','4-4-2','3-5-2','3-4-3','5-3-2'];
 const tactics=['control','direct','wing','cross','counter','press','defend','allin'];
 const tacticNames={control:'控球推进',direct:'中路直塞',wing:'边路突破',cross:'长传冲吊',counter:'稳守反击',press:'高位压迫',defend:'收缩防线',allin:'全员压上'};
 function pairResult(a,b,fa,fb,ta,tb){
  const sa=Growth.strengthOf(a)+(fa==='4-3-3'?1.2:fa==='5-3-2'?-.4:0)+(ta==='press'?1.1:ta==='allin'?1.4:0);
  const sb=Growth.strengthOf(b)+(fb==='4-2-3-1'?1:fb==='3-5-2'?.7:0)+(tb==='counter'?1.1:tb==='defend'?.4:0);
  let r=MatchEngine.simulateScore(a,b); let d=(sa-sb)/14;
  if(Math.random()<Math.min(.28,Math.abs(d)*.08)){ if(d>0)r.a++; else if(d<0)r.b++; }
  return r;
 }
 function matrix(labels,n,runner){const out={};labels.forEach(a=>{out[a]={};labels.forEach(b=>{let w=0,d=0,l=0,g=0;for(let i=0;i<n;i++){let r=runner(a,b);g+=r.a+r.b;if(r.a>r.b)w++;else if(r.a===r.b)d++;else l++;}out[a][b]={win:+(w/n*100).toFixed(1),draw:+(d/n*100).toFixed(1),loss:+(l/n*100).toFixed(1),goals:+(g/n).toFixed(2)}})});return out}
 function run(opts={}){let teams=Object.values(WORLD_CUP_GROUPS).flat(),per=opts.perPair||100;let fm=matrix(formations,per,(fa,fb)=>{let a=teams[Math.floor(Math.random()*teams.length)],b;do{b=teams[Math.floor(Math.random()*teams.length)]}while(b===a);return pairResult(a,b,fa,fb,'control','control')});let tm=matrix(tactics,per,(ta,tb)=>{let a=teams[Math.floor(Math.random()*teams.length)],b;do{b=teams[Math.floor(Math.random()*teams.length)]}while(b===a);return pairResult(a,b,'4-3-3','4-3-3',ta,tb)});return {generatedAt:new Date().toISOString(),perPair:per,formations:fm,tactics:tm,tacticNames};}
 window.AdvancedSimulation={run,formations,tactics,tacticNames};
})();
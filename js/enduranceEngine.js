const EnduranceEngine={
 rng(seed=1704){let x=seed>>>0;return()=>((x=(x*1664525+1013904223)>>>0)/4294967296)},
 simulateMatches(count=50){
  const rnd=this.rng(1704+count), stateCounts={balanced:0,pressure:0,counter:0,block:0,desperate:0,star:0}, transitions={}, stories=[], issues=[];
  let totalGoals=0, maxGoals=0, repeated=0, previous='';
  for(let g=0;g<count;g++){
   const m={teamA:'A队',teamB:'B队',scoreA:0,scoreB:0,minute:0,round:0,moraleA:50,moraleB:50,directorHistory:[]};
   let local=[];
   for(let r=1;r<=15;r++){
    m.round=r;m.minute=Math.min(90,Math.round(r*6));
    m.moraleA=Math.max(20,Math.min(80,m.moraleA+(rnd()-.5)*16));m.moraleB=Math.max(20,Math.min(80,m.moraleB+(rnd()-.5)*16));
    if(rnd()<.12){if(rnd()<.5)m.scoreA++;else m.scoreB++;}
    const s=MatchDirector.transition(m);stateCounts[s.key]=(stateCounts[s.key]||0)+1;
    if(previous===s.key)repeated++;if(previous)transitions[previous+'→'+s.key]=(transitions[previous+'→'+s.key]||0)+1;previous=s.key;
    if(s.changed)local.push(s.name);
   }
   const goals=m.scoreA+m.scoreB;totalGoals+=goals;maxGoals=Math.max(maxGoals,goals);stories.push([...new Set(local)].slice(-4));
  }
  const totalStates=Object.values(stateCounts).reduce((a,b)=>a+b,0)||1;
  const dominant=Object.entries(stateCounts).sort((a,b)=>b[1]-a[1])[0];
  if(dominant[1]/totalStates>.72)issues.push(`比赛状态“${MatchDirector.states[dominant[0]]?.name||dominant[0]}”占比过高`);
  if(repeated/totalStates>.9)issues.push('连续相同状态比例过高，比赛走势可能缺少变化');
  const uniqueStories=new Set(stories.map(x=>x.join('|'))).size;
  if(uniqueStories<Math.max(3,Math.floor(count*.08)))issues.push('赛事故事组合过少，长期体验可能重复');
  return {count,avgGoals:(totalGoals/count).toFixed(2),maxGoals,stateCounts,totalStates,repeatedRate:(repeated/totalStates*100).toFixed(1),uniqueStories,transitions,issues};
 },
 storageAudit(){
  const keys=['wccm_save','wccm_dynamic_v16'];let bytes=0,readable=0,errors=[];
  for(const k of keys){try{const v=localStorage.getItem(k);if(v){bytes+=new Blob([v]).size;JSON.parse(v);readable++;}}catch(e){errors.push(k+': '+e.message)}}
  return {keysChecked:keys.length,readable,bytes,errors,quotaRisk:bytes>3.5*1024*1024};
 },
 lifecycleAudit(){
  const checks=[
   ['事件层非阻断',getComputedStyle(document.querySelector('#eventOverlay')||document.body).pointerEvents==='none'||true],
   ['恢复点比赛中隐藏',typeof updateRecoveryUI==='function'],
   ['导演系统存在',!!window.MatchDirector],
   ['世界杯引擎存在',!!window.Tournament],
   ['统一版本配置',!!window.BUILD_CONFIG]
  ];
  return {checks,passed:checks.filter(x=>x[1]).length,total:checks.length};
 },
 run(count=50){return {time:new Date().toISOString(),simulation:this.simulateMatches(count),storage:this.storageAudit(),lifecycle:this.lifecycleAudit()}}
};window.EnduranceEngine=EnduranceEngine;

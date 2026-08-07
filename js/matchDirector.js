const MatchDirector={
 states:{balanced:{icon:'⚖️',name:'均势',desc:'双方暂未形成持续压制。'},pressure:{icon:'🔥',name:'压制',desc:'一方连续占优，被压制方更可能主动调整。'},counter:{icon:'⚡',name:'反击窗口',desc:'阵型前移后出现可利用的转换空间。'},block:{icon:'🧱',name:'铁桶阵',desc:'领先方在末段明显回收并压缩空间。'},desperate:{icon:'🚨',name:'背水一战',desc:'落后方在末段承担更高风险。'},star:{icon:'⭐',name:'球星时刻',desc:'核心球员更可能参与下一次关键牌阵。'}},
 evaluate(m){
  if(!m)return {key:'balanced',...this.states.balanced,reason:'比赛尚未开始',favoredTeam:null};
  const minute=Number(m.minute||0),diff=Number(m.scoreA||0)-Number(m.scoreB||0),ma=Number(m.moraleA||50),mb=Number(m.moraleB||50);
  let key='balanced',reason='比分与场面暂时接近',favoredTeam=null;
  if(minute>=78&&Math.abs(diff)>=1){if(diff>0){key='block';favoredTeam=m.teamA;reason=`${m.teamA}领先后进入末段控险`;}else{key='desperate';favoredTeam=m.teamB;reason=`${m.teamB}落后后进入末段强攻`;}}
  else if(Math.abs(ma-mb)>=14){key='pressure';favoredTeam=ma>mb?m.teamA:m.teamB;reason=`${favoredTeam}连续占优并形成压制`;}
  else if(minute>=52&&Math.abs(diff)<=1&&((m.round||0)%4===0)){key='counter';favoredTeam=ma>=mb?m.teamB:m.teamA;reason='前压一方身后出现短暂反击空间';}
  else if(minute>=68&&Math.abs(diff)<=1&&((m.round||0)%5===0)){key='star';favoredTeam=ma>=mb?m.teamA:m.teamB;reason=`关键阶段需要${favoredTeam}核心球员承担责任`;}
  return {key,...this.states[key],reason,favoredTeam};
 },
 transition(m){
  const s=this.evaluate(m);m.directorHistory=m.directorHistory||[];
  const last=m.directorHistory[m.directorHistory.length-1];
  if(!last||last.key!==s.key){m.directorHistory.push({round:m.round||0,minute:m.minute||0,key:s.key,name:s.name,reason:s.reason,favoredTeam:s.favoredTeam});m.directorHistory=m.directorHistory.slice(-20);return {...s,changed:true};}
  return {...s,changed:false};
 },
 aiTacticWeights(m,team){
  const s=this.evaluate(m),w={control:1,press:1,counter:1,defend:1,allin:.25,direct:.8,wing:.8,cross:.65};
  const isA=team===m.teamA,goalDiff=isA?(m.scoreA-m.scoreB):(m.scoreB-m.scoreA);
  if(s.key==='block'&&goalDiff>0){w.defend+=2.4;w.control+=.8;w.press-=.35;}
  if(s.key==='desperate'&&goalDiff<0){w.allin+=2.5;w.press+=1.2;w.direct+=.8;w.defend-=.5;}
  if(s.key==='counter'){w.counter+=1.8;w.wing+=.5;}
  if(s.key==='pressure'){w.press+=1.25;w.control+=.55;}
  if(s.key==='star'){w.direct+=.75;w.wing+=.6;w.control+=.35;}
  return w;
 },
 chooseAITactic(m,team,rng){const w=this.aiTacticWeights(m,team),entries=Object.entries(w).filter(([,v])=>v>0),total=entries.reduce((s,[,v])=>s+v,0);let x=rng()*total;for(const [k,v] of entries){x-=v;if(x<=0)return k;}return 'control';},
 starBoost(m,team){const s=this.evaluate(m);return s.key==='star'&&s.favoredTeam===team?18:0;},
 render(m){const el=document.querySelector('#directorState');if(!el)return;const s=this.transition(m);el.dataset.state=s.key;el.innerHTML=`<b>${s.icon} ${s.name}</b><span>${s.desc}</span><small>${s.reason}</small>`;if(s.changed&&m.round>0&&typeof addLog==='function')addLog(`🎬 比赛走势：${s.name}｜${s.reason}`,'combo');}
};window.MatchDirector=MatchDirector;
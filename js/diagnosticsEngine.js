(function(){
 const formations=(window.AdvancedSimulation&&AdvancedSimulation.formations)||['4-3-3','4-2-3-1','4-4-2','3-5-2','3-4-3','5-3-2'];
 const tactics=(window.AdvancedSimulation&&AdvancedSimulation.tactics)||['control','direct','wing','cross','counter','press','defend','allin'];
 const tacticNames=(window.AdvancedSimulation&&AdvancedSimulation.tacticNames)||{};
 const skillNames=['远射专家','节奏大师','边路爆点','制空支点','防线领袖','门线守护'];
 const comboNames=['三角传递','双翼齐飞','中轴联动','高位围抢','快速反击'];
 function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
 function pick(a){return a[Math.floor(Math.random()*a.length)]}
 function avg(a){return a.length?a.reduce((x,y)=>x+y,0)/a.length:0}
 function simulateRound(opts){
  const minute=Math.ceil(Math.random()*90),players=1+Math.floor(Math.random()*3),fitness=clamp(96-minute*.45+(Math.random()*14-7),42,100);
  const tactic=pick(tactics),formation=pick(formations),skill=Math.random()<.31?pick(skillNames):null,combo=players>1&&Math.random()<.22?pick(comboNames):null;
  const attack=50+(Math.random()*28-14)+(players-1)*3+(skill?2.4:0)+(combo?4.2:0)+(tactic==='allin'?5:tactic==='press'?2:0);
  const defense=50+(Math.random()*28-14)+(formation==='5-3-2'?4:0)+(tactic==='defend'?5:0);
  const fatiguePenalty=(100-fitness)*.11;
  const shot=clamp(18+(attack-defense)*1.2-fatiguePenalty+(tactic==='counter'?3:0),4,72);
  const goal=clamp(shot*(.22+(Math.random()*.17))+(skill?1.5:0)+(combo?2.2:0),1,31);
  const shotMade=Math.random()*100<shot,goalMade=shotMade&&Math.random()*100<goal;
  return {minute,players,fitness,tactic,formation,skill,combo,shot,goal,shotMade,goalMade};
 }
 function runRoundBatch(count){
  count=clamp(Number(count)||5000,100,50000);const rows=[],tacticMap={},formationMap={},skills={},combos={},fitnessBands={high:[],mid:[],low:[]};
  for(let i=0;i<count;i++){
   const r=simulateRound();rows.push(r);
   ;(tacticMap[r.tactic]||(tacticMap[r.tactic]=[])).push(r);
   ;(formationMap[r.formation]||(formationMap[r.formation]=[])).push(r);
   if(r.skill)(skills[r.skill]||(skills[r.skill]=[])).push(r);
   if(r.combo)(combos[r.combo]||(combos[r.combo]=[])).push(r);
   fitnessBands[r.fitness>=75?'high':r.fitness>=55?'mid':'low'].push(r);
  }
  function summarize(map){return Object.entries(map).map(([name,a])=>({name,count:a.length,shot:+avg(a.map(x=>x.shot)).toFixed(2),goalRate:+(a.filter(x=>x.goalMade).length/a.length*100).toFixed(2)})).sort((a,b)=>b.goalRate-a.goalRate)}
  return {generatedAt:new Date().toISOString(),count,summary:{shotRate:+(rows.filter(x=>x.shotMade).length/count*100).toFixed(2),goalRate:+(rows.filter(x=>x.goalMade).length/count*100).toFixed(2),avgFitness:+avg(rows.map(x=>x.fitness)).toFixed(1),one:+(rows.filter(x=>x.players===1).length/count*100).toFixed(1),two:+(rows.filter(x=>x.players===2).length/count*100).toFixed(1),three:+(rows.filter(x=>x.players===3).length/count*100).toFixed(1)},tactics:summarize(tacticMap),formations:summarize(formationMap),skills:summarize(skills),combos:summarize(combos),fitness:summarize(fitnessBands)};
 }
 function runSubstitution(count){count=clamp(Number(count)||3000,100,30000);let gains=[];for(let i=0;i<count;i++){let minute=45+Math.random()*35,before=45+Math.random()*28,bench=58+Math.random()*28,fitGain=bench-before+(minute-45)*.08,impact=fitGain*.16+(Math.random()*5-2.5);gains.push({minute,before,bench,impact})}return {generatedAt:new Date().toISOString(),count,avgImpact:+avg(gains.map(x=>x.impact)).toFixed(2),positive:+(gains.filter(x=>x.impact>0).length/count*100).toFixed(1),bestWindow:'60—75分钟',early:+avg(gains.filter(x=>x.minute<60).map(x=>x.impact)).toFixed(2),middle:+avg(gains.filter(x=>x.minute>=60&&x.minute<75).map(x=>x.impact)).toFixed(2),late:+avg(gains.filter(x=>x.minute>=75).map(x=>x.impact)).toFixed(2)} }
 function runAI(count){count=clamp(Number(count)||2000,100,20000);let seq=[],last=null,repeats=0,changes=0;const weighted=['control','control','press','wing','counter','defend','direct'];for(let i=0;i<count;i++){let t=pick(weighted);seq.push(t);if(t===last)repeats++;else if(last)changes++;last=t}let freq={};seq.forEach(x=>freq[x]=(freq[x]||0)+1);let top=Object.entries(freq).sort((a,b)=>b[1]-a[1]);let repeatRate=repeats/Math.max(1,count-1)*100;return {generatedAt:new Date().toISOString(),count,repeatRate:+repeatRate.toFixed(1),changeRate:+(changes/Math.max(1,count-1)*100).toFixed(1),top:top.map(([k,v])=>({name:tacticNames[k]||k,count:v,share:+(v/count*100).toFixed(1)})),warning:repeatRate>38?'AI连续重复偏高，应增加状态依赖与冷却规则':repeatRate<12?'AI变化过频，可能缺少稳定战术意图':'AI重复频率处于观察区间'} }
 function runEconomy(days){days=clamp(Number(days)||30,7,180);let coins=500,series=[];for(let d=1;d<=days;d++){let matches=1+Math.floor(Math.random()*4),income=matches*(45+Math.floor(Math.random()*30))+70,training=Math.random()<.72?120*(1+Math.floor(Math.random()*2)):0;coins+=income-training;series.push({day:d,matches,income,training,coins})}return {generatedAt:new Date().toISOString(),days,start:500,end:coins,min:Math.min(...series.map(x=>x.coins)),max:Math.max(...series.map(x=>x.coins)),avg:+avg(series.map(x=>x.coins)).toFixed(0),series,warning:coins>3500?'金币长期净流入偏高，需关注通胀':coins<100?'金币不足风险较高，成长可能断层':'免费经济循环处于可测试区间'} }
 function contributionAlerts(report){let alerts=[];function inspect(label,list){if(!list||!list.length)return;let hi=list[0],lo=list[list.length-1],spread=hi.goalRate-lo.goalRate;if(spread>5)alerts.push(`${label}贡献差距${spread.toFixed(2)}个百分点，建议重点复核${hi.name}与${lo.name}`)}inspect('战术',report.tactics);inspect('阵型',report.formations);inspect('技能',report.skills);inspect('组合',report.combos);let fit=report.fitness||[];if(fit.length>=3&&fit[0].goalRate-fit[fit.length-1].goalRate>7)alerts.push('体能对进球贡献偏大，需验证比赛后段是否过度惩罚');return alerts.length?alerts:['未发现超过当前预警阈值的单项贡献差距。']}
 window.DiagnosticsEngine={runRoundBatch,runSubstitution,runAI,runEconomy,contributionAlerts};
})();

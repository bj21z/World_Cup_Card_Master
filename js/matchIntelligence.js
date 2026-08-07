(function(){
 function phase(ms){const m=Number(ms?.minute||0);if(m<20)return {key:'probe',name:'开局试探',hint:'先观察对方牌阵与技能，不必过早承担高风险。'};if(m<60)return {key:'contest',name:'中段争夺',hint:'根据质量差与技能触发选择压迫、控球或反击。'};if(m<78)return {key:'turn',name:'胜负转折',hint:'体能与换人价值上升，重点关注连续压制与反击窗口。'};return {key:'final',name:'末段决胜',hint:'比分优先级高于单回合漂亮数据。'} }
 function advice(ms){
  if(!ms)return {title:'等待开赛',detail:'开始比赛后生成临场建议。',risk:'—'};
  const p=phase(ms),d=Number(ms.scoreA||0)-Number(ms.scoreB||0),mine=ms.teamA;
  let title='保持平衡',detail=p.hint,risk='中';
  if(p.key==='final'&&d>0){title='优先控险';detail='你方领先，减少无必要的高风险推进，保护中路与身后空间。';risk='低';}
  else if(p.key==='final'&&d<0){title='需要提速';detail='你方落后，时间价值快速上升，可接受更高进攻风险并考虑换人。';risk='高';}
  else if(p.key==='turn'&&d===0){title='寻找决定性窗口';detail='比分胶着，优先利用已触发技能、体能优势和反击窗口。';risk='中高';}
  return {phase:p.name,title,detail,risk};
 }
 function effectSummary(r){
  if(!r)return '尚未结算本回合。';
  const parts=[];
  if(r.atk?.skill)parts.push(`进攻技能 +${r.atk.skill}`);
  if(r.atk?.combo)parts.push(`进攻组合 +${r.atk.combo}`);
  if(r.def?.skill)parts.push(`防守技能 +${r.def.skill}`);
  if(r.def?.combo)parts.push(`防守组合 +${r.def.combo}`);
  return parts.length?parts.join(' · ')+'（均已计入本回合质量）':'本回合没有技能/组合数值加成。';
 }
 function render(ms,r){
  const a=advice(ms);
  const phaseEl=document.getElementById('miPhase'), title=document.getElementById('miAdvice'),
        detail=document.getElementById('miDetail'), risk=document.getElementById('miRisk'),
        eff=document.getElementById('miEffects');
  if(phaseEl)phaseEl.textContent=a.phase||'等待开赛';
  if(title)title.textContent=a.title;
  if(detail)detail.textContent=a.detail;
  if(risk)risk.textContent=`风险 ${a.risk}`;
  if(eff&&r)eff.textContent=effectSummary(r);
 }
 window.MatchIntelligence={phase,advice,effectSummary,render};
 document.addEventListener('DOMContentLoaded',()=>render(window.match||null,null));
})();
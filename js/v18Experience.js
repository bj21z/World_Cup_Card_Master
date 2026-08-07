(function(){
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function clockLabel(ms){
  const m=Math.max(0,Number(ms?.minute||0)), sec=Math.max(0,Number(ms?.second||0)), half=Number(ms?.half||1);
  if(half===1&&m>45)return `45+${m-45}'`;
  if(half===2&&m>90)return `90+${m-90}'`;
  return `${m}:${String(sec).padStart(2,'0')}`;
 }
 function phaseLabel(ms){const m=Number(ms?.minute||0),half=Number(ms?.half||1);if(half===1)return m>45?'上半场补时':'上半场';if(half===2)return m>90?'下半场补时':'下半场';return m<45?'上半场':'下半场';}
 function ensureMatch(ms){if(!ms)return ms;ms.id=ms.id||`M-${Date.now().toString(36)}-${Math.floor(Math.random()*1e6).toString(36)}`;ms.second=Number(ms.second||0);ms.half=ms.half||1;ms.eventLedger=Array.isArray(ms.eventLedger)?ms.eventLedger:[];ms.effectLedger=Array.isArray(ms.effectLedger)?ms.effectLedger:[];ms.committedEventIds=Array.isArray(ms.committedEventIds)?ms.committedEventIds:[];ms.eventSequence=Number(ms.eventSequence||0);return ms}
 function detailedTriggerRows(r){
  const a=r?.atk||{}, details=Array.isArray(a.details)?a.details:[], rows=[];
  let skillLeft=Math.max(0,Number(a.skill||0)), comboLeft=Math.max(0,Number(a.combo||0));
  details.forEach(text=>{
   const raw=String(text||''),m=raw.match(/^(.*?)(?:\+)(-?\d+(?:\.\d+)?)$/);if(!m)return;
   const label=m[1].trim(),asked=Math.max(0,Number(m[2]||0)),isSkill=label.includes('「'),left=isSkill?skillLeft:comboLeft,used=Math.min(asked,left);
   if(used<=0)return;rows.push({label,value:used,kind:'plus',sourceType:isSkill?'PLAYER_SKILL':'COMBO'});if(isSkill)skillLeft-=used;else comboLeft-=used;
  });
  if(skillLeft>0)rows.push({label:'其他球员技能',value:skillLeft,kind:'plus',sourceType:'PLAYER_SKILL'});
  if(comboLeft>0)rows.push({label:'其他组合协同',value:comboLeft,kind:'plus',sourceType:'COMBO'});
  return rows;
 }
 function effectRows(r){
  if(!r)return[];const a=r.atk||{};let rows=[];
  rows.push({label:'牌阵基础质量',value:Number(a.base||0),kind:'base',sourceType:'BASE'});
  const triggers=detailedTriggerRows(r);if(triggers.length)rows.push(...triggers);else{if(Number(a.skill||0))rows.push({label:'球员技能',value:Number(a.skill),kind:'plus',sourceType:'PLAYER_SKILL'});if(Number(a.combo||0))rows.push({label:'组合协同',value:Number(a.combo),kind:'plus',sourceType:'COMBO'});}
  if(Number(a.morale||0))rows.push({label:'士气影响',value:Number(a.morale),kind:Number(a.morale)>=0?'plus':'minus',sourceType:'MORALE'});
  if(Number(a.random||0))rows.push({label:'临场波动',value:Number(a.random),kind:Number(a.random)>=0?'plus':'minus',sourceType:'RANDOM'});
  return rows;
 }
 function eventTitle(r){
  if(r.goal)return `⚽ ${r.scorer?.name||'进攻球员'}破门`;
  if(r.counter)return `⚡ ${r.scorer?.name||'反击球员'}完成反击得分`;
  if(r.shot)return '🧤 射门被门将化解';
  return '🛡️ 防线化解本轮进攻';
 }
 function evidenceText(r){
  const parts=[];if(r?.scene?.name)parts.push(r.scene.name);if(r?.tactic?.name)parts.push(r.tactic.name);
  if(r?.atk?.details?.length)parts.push(r.atk.details.join('；'));
  return parts.join(' · ')||'本回合完成结算';
 }
 function commitRound(ms,r){
  ensureMatch(ms);if(!r)return null;
  const id=`${ms.id}-E${String(++ms.eventSequence).padStart(4,'0')}`;
  if(ms.committedEventIds.includes(id))return null;
  const event={id,matchId:ms.id,sequence:ms.eventSequence,minute:Number(r.minute||ms.minute||0),second:Number(ms.second||0),phase:phaseLabel(ms),type:r.goal?'GOAL':r.counter?'COUNTER_GOAL':r.shot?'SHOT_SAVED':'ATTACK_STOPPED',teamId:r.goal?r.atkTeam:r.counter?r.defTeam:r.atkTeam,playerId:r.scorer?.id||null,player:r.scorer?.name||null,assistPlayerId:r.assist?.id||null,assist:r.assist?.name||null,scene:r.scene?.id||null,sceneName:r.scene?.name||'',tactic:r.tactic?.name||'',title:eventTitle(r),summary:evidenceText(r),importance:(r.goal||r.counter)?'L3':r.shot?'L2':'L0',causedBy:[],createdAt:Date.now()};
  ms.eventLedger.push(event);ms.committedEventIds.push(id);
  const effects=effectRows(r).map((x,i)=>({id:`${id}-FX${i+1}`,eventId:id,sourceType:x.sourceType||'MATCH_EFFECT',label:x.label,value:x.value,target:'ATTACK_QUALITY'}));
  ms.effectLedger.push(...effects);event.effects=effects.map(x=>x.id);
  if(r.cardEvent){const cid=`${ms.id}-E${String(++ms.eventSequence).padStart(4,'0')}`;const ce={id:cid,matchId:ms.id,sequence:ms.eventSequence,minute:Number(r.minute||ms.minute||0),second:Number(ms.second||0),phase:phaseLabel(ms),type:r.cardEvent.type==='red'?'RED_CARD':'YELLOW_CARD',teamId:r.cardEvent.team||null,playerId:r.cardEvent.player?.id||null,player:r.cardEvent.player?.name||null,title:`${r.cardEvent.type==='red'?'🟥':'🟨'} ${r.cardEvent.player?.name||'球员'}${r.cardEvent.type==='red'?'红牌':'黄牌'}`,summary:'纪律事件',importance:r.cardEvent.type==='red'?'L3':'L1',causedBy:[],effects:[],createdAt:Date.now()};ms.eventLedger.push(ce);ms.committedEventIds.push(cid);}
  r.v18Event=event;r.v18Effects=effects;return event;
 }
 function explanationHtml(r){
  const rows=effectRows(r);const exact=Number(r?.atk?.value||0);
  const main=rows.filter(x=>x.kind!=='base').sort((a,b)=>Math.abs(b.value)-Math.abs(a.value)).slice(0,3);
  return `<div class="v18-explain-summary"><b>为何形成这个结果？</b><p>${esc(r?.atkTeam||'进攻方')}本回合进攻质量 <strong>${Math.round(exact)}</strong>，${r?.diff>10?'整体占优':r?.diff<-10?'受到防守明显限制':'双方接近均势'}。</p></div><div class="v18-effect-list">${rows.map(x=>`<div><span>${esc(x.label)}</span><b class="${x.value>=0?'pos':'neg'}">${x.kind==='base'?'':x.value>=0?'+':''}${Math.round(x.value*10)/10}</b></div>`).join('')}</div>${main.length?`<p class="small">关键影响：${main.map(x=>`${esc(x.label)} ${x.value>=0?'+':''}${Math.round(x.value*10)/10}`).join(' · ')}</p>`:''}<p class="small">技能与组合数字均直接读取本回合真实结算；“临场波动”表示比赛随机性，不代表隐藏操控。</p>`;
 }
 function renderResult(r,ms){
  if(!r||!ms)return;ensureMatch(ms);commitRound(ms,r);
  const clock=document.getElementById('v18Clock');if(clock)clock.textContent=clockLabel(ms);
  const phase=document.getElementById('v18Phase');if(phase)phase.textContent=phaseLabel(ms);
  const stream=document.getElementById('liveMatchStream');if(stream){const e=r.v18Event;const line=document.createElement('div');line.className=`v18-live-item ${e?.importance||'L0'}`;line.innerHTML=`<b>${esc(clockLabel({minute:r.minute,second:ms.second,half:ms.half}))} · ${esc(eventTitle(r))}</b><span>${esc(evidenceText(r))}</span>`;stream.prepend(line);while(stream.children.length>6)stream.lastElementChild.remove();}
  const caps=document.getElementById('effectCapsules');if(caps){const effects=(r.v18Effects||[]).filter(x=>x.label!=='牌阵基础质量').sort((a,b)=>Math.abs(b.value)-Math.abs(a.value)).slice(0,3);caps.innerHTML=effects.length?effects.map(x=>`<span class="v18-effect-chip">${esc(x.label)} ${x.value>=0?'+':''}${Math.round(x.value*10)/10}</span>`).join(''):'<span class="v18-effect-chip muted">本回合无显著额外加成</span>';}
  const why=document.getElementById('v18WhyBody');if(why)why.innerHTML=explanationHtml(r);
  const btn=document.getElementById('v18WhyToggle');if(btn)btn.classList.remove('hidden');
 }
 function resetUI(ms){ensureMatch(ms);const s=document.getElementById('liveMatchStream');if(s)s.innerHTML='<div class="v18-live-empty">比赛开始后，这里会显示最近事件。</div>';const c=document.getElementById('effectCapsules');if(c)c.innerHTML='';const w=document.getElementById('v18WhyBody');if(w)w.innerHTML='<p class="small">完成一个回合后可查看真实结算来源。</p>';const b=document.getElementById('v18WhyToggle');if(b)b.classList.add('hidden');const clk=document.getElementById('v18Clock');if(clk)clk.textContent=clockLabel(ms||{});const ph=document.getElementById('v18Phase');if(ph)ph.textContent=phaseLabel(ms||{});}
 function timelineHtml(ms){ensureMatch(ms);const ev=(ms.eventLedger||[]).slice().sort((a,b)=>a.sequence-b.sequence);if(!ev.length)return '<p class="small">暂无V1.8事件记录。</p>';return `<div class="v18-timeline">${ev.map(e=>`<div class="v18-timeline-row"><time>${esc(clockLabel({minute:e.minute,second:e.second}))}</time><span><b>${esc(e.title)}</b><small>${esc(e.summary||'')}</small></span></div>`).join('')}</div>`}
 function storyHtml(ms){ensureMatch(ms);const ev=(ms.eventLedger||[]);const major=ev.filter(e=>e.importance==='L3'||e.importance==='L2').slice(-5);if(!major.length)return '<p>本场以防守与中场博弈为主，没有出现需要特别强化的关键事件。</p>';return `<div class="v18-story">${major.map(e=>`<p><b>${esc(clockLabel({minute:e.minute,second:e.second}))}</b> ${esc(e.title)}${e.summary?`<br><span>${esc(e.summary)}</span>`:''}</p>`).join('')}</div>`}
 function integrity(ms){ensureMatch(ms);const ids=(ms.eventLedger||[]).map(x=>x.id),dup=ids.length-new Set(ids).size;const bad=(ms.eventLedger||[]).filter(e=>!e.id||!Number.isFinite(e.minute)||e.minute<0);const eventSet=new Set(ids);const orphan=(ms.effectLedger||[]).filter(x=>!x.id||!eventSet.has(x.eventId)||!Number.isFinite(Number(x.value)));const badClock=(ms.eventLedger||[]).some((e,i,a)=>i>0&&(Number(e.minute)<Number(a[i-1].minute)));return {ok:dup===0&&bad.length===0&&orphan.length===0&&!badClock,duplicateEvents:dup,badEvents:bad.length,orphanEffects:orphan.length,badClock,eventCount:ids.length,effectCount:(ms.effectLedger||[]).length}}
 window.V18Experience={ensureMatch,clockLabel,phaseLabel,commitRound,renderResult,resetUI,timelineHtml,storyHtml,integrity,explanationHtml};
})();

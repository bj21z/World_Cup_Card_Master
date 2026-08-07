(function(){
 function worldCupTeams(){return Object.values(window.WORLD_CUP_GROUPS||{}).flat()}
 function audit(){
   const teams=worldCupTeams(), missingTeams=[], badCount=[], simulatedLabels=[];
   let total=0;
   teams.forEach(t=>{
     const r=(window.PLAYER_DATA||{})[t];
     if(!r)missingTeams.push(t);
     else {total+=r.length;if(r.length!==26)badCount.push({team:t,count:r.length});}
   });
   document.querySelectorAll('option,.meta,.small,p,span').forEach(el=>{
     if(/球队模拟/.test(el.textContent||''))simulatedLabels.push((el.textContent||'').trim().slice(0,100));
   });
   return {teamsExpected:48,teamsReal:48-missingTeams.length,playersExpected:1248,playersReal:total,missingTeams,badCount,simulatedLabels,ok:missingTeams.length===0&&badCount.length===0&&total===1248&&simulatedLabels.length===0};
 }
 function render(){
   const host=document.getElementById('realSquadAudit');if(!host)return;
   const a=audit(),m=window.REAL_WORLD_CUP_2026_META||{};
   host.innerHTML=`<div class="hero-card"><div><div class="eyebrow">REAL WORLD CUP DATA</div><h2>48队全员实名名单 · V3.1</h2><p>球员身份与世界杯位置组来自真实赛事名单；能力数值属于游戏模型，不冒充官方评分。</p></div><span class="pill">${a.ok?'✓ FULL':'⚠ CHECK'}</span></div>
   <div class="statline"><div class="mini">球队<br><b>${a.teamsReal}/48</b></div><div class="mini">实名球员<br><b>${a.playersReal}/1248</b></div><div class="mini">模拟球队标签<br><b>${a.simulatedLabels.length}</b></div><div class="mini">名单异常<br><b>${a.badCount.length}</b></div></div>
   <div class="notice compact"><b>数据快照：</b>${m.snapshot||''}<br><b>数据库：</b>${m.databaseVersion||''}<br><b>评分说明：</b>身份/位置组是真实名单数据；速度、射门、传球等0—100数值是游戏模型。</div>`;
 }
 document.addEventListener('DOMContentLoaded',()=>setTimeout(render,100));
 window.RealSquadAudit={audit,render};
})();
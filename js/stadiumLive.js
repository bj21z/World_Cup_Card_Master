(function(){
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 function clock(ms){return window.V18Experience?V18Experience.clockLabel(ms):`${Number(ms?.minute||0)}'`}
 function add(text,tone='normal',ms=window.match){
   const host=document.getElementById('stadiumCommentary');if(!host)return;
   const row=document.createElement('div');row.className=`commentary-line ${tone}`;
   row.innerHTML=`<time>${esc(clock(ms||{}))}</time><span>${esc(text)}</span>`;
   host.prepend(row);while(host.children.length>12)host.lastElementChild.remove();
 }
 function atmosphere(ms,r){
   const el=document.getElementById('stadiumAtmosphere');if(!el||!ms)return;
   let label='看台正在等待比赛升温',level=28;
   const d=Math.abs(Number(ms.scoreA||0)-Number(ms.scoreB||0));
   if(r?.goal||r?.counter){label='全场沸腾！关键进球点燃看台';level=100}
   else if(r?.shot){label='一阵惊呼！这次攻门让看台紧张起来';level=78}
   else if(Number(ms.minute||0)>=80&&d<=1){label='比赛进入窒息时刻，观众几乎全部起立';level=88}
   else if(r?.atk?.combo||r?.atk?.skill){label='漂亮的连续配合赢得掌声';level=65}
   else if(Number(ms.minute||0)>=45){label='比赛节奏持续升温';level=50}
   el.innerHTML=`<b>🏟️ ${label}</b><i><span style="width:${level}%"></span></i>`;
 }
 function opening(ms){const host=document.getElementById('stadiumCommentary');if(host)host.innerHTML='';add(`主裁判准备就绪，${ms.teamA} 对阵 ${ms.teamB}，比赛即将开始。`,'opening',ms);atmosphere(ms)}
 function preview(ms,p){add(`${p.atk}组织${p.scene?.name||'一次进攻'}，${p.def}防线开始移动，双方正在争夺这次局部对抗。`,'build',ms);atmosphere(ms)}
 function round(ms,r){
   const details=(r.atk?.details||[]).slice(0,2);
   if(details.length)add(`技术席提示：${details.join('；')}，这些效果已经计入本回合进攻质量。`,'skill',ms);
   if(r.cardEvent)add(`${r.cardEvent.player.name}被出示${r.cardEvent.type==='red'?'红牌':'黄牌'}，接下来的比赛局势可能发生变化。`,'card',ms);
   if(r.goal)add(`${r.scorer?.name||'进攻球员'}破门！${r.assist?`这次进球由${r.assist.name}送出助攻。`:'这次机会被直接转化成进球。'}`,'goal',ms);
   else if(r.counter)add(`反击打成！${r.scorer?.name||'反击球员'}抓住防线身后的空间完成致命一击。`,'goal',ms);
   else if(r.shot)add(`射门形成，但门将完成扑救！这次进攻距离改写比分只差最后一步。`,'save',ms);
   else if(r.diff>12)add(`${r.atkTeam}连续施压占据上风，不过${r.defTeam}守住了最后一道防线。`,'attack',ms);
   else if(r.diff<-12)add(`${r.defTeam}这次防守判断非常准确，提前切断了进攻线路。`,'defend',ms);
   else add(`双方在这一回合势均力敌，球权争夺仍然胶着。`,'normal',ms);
   if(Number(ms.minute||0)>=78){
     const d=Number(ms.scoreA||0)-Number(ms.scoreB||0);
     add(d===0?'最后阶段仍然平局，每一次球权都可能决定比赛。':`${d>0?ms.teamA:ms.teamB}带着领先进入最后阶段，另一方必须提高进攻效率。`,'analysis',ms);
   }
   atmosphere(ms,r);
 }
 function finish(ms){add(`全场比赛结束，最终比分 ${ms.teamA} ${ms.scoreA}—${ms.scoreB} ${ms.teamB}。`,'finish',ms);atmosphere(ms,{goal:true})}
 window.StadiumLive={add,opening,preview,round,finish,atmosphere};
})();
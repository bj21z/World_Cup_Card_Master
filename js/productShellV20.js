(function(){
 const $=id=>document.getElementById(id);
 function safeStore(){try{return window.Store?Store.load():{}}catch(_){return {}}}
 function updateVersion(){
  const v=(window.BUILD_CONFIG&&BUILD_CONFIG.version)||'V2.0', c=(window.BUILD_CONFIG&&BUILD_CONFIG.codename)||'Match Command';
  if($('headerVersion'))$('headerVersion').textContent=`${v} · ${c}`;
  if($('buildBadge'))$('buildBadge').textContent=v;
  document.title=`绿茵牌阵：世界杯征途 ${v} ${c}`;
  document.querySelectorAll('.footer').forEach(x=>x.textContent=`${v} · ${c} · Schema ${BUILD_CONFIG.schema} · 非官方非商业单机开发版 · 本地存档`);
 }
 function updateDashboard(){
  const d=safeStore(), team=$('quickA')?.value||d?.profile?.team||'西班牙';
  if($('commandTeamName'))$('commandTeamName').textContent=team;
  if($('commandTeamMeta')){try{$('commandTeamMeta').textContent=typeof summary==='function'?summary(team):'阵容已载入'}catch(_){$('commandTeamMeta').textContent='阵容已载入'}}
  const t=d.tour;
  if($('commandTourState'))$('commandTourState').textContent=!t?'等待开始':(t.completed?'本届已结束':(t.stage==='ko'?'淘汰赛进行中':'小组赛进行中'));
  if($('commandTourMeta'))$('commandTourMeta').textContent=!t?'进入世界杯页面选择球队并开赛。':`${t.team||team} · ${t.stage==='ko'?'淘汰赛':'小组赛'} · ${Array.isArray(t.matchReports)?t.matchReports.length:0} 场已记录`;
  const reports=t&&Array.isArray(t.matchReports)?t.matchReports:[]; const last=reports[reports.length-1];
  if($('commandLastMatch'))$('commandLastMatch').textContent=last?(last.title||last.score||'最近赛事已记录'):'暂无记录';
  if($('commandLastMeta'))$('commandLastMeta').textContent=last?(last.summary||'可在世界杯征途查看完整赛后报告。'):'完成首场比赛后，这里会显示最近赛事。';
  try{const r=window.GameValidationDepartment?.scan?.();if($('commandValidation'))$('commandValidation').textContent=r?(r.issues.length?`${r.issues.length}项待复核`:'当前扫描通过'):'独立验证中'}catch(_){ }
 }
 function bindCommandLinks(){document.querySelectorAll('[data-command-tab]').forEach(b=>b.onclick=()=>{const id=b.dataset.commandTab;if(typeof switchTab==='function')switchTab(id);else document.querySelector(`.tabs [data-tab="${id}"]`)?.click()})}
 function boot(){updateVersion();bindCommandLinks();setTimeout(updateDashboard,120);document.addEventListener('change',e=>{if(e.target&&e.target.id==='quickA')setTimeout(updateDashboard,0)})}
 document.addEventListener('DOMContentLoaded',boot);window.ProductShellV20={updateDashboard,updateVersion};
})();
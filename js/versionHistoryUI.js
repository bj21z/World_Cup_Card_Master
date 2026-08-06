const VersionHistoryUI=(()=>{
 function esc(x){return String(x??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
 function render(filter='全部'){
  const host=document.getElementById('versionHistoryCenter');if(!host)return;
  const all=window.VERSION_HISTORY||[];
  const stages=['全部',...new Set(all.map(x=>x.stage))];
  const rows=(filter==='全部'?all:all.filter(x=>x.stage===filter));
  host.innerHTML=`<div class="hero-card"><div><div class="eyebrow">PRODUCT EVOLUTION</div><h2>版本历史中心</h2><p>记录每次版本的重要变化、存档结构和产品阶段。升级时以此页面和根目录版本说明为准。</p></div><span class="pill">${all.length}个里程碑</span></div>
  <div class="history-filter">${stages.map(x=>`<button type="button" class="btn ${x===filter?'primary':''}" data-history-filter="${esc(x)}">${esc(x)}</button>`).join('')}</div>
  <div class="version-timeline">${rows.map((v,i)=>`<article class="version-entry ${i===0&&filter==='全部'?'latest':''}"><div class="version-marker"></div><div class="version-card"><div class="version-head"><div><span class="stage-badge">${esc(v.stage)}</span><h3>${esc(v.version)} · ${esc(v.title)}</h3></div><div class="version-meta">${esc(v.date)} · Schema ${esc(v.schema)}</div></div><ul>${v.highlights.map(h=>`<li>${esc(h)}</li>`).join('')}</ul>${i===0&&filter==='全部'?'<div class="notice compact"><b>当前版本：</b>V1.4.0已完成四阶段整合并正式发布为非官方、非商业、单机网页开发版；核心玩法持续创新评审继续作为重要会议固定新增议题。</div>':''}</div></article>`).join('')}</div>`;
  host.querySelectorAll('[data-history-filter]').forEach(b=>b.onclick=()=>render(b.dataset.historyFilter));
 }
 return {render};
})();
window.addEventListener('load',()=>VersionHistoryUI.render());

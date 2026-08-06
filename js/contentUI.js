(function(){
 function esc(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
 function badge(text,kind=''){return `<span class="content-badge ${kind}">${esc(text)}</span>`}
 function render(){const g=window.CONTENT_GOVERNANCE;if(!g)return;let el=document.getElementById('contentCenter');if(!el)return;
  const tier=(name,list,kind)=>`<div class="box"><h3>${name} ${badge(list.length+'队',kind)}</h3><div class="tag-cloud">${list.map(x=>badge(x,kind)).join('')}</div></div>`;
  el.innerHTML=`<div class="hero-card"><div><div class="eyebrow">CONTENT & PRODUCT GOVERNANCE</div><h2>内容与产品结构中心</h2><p>统一管理精细球队覆盖、雷达图口径、数据可信度、授权状态、任务层级和商业化边界。</p></div>${badge(g.version,'ok')}</div>
  <div class="three-col">${tier('精细阵容层',g.teamTiers.precision,'ok')}${tier('标准球队层',g.teamTiers.standard,'warn')}${tier('占位球队层',g.teamTiers.placeholder,'muted')}</div>
  <div class="box"><h2>统一雷达图指标</h2><div class="metric-grid">${g.radarMetrics.map(m=>`<div><b>${m}</b><p>${esc(g.metricNotes[m])}</p></div>`).join('')}</div><p class="small">雷达图始终固定六项，不因位置而改变轴顺序；门将通过防守、传球、身体及专属技能表达差异。</p></div>
  <div class="two-col"><div class="box"><h2>数据来源与更新制度</h2><p><b>评分性质：</b>${esc(g.sourcePolicy.ratingType)}</p><p><b>更新规则：</b>${esc(g.sourcePolicy.updateRule)}</p><p><b>商业边界：</b>${esc(g.sourcePolicy.commercialRule)}</p></div><div class="box"><h2>授权状态</h2><table><tr><th>项目</th><th>状态</th><th>使用边界</th></tr>${g.authorization.map(x=>`<tr><td>${esc(x.asset)}</td><td>${badge(x.status,x.status.includes('自研')?'ok':'warn')}</td><td>${esc(x.use)}</td></tr>`).join('')}</table></div></div>
  <div class="two-col"><div class="box"><h2>任务四层结构</h2>${g.taskLayers.map(x=>`<div class="governance-row"><b>${esc(x.name)}</b><span>${esc(x.goal)}</span>${badge(x.state,x.state==='已运行'?'ok':'warn')}</div>`).join('')}</div><div class="box"><h2>商业化公平边界</h2><h3>允许方向</h3><div class="tag-cloud">${g.premiumPolicy.map(x=>badge(x,'ok')).join('')}</div><h3>禁止方向</h3><div class="tag-cloud">${g.prohibitedMonetization.map(x=>badge(x,'danger')).join('')}</div></div></div>`;
 }
 window.addEventListener('DOMContentLoaded',render);window.ContentUI={render};
})();

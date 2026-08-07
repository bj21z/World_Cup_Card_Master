(function(){
 const KEY='wccm_v17_final_acceptance';
 const gates=[
  ['quick_match','快速比赛完整结束'],['group_stage','世界杯小组赛连续完成三场'],['knockout_switch','小组出线后正确切换淘汰赛'],['tour_return','淘汰赛结束后返回世界杯征程'],['stats_persist','射手榜、助攻榜和纪律榜持续累计'],['story_restore','比赛走势与赛事故事刷新后可恢复'],['recovery_hidden','比赛中不显示重复恢复卡片'],['overlay_clear','赛场事件提示自动消失且不阻断操作'],['safari_resume','Safari前后台切换不重复结算'],['schema_continue','Schema 23旧存档可继续'],['new_tour_growth','新开世界杯不清除永久成长'],['endurance_50','50场耐久门禁正常运行'],['version_unified','全程序版本标识统一'],['two_endings','淘汰与夺冠两种结局均已验证']
 ];
 function load(){try{return JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){return {}}}
 function save(v){localStorage.setItem(KEY,JSON.stringify(v));}
 function render(){
  const root=document.getElementById('finalAcceptanceCenter'); if(!root)return;
  const state=load();
  const done=gates.filter(([id])=>state[id]).length;
  root.innerHTML=`<div class="hero-card"><div><div class="eyebrow">FINAL RELEASE GATE</div><h2>V1.7最终真机验收中心</h2><p>仅记录你在真实设备上已经亲自完成的项目。程序级检查不能代替真机结果。</p></div><span class="pill">${done}/${gates.length} 已通过</span></div>
  <div class="box" style="margin-top:12px"><div class="acceptance-grid">${gates.map(([id,label],i)=>`<label class="acceptance-item"><input type="checkbox" data-gate="${id}" ${state[id]?'checked':''}><span><b>${i+1}. ${label}</b><small>${state[id]?'已确认':'待确认'}</small></span></label>`).join('')}</div>
  <div class="controls"><button id="exportAcceptance" class="btn primary">导出验收结果</button><button id="clearAcceptance" class="btn danger">清空验收记录</button></div><div class="notice compact">全部14项完成后，才具备召开V1.7.0正式发布批准会的事实基础。</div></div>`;
  root.querySelectorAll('[data-gate]').forEach(el=>el.addEventListener('change',()=>{const s=load();s[el.dataset.gate]=el.checked;s.updatedAt=new Date().toISOString();save(s);render();}));
  document.getElementById('clearAcceptance').onclick=()=>{if(confirm('确定清空全部验收记录吗？')){localStorage.removeItem(KEY);render();}};
  document.getElementById('exportAcceptance').onclick=()=>{
    const s=load(); const payload={build:(window.BUILD_CONFIG||{}).version,schema:(window.BUILD_CONFIG||{}).schema,updatedAt:s.updatedAt||null,passed:gates.filter(([id])=>s[id]).map(([,l])=>l),pending:gates.filter(([id])=>!s[id]).map(([,l])=>l)};
    const text=JSON.stringify(payload,null,2);
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(text).then(()=>alert('验收结果已复制。')).catch(()=>prompt('复制验收结果：',text));}else{prompt('复制验收结果：',text);}
  };
 }
 window.FinalAcceptanceUI={render};
 document.addEventListener('DOMContentLoaded',render);
})();

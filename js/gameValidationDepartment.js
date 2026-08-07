(function(){
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const experts=[
  ['验证总监','发布门禁、缺陷分级、跨组裁决'],
  ['足球规则专家','赛制、红黄牌、进球/助攻与比赛语义'],
  ['游戏系统专家','核心循环、玩法新鲜度、反馈闭环'],
  ['数值/概率专家','概率、技能封顶、平衡与可解释性'],
  ['QA自动化专家','回归、耐久、边界、重复提交'],
  ['iOS/Safari专家','触控、后台/锁屏恢复、WebKit生命周期'],
  ['数据完整性专家','存档迁移、幂等、事件账与赛事账'],
  ['UX/HCI专家','同屏决策、浮层阻断、信息层级'],
  ['无障碍专家','触控目标、可读性、状态提示'],
  ['性能专家','DOM增长、内存、长局响应'],
  ['内容/合规专家','球员/赛事素材权利与商业发布边界']
 ];
 function scan(){
  const m=window.match||null,t=window.tour||null, issues=[], pass=[];
  const add=(ok,id,sev,title,owner,detail)=>{(ok?pass:issues).push({id,sev,title,owner,detail})};
  add(typeof BUILD_CONFIG!=='undefined'&&BUILD_CONFIG.schema===24,'VAL-001','P0','Schema 24构建一致','数据组',`当前Schema ${BUILD_CONFIG?.schema??'?'}`);
  add(typeof V18Experience!=='undefined','VAL-002','P0','实况体验模块可用','比赛引擎组','V18Experience');
  if(m){
   const it=V18Experience.integrity(m);
   add(it.duplicateEvents===0,'VAL-101','P0','Event ID唯一','数据组',`重复 ${it.duplicateEvents}`);
   add((it.orphanEffects||0)===0,'VAL-102','P1','Effect均可追溯到Event','数据组',`孤儿Effect ${it.orphanEffects||0}`);
   add(!it.badClock,'VAL-103','P1','事件时间单调','比赛引擎组',it.badClock?'发现倒退':'正常');
   add(!/undefined|NaN/.test(document.querySelector('#match')?.innerText||''),'VAL-104','P1','比赛主界面无undefined/NaN','前端体验组','DOM文本扫描');
  } else pass.push({id:'VAL-100',sev:'INFO',title:'当前无进行中比赛',owner:'验证部',detail:'开始比赛后可增加实时检查'});
  if(t){
   const ids=t.ingestedMatchIds||[], uniq=new Set(ids);
   add(ids.length===uniq.size,'VAL-201','P0','世界杯入账matchId唯一','赛事系统组',`记录 ${ids.length}`);
  }
  add(!document.querySelector('.event-overlay.show') || !document.querySelector('#modal.show'),'VAL-301','P1','关键浮层与赛后模态不叠加','UX组','防止双层阻断');
  return {at:new Date().toISOString(),issues,pass,experts};
 }
 function render(){
  const host=document.getElementById('validationDepartment');if(!host)return;
  const r=scan(), rank={P0:0,P1:1,P2:2,P3:3,INFO:9};r.issues.sort((a,b)=>(rank[a.sev]??8)-(rank[b.sev]??8));
  host.innerHTML=`<div class="hero-card"><div><div class="eyebrow">INDEPENDENT GAME VALIDATION</div><h2>游戏验证部门 · V2.0</h2><p>验证部独立发现、排序和移交问题；开发组负责论证与修复，验证部负责复验，不允许开发者自批自验。</p></div><span class="pill">${r.issues.length?'发现 '+r.issues.length+' 项':'当前扫描通过'}</span></div>
  <div class="two-col"><div class="box"><h3>专家席位与专长</h3>${experts.map(x=>`<p><b>${esc(x[0])}</b><br><span class="small">${esc(x[1])}</span></p>`).join('')}</div>
  <div class="box"><h3>验证→开发移交流程</h3><p>验证部发现 → P0/P1/P2排序 → 对应核心组复现 → 技术/玩法论证 → 修复 → 回归 → 验证部复验 → 发布门禁。</p><button id="runValidationDept" class="btn primary full">重新运行验证部门扫描</button><div class="notice compact">P0/P1不得带入下一发布候选；P2原则上关闭；建议项不自动改变核心数值。</div></div></div>
  <div class="box" style="margin-top:12px"><h3>当前问题排序</h3>${r.issues.length?r.issues.map(x=>`<div class="qa-row bad"><b>${x.sev} · ${esc(x.id)} · ${esc(x.title)}</b><span>${esc(x.owner)}｜${esc(x.detail)}</span></div>`).join(''):'<div class="qa-row ok"><b>✓ 当前可自动检查项未发现阻断</b><span>真机Safari、锁屏恢复与真实长时间体验仍需设备验证。</span></div>'}</div>
  <div class="box" style="margin-top:12px"><h3>已通过检查</h3>${r.pass.map(x=>`<div class="qa-row ok"><b>✓ ${esc(x.id)} · ${esc(x.title)}</b><span>${esc(x.detail)}</span></div>`).join('')}</div>`;
  document.getElementById('runValidationDept').onclick=render;
  window.lastValidationDepartmentReport=r;
 }
 document.addEventListener('DOMContentLoaded',()=>setTimeout(render,80));
 window.GameValidationDepartment={scan,render,experts};
})();
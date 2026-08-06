(function(){
 const steps=[
 {title:'选择你的国家队',body:'先从大厅选择一支国家队。每队拥有不同阵型、风格和球员组合。',tab:'home'},
 {title:'认识动态牌阵',body:'真实比赛有1对1突破、2人配合与3人连续传切，因此每回合会随机出现1—3张球员卡。',tab:'match'},
 {title:'作出战术决定',body:'根据场景选择控球、直塞、边路、高压等策略。战术会改变体能、射门机会和反击风险。',tab:'match'},
 {title:'看懂概率解释',body:'结算会说明牌阵差、技能、组合、门将和战术影响。可在Beta中心选择完整、简化或展开模式。',tab:'match'},
 {title:'进入世界杯征途',body:'完成教学后，从小组赛一路挑战淘汰赛。球员经验、训练和成长会持续继承。',tab:'tour'}
 ];
 function ensure(save){save.tutorial=save.tutorial||{completed:false,step:0,skipped:false}}
 function start(save){ensure(save);save.tutorial.step=0;render(save)}
 function render(save){ensure(save);let s=steps[save.tutorial.step];if(!s){save.tutorial.completed=true;Store.save(save);document.querySelector('#tutorialModal')?.classList.remove('show');return}let m=document.querySelector('#tutorialModal');m.querySelector('#tutorialStep').textContent=`${save.tutorial.step+1}/${steps.length}`;m.querySelector('#tutorialTitle').textContent=s.title;m.querySelector('#tutorialBody').textContent=s.body;m.classList.add('show')}
 function next(save){save.tutorial.step++;render(save)}
 function skip(save){ensure(save);save.tutorial.skipped=true;save.tutorial.completed=true;Store.save(save);document.querySelector('#tutorialModal')?.classList.remove('show')}
 window.Tutorial={steps,ensure,start,next,skip,render};
})();
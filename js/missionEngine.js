(function(){
 const dayKey=()=>new Date().toISOString().slice(0,10);function weekKey(){let d=new Date(),one=new Date(d.getFullYear(),0,1),w=Math.ceil((((d-one)/86400000)+one.getDay()+1)/7);return `${d.getFullYear()}-W${w}`}
 function ensure(save){save.missions=save.missions||{};let dk=dayKey(),wk=weekKey();if(save.missions.dayKey!==dk){save.missions.dayKey=dk;save.missions.daily={};}if(save.missions.weekKey!==wk){save.missions.weekKey=wk;save.missions.weekly={};}save.missions.metrics=save.missions.metrics||{daily:{},weekly:{},teams:[]};}
 function add(save,metric,amount=1,team=null){ensure(save);['daily','weekly'].forEach(t=>save.missions.metrics[t][metric]=(save.missions.metrics[t][metric]||0)+amount);if(team&&!save.missions.metrics.teams.includes(team))save.missions.metrics.teams.push(team)}
 function progress(save,def){ensure(save);if(def.metric==='teams')return Math.min(def.goal,save.missions.metrics.teams.length);return Math.min(def.goal,save.missions.metrics[def.type][def.metric]||0)}
 function claim(save,id){ensure(save);let d=MISSION_DEFS.find(x=>x.id===id);if(!d)return {ok:false,msg:'任务不存在'};let bucket=save.missions[d.type];if(bucket[id])return {ok:false,msg:'已领取'};if(progress(save,d)<d.goal)return {ok:false,msg:'尚未完成'};bucket[id]=true;Economy.grant(save,d.reward,`任务：${d.title}`);return {ok:true,reward:d.reward}}
 function list(save,type){return MISSION_DEFS.filter(x=>x.type===type).map(d=>({...d,progress:progress(save,d),claimed:!!save.missions[type]?.[d.id]}))}
 window.Missions={ensure,add,claim,list};
})();
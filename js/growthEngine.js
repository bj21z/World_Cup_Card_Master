
(function(){
 const POS_POOL=['GK','RB','CB','CB','LB','DM','CM','CM','AM','RW','LW','ST','ST','SS','DM','GK'];
 const CN_POS={GK:'门将',RB:'右后卫',LB:'左后卫',CB:'中卫',DM:'后腰',CM:'中场',AM:'前腰',RW:'右边锋',LW:'左边锋',ST:'中锋',SS:'影锋'};
 const BASE_STATS={GK:[60,25,72,65,88,82],CB:[68,45,70,64,84,86],RB:[80,60,76,76,78,78],LB:[80,60,76,76,78,78],DM:[74,68,80,76,82,82],CM:[76,72,82,80,74,78],AM:[80,78,85,86,58,72],RW:[86,78,78,86,48,72],LW:[86,78,78,86,48,72],ST:[80,84,72,78,45,84],SS:[82,82,80,84,48,76]};
 function strengthOf(team){return (TEAM_META[team]&&TEAM_META[team].strength)||74}
 function clamp(v,min=1,max=99){return Math.max(min, Math.min(max, Math.round(v)))}
 function generatedRoster(team){
   const s=strengthOf(team); const style=(TEAM_META[team]&&TEAM_META[team].style)||'均衡';
   return POS_POOL.map((pos,i)=>{let raw=BASE_STATS[pos].map((x,j)=>clamp(x+(s-78)*.65+(Math.sin((i+1)*(j+2))*4)));let base=clamp(s+(i<11?2:0)+(pos==='GK'?0:Math.sin(i)*3));return {id:team+'|模拟'+(i+1),team,name:team+'·'+CN_POS[pos]+(i+1),pos,base,stats:raw,skills:i<3?[style+'核心']:[],xp:0,level:1,idx:i,sim:true};});
 }
 function normalize(team,p,i,save){let [name,pos,ovr,stats,skills=[]]=p;let id=team+'|'+name;let boost=(save.boost&&save.boost[id])||[0,0,0,0,0,0];let xp=(save.xp&&save.xp[id])||0;return {id,team,name,pos,base:ovr,stats:stats.map((x,j)=>clamp(x+boost[j])),skills:[...skills],xp,level:1+Math.floor(xp/100),idx:i,sim:false};}
 function roster(team,save,all=false){ if(PLAYER_DATA[team]) return PLAYER_DATA[team].slice(0, all?99:16).map((p,i)=>normalize(team,p,i,save||window.save)); return generatedRoster(team); }
 function starters(team,save){ return roster(team,save).slice(0,11); }
 function overall(p){return clamp(p.stats.reduce((a,b)=>a+b,0)/6*.62+p.base*.38)}
 function captain(team,save){return starters(team,save).slice().sort((a,b)=>overall(b)-overall(a))[0]}
 function award(team,save,result,usedIds=[]){let win=result==='win',draw=result==='draw';let xp=win?BALANCE.xpWin:(draw?BALANCE.xpDraw:BALANCE.xpLoss);let coins=win?BALANCE.coinWin:(draw?BALANCE.coinDraw:BALANCE.coinLoss);save.coins=(save.coins||0)+coins;if(win)save.wins=(save.wins||0)+1;starters(team,save).forEach(p=>{let extra=usedIds.includes(p.id)?12:0;save.xp[p.id]=(save.xp[p.id]||0)+xp+extra+Math.floor(Math.random()*8);});return {xp,coins};}
 function train(id,save){ if((save.coins||0)<BALANCE.trainCost) return {ok:false,msg:'金币不足，请通过比赛获得金币。'}; save.coins-=BALANCE.trainCost; let idx=Math.floor(Math.random()*6); save.boost[id]=save.boost[id]||[0,0,0,0,0,0]; save.boost[id][idx]=Math.min(15,(save.boost[id][idx]||0)+1+Math.floor(Math.random()*2)); save.xp[id]=(save.xp[id]||0)+22; return {ok:true,idx,stat:STAT_NAMES[idx]}; }
 window.Growth={roster,starters,overall,captain,award,train,strengthOf,CN_POS,clamp};
})();

(function(){
 const formations={
  '4-3-3':{slots:['GK','RB','CB','CB','LB','DM','CM','CM','RW','ST','LW'],desc:'边路宽度大，边锋和边后卫出现概率提高。'},
  '4-2-3-1':{slots:['GK','RB','CB','CB','LB','DM','DM','AM','RW','ST','LW'],desc:'攻守均衡，前腰是组织核心。'},
  '4-4-2':{slots:['GK','RB','CB','CB','LB','CM','CM','RW','LW','ST','ST'],desc:'双前锋连携稳定，结构清晰。'},
  '3-5-2':{slots:['GK','CB','CB','CB','DM','CM','CM','RW','LW','ST','ST'],desc:'中场人数占优，但边路身后有风险。'},
  '3-4-3':{slots:['GK','CB','CB','CB','CM','CM','RW','LW','ST','ST','SS'],desc:'强势进攻，前场牌阵出现率高。'},
  '5-3-2':{slots:['GK','RB','CB','CB','CB','LB','DM','CM','CM','ST','ST'],desc:'防守反击，门将和中卫权重提高。'}
 };
 function defaultState(team,save){let roster=Growth.roster(team,save,true);return {formation:(TEAM_META[team]||{}).formation in formations?(TEAM_META[team]||{}).formation:'4-3-3',starters:roster.slice(0,11).map(p=>p.id),bench:roster.slice(11).map(p=>p.id),captainId:Growth.captain(team,save).id,setPieceId:(roster.find(p=>['AM','CM','RW','LW','ST'].includes(p.pos))||roster[0]).id};}
 function get(team,save){save.lineups=save.lineups||{};if(!save.lineups[team])save.lineups[team]=defaultState(team,save);let st=save.lineups[team],roster=Growth.roster(team,save,true),ids=new Set(roster.map(p=>p.id));st.starters=(st.starters||[]).filter(x=>ids.has(x));st.bench=(st.bench||[]).filter(x=>ids.has(x));roster.forEach(p=>{if(!st.starters.includes(p.id)&&!st.bench.includes(p.id))st.bench.push(p.id)});while(st.starters.length<11&&st.bench.length)st.starters.push(st.bench.shift());return st;}
 function players(team,save,type='starters'){let st=get(team,save),map=Object.fromEntries(Growth.roster(team,save,true).map(p=>[p.id,p]));return st[type].map(id=>map[id]).filter(Boolean)}
 function swap(team,save,a,b){let st=get(team,save),ai=st.starters.indexOf(a),bi=st.bench.indexOf(b);if(ai<0||bi<0)return false;st.starters[ai]=b;st.bench[bi]=a;return true}
 function setFormation(team,save,f){if(formations[f])get(team,save).formation=f}
 function fitnessInit(team,save){return Object.fromEntries(players(team,save,'starters').map(p=>[p.id,100]).concat(players(team,save,'bench').map(p=>[p.id,100])))}
 window.Lineup={formations,get,players,swap,setFormation,fitnessInit};
})();
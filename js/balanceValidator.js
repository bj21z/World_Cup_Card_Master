(function(){
 function summarize(matrix,type){let rows=[];Object.entries(matrix).forEach(([name,row])=>{let vals=Object.values(row),win=vals.reduce((s,x)=>s+x.win,0)/vals.length,goals=vals.reduce((s,x)=>s+x.goals,0)/vals.length;let status=win>58?'偏强':win<42?'偏弱':'正常';rows.push({type,name,win:+win.toFixed(1),goals:+goals.toFixed(2),status})});return rows.sort((a,b)=>b.win-a.win)}
 function validate(report){let rows=[...summarize(report.formations,'阵型'),...summarize(report.tactics,'战术')],alerts=rows.filter(x=>x.status!=='正常');return {rows,alerts,passed:alerts.length===0,generatedAt:new Date().toISOString(),perPair:report.perPair}}
 window.BalanceValidator={validate};
})();
(function(){
 function download(name,type,text){let b=new Blob([text],{type}),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000)}
 function json(save){download('green_pitch_beta_report.json','application/json',JSON.stringify({exportedAt:new Date().toISOString(),analytics:Analytics.summary(save),economy:Economy.report(save),shop:Shop.report(save),history:save.history||[],feedback:save.feedbackDraft||{}},null,2))}
 function csv(save){let rows=['date,teamA,score,teamB'];(save.history||[]).forEach(x=>rows.push([x.date,x.a,x.score,x.b].map(v=>`"${String(v).replace(/"/g,'""')}"`).join(',')));download('green_pitch_matches.csv','text/csv;charset=utf-8','\ufeff'+rows.join('\n'))}
 window.ReportExporter={json,csv};
})();
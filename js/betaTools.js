(function(){
 function ensure(save){save.bugReports=save.bugReports||[];save.releaseLogs=save.releaseLogs||[];save.backups=save.backups||[]}
 function log(save,type,data={}){ensure(save);save.releaseLogs.push({time:new Date().toISOString(),type,...data});if(save.releaseLogs.length>3000)save.releaseLogs=save.releaseLogs.slice(-3000)}
 function backup(save){ensure(save);let data=JSON.stringify(save);let rec={id:'BK-'+Date.now(),time:new Date().toISOString(),data};save.backups.unshift(rec);save.backups=save.backups.slice(0,5);Store.save(save);return rec}
 function restore(save,id){ensure(save);let b=save.backups.find(x=>x.id===id);if(!b)return null;let n=JSON.parse(b.data);localStorage.setItem('worldCupCardMasterSave',JSON.stringify(n));return n}
 function report(save,r){ensure(save);let x={id:'BUG-'+Date.now(),status:'New',time:new Date().toISOString(),buildId:BetaRelease.config.buildId,device:BetaRelease.device(),...r};save.bugReports.unshift(x);Store.save(save);return x}
 function exportAll(save){ensure(save);return {meta:BetaRelease.device(),config:BetaRelease.config,save,logs:save.releaseLogs,bugs:save.bugReports}}
 window.BetaTools={ensure,log,backup,restore,report,exportAll};
})();
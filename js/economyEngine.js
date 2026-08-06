(function(){
 function ensure(save){save.economyLog=save.economyLog||[];return save}
 function grant(save,amount,reason){ensure(save);amount=Math.max(0,Math.floor(amount));save.coins=(save.coins||0)+amount;save.economyLog.unshift({at:new Date().toISOString(),amount,reason});save.economyLog=save.economyLog.slice(0,100);return amount}
 function spend(save,amount,reason){ensure(save);if((save.coins||0)<amount)return false;save.coins-=amount;save.economyLog.unshift({at:new Date().toISOString(),amount:-amount,reason});return true}
 function report(save){let log=save.economyLog||[],income=log.filter(x=>x.amount>0).reduce((s,x)=>s+x.amount,0),spendv=-log.filter(x=>x.amount<0).reduce((s,x)=>s+x.amount,0);return {coins:save.coins||0,income,spend:spendv,net:income-spendv,trainingCost:ECONOMY_CONFIG.trainingCost}}
 window.Economy={grant,spend,report};
})();
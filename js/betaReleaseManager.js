(function(){
 const K='greenPitchBetaConfig';
 function load(){let c={...BETA_RELEASE_CONFIG};try{Object.assign(c,JSON.parse(localStorage.getItem(K)||'{}'))}catch(e){};let g=c.groups[c.testerGroup]||c.groups.A;c.shopMode=g.shopMode;return c}
 let config=load();
 function saveConfig(p){Object.assign(config,p);let g=config.groups[config.testerGroup]||config.groups.A;config.shopMode=g.shopMode;localStorage.setItem(K,JSON.stringify(config));return config}
 function device(){return {buildId:config.buildId,group:config.testerGroup,shopMode:config.shopMode,probabilityMode:config.probabilityMode,userAgent:navigator.userAgent,language:navigator.language,screen:`${screen.width}x${screen.height}`,viewport:`${innerWidth}x${innerHeight}`,online:navigator.onLine,platform:navigator.platform||'unknown',time:new Date().toISOString()}}
 function shouldShow(item){if(config.shopMode==='hidden')return false;if(config.shopMode==='cosmetic')return item.category!=='扩展内容';if(config.shopMode==='premium')return item.category==='扩展内容';return true}
 window.BetaRelease={config,saveConfig,device,shouldShow};
})();
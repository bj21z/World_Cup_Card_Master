(function(){
 const KEY='worldCupCardMasterSave';const VERSION=13;
 function fresh(){return {schemaVersion:VERSION,coins:500,wins:0,xp:{},boost:{},lineups:{},tour:null,history:[],versionSeen:null,analytics:{matches:0,wins:0,draws:0,losses:0,goalsFor:0,goalsAgainst:0,tactics:{},formations:{}},coachReports:[],betaFeedback:[]}}
 function migrate(s){s=s||fresh();s.coins=Number(s.coins||0);s.wins=Number(s.wins||0);s.xp=s.xp||{};s.boost=s.boost||{};s.lineups=s.lineups||{};s.history=s.history||[];s.analytics=s.analytics||{matches:0,wins:0,draws:0,losses:0,goalsFor:0,goalsAgainst:0,tactics:{},formations:{}};s.coachReports=s.coachReports||[];s.betaFeedback=s.betaFeedback||[];s.schemaVersion=VERSION;return s}
 function load(){try{return migrate(JSON.parse(localStorage.getItem(KEY)))}catch(e){return fresh()}}
 function save(s){localStorage.setItem(KEY,JSON.stringify(migrate(s)))}
 function wipe(){localStorage.removeItem(KEY)}
 window.Store={load,save,wipe,VERSION};
})();
(function(){
 const KEY='worldCupCardMasterSave';const VERSION=12;
 function fresh(){return {schemaVersion:VERSION,coins:500,wins:0,xp:{},boost:{},lineups:{},tour:null,history:[],versionSeen:null}}
 function migrate(s){s=s||fresh();s.coins=Number(s.coins||0);s.wins=Number(s.wins||0);s.xp=s.xp||{};s.boost=s.boost||{};s.lineups=s.lineups||{};s.history=s.history||[];s.schemaVersion=VERSION;return s}
 function load(){try{return migrate(JSON.parse(localStorage.getItem(KEY)))}catch(e){return fresh()}}
 function save(s){localStorage.setItem(KEY,JSON.stringify(migrate(s)))}
 function wipe(){localStorage.removeItem(KEY)}
 window.Store={load,save,wipe,VERSION};
})();
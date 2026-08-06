
(function(){
 const KEY='wc-card-master-v11';
 const DEFAULT={coins:500,wins:0,xp:{},boost:{},tour:null,versionSeen:''};
 function load(){try{return Object.assign({}, DEFAULT, JSON.parse(localStorage.getItem(KEY)||'{}'))}catch(e){return structuredClone(DEFAULT)}}
 function save(s){localStorage.setItem(KEY, JSON.stringify(s));}
 function wipe(){localStorage.removeItem(KEY)}
 window.Store={KEY, DEFAULT, load, save, wipe};
})();

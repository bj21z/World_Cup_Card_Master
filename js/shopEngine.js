(function(){
 function interest(save,id){save.shopPrefs=save.shopPrefs||[];if(!save.shopPrefs.includes(id))save.shopPrefs.push(id);return SHOP_ITEMS.find(x=>x.id===id)}
 function integrity(){return SHOP_ITEMS.every(x=>x.fair===true)&&SHOP_ITEMS.every(x=>!/(能力|胜率|射门概率|必胜)/.test(x.desc))}
 function report(save){return {interested:(save.shopPrefs||[]).length,total:SHOP_ITEMS.length,integrity:integrity()}}
 window.Shop={interest,integrity,report};
})();
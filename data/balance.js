
window.SCENES = [
 {id:'middle',name:'中路推进',desc:'中场连续传导寻找直塞机会',atk:['CM','AM','DM','ST','SS'],def:['DM','CM','CB'],count:[2,3],goalBase:.10,counter:.04,atkWeights:{传球:.38,盘带:.28,身体:.12,射门:.12,速度:.10},defWeights:{防守:.42,身体:.22,传球:.18,速度:.18}},
 {id:'wing',name:'边路突破',desc:'边锋与边后卫在边线制造空间',atk:['RW','LW','RB','LB','ST'],def:['RB','LB','CB','DM'],count:[1,2,3],goalBase:.085,counter:.05,atkWeights:{速度:.35,盘带:.32,传球:.18,射门:.10,身体:.05},defWeights:{速度:.25,防守:.40,身体:.20,传球:.15}},
 {id:'finish',name:'禁区终结',desc:'禁区前沿出现射门或封堵',atk:['ST','SS','RW','LW','AM'],def:['GK','CB','DM'],count:[1,2],goalBase:.18,counter:.03,atkWeights:{射门:.45,身体:.20,盘带:.18,传球:.10,速度:.07},defWeights:{防守:.42,身体:.25,速度:.10,传球:.08,射门:.15}},
 {id:'counter',name:'快速反击',desc:'抢断后前场高速推进',atk:['RW','LW','ST','SS','AM'],def:['CB','RB','LB','DM'],count:[2,3],goalBase:.13,counter:.07,atkWeights:{速度:.38,传球:.22,射门:.26,盘带:.14},defWeights:{速度:.30,防守:.38,身体:.22,传球:.10}},
 {id:'air',name:'高空轰炸',desc:'传中、争顶与第二落点',atk:['ST','CB','AM','RB','LB'],def:['GK','CB','DM'],count:[2,3],goalBase:.12,counter:.03,atkWeights:{身体:.36,射门:.28,传球:.18,防守:.08,速度:.10},defWeights:{身体:.32,防守:.42,速度:.08,传球:.08,射门:.10}},
 {id:'setpiece',name:'定位球',desc:'任意球或角球带来高价值机会',atk:['AM','CM','ST','CB'],def:['GK','CB','DM'],count:[1,2,3],goalBase:.14,counter:.025,atkWeights:{传球:.30,射门:.30,身体:.22,盘带:.10,速度:.08},defWeights:{防守:.40,身体:.25,传球:.10,速度:.05,射门:.20}},
 {id:'build',name:'后场出球',desc:'门将与后卫承受逼抢',atk:['GK','CB','DM','CM'],def:['ST','RW','LW','AM','CM'],count:[2,3],goalBase:.06,counter:.09,atkWeights:{传球:.38,防守:.20,身体:.18,盘带:.14,速度:.10},defWeights:{速度:.25,防守:.28,身体:.18,传球:.14,射门:.15}},
 {id:'panic',name:'门前危机',desc:'门将、后卫和前锋在门前乱战',atk:['ST','RW','LW','AM','CB'],def:['GK','CB','RB','LB','DM'],count:[1,2,3],goalBase:.20,counter:.02,atkWeights:{射门:.40,身体:.25,盘带:.15,速度:.10,传球:.10},defWeights:{防守:.45,身体:.23,速度:.08,传球:.06,射门:.18}}
];
window.BALANCE = {rounds:15,extraRounds:4,coinWin:300,coinDraw:160,coinLoss:90,xpWin:48,xpDraw:32,xpLoss:22,trainCost:120,thirdQualifiers:8,thirdAdvanced:8};

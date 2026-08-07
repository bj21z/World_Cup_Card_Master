window.VERSION_HISTORY = [
 {version:'V1.8 Alpha 2',date:'2026-08-07',stage:'Alpha测试版',title:'Live Match 实况比赛体验层',highlights:['新增动态足球比赛时钟与上下半场表达，后台仍保持回合制结算','新增LIVE实况事件流，比赛过程、技能与组合协同不再只存在于后台','新增为何形成这个结果解释入口，技能/组合/士气/临场波动直接读取真实结算','新增V1.8 Event Ledger、Effect Ledger与事件唯一ID，赛后提供比赛故事和完整时间轴','Schema升级至24：旧存档自动建立升级前快照并增量迁移；基于V1.7.0稳定母版开发'],schema:24},

 {version:'V1.7.0',date:'2026-08-07',stage:'正式发布版',title:'Match Director',highlights:['最终真机门禁全部通过：存档恢复、世界杯连续链路、Safari生命周期、淘汰与夺冠结局均正常','整合动态牌阵博弈2.0、比赛导演六状态、AI局势响应和世界杯赛事故事','修复高频事件浮层滞留、攻守身份固定显示和版本标识不一致问题','100场联合耐久门禁通过且未发现阻断性异常','保持Schema 23、既有数值规则和非付费竞技公平边界'],schema:23},

 {version:'V1.7 RC4',date:'2026-08-07',stage:'关键修复版',title:'Critical UX Hotfix',highlights:['修复攻守球队身份在结算对象中被覆盖导致双方长期固定显示进攻或防守','常规防线解围与普通扑救改为仅写入时间轴，不再弹出浮层','进球与组合技能提示采用硬清除、动画结束和独立看门狗三重关闭','最终验收中心新增直达50场联合耐久门禁入口','保持Schema 23与全部数值规则不变'],schema:23},
 {version:'V1.7 RC3',date:'2026-08-07',stage:'最终验证版',title:'Final Verification',highlights:['新增游戏内14项最终真机验收中心','保持玩法、数值、AI和Schema 23全部冻结','修正首页静态版本标题与欢迎说明残留','支持保存与导出真实设备验收结果','全部门禁完成前不宣称V1.7.0正式发布'],schema:23},

 {version:'V1.7 RC1',date:'2026-08-07',stage:'整合候选版',title:'Match Director四阶段整合',highlights:['整合比赛导演六状态、AI局势响应、世界杯连续征程与联合耐久门禁','冻结功能范围并进入完整世界杯真机回归','统一以buildConfig作为当前版本显示源','保持Schema 23并保留旧存档兼容方向','新增RC1整合范围、回归清单与回滚说明'],schema:23},

 {version:'V1.7 Alpha 4',date:'2026-08-07',stage:'联合验证版',title:'耐久性与整体验证门禁',highlights:['新增50至500场比赛导演自动耐久扫描','检查六种状态分布与故事重复度','增加本地存档容量和可读性审计','统一修复页面残留的旧版本与Schema标识','明确自动扫描与真实真机耐久测试边界'],schema:23},
 {version:'V1.6 RC4',date:'2026-08-07',stage:'候选修复版',title:'显示字段与数值解释修复',highlights:['修复回合分钟未写入pending导致undefined','所有回合标题增加安全兜底','进攻/防守数值明确为本回合综合质量','组合协同明确标注已计入进攻质量','形成射门概率增加玩家判断说明'],schema:22},
 {version:'V1.6 RC3',date:'2026-08-07',stage:'候选修复版',title:'淘汰赛与赛场交互Hotfix',highlights:['淘汰赛自动切换为淘汰赛进度视图','赛场事件改为顶部轻量提示','支持自动消失、点击关闭和切后台清理','组合技能展示参与球员、触发条件、结算依据和加成','统一页面版本标识为Schema 22'],schema:22},
 {version:'V1.6 RC2',date:'2026-08-07',stage:'候选版',title:'Dynamic Tactics 动态牌阵博弈2.0',highlights:['新增10回合比赛与3—5个关键战术时刻','四大战术、多义意图、坚持或变招','AI人格、渐进学习与战术欺骗','球员战术适应度与差异化转换成本','三节点赛后复盘与AI公平审计','修复Safari生命周期重复结算风险'],schema:22},
 {version:'V1.4.0',date:'2026-08-07',stage:'正式开发版',title:'赛场焕新版',highlights:['完成Sprint 1—4与RC阶段整合','新增启动更新说明和正式版本标识','保留完整版本历史中心','保持比赛数值与Schema 21不变','发布性质为非官方非商业单机网页开发版'],schema:21},
 {version:'V1.4 RC2',date:'2026-08-07',stage:'候选版',title:'版本历史与会议治理',highlights:['新增游戏内版本历史中心','版本可按阶段筛选并展开查看','重要会议固定加入核心玩法创新议题','主会议编号、顺序与原议题保持不变'],schema:21},
 {version:'V1.4 RC1',date:'2026-08-07',stage:'候选版',title:'四阶段整合候选版',highlights:['整合Sprint 1—4','统一构建标识','建立十二项回归清单','保持正式比赛数值不变'],schema:21},
 {version:'V1.4 Sprint 4',date:'2026-08-07',stage:'开发版',title:'内容与产品结构',highlights:['内容中心','球队内容三级分层','统一六维雷达指标','数据来源与授权状态治理'],schema:21},
 {version:'V1.4 Sprint 3',date:'2026-08-07',stage:'开发版',title:'AI与数值实验室',highlights:['逐回合批量模拟','换人收益分析','AI重复行为预警','长期免费经济模拟'],schema:20},
 {version:'V1.4 Sprint 2',date:'2026-08-07',stage:'开发版',title:'赛场演出升级',highlights:['1—3人差异化牌阵','进球、神扑、绝杀分级演出','球星与组合技能横幅','关键事件时间轴'],schema:19},
 {version:'V1.4 Sprint 1',date:'2026-08-07',stage:'开发版',title:'核心体验与稳定性',highlights:['首页主路径简化','比赛交互状态机','未完成比赛自动恢复','全局防重复点击与错误记录'],schema:18},
 {version:'V1.3.1 BC02',date:'2026-08-07',stage:'Beta修复版',title:'下一回合专项修复',highlights:['修复生成下一回合失效','触摸与点击双通道','异常可见与重试','自动滚动到战术区'],schema:17},
 {version:'V1.3.1 BC01',date:'2026-08-07',stage:'Beta候选版',title:'封闭测试修复版',highlights:['五步新手教学','A/B/C/D封测配置','Bug报告中心','存档备份与恢复'],schema:16},
 {version:'V1.3 Beta Sprint 3',date:'2026-08-07',stage:'Beta开发版',title:'平衡验证与验收中心',highlights:['Beta验收中心','阵型战术平衡预警','兼容与存档自检','商城战力隔离检查'],schema:15},
 {version:'V1.3 Beta Sprint 2',date:'2026-08',stage:'Beta开发版',title:'任务、经济与反馈',highlights:['每日与每周任务','免费经济循环','模拟商城','JSON与CSV导出'],schema:14},
 {version:'V1.3 Beta Sprint 1',date:'2026-08',stage:'Beta开发版',title:'数据与AI基础',highlights:['数据驾驶舱','AI教练','阵型战术矩阵','测试数据基础'],schema:13},
 {version:'V1.2',date:'2026-08',stage:'Alpha版',title:'世界杯征途与成长系统',highlights:['48队赛事结构','小组赛与淘汰赛','球员成长累积','阵容与换人'],schema:12},
 {version:'V1.1',date:'2026-08',stage:'Alpha版',title:'动态多人牌阵',highlights:['随机1—3张卡对抗','组合技能','科学概率判定','门将二次判定'],schema:11},
 {version:'V1.0',date:'2026-08',stage:'原型版',title:'足球桌牌核心原型',highlights:['11人球队','球员雷达图','翻牌能力对决','球星专属技能'],schema:10}
];

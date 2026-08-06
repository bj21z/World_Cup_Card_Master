# V1.3 Beta Sprint 1版本说明

## 改动摘要
- 完成V1.3工程骨架的第一批可运行功能。
- 新增 `advancedSimulation.js`、`analyticsEngine.js`、`coachEngine.js`。
- `storage.js` 升级到Schema 13。
- `index.html` 增加数据驾驶舱、AI教练和矩阵实验页面。
- `app.js` 增加比赛统计记录、教练报告和矩阵渲染。

## 新增文件
- js/advancedSimulation.js
- js/analyticsEngine.js
- js/coachEngine.js
- docs/SPRINT1_SCOPE.md

## 修改文件
- index.html
- js/app.js
- js/storage.js
- css/style.css
- README.md

## 删除文件
无。

## 升级方式
建议全量替换V1.2文件夹。旧LocalStorage将自动迁移到Schema 13。

## 回滚
保留V1.2压缩包；回滚后新增分析字段不会影响旧版核心金币、经验和阵容数据。

## 已知限制
矩阵模拟属于Sprint 1技术验证，尚非最终平衡结论。每日任务、模拟商城、经济系统与导出工具将在Sprint 2完成。

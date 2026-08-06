# V1.4.0「赛场焕新版」正式发布说明

## 本次改动摘要

- 将构建编号由V1.4-RC2统一为V1.4.0；
- 保持Schema 21，不制造无意义存档迁移；
- 更新首页、页脚、封测中心、启动更新弹窗和页面标题；
- 版本历史中心新增V1.4.0，同时保留RC2及全部历史；
- 修正Beta验收页中遗留的Schema 15显示为Schema 21；
- 新增正式发布说明、十二项验收报告和RC2回滚说明。

## 修改文件

- `index.html`：正式版标识、启动更新弹窗、发布说明和Schema显示；
- `data/betaReleaseConfig.js`：构建号更新为V1.4.0；
- `data/contentGovernance.js`：内容治理版本更新；
- `data/versionHistory.js`：新增V1.4.0历史记录；
- `js/versionHistoryUI.js`：当前版本说明更新；
- `README.md`、`VERSION_NOTES.md`：正式版交付说明。

## 新增文件

- `docs/V1.4.0_RELEASE_NOTES.md`
- `docs/V1.4.0_FINAL_ACCEPTANCE.md`
- `docs/V1.4.0_ROLLBACK_TO_RC2.md`

## 删除文件

无。

## 保持不变

球员能力、球队强度、阵型与战术系数、射门和扑救概率、技能触发概率、世界杯规则、金币奖励与训练价格均保持RC2基线不变。

## 是否需要全量替换

需要。不能只替换版本配置文件，否则页面标识、历史中心和脚本可能不一致。

## 缓存刷新

部署后清理Cloudflare缓存，并在iPhone Safari使用无痕窗口或关闭页面后重新打开。确认页脚显示`V1.4.0 · Schema 21`。

## 回滚

出现S0/S1故障时，恢复RC2全部文件。由于两者均为Schema 21，通常可继续使用同一存档；回滚前仍应导出备份。

# V1.3.1 Beta RC BC02 版本说明

## 本次改动摘要
专项修复iPhone Safari中“生成下一回合”点击无反馈问题，并强化整个关键比赛交互链路的可观测性与容错。

## 修改文件
- `js/app.js`：双通道事件绑定、防重复点击、异常捕获、自动滚动、日志反馈。
- `index.html`：按钮明确为普通按钮并增加无障碍状态。
- `css/style.css`：生成中动画和战术区高亮。
- `js/storage.js`：Schema 17迁移。
- `data/betaReleaseConfig.js`：构建号升级BC02。
- `README.md`、`VERSION_NOTES.md`：版本说明更新。

## 新增文件
- `docs/HOTFIX_BC02.md`
- `docs/SPECIAL_PROGRESS_REVIEW_MEETING.md`

## 删除文件
无。

## 保持不变
战术三牌引擎、球员数据、世界杯赛制、成长、任务、模拟商城、数据驾驶舱等主体功能保持不变。

## 部署
必须全量替换BC01，不能只上传单个脚本。部署后清除站点缓存或使用无痕窗口确认页脚显示BC02与Schema 17。

## 回滚
保留BC01压缩包；BC02存档升级具有向前兼容设计，但回滚前建议先导出存档备份。

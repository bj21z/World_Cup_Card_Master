# V1.3.1 Beta RC 版本说明

## 从V1.3 Sprint 3升级
新增封测专用基础设施，存档Schema升级至16。

## 新增文件
- data/betaReleaseConfig.js
- js/betaReleaseManager.js
- js/tutorialEngine.js
- js/betaTools.js
- js/betaReleaseUI.js
- docs/RELEASE_REHEARSAL.md
- docs/CLOSED_BETA_GUIDE.md

## 修改文件
- index.html
- css/style.css
- js/app.js
- js/storage.js

## 部署
全量替换旧版本文件；保留同域名可自动迁移旧本地存档。上传后刷新浏览器缓存。

## 回滚
回滚至Sprint 3前建议先在封测中心创建备份并导出测试报告。

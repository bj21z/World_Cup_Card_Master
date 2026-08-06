(function(){
 function saveDraft(save,data){save.feedbackDraft={...data,updatedAt:new Date().toISOString()};return save.feedbackDraft}
 function text(save){let d=save.feedbackDraft||{};return `《绿茵牌阵》Beta反馈\n评分：${d.rating||''}\n最喜欢：${d.favorite||''}\n最难理解：${d.confusing||''}\n建议：${d.suggestion||''}\n商业模式偏好：${d.business||''}\n是否认为商城影响公平：${d.fairness||''}`}
 window.Feedback={saveDraft,text};
})();
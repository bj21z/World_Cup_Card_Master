
window.WORLD_CUP_GROUPS = {
  A:['墨西哥','南非','韩国','捷克'],
  B:['加拿大','波黑','卡塔尔','瑞士'],
  C:['巴西','摩洛哥','海地','苏格兰'],
  D:['美国','巴拉圭','澳大利亚','土耳其'],
  E:['德国','库拉索','科特迪瓦','厄瓜多尔'],
  F:['荷兰','日本','瑞典','突尼斯'],
  G:['比利时','埃及','伊朗','新西兰'],
  H:['西班牙','佛得角','沙特阿拉伯','乌拉圭'],
  I:['法国','塞内加尔','伊拉克','挪威'],
  J:['阿根廷','阿尔及利亚','奥地利','约旦'],
  K:['葡萄牙','刚果民主共和国','乌兹别克斯坦','哥伦比亚'],
  L:['英格兰','克罗地亚','加纳','巴拿马']
};
window.TEAM_META = {
  '阿根廷':{strength:90,style:'灵魂组织',formation:'4-3-1-2'},'法国':{strength:91,style:'速度冲击',formation:'4-2-3-1'},'英格兰':{strength:89,style:'中轴压制',formation:'4-2-3-1'},'西班牙':{strength:90,style:'传控边锋',formation:'4-3-3'},'巴西':{strength:89,style:'桑巴爆破',formation:'4-3-3'},'葡萄牙':{strength:88,style:'巨星终结',formation:'4-2-3-1'},'德国':{strength:87,style:'机械推进',formation:'4-2-3-1'},'挪威':{strength:84,style:'直塞重炮',formation:'4-4-2'},
  '荷兰':{strength:86,style:'全攻全守',formation:'3-4-3'},'比利时':{strength:84,style:'中场创造',formation:'4-3-3'},'乌拉圭':{strength:84,style:'强硬冲击',formation:'4-4-2'},'克罗地亚':{strength:83,style:'中场控制',formation:'4-3-3'},'哥伦比亚':{strength:82,style:'边路节奏',formation:'4-2-3-1'},'摩洛哥':{strength:82,style:'防反韧性',formation:'5-4-1'},'日本':{strength:81,style:'快速传切',formation:'4-3-3'},'美国':{strength:80,style:'活力冲刺',formation:'4-3-3'},
  '墨西哥':{strength:79,style:'高压转换',formation:'4-2-3-1'},'南非':{strength:73,style:'速度反击',formation:'4-4-2'},'韩国':{strength:80,style:'奔跑压迫',formation:'4-2-3-1'},'捷克':{strength:77,style:'高点冲击',formation:'4-2-3-1'},
  '加拿大':{strength:78,style:'边路速度',formation:'4-4-2'},'波黑':{strength:76,style:'技术中场',formation:'4-3-3'},'卡塔尔':{strength:72,style:'区域防守',formation:'5-3-2'},'瑞士':{strength:81,style:'稳固平衡',formation:'4-2-3-1'},
  '海地':{strength:69,style:'黑马冲刺',formation:'4-4-2'},'苏格兰':{strength:77,style:'身体对抗',formation:'3-5-2'},'巴拉圭':{strength:76,style:'防守反击',formation:'4-4-2'},'澳大利亚':{strength:76,style:'空中力量',formation:'4-4-2'},'土耳其':{strength:80,style:'年轻创造',formation:'4-2-3-1'},
  '库拉索':{strength:68,style:'黑马弹性',formation:'4-5-1'},'科特迪瓦':{strength:78,style:'身体冲击',formation:'4-3-3'},'厄瓜多尔':{strength:80,style:'高原硬度',formation:'4-4-2'},'瑞典':{strength:79,style:'高空轰炸',formation:'4-4-2'},'突尼斯':{strength:74,style:'低位防守',formation:'5-4-1'},
  '埃及':{strength:79,style:'边锋核心',formation:'4-3-3'},'伊朗':{strength:76,style:'坚韧反击',formation:'4-4-2'},'新西兰':{strength:70,style:'定位球',formation:'4-4-2'},'佛得角':{strength:71,style:'黑马冲击',formation:'4-3-3'},'沙特阿拉伯':{strength:75,style:'快速转换',formation:'4-2-3-1'},'塞内加尔':{strength:82,style:'身体速度',formation:'4-3-3'},'伊拉克':{strength:72,style:'斗志防守',formation:'4-5-1'},
  '阿尔及利亚':{strength:78,style:'技术反击',formation:'4-3-3'},'奥地利':{strength:81,style:'高位压迫',formation:'4-2-2-2'},'约旦':{strength:70,style:'紧凑反击',formation:'5-4-1'},'刚果民主共和国':{strength:75,style:'身体冲击',formation:'4-3-3'},'乌兹别克斯坦':{strength:73,style:'纪律防守',formation:'4-2-3-1'},'加纳':{strength:77,style:'速度身体',formation:'4-3-3'},'巴拿马':{strength:70,style:'防守韧性',formation:'5-4-1'}
};
window.FORMATION_RULES = {
  '4-3-3':{attack:4,mid:3,defense:3,desc:'边锋与中锋更容易出牌，适合边路突破与反击。'},
  '4-2-3-1':{attack:3,mid:4,defense:3,desc:'前腰和后腰权重高，适合中路推进与攻守平衡。'},
  '4-3-1-2':{attack:3,mid:4,defense:3,desc:'前腰串联双前锋，适合禁区终结。'},
  '3-4-3':{attack:4,mid:4,defense:2,desc:'边翼卫活跃，进攻强但身后空间大。'},
  '3-5-2':{attack:3,mid:5,defense:2,desc:'中场压制强，适合绞杀与高空。'},
  '5-4-1':{attack:1,mid:4,defense:5,desc:'低位防守，适合门前危机与反击。'},
  '5-3-2':{attack:2,mid:3,defense:5,desc:'防守反击，门将与中卫权重高。'},
  '4-4-2':{attack:3,mid:3,defense:4,desc:'双前锋连携与高空轰炸稳定。'},
  '4-2-2-2':{attack:4,mid:3,defense:3,desc:'高位压迫与快速转换。'},
  '4-5-1':{attack:1,mid:5,defense:4,desc:'中场防守覆盖强，适合弱队拖入点球。'}
};

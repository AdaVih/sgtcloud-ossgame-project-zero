var game;
var $$ = {};
$$.extend = function (a, b) {
    if (typeof (b) === "undefined") {
        b = {};
    }
    for (var i in a) {
        if (!b[i])
            b[i] = a[i];
    }
    return b;
}
/*Number.prototype.toFixed = function (num) {
 if (num > 0) {
 var fixed = Math.pow(100, num);
 return Math.round(this * fixed) / fixed
 }
 return this;
 }*/
var achievementTyps = [/*击杀普通怪物数量*/	'total_enemy_kill',
    /*击杀Boss怪物数量*/	          'total_boss_kill',
    /*击杀小精灵数量*/	              'total_fairy',
    /*升级英雄次数	 */               'total_hero_upgrade',
    /*升级技能次数*/	              'total_skill_upgrade',
    /*升级装备次数*/	              'total_equip_upgrade',
    /*获得神器个数*/	              'total_artifact_upgrade',
    /*竞技场挑战*/	                  'total_arena_challenge',
    /*参加在线副本（需先完成该系统）*/'total_dungeon',
    /*抽卡次数（需先完成该系统）*/	  'total_gachabox',
    /*累计消费钻石*/	              'accumulate_gem_consume',
    /*摇钱树点金次数*/	              'total_moneytree',
    /*累计充值钻石*/	              'accumulate_gem_recharge'
];
var taskTyps = ['total_fairy',
    'total_enemy_kill',
    'total_hero_upgrade',
    'total_skill_upgrade',
    'total_equip_upgrade',
    'total_arena_challenge',
    /*副本*/'total_dungeon',
    'total_moneytree'];


/*var ACHIEVEMENT_TYPS = {'total_enemy_kill':'total_enemy_kill',
    'total_boss_kill':'total_boss_kill',
    'total_fairy':'total_fairy',
    'total_hero_upgrade':'total_hero_upgrade',
    'total_skill_upgrade':'total_skill_upgrade',
    'total_equip_upgrade':'total_equip_upgrade',
    /!*神器*!/'total_artifact_upgrade':'total_artifact_upgrade',
    'total_arena_challenge':'total_arena_challenge',
    /!*副本*!/'total_dungeon':'total_dungeon',
    'total_moneytree':'total_moneytree'};
var DAILYTASK_TYPS = {'total_fairy':'total_fairy',
    'total_enemy_kill':'total_enemy_kill',
    'total_hero_upgrade':'total_hero_upgrade',
    'total_skill_upgrade':'total_skill_upgrade',
    'total_equip_upgrade':'total_equip_upgrade',
    'total_arena_challenge':'total_arena_challenge',
    /!*副本*!/'total_dungeon':'total_dungeon',
    'total_moneytree':'total_moneytree'};*/
var CONSTS = {
    "APP_ID": "h5game",
    "FAIRY_SPECIFIC_ZORDER": 2000,
    "MAX_ATTACHMENTS_ON_SPRITE": 10,
    "offline_reward_min_time": 60,
    "offline_reward_max_time": 86400,
    "money_tree_one_price": 5,
    "flySpirit_interval_time": 180,
    "arena_challenge_times": 5,
    "arena_challenged_interval_timestamp": 2 * 1000,
    "arena_challenge_Max_time": 60,
    "arena_times_purchase": {"unit": "gem", "value": 20, "times": 1},
    "monthCard_validity_timestamp": (30 * 24 * 60 * 60 * 1000),
    "monthCard_daily_bonus": {"unit": "gem", "value": 100},
    "min_stage_id":"s100001",
    "max_stage_id":"s100012",
    "first_recharge_bonus": [{"unit": "gold", "value": 50000}, {"unit": "gem", "value": 10}, {
        "unit": "relic",
        "value": 20
    }],
    "exceptions":{
        "me.gall.sgp.datacenter.opensocial.rpc.exception.UsernameExistsException": "已存在此账号，请选择其他账号注册",
        "me.gall.sgp.datacenter.opensocial.rpc.exception.IllegalUsernameFormatException": "用户名不合法",
        "me.gall.sgp.datacenter.opensocial.rpc.exception.IllegalPasswordException": "密码位数不能小于6位",
        "me.gall.sgp.datacenter.opensocial.exception.UserNotExistsException": "用户名不存在，请重新输入",
        "me.gall.sgp.datacenter.opensocial.exception.PasswordNotMatchException": "密码输入错误，请重新输入"
    },
    "resources_mapping": {
        "gold": '金币',
        "gem": '钻石',
        "relic": '宝物',
        "wood": '木材',
        "leather": '皮革',
        "stone": '石材',
        "bronze": '铜',
        "iron": '铁',
        "crystal": '水晶',
        "rune": '符文',
        "essence": '魔晶',
        "iron_chest": '铁宝箱',
        "iron_key": '铁钥匙',
        "silver_chest": '银宝箱',
        "silver_key": '银钥匙',
        "golden_chest": '金宝箱',
        "golden_key": '金钥匙',
        "small_blood": '小型生命药水',
        "middle_blood": '中型生命药水',
        "large_blood": '大型生命药水',
    },
    "click_chest_random_events": [
        {
            "f": {
                "skill_id": "s10007",
                "level": 2,
                "chestStyle": "chest01.json",
                "type": 1
            },
            "w": 4
        },
        {
            "f": {
                "skill_id": "s10007",
                "level": 3,
                "chestStyle": "chest01.json",
                "type": 1
            },
            "w": 4
        },
        {
            "f": {
                "skill_id": "s10007",
                "level": 4,
                "chestStyle": "chest01.json",
                "type": 1
            },
            "w": 4
        },
        {
            "f": {
                "skill_id": "s10003",
                "level": 2,
                "chestStyle": "chest01.json",
                "type": 1
            },
            "w": 4
        },
        {
            "f": {
                "skill_id": "s10003",
                "level": 3,
                "chestStyle": "chest01.json",
                "type": 1
            },
            "w": 4
        },
        {
            "f": {
                "skill_id": "s10003",
                "level": 4,
                "chestStyle": "chest01.json",
                "type": 1
            },
            "w": 4
        },
        {
            "f": {
                "skill_id": "s10106",
                "level": 2,
                "chestStyle": "chest01.json",
                "type": 1
            },
            "w": 4
        },
        {
            "f": {
                "skill_id": "s10106",
                "level": 3,
                "chestStyle": "chest01.json",
                "type": 1
            },
            "w": 4
        },
        {
            "f": {
                "skill_id": "s10106",
                "level": 4,
                "chestStyle": "chest01.json",
                "type": 1
            },
            "w": 4
        },
        {
            "f": {
                "skill_id": "s10105",
                "level": 2,
                "chestStyle": "chest01.json",
                "type": 1
            },
            "w": 4
        },
        {
            "f": {
                "skill_id": "s10105",
                "level": 3,
                "chestStyle": "chest01.json",
                "type": 1
            },
            "w": 4
        },
        {
            "f": {
                "skill_id": "s10105",
                "level": 4,
                "chestStyle": "chest01.json",
                "type": 1
            },
            "w": 4
        },
        {
            "f": {
                "skill_id": "gold",
                "level": 1,
                "chestStyle": "chest01.json",
                "type": 0
            },
            "w": 13
        },
        {
            "f": {
                "skill_id": "gold",
                "level": 1.5,
                "chestStyle": "chest01.json",
                "type": 0
            },
            "w": 13
        },
        {
            "f": {
                "skill_id": "gold",
                "level": 2.3,
                "chestStyle": "chest01.json",
                "type": 0
            },
            "w": 13
        },
        {
            "f": {
                "skill_id": "gold",
                "level": 4,
                "chestStyle": "chest01.json",
                "type": 0
            },
            "w": 13
        },
        {
            "f": {
                "skill_id": "small_blood",
                "level": 1,
                "chestStyle": "chest01.json",
                "type": 2
            },
            "w": 10
        },
        {
            "f": {
                "skill_id": "small_blood",
                "level": 2,
                "chestStyle": "chest01.json",
                "type": 2
            },
            "w": 8
        },
        {
            "f": {
                "skill_id": "small_blood",
                "level": 3,
                "chestStyle": "chest01.json",
                "type": 2
            },
            "w": 6
        },
        {
            "f": {
                "skill_id": "middle_blood",
                "level": 1,
                "chestStyle": "chest01.json",
                "type": 2
            },
            "w": 4
        },
        {
            "f": {
                "skill_id": "large_blood",
                "level": 1,
                "chestStyle": "chest01.json",
                "type": 2
            },
            "w": 2
        }
    ],
    "chargePoints": [
        {
            "id": 1,
            "type": "mCard",
            "description": "描述",
            "name": "月卡",
            "money": 1,
            "amount": 0,
            "timesLimit": -1,
            "extraAmount": 0,
            "firstChargeRewardAmount": 0,
            "recommendation": 0,
            "status": 1,
            "vipScore": 0
        },
        {
            "id": 2,
            "type": "gem",
            "description": "描述",
            "name": "钻石",
            "money": 1,
            "amount": 60,
            "timesLimit": -1,
            "extraAmount": 0,
            "firstChargeRewardAmount": 180,
            "recommendation": 0,
            "status": 1,
            "vipScore": 0
        },
        {
            "id": 3,
            "type": "gem",
            "description": "描述",
            "name": "钻石",
            "money": 1,
            "amount": 500,
            "timesLimit": -1,
            "extraAmount": 0,
            "firstChargeRewardAmount": 1500,
            "recommendation": 0,
            "status": 1,
            "vipScore": 0
        },
        {
            "id": 4,
            "type": "gem",
            "description": "描述",
            "name": "钻石",
            "money": 1,
            "amount": 980,
            "timesLimit": -1,
            "extraAmount": 0,
            "firstChargeRewardAmount": 2940,
            "recommendation": 0,
            "status": 1,
            "vipScore": 0
        },
        {
            "id": 5,
            "type": "gem",
            "description": "描述",
            "name": "钻石",
            "money": 1,
            "amount": 2580,
            "timesLimit": -1,
            "extraAmount": 0,
            "firstChargeRewardAmount": 7740,
            "recommendation": 0,
            "status": 1,
            "vipScore": 0
        },
        {
            "id": 6,
            "type": "gem",
            "description": "描述",
            "name": "钻石",
            "money": 1,
            "amount": 5180,
            "timesLimit": -1,
            "extraAmount": 0,
            "firstChargeRewardAmount": 15540,
            "recommendation": 0,
            "status": 1,
            "vipScore": 0
        }
    ]
};

var TIPS_COLOR = {
    RED: cc.color(234, 34, 37),
    GREEN: cc.color(62, 191, 60),
    WHITE: cc.color(255, 255, 255),
    PURPLE: cc.color(255, 95, 207),
    BLUE: cc.color(2, 177, 234),
    YELLOW: cc.color(255, 229, 2),
    PINK: cc.color(255, 74, 107)
};

var ITEM = {
    "small_hp_potion": "small_hp_potion",
    "medium_hp_potion": "medium_hp_potion",
    "large_hp_potion": "large_hp_potion"
};

//为了显示CD和复活的时候显示的格式
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //�·�
        "d+": this.getDate(), //��
        "h+": this.getHours(), //Сʱ
        "m+": this.getMinutes(), //��
        "s+": this.getSeconds(), //��
        "q+": Math.floor((this.getMonth() + 3) / 3), //����
        "S": this.getMilliseconds() //����
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function getDays(dateStartTimeStramp, dateEndTimeStramp) {

    var dateStart = new Date();
    dateStart.setTime(dateStartTimeStramp);
    var dateEnd = new Date();
    dateEnd.setTime(dateEndTimeStramp);
    var strDateStart = dateStart.Format("yyyy-MM-dd");
    var strDateEnd = dateEnd.Format("yyyy-MM-dd");
    var strSeparator = "-"; //日期分隔符
    var oDate1;
    var oDate2;
    var iDays;
    oDate1 = strDateStart.split(strSeparator);
    oDate2 = strDateEnd.split(strSeparator);
    var strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
    var strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);
    iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24)//把相差的毫秒数转换为天数
    return iDays;
}

function initGame(cb) {
    PlayerData.init();
    game = new MainScene();
    if (cb) {
        cb();
    }
}
function validateResourceNotEnough(nextlevelData, upgrade_btn, text) {
    var flag = validateAmountNotEnough(nextlevelData)
    if (flag) {
        upgrade_btn.setEnabled(false);
        upgrade_btn.setBright(false);
        text.setColor(cc.color(255, 0, 0));
    } else {
        upgrade_btn.setEnabled(true);
        upgrade_btn.setBright(true);
        text.setColor(cc.color(255, 255, 255));
    }
    return flag;
}
function validateAmountNotEnough(upgradeLevelData) {
    var amount = PlayerData.getAmountByUnit(upgradeLevelData['unit']);
    return amount < upgradeLevelData['value'];
}
function validateAmountNotEnough2(target, lv) {
    var res = {};
    for (var i = 0; i < lv; i++) {
        var levelData = target.getLevelData(target.getLv() + i + 1);
        var unit = levelData['upgrade']['unit'];
        res[unit] = res[unit] || 0;
        res[unit] += levelData['upgrade']['value'];
    }
    for (var k in res) {
        var amount = PlayerData.getAmountByUnit(k);
        if (amount < res[k]) {
            return true;
        }
    }
    return false;
}


//识别 MicroMessenger 这个关键字来确定是否微信内置的浏览器
function is_weixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
    } else {
        return false;
    }
}

//获取url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r !== null) return unescape(r[2]);
}

var tipTemplate;
function showCover() {
    Network.showCover();
}

function createPlayerComplete() {
    //获取角色未删除邮件数据
    Network.getReadedAndUnreadedMails();
    //轮询获取最新未读取邮件
    setInterval(function () {
        Network.updatePlayerMails(10 * 1000);
    }, 10 * 1000);
    // 同步未完成的交易结果
    if (cc.isArray(player.recovery_orders)) {
        for (var i in player.recovery_orders) {
            Network.queryByDid(player.recovery_orders[i]);
        }
    }
    cc.director.runScene(game);
}

function bindButtonCallback(button, callback) {
    button.addTouchEventListener(function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_ENDED:
                callback.call(sender);
                break;
        }
        return true;
    }, button);
}
function removeCCSAnimationDefaultTween(timelines) {
    for (var i in timelines) {
        var timeline = timelines[i];
        var frames = timeline.getFrames();
        for (var j in frames) {
            var frame = frames[j];
            if (frame.isTween()) {
                frame.setTween(false);
            }
        }
    }
}
function popup(popupMenu, localZOrder) {
    if (cc.director.getRunningScene()) {
        cc.director.getRunningScene().addChild(popupMenu, localZOrder);
    }
}
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function setFont(target) {
    /* if (arguments.length === 1) {
     target = arguments[0];
     } else target = arguments;*/
    if (target instanceof Array) {
        for (var i in target) {
            target[i].setColor(cc.color(0, 0, 0))
            target[i].setFontName("Microsoft YaHei UI");
        }
    }
    else {
        target.setFontName("Microsoft YaHei UI");
        target.setColor(cc.color(0, 0, 0))
    }
}
function setColor(target) {
    /* if (arguments.length === 1) {
     target = arguments[0];
     } else target = Array.prototype.slice(arguments);*/
    if (target instanceof Array) {
        for (var i in target) {
            target[i].setColor(cc.color(0, 0, 0))
        }
    }
    else {
        target.setColor(cc.color(0, 0, 0))
    }
}
function setIgnoreContentAdaptWithSize(target) {
    if (target instanceof Array) {
        for (var i in target) {
            target[i].ignoreContentAdaptWithSize(true);
        }
    }
    else {
        target.ignoreContentAdaptWithSize(true);
    }
}

function setVisibles(target, visible) {
    if (target instanceof Array) {
        for (var i in target) {
            target[i].setVisible(visible);
        }
    }
    else {
        target.setVisible(visible);
    }
}
function setEnableds(target, enable) {
    if (target instanceof Array) {
        for (var i in target) {
            target[i].setEnabled(enable);
            target[i].setBright(enable);
        }
    }
    else {
        target.setEnabled(enable);
        target.setBright(enable);
    }
}
function scheduleOnce(target, callback, delay) {
    cc.director.getScheduler().schedule(callback, target, 0, 0, delay, false, target.__instanceId);
}
function schedule(target, callback, delay, interval) {
    cc.director.getScheduler().schedule(callback, target, interval, cc.REPEAT_FOREVER, delay, false, target.__instanceId);
}
function unschedule(target) {

    cc.director.getScheduler().unschedule(target.__instanceId, target);
}
function bindTouchEventListener(listener, target, popup) {
    var touchDownEventListener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: false,
        onTouchBegan: function (touch, event) {
            var target = event.getCurrentTarget();
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);
            if (cc.rectContainsPoint(rect, locationInNode)) {
                return listener(touch, event);
            }
            return false;
        },
        onTouchMoved: function () {
            return false;
        },
        onTouchCancelled: function () {
            return false;
        },
        onTouchEnd: function (touch, event) {
            return false;
        }
    });
    cc.eventManager.addListener(touchDownEventListener, target);
}
function bindTouchEventListener2(listener, target, popup) {
    var touchDownEventListener = cc.EventListener.create({
        event: cc.EventListener.TOUCH_ONE_BY_ONE,
        swallowTouches: true,
        onTouchBegan: function (touch, event) {
            var target = event.getCurrentTarget();
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);
            if (cc.rectContainsPoint(rect, locationInNode)) {
                return listener(touch, event);
            }
            return false;
        },
        onTouchMoved: function () {
            return false;
        },
        onTouchCancelled: function () {
            return false;
        },
        onTouchEnd: function (touch, event) {
            return false;
        }
    });
    cc.eventManager.addListener(touchDownEventListener, target);
}

function bindMouseEventListener(listener, target) {
    var mouseDownEventListener = cc.EventListener.create({
        event: cc.EventListener.MOUSE,
        swallowTouches: false,
        onMouseDown: function (touch, event) {
            var locationInNode = target.convertToNodeSpace(touch.getLocation());
            var s = target.getContentSize();
            var rect = cc.rect(0, 0, s.width, s.height);
            if (cc.rectContainsPoint(rect, locationInNode)) {
                return listener(touch, event);
            }
            return false;
        },
    });
    cc.eventManager.addListener(mouseDownEventListener, target);
}
function loadDynamicTexture(url, listenr, target) {
    cc.textureCache.addImageAsync(url, function (textureBg) {
        if (textureBg) {
            listenr.onLoad(textureBg);
        } else {
            listenr.onError();
        }
    }, target);
}

/**
 * 从模板中解析描述文案
 *
 * @param effects 技能/装备效果
 * @param desc 带有模板的描述
 * @param extend 要继承的父json
 * @returns {*}
 */
function buildDesc(effects, desc, extend) {
    var effectsObj = {};
    for (var i in effects) {
        var map = SkillEffectMappings[effects[i]['type']];
        var alas = map['name'];
        var value = effects[i]['value'].toFixed(map['fixed']);
        effectsObj[effects[i]['name']] = {}
        effectsObj[effects[i]['name']]['name'] = alas;
        effectsObj[effects[i]['name']]['value'] = map['type'] === 'rate' ? (value + '%') : value;
        if (typeof map['onShow'] === 'function') {
            effectsObj[effects[i]['name']]['value'] = map['onShow'](effectsObj[effects[i]['name']]['value']);
        }
    }
    if (extend) {
        effectsObj = $$.extend(effectsObj, extend);
    }
    var desc = desc.mapping(effectsObj)
    return desc;
}
function formatResourceToString(rewards) {
    if (!rewards) {
        return '';
    }
    var descText = "";
    if (rewards instanceof Array) {
        if (rewards.length > 0) {
            for (var i = 0; i < rewards.length; i++) {
                descText += _processReward(rewards[i]);
            }
            descText = descText.substr(0, descText.length - 1);
        } else {
            return "";
        }
    } else {
        descText = _processReward(rewards);
    }
    return descText;
}
function _processReward(reward) {
    var descText = '';
    if (reward.hasOwnProperty('unit')) {
        descText += CONSTS.resources_mapping[reward['unit']] + " * " + reward['value'] + ",";
    } else {
        for (var key in reward) {
            descText += CONSTS.resources_mapping[key] + " * " + reward[key] + ",";
        }
    }
    return descText;
}

function formatNumber(data, type) {
    if (typeof type === 'undefined') {
        if (data >= 0 && data < 1000) {
            return Math.floor(data);
        } else if (data >= 1000 && data < 1000000) {
            return (data / 1000.0).toFixed(2) + "k";
        } else if (data >= 1000000 && data < 1000000000) {
            return (data / 1000000.0).toFixed(2) + "m";
        } else {
            return (data / 1000000000.0).toFixed(2) + "b";
        }
    } else if (type == 'rate') {
        return data.toFixed(2) + "%";
    }
}
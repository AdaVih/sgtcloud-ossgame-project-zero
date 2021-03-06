/**
 * 敌人单位vm类
 *
 * Created by highkay on 2015/12/29.
 */
var EnemyUnit = BattleUnit.extend({

    getAnimateDelay: function () {
        return this.enemy.getAnimateDelay();
    },

    getMaxLife: function () {
        return this.enemy.getLife();
    },

    //设置生命值
    changeLife: function (val) {
        this.life += val;
        if (this.life < 0) {
            this.life = 0;
        }
    },

    onDamaged: function (dmg) {
        this._super(dmg);
        this.battle.updateEnemyLife();
    },

    onMove: function () {
        var target = this.battle.findRandomHero();
        if (target) {
            this.playAnimation('atk', false, function () {
                this.playAnimation("stand", true);
            }.bind(this));
            target.doDamage(this.enemy.getAttack());
        }
    },

    //判断是否死亡
    isDead: function () {
        return this.life <= 0;
    },

    onDead: function () {
        this.playAnimation("die", false, function () {
            var a = cc.delayTime(0.5);
            var b = cc.fadeTo(0.5, 0);
            var c = cc.callFunc(this.onVanish, this);
            this.runAction(cc.sequence(a, b, c));
            this.onVanish();
        }.bind(this));
        this.battle.onEnemyDead(this);
    },

    getLife: function () {
        return this.life;
    },

    ENEMY_LOOT_ZORDER_OFFSET: -1,

    //敌人消失后被调用
    onVanish: function () {
        //获取杀死后的奖励
        this.battle.addSpriteRelatedNodes(this, Loot.generateLoots(this.enemy.getBonus()), this.ENEMY_LOOT_ZORDER_OFFSET);
        this.removeFromParent(true);
        this.battle.onEnemyVanish(this);
    },

    ctor: function (battle, enemy) {
        this._super(battle);
        this.enemy = enemy;
        this.initSprite(res[this.enemy.getFile()], 'enemy', "stand");
        this.life = this.getMaxLife();
        this.setScale(-1, 1);
        this.reset();
    }
});

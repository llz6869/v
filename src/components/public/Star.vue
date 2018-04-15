<template>
  <div class="star-box">
      <span class="star" :class="levelClass"></span>
      <span class="star-tip-box">
          <span class="star-showTips"></span>
          <span class="star-tips">
              <span class="star-small" :class="sLevelClass"></span>{{desc}}
          </span>
      </span>
  </div>
</template>

<script>
    const sitConfig = require('../../../config/index.js').config

    export default {
        props:[
            'level'
        ],
        data(){
            return {
                desc: '',
                levelClass: 'five',
                sLevelClass: 's-five',
                myLevel: this.level
            }
        },
        methods: {
            setLevel(val) {
                if(val == 1) {
                    this.levelClass = "one";
                    this.sLevelClass = "s-one";
                }
                if(val == 2) {
                    this.levelClass = "two";
                    this.sLevelClass = "s-two";
                }
                if(val == 3) {
                    this.levelClass = "three";
                    this.sLevelClass = "s-three";
                }
                if(val == 4) {
                    this.levelClass = "four";
                    this.sLevelClass = "s-four";
                }
                if(val == 5) {
                    this.levelClass = "five";
                    this.sLevelClass = "s-five";
                }
                this.desc = sitConfig.star[(val-1)].desc;
            }
        }
    }
</script>

<style lang="scss">
    .star-box{
        display: $dib;position: relative;

        /* 等级 start */
        .star{
            display: $dib;width: 16px;height: 16px;background: $cf url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAQlBMVEUAAAD/kgD/kgD/kgD/kQD/kgD/kgD/kgD/kgD/kQD/kgD/kgD/kgD/kQD/kgD/kgD/kgD/kgD/kgD/kgD/kQD/kgCj1lfhAAAAFXRSTlMAy9OomlpOBfnjw72HaGNKQhwPMDCicyDaAAAAaElEQVQY01WNSw6AIAwFXxFB+YP2/lcVAkSYBXQmTYpBStgh2l0xqy0IZrH6yZWzz/oJkq4WLpLh1ZC8IaHt6lYDRfwuCir5nn7n5cZyB34GP4KbwY1w1JmoPscIhkkBitjMjdj/2DY+St4I8qvOej0AAAAASUVORK5CYII=) left center repeat-x;
            &.one{width:16px;}
            &.two{width:32px;}
            &.three{width:48px;}
            &.four{width:64px;}
            &.five{width:80px;}
        }
        /* 等级 end */

        /* 星级提示 start */
        .star-tip-box{
            /* 惊叹号 start */
            .star-showTips{
                display: $dib;width: 16px;height: 16px;background: $cf url(/static/images/account/tips.png) center center no-repeat;border:1px solid #e0e0e0;border-radius: 50%;cursor: pointer;
            }
            &:hover{
                .star-tips{
                    position: absolute;top: -50px;left: -60px;display: $db;min-width: 300px;padding: 10px;text-align: center;border: 1px solid #eee;border-radius: 5px;background-color: #fff;
                }
            }
            /* 惊叹号 end */
        }
        /* 星级提示 end */

        /* 等级描述 start */
        .star-tips{
            position: absolute;display: $dn;z-index: 99;width: 100%;

            .star-small{
                display: $dib;width: 11px;height: 11px;margin-right: 3px;background: $cf url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALBAMAAABbgmoVAAAAMFBMVEUAAAD/kgD/kgD/kgD/kgD/kQD/kgD/kgD/kgD/kgD/kQD/kgD/kgD/kgD/kgD/kgAg/sriAAAAD3RSTlMAd6pEiO7MMxEi3buZZlXpLLixAAAAP0lEQVQI12NgYGBnAIM2CGXfAKb8DYCEjGO+opMBQ9P///8/ArlP/38rAFLcYA7D/KBfIEq04D5IqSYDswMDACMJEMu0wLSnAAAAAElFTkSuQmCC) left center repeat-x;

                &.s-one{width: 11px;}
                &.s-two{width: 22px;}
                &.s-three{width: 33px;}
                &.s-four{width: 44px;}
                &.s-five{width: 55px;}
            }
        }
        /* 等级描述 end */


    }

</style>

<template>
    <div>
        <!-- 个人账户 - 侧导航 -->
        <aside v-if="navType">
            <h2>{{navTitle}}</h2>
            <ul>
                <li v-for="(item,index) in asideArray" :class="{active: asideIndex === index}" @click="activeClick(item)" :key="item.code"><router-link :to="item.url" exact>{{item.title}}</router-link></li>
            </ul>
            <div class="app-download" v-show="account">
                <img src="/static/images/account/app-download.jpg" alt="APP客户端下载" />
                <p>APP客户端下载</p>
            </div>
        </aside>
        <router-view></router-view>
    </div>
</template>

<script>
    const sitConfig = require('../../../config/index.js').config
    export default {
        name: 'myAside',
        props:[
            'navType'
        ],
        data() {
            return {
                account: false,
                active: '',
                asideIndex: 0,
                asideArray: [],
                navTitle: ''
            }
        },
        mounted(){
          this.getAsideArray();
          this.account = (this.navType == 'account');
        },
        methods:{
          activeClick:function(item){
            this.asideIndex = item.item;
          },
          getAsideArray(){
            for (let i=0; i<sitConfig.asideList.length; i++) {
                if(sitConfig.asideList[i].code == this.navType) {
                    this.navTitle = sitConfig.asideList[i].title
                    this.asideArray = sitConfig.asideList[i].list;
                    break;
                }
            }
          }
        }
    }
</script>

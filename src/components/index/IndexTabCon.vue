// 媒体报道与风险教育切换
<template>
    <div class="fdiv">
        <!--picture start-->
        <div class="picture fl" v-if="list && list.length">
            <router-link :to="linkTo+'/details/'+list[0].id">
                <div class="p-title">{{list[0].title}}</div>
                <img :src="list[0].image?list[0].image:'/static/images/index/picture.jpg'"/>
            </router-link>
        </div>
        <!--picture end-->
        <!--title start-->
        <div class="title fl">
            <dl v-if="list && list.length > 0">
                <dd v-for="(item,index) in list" :key="item.id" v-if="index>0">
                    <router-link  :to="linkTo+'/details/'+item.id" v-html="item.title"></router-link>
                    <span>{{item.createDate | dateFormat("yyyy-MM-dd")}}</span>
                </dd>
                <dd>
                    <div class="more">
                        <router-link :to="linkTo">查看更多</router-link>
                    </div>
                </dd>
            </dl>
            <div v-else>暂无数据</div>
        </div>
        <!--title end-->
    </div>
</template>
<script>
    export default {
        props: ['list', 'linkTo']
    }
</script>


<!-- 我的福利 -->
<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>
        <!-- 个人账户 - 出借记录  -->
        <div class="account">
            <ul class="account-tabs welfare">
                <li>我的福利</li>
            </ul>

            <div class="welfare">
                <ul class="welfare-tabs clearfix">
                    <li v-for="(item,index) in listStatus" :key="index" @click="setCurrentPage(index)" :class="{active: index == statusIndex}">{{item.title}}</li>
                </ul>
                <!-- <ul class="welfale-choose clearfix">
                    <li class="active">全部</li>
                    <li >现金抵用券 <span>8</span></li>
                    <li>加息券 <span>1</span></li>
                </ul> -->
                <ul class="welfare-list useing clearfix" v-show="(statusIndex==0)">
                    <li v-for="item in list1" v-bind:key="item.id">
                        <div class="welfare-top">
                            <div class="tcl">￥<span>{{item.couponAmount}}</span></div>
                            <div class="tcc">{{item.couponType==3 ? '现金抵用券' : '加息券'}}<div class="tcct"><span v-if="item.couponFrom">{{item.couponFrom}}</span></div></div>
                            <div class="tcr">未使用</div>
                        </div>
                        <div class="welfare-bottom">
                            <div class="welfare-bottom-range">{{item.useRange}}</div>
                            <div>{{item.useCondition}}</div>
                            <div>{{item.beginTime | dateFormat('yyyy年MM月dd日')}}-{{item.endTime | dateFormat('yyyy年MM月dd日')}}</div>
                        </div>
                    </li>
                </ul>
                <ul class="welfare-list used" v-show="(statusIndex==1)">
                    <li  v-for="item in list2" v-bind:key="item.id">
                        <div class="welfare-top">
                            <div class="tcl">￥<span>{{item.couponAmount}}</span></div>
                            <div class="tcc">{{item.couponType==3 ? '现金抵用券' : '加息券'}}<div class="tcct"><span v-if="item.couponFrom">{{item.couponFrom}}</span></div></div>
                        </div>
                        <div class="welfare-bottom">
                            <div class="welfare-bottom-range">{{item.useRange}}</div>
                            <div>{{item.useCondition}}</div>
                            <div>{{item.beginTime | dateFormat('yyyy年MM月dd日')}}-{{item.endTime | dateFormat('yyyy年MM月dd日')}}</div>
                        </div>
                        <div class="posa"></div>
                    </li>
                </ul>
                <ul class="welfare-list clearfix" v-show="(statusIndex==2)">
                    <li  v-for="item in list3" v-bind:key="item.id">
                        <div class="welfare-top">
                            <div class="tcl">￥<span>{{item.couponAmount}}</span></div>
                            <div class="tcc">{{item.couponType==3 ? '现金抵用券' : '加息券'}}<div class="tcct" v-if="item.couponFrom"><span>{{item.couponFrom}}</span></div></div>
                            <div class="tcr">已失效</div>
                        </div>
                        <div class="welfare-bottom">
                            <div class="welfare-bottom-range">{{item.useRange}}</div>
                            <div>{{item.useCondition}}</div>
                            <div>{{item.beginTime | dateFormat('yyyy年MM月dd日')}}-{{item.endTime | dateFormat('yyyy年MM月dd日')}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <!--pagination-wrapper start-->
        <pages v-show="!noDataShow" :display="pagesObj.display" :total="pagesObj.total"
                   :currentPage="pagesObj.currentPage" @pagechange="pagechange"></pages>
        <!--pagination-wrapper end-->
    </div>
</template>
<script>
    import AccountAside from '../public/Aside'
    import Pages from '../public/Pages'

    export default {
        metaInfo: {
            title: '我的福利-个人中心-金谷财行',
            meta: [{
                name: 'keyWords',
                content: '金谷财行我的福利'
            }]
        },
        name: 'borrowrecord',
        components:{
            'my-aside': AccountAside, 'pages': Pages
        },
         data(){
           return {
                list1: [],
                list2: [],
                list3: [],
                listStatus: [{title: '未使用'}, {title: '已使用'}, {title: '已失效'}],
                statusIndex: 0,
                indexStatus: 1,
                navType: 'account',
                noDataShow: true,
                pagesObj: {
                    total: 0,
                    currentPage: 1,
                    display: 9
                }
            }
         },
         mounted(){
            this.getList(this.indexStatus);
         },
         methods: {
            setCurrentPage(index){
                this.statusIndex = index
                this.pagesObj.currentPage = 1
                this.indexStatus = index + 1;
                this.getList();
            },
            getList(currentPage) {
             this.$api.welfare({pageNum: currentPage, pageSize: this.pagesObj.display, userStatus: this.indexStatus})
                .then(res => {
                    if(res.code == 100){
                        this.noDataShow = false
                        this.pagesObj.total = res.data.total;
                        if(this.indexStatus == 1){
                            this.list1 = res.data.list
                            if(this.list1.length){
                                this.noDataShow = false
                            }else{
                                this.noDataShow = true
                            }
                        }else if (this.indexStatus == 2){
                            this.list2 = res.data.list
                            if(this.list2.length){
                                this.noDataShow = false
                            }else{
                                this.noDataShow = true
                            }
                        }else{
                            this.list3 = res.data.list
                            if(this.list3.length){
                                this.noDataShow = false
                            }else{
                                this.noDataShow = true
                            }
                        }
                    }
                })
            },
            pagechange(currentPage){
                this.getList(currentPage);
            }
         }
    }
</script>

<style lang="scss">
    @import '../../assets/css/account.scss';
</style>

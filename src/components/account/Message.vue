<!-- 我的消息 -->
<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>
        <div class="account msg">

            <ul class="account-tabs">
                <li class="active">我的消息</li>
                <div class="all-read fr" @click="readLetters">全部标为已读</div>
            </ul>

            <ul class="msg-list" v-if="list && list.length">
                <li v-for="item in list" :key="item.sId" :class="{active: item.active, seen: item.status===1}">
                    <span class="check-style" :class="{active: item.selected}" @click="setSelected(item)"></span><div class="msg-title fl" @click="setActive(item)">{{item.title}}</div>
                    <div class="msg-content fl" @click="setActive(item)" v-show="item.active">{{item.content}}</div>
                    <div class="msg-time fr" @click="setActive(item)">{{item.createTime | dateFormat("yyyy-MM-dd")}}</div>
                </li>
            </ul>
            <div class="msg-no-data" v-else>暂无数据</div>

            <div class="choice fl">
                <div class="input-p fl"><span class="check-style check-all" :class="{active: isAllChecked}" @click="setSelected()"></span><span @click="setSelected()">全选</span></div>
                <a class="fl" href="javascript:;" @click="readLetters(1)">标为已读</a>
            </div>

            <!-- 分页 -->
            <!--pagination-wrapper start-->
            <pages v-if="!noDataShow" :display="pagesObj.display" :total="pagesObj.total"
                   :currentPage="pagesObj.currentPage" @pagechange="pagechange"></pages>
            <!--pagination-wrapper end-->
        </div>

    </div>
</template>
<script>
    import AccountAside from '../public/Aside'
    import Pages from '../public/Pages'

    export default {
        metaInfo: {
            title: '借款记录-个人中心-金谷财行',
            meta: [{
                name: 'keyWords',
                content: '金谷财行借款记录'
            }]
        },
        name: 'account',
        components: {
            'my-aside': AccountAside, 'pages': Pages
        },
        data () {
            return {
                noDataShow: false,
                pagesObj: {
                    total: 0,
                    currentPage: 1,
                    display: 10
                },
                list: [],
                navType: 'account',
                isAllChecked: false // 是否全选
            }
        },
        mounted () {
            this.getList(this.pagesObj.currentPage);
        },
        methods: {
            // 勾选
            setActive(item) {
                item.active = !item.active;
            },
            setSelected(item){
                if(item){
                    item.selected = !item.selected;
                }else{
                    this.isAllChecked = !this.isAllChecked;
                    this.list.forEach(item => {
                        item.selected = this.isAllChecked;
                    });
                }
            },

            // 获取信息列表
            getList (currentPage) {
                this.$api.getMyLetter({pageNum: currentPage, pageSize: this.pagesObj.display})
                    .then(res => {
                        if (res.code == 100 && res.data != null) {
                            this.noDataShow = false;
                            let tempArray = res.data.list;
                            if(tempArray.length){
                                tempArray.forEach(function(item,index) {
                                    item.active = false; // 为了打开显示内容
                                    item.selected = false; // 为了复选框
                                });
                            }else{
                                this.noDataShow = true;
                            }
                            this.list = tempArray;
                            this.pagesObj.total = res.data.total;
                            this.pagesObj.currentPage = res.data.nextPage;
                        } else {
                            this.noDataShow = true;
                        }
                    })
            },

            // 设置已读
            readLetters (type) {
                let ids = null;
                if(type){ // 判断是否全选
                    ids = [];
                    this.list.forEach(item => {
                        if(item.selected) ids.push(item.sId);
                    });

                    if(ids.length){
                        ids = ids.join(',');
                    }
                }

                this.$api.readLetters({sIdList: ids})
                .then(res => {
                    if (res.code == 100) {
                        // 此处是否还有点啥....
                    }
                })
            },
            pagechange (currentPage, type) {
                this.getList(currentPage);
            }
        }
    }
</script>

<style lang="scss">
    @import '../../assets/css/account.scss';
</style>

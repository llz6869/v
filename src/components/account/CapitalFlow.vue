<!-- 资金流水 -->
<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>
        <!-- 个人账户 - 出借记录  -->
        <div class="account">
            <!-- <ul class="account-tabs">
                <li>资金记录</li>
            </ul> -->

            <div class="half-title">资金记录</div>

            <div class="calendar-box">
                起止日期：<div class="calendar-group">
                    <input class="input-calendar" type="text" @click="openByDrop($event)" v-model="calendarBegin.display" readonly />
                    <transition name="fade">
                        <div class="calendar-dropdown" :style="{'left':calendarBegin.left+'px','top':calendarBegin.top+32+'px'}" v-if="calendarBegin.show">
                            <calendar :zero="calendarBegin.zero" :lunar="calendarBegin.lunar" :value="calendarBegin.value" :begin="calendarBegin.begin" :end="calendarBegin.end" @select="calendarBegin.select"></calendar>
                        </div>
                    </transition>
                </div> - <div class="calendar-group">
                    <input class="input-calendar" type="text" @click="openByDialog()" v-model="calendarEnd.display" readonly />
                    <transition name="fade">
                        <div class="calendar-dropdown" :style="{'left':calendarEnd.left+'px','top':calendarEnd.top+'px'}" v-if="calendarEnd.show">
                            <calendar :zero="calendarEnd.zero" :lunar="calendarEnd.lunar" :value="calendarEnd.value" :begin="calendarEnd.begin" :end="calendarEnd.end" @select="calendarEnd.select"></calendar>
                        </div>
                    </transition>
                </div>
            </div>
            <choose :chooseArray="capitalTypeArray" :status.sync="typeStatus" :chooseTitle="chooseType" @pagechange="pagechange" class="capital-choose"></choose>

            <!--capital start-->
            <table class="capital">
                <thead>
                    <tr>
                        <th>时间</th>
                        <th>资金类型</th>
                        <th>金额</th>
                        <th>可用余额</th>
                        <th>状态</th>
                        <th>备注</th>
                    </tr>
                </thead>
                <tbody v-if="list && list.length">
                    <tr v-for="item in list" :key="item.id">
                        <td>{{item.time}}</td>
                        <td v-if="item.type == 1">充值</td>
                        <td v-else-if="item.type == 2">提现</td>
                        <td v-else-if="item.type == 3">出借</td>
                        <td v-else-if="item.type == 4">回款</td>
                        <td v-else-if="item.type == 5 || item.type == 13">奖励</td>
                        <td v-else-if="item.type == 10">还款</td>
                        <td v-else-if="item.type == 12">融资收入</td>
                        <td v-else>状态未确认</td>
                        <td>{{item.amount}}</td>
                        <td>{{item.balance | fmoney}}</td>
                        <td v-if="item.status == 0">处理中</td>
                        <td v-else-if="item.status == 1">成功</td>
                        <td v-else-if="item.status == 2">失败</td>
                        <td v-else>状态未确认</td>
                        <td><span class="hide" :title="item.remark">{{item.remark}}</span></td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td class="no-data-show" colspan="6">暂无数据</td>
                    </tr>
                </tbody>
            </table>
            <!--capital end-->

            <!-- 分页 -->
            <!--Pages start-->
            <pages v-show="!noDataShow" :total="pagesObj.total" :currentPage="pagesObj.currentPage" :display="pagesObj.display" @pagechange="pagechange"></pages>
            <!--Pages end-->
        </div>

    </div>
</template>
<script>
    import AccountAside from '../public/Aside'
    import Calendar from '../public/Calendar'
    import Choose from '../public/Choose'
    import Pages from '../public/Pages'
    import Bus from '../../router/bus'
    const sitConfig = require('../../../config/index.js').config

    export default {
        metaInfo: {
            title: '资金记录-金谷财行',
            meta: [{
                name: 'keyWords',
                content: '金谷财行资金记录'
            }]
        },
        name: 'capitalflow',
        components:{
            'my-aside': AccountAside, 'calendar': Calendar, 'choose': Choose, 'pages': Pages
        },
        data(){
            return {
                navType: 'account',
                typeClass: false,
                statusClass: false,
                capitalTypeArray: sitConfig.capitalTypeList,
                chooseType: '资金类型',
                calendarBegin: {
                    display: '',
                    show:false,
                    zero:true,
                    select:(value)=>{
                        Bus.$emit('setCurrentPage', 1); // 为了重置分页页数
                        this.calendarBegin.show = false;
                        this.calendarBegin.value = value;
                        this.calendarBegin.display = value.join("-");
                        this.getList(1, this.typeStatus, this.calendarBegin.display, this.calendarEnd.display)
                    }
                },
                calendarEnd: {
                    display: '',
                    show:false,
                    zero:true,
                    select:(value)=>{
                        Bus.$emit('setCurrentPage', 1); // 为了重置分页页数
                        this.calendarEnd.show = false;
                        this.calendarEnd.value = value;
                        this.calendarEnd.display = value.join("-");
                        this.getList(1, this.typeStatus, this.calendarBegin.display, this.calendarEnd.display)
                    }
                },
                list: [],
                noDataShow: false,
                pagesObj: {
                    total: 0,
                    currentPage: 1,
                    display: 10
                },
                typeStatus: -1
            }
        },
        mounted(){
            let now = new Date();
            this.calendarEnd.display = now.format('yyyy-MM-dd');
            now.setDate(now.getDate() - 7);
            this.calendarBegin.display = now.format('yyyy-MM-dd');
            this.getList();
        },
        methods: {
            openByDrop(e) {
                this.calendarEnd.show = false;
                this.calendarBegin.show = true;
            },
            getList(currentPage, type, startTime, endTime) {
                this.$api.getFoundRecords({isHomeShow: false, pageNum: currentPage, pageSize: this.pagesObj.pagegroup, type: (type || this.typeStatus), startTime: this.calendarBegin.display, endTime : this.calendarEnd.display })
                .then(res => {
                    if (res.code == 100) {
                        this.list = [];
                        if(!res.data.list.length){
                            this.noDataShow = true;
                        }else{
                            this.noDataShow = false;
                            this.list = res.data.list;
                            this.pagesObj.total = res.data.total;
                            this.pagesObj.currentPage = res.data.pageNum;
                        }
                    } else {
                        this.noDataShow = true;
                    }
                })
            },
            openByDialog(){
                this.calendarBegin.show = false;
                this.calendarEnd.show = true;
            },
            pagechange(currentPage){
                this.getList(currentPage, this.typeStatus);
            },

            // 时间字符串转时间
            strToDate(dateStr) {
                return new Date(Date.parse(dateStr));
            }
        },
        watch: {
            typeStatus: function(newVal) {
                this.pagesObj.currentPage = 1
                this.getList(this.pagesObj.currentPage, newVal)
            }
        }
    }
</script>

<style lang="scss">
    @import '../../assets/css/account.scss';
/*transition*/
.fade-enter-active,
.fade-leave-active {
    transition: all .5s ease-in-out;
}
.fade-enter,.fade-leave-active{
    opacity: 0;
    transform: translateY(-10px);
}
.calendar-group{position: relative; display: inline-block;z-index: 3;}
.input-calendar{
    width: 113px;height: 30px;padding-left: 10px;font-size: 14px;background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAAZlBMVEUAAADd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3fliz5AAAAIXRSTlMAD+/i3Xcj0jvpl2hSSzQUCLamn4J4YFlBL8qtj4xxHAU5KneWAAAAdElEQVQI123NSw6DMAxFUSdxTQIpSaGF0v/b/yaLYUAkuLMjy3pE1NbZaL+HzBor3zXQztXkIlk7vT+Lx14QCOgHt5iHDiCUqV+nrSfIUVFSt8zXhvl+YWPUHqhvOofVWSQZkfwV2t2P/ovUqbAPFJ3dCvEPkfcLfNF4c4gAAAAASUVORK5CYII=) 95px 7px no-repeat ;
    color: #666;border: 1px solid #ddd;border-radius: 2px;
}

/*下拉框*/
.calendar-dropdown{
    background: #fff;
    position: absolute;
    left:0;
    top:35px;
    padding:20px;
    border: 1px solid #eee;
    border-radius: 2px;
    z-index: 4;
}
.calendar-dropdown:before {
    position: absolute;
    left:30px;
    top: -10px;
    content: "";
    border:5px solid rgba(0, 0, 0, 0);
    border-bottom-color: #dedede;
}
.calendar-dropdown:after {
    position: absolute;
    left:30px;
    top: -9px;
    content: "";
    border:5px solid rgba(0, 0, 0, 0);
    border-bottom-color: #fff;
}

/*弹出框*/
.calendar-dialog{
    position: absolute;
    left:0;
    top:0;
    right:0;
    bottom:0;
    z-index: 4;
}

.calendar-dialog-mask{
    background:rgba(255,255,255,.5);
    width:100%;
    height:100%;
}

.calendar-dialog-body{
    background: #fff;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    padding:20px;
    border: 1px solid #eee;
    border-radius: 2px;
}
</style>

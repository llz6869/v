<template>
    <div class="container clearfix">
        <!-- 出借记录 start -->

        <div class="from-group">
            <span>渠道码：</span><input type="text" v-model="channel"><span>密码：</span><input type="text" v-model="key"><button class="btn" @click="getList(1)">查询</button>
            <p class="erorr" v-show="error">{{errorMsg}}</p>
        </div>
        <table class="channel-tb">
            <thead>
            <th>被邀请客户的姓名</th><th>手机号</th><th>注册时间</th><th>每笔出借金额</th><th>每笔出借时间</th>
            </thead>
            <tbody v-if="cpsList && cpsList.length">
            <tr v-for="(item, index) in cpsList" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.mobile | stringEncrypt(2) }}</td>
                <td>{{ item.regDate | dateFormat('yyyy-MM-dd')}}</td>
                <td>{{ item.amount | fmoney }}元</td>
                <td>{{ item.investmentDate | dateFormat('yyyy-MM-dd') }}</td>
            </tr>
            </tbody>
            <tbody v-else>
            <tr>
                <td colspan="5" class="no-data-td">暂无数据</td>
            </tr>
            </tbody>
        </table>
    <pages v-show="cpsList.length" :display="pagesObj.display" :total="pagesObj.total"
           :currentPage="pagesObj.currentPage" @pagechange="pagechange"></pages>
    </div>
</template>
<script>
    import Pages from '../public/Pages'
    export default {
        components:{
            'pages': Pages
        },
        data () {
            return {
                cpsList: [],
                channel: '',
                key: '',
                startTime: null,
                errorMsg: '',
                error: false,
                endTime: null,
                pagesObj: {
                    total: 0,
                    currentPage: 1,
                    display: 10
                }
            }
        },
        mounted () {
//            this.getList(this.pagesObj.currentPage);
        },
        methods: {
            getList (currentPage) {
                this.error = false;
                let data = {
                    cpsCode: this.channel,
                    key: this.key,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    pageNum: currentPage,
                    pageSize: this.pagesObj.display
                }
                this.$api.getCpsListByChannel(data)
                    .then(res => {
                        if (res.code == 100) {
                            if (res.data.list && res.data.list.length) {
                                this.cpsList = res.data.list;
                                this.pagesObj.total = res.data.total;
                            } else {
                                this.cpsList = []
                            }
                        }else{
                            this.errorMsg = res.msg;
                            this.error = true;
                            this.cpsList = []
                        }
                    })
            },
            pagechange (currentPage) {
                this.getList(currentPage);
            }
        }
    }
</script>
<style lang="scss">
    .channel-tb {
        width: 100%;margin: 50px 0; border:0; line-height: 64px;
        th,td{text-align:$ta-c; color:$c6; font-size: $px16;}
        th{font-weight: normal;background-color:#fafafa;}
        /*th:nth-of-type(1){width: 190px;}*/
        /*th:nth-of-type(2){width: 268px;}*/
        /*th:nth-of-type(3){width: 250px;}*/
        /*th:nth-of-type(4){width: 220px;}*/
        tbody tr:nth-child(even){background-color:#fafafa;}

        .td-no-data{padding: 30px 0;background-color: $cf;}
    }
    .from-group{
        margin: 50px 0;padding: 30px 0 30px 30px;background-color: #fff;
        span{font-size: 18px;}
        input{
            display: inline-block; width: 330px;height:40px;padding-left: 20px; border: 1px solid #f2f2f2;font-size: 18px;}
        button{
            display: $dib;width: 166px;height: 38px;margin: 10px;padding: 0;text-align: center;line-height: 38px;background-color: $cef6c2d;color: $cf;font-size: $px14;border: 1px solid $cef6c2d;border-radius:4px;cursor: pointer;transition: all .35s;
            &:hover{background-color: $cef6c2d;}
        }
    }

</style>

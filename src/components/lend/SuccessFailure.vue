<template>
    <div>
        <!--success-failure success start-->

        <div v-if="accountId">
            <div class="container" v-if="orgName">
                <div class="success-failure">
                    <div class="success m-auto"></div>
                    <h3>恭喜您，{{msg}}</h3>
                    <p>银行存管账户：{{accountId}}</p>
                    <p>企业名称：{{orgName}}</p>
                    <td v-if="accountType == 1">
                        <router-link to="/borrow" class="btn">我要出借</router-link>
                    </td>
                    <td v-else-if="accountType == 2">
                        <router-link to="/lend" class="btn">我要借款</router-link>
                    </td>
                    <td v-else>
                        <router-link to="/" class="btn">返回</router-link>
                    </td>
                </div>
            </div>

            <div class="container" v-else-if="name">
                <div class="success-failure">
                    <div class="success m-auto"></div>
                    <h3>恭喜您，{{msg}}</h3>
                    <p>银行存管账户：{{accountId}}</p>
                    <p>用户：{{name}}</p>
                    <td v-if="accountType == 1">
                        <router-link to="/borrow" class="btn">我要出借</router-link>
                    </td>
                    <td v-else-if="accountType == 2">
                        <router-link to="/lend" class="btn">我要借款</router-link>
                    </td>
                    <td v-else>
                        <router-link to="/" class="btn">返回</router-link>
                    </td>
                </div>
            </div>
        </div>
        <!--success-failure success end-->

        <!--success-failure failure start-->
        <div class="container" v-else>
            <div class="success-failure">
                <div class="failure m-auto"></div>
                <h3>很抱歉，开户失败！</h3>
                <p>{{msg}}</p>
                <router-link to="/" class="btn">返回</router-link>
            </div>
        </div>
        <!--success-failure failure end-->
    </div>

</template>
<style lang="scss">
    @import '../../assets/css/lend.scss';
</style>


<script>
    export default {
        data(){
            return {
                accountId:'',
                orgName:'', //企业名称
                name:'', //个人名称
                msg: ''
            }
        },
        mounted(){
            this.accountId = this.$route.params.accountId
            this.orgName = this.$route.params.orgName
            this.name = this.$route.params.name
            this.msg = this.$route.params.msg
            this.accountType = this.$route.params.accountType
        }
    }
</script>

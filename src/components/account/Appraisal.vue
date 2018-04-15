<template>
    <div class="container clearfix">
        <my-aside :navType="navType"></my-aside>
        <div class="account">
            <div class="half-title">风险测评</div>
            <!-- 未评测 start -->
            <div class="appraisal clearfix" v-show="theFirst">
                <!-- <div class="fl"><img src="/static/images/account/appraisal.jpg" alt=""></div> -->
                <div class="begin-appraisal">
                    <h3 class="beging-title">风险评测问卷</h3>
                    <p class="begin-text">{{phone}}，您好！</p>
                    <p class="begin-text">在出借中，任何收益总是伴随着相应的风险，而风险测评能够使您的投资处于风险承受能力范围之内；同时，金谷财行会根据您的风险偏好，给出风险测评。</p>
                    <p class="begin-text">只有13道题，快来开始风险测评吧！</p>
                    <p class="begin-text"><button class="btn begin-appraisal-btn" @click="beginAppraisal">去测评</button></p>
                </div>
            </div>
            <!-- 未评测 end -->

            <!-- 开始评测 start -->
            <div class="appraisal"  v-show="theBegin">
                <h3 class="ing-title">风险承受能力评测问卷</h3>
                <p class="ing-text">尊敬的投资者：</p>
                <p class="ing-desc">非常感谢您关注金谷财行为您提供的投资产品，在您确定投资前，请协助回答下列问题，以下问题将根据您的年龄情况、财务状况、投资经验、投资目的、收益预期、风险偏好、流动性要求、风险认知和风险承受损失程度对您进行风险承受能力测评，测评结果将有助于分析您对金融工具及投资目标的相关风险的态度。该风险测评问卷的有效期为一年，超过一年请您通过本网站重新测评自身风险承受能力。此外，若发生可能影响自身风险承受能力（尤其是本问卷涉及的各项内容）的情况，请您通过本网站主动重新测评自身风险承受能力。</p>
                <p class="ing-desc">本公司在此承诺，对于您在本问卷中所提供的一切信息，本公司将严格按照法律法规要求承担保密义务。除法律法规规定的有权机关依法定程序进行查询以外，本公司保证不会将涉及您的任何信息提供、泄露给任何第三方，或者将相关信息用于违法、不当用途。</p>

                <!-- appraisal-list start -->
                <ul class="appraisal-list">
                    <li v-for="item in list" :key="item.question.questionId">{{item.question.questionSort}}、{{item.question.questionTitle}}
                        <div class="item" v-for="part in item.answer" :key="part.answerId" @click="checkItem(item, part.answerId)"><span class="item-check" :class="{active: part.selected}"></span>{{part.answerValue}}</div>
                    </li>
                </ul>
                <!-- appraisal-list end -->
                <p class="ing-desc fwb">重要申明：</p>
                <p class="ing-desc fwb">本评估问卷内容及结果系根据您填问卷当时所提供的个人资料而推论得知，且其结果将作为您未来在本公司投资时的参考所用。此问卷内容及其结果不构成与您进行交易之要约或要约之引诱，亦非投资买卖建议。本公司将不会对此份问卷之准确性及咨询是否完整负责。您在此问卷上所填的个人资料本公司将予以保密。</p>
                <div class="ing-tc"><button class="btn" @click="submitOK">提交测评</button></div>
            </div>
            <!-- 开始评测 start -->

            <!-- 评测结果 start -->
            <div class="appraisal" v-show="theResult">
                <ul class="appraisal-result">
                    <li>
                        <span>总分数：</span><span class="appraisal-score">{{score}}分</span>
                    </li>
                    <li>
                        <span><em class="appraisal-icon type"></em>您的风险承受能力数：</span><span>{{typeName}}</span>
                    </li>
                    <li>
                        <span><em class="appraisal-icon level"></em>适合您的投资产品评级：</span><span>{{scoreStr}}</span>
                    </li>
                </ul>
                <p class="appraisal-tips">注：此次测评总分为{{score}}分，根据您所选择的问题答案，您对投资风险的整体承受程度及您的风险偏好得出的结果。<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;有效期至：{{endTime | dateFormat('yyyy年MM月dd日')}}</p>
                <div class="appraisal-btn">
                    <router-link to="/borrow" class="btn">去看看适合我的项目</router-link>
                    <button @click="resetResult" class="btn">重新评测</button>
                </div>
            </div>
            <!-- 评测结果 end -->

            <!-- 未选择提示 start -->
            <modal-box :show.sync="openShow">
                <div slot="context">
                    <h3 class="h3">请先回答评测问卷</h3>
                </div>
            </modal-box>
            <!-- 未选择提示 end -->

        </div>
    </div>
</template>

<script>
    import AccountAside from '../public/Aside'
    import ModalBox from '../public/ModalBox'

    export default {
        metaInfo: {
            title: '风险测评-金谷财行',
            meta: [{
                name: 'keyWords',
                content: '金谷财行风险测评'
            }]
        },
        components:{
            'modal-box': ModalBox, 'my-aside': AccountAside
        },
        data(){
            return {
                openShow: false, // 弹框
                navType: 'account',
                phone: this.$cookie.getCookie('userName'),
                theFirst: true, // 未评测
                theBegin: false, // 开始评测
                theResult: false, // 评测结果
                scoreStr: '', // 等级
                score:0, // 评测分数
                scoreStr:'', // 分值等级
                typeName: '', // 评测等级
                endTime: '', // 评测时间
                list: [], // 问题列表
                totalScoce: 0 // 总分
            }
        },
        mounted(){
            if(this.$cookie.getCookie('tokenId')) {
                this.$api.getMyAppraisal({})
                    .then(res => {
                        if (res.code == 100 && res.data.score) {
                            this.setResultStr(res.data);
                        } else {
                            this.theFirst = true;
                            this.theBegin = false;
                            this.theResult = false;
                        }
                    })
            }
        },
        methods: {
            // 获取问题
            getRaisalList () {
                this.$api.getRaisalList({pageNum: 1, pageSize: 999})
                    .then(res => {
                        if(res.code == 100) {
                            res.data.forEach(function(item,index){
                                item.selected = false;
                                item.answer.forEach(function(innerItem){
                                    innerItem.selected = false;
                                })
                            })
                            this.list = res.data;
                        }
                    })
            },

            // 开始评测
            beginAppraisal() {
                this.theFirst = false;
                this.theBegin = true;
                this.getRaisalList();
            },

            // 选择题
            checkItem(item, id) {
                item.selected = true;
                item.answer.forEach(tempPart => {
                    if(id == tempPart.answerId){
                        tempPart.selected = true;
                    }else{
                        tempPart.selected = false;
                    }
                })
            },

            // 提交
            submitOK() {
                this.totalScoce = 0;
                let temp = false;
                this.list.forEach(item => {
                    if(!item.selected){
                        temp = true;
                        return;
                    }else{
                        item.answer.forEach(tempPart => {
                            if(tempPart.selected){
                                this.totalScoce += parseInt(tempPart.answerScore);
                            }
                        })
                    }
                });

                if(temp){
                    this.openShow = true;
                    return;
                }
                this.$api.getSaveRaisaled({answerId: this.totalScoce})
                    .then(res => {
                        if (res.code == 100) {
                            this.setResultStr(res.data);
                        }
                    })
            },
            resetResult() {
                // 此处是否需要先重置评测结果
                this.theResult = false;
                this.theFirst = true;
                this.theBegin = false;
            },

            // 设置评测结果
            setResultStr(data) {
                this.score = parseInt(data.score);
                this.typeName = data.typeName;
                this.endTime = data.endTime;
                if(this.score <= 29){
                    this.scoreStr='低风险';
                }else if(this.score <= 45 && this.score >= 30){
                    this.scoreStr='中低风险';
                }else if(this.score <= 60 && this.score >= 46){
                    this.scoreStr='中风险';
                }else if(this.score <= 75 && this.score >= 61){
                    this.scoreStr='中高风险';
                }else if(this.score >= 76){
                    this.scoreStr='高风险';
                }else{
                    this.scoreStr='分值等级有误,请联系管理员';
                }
                this.theFirst = false;
                this.theBegin = false;
                this.theResult = true;
            }
        }
    }
</script>
<style lang="scss">
    @import '../../assets/css/account.scss';
</style>

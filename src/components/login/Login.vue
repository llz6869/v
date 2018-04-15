<template>
    <div class="login-bg">
        <div class="container">
            <div class="login">
                <span class="title">用户登录</span>
                <div class="form-group">
                    <div class="input-layer">
                        <input type="text" v-model="mobile" placeholder="请输入手机号" autocomplete="off" maxlength="11"/>
                        <p class="erorr" v-show="mobileError">{{mobileErrorMsg}}</p>
                    </div>
                </div>

                <div class="form-group">
                    <div class="input-layer">
                        <input type="password" v-model="passWord" placeholder="请输入密码" autocomplete="off" minlength="6" maxlength="20"/>
                        <p class="erorr" v-show="passWordError">{{passWordErrorMsg}}</p>
                    </div>
                </div>

                <div class="user-name">
                    <check-style :isChecked.sync="checked" class=""></check-style><span @click="setChecked">记住用户名</span>
                    <router-link to="/forget" class="forget">忘记密码</router-link>
                </div>
                <button class="btn m-btn" @click="myLogin">登录</button>
                <div class="user-name">还没有账号？
                    <router-link to="/register" class="register">立即注册</router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import CheckStyle from '../public/CheckStyle'
    export default {
        components: {
            'check-style': CheckStyle
        },
        data () {
            return {
                checked : true,
                mobile: '',
                mobileError: true,
                mobileErrorMsg: '',
                passWord: '',
                passWordError: true,
                passWordErrorMsg: '',
            };
        },
        mounted(){
            /*页面挂载获取cookie，如果存在username的cookie，则跳转到主页，不需登录*/
            if(this.$cookie.getCookie('tokenId')){
                this.$router.push('/account');
            }
            if(window.localStorage){
                //支持
                this.mobile = localStorage.getItem('mobile');
            }else{
                this.mobile = this.$cookie.getCookie('mobile')
            }
            const self = this;
            this.resetChecked();
        },
        methods: {
            resetChecked(){
                if(this.mobile){
                    this.checked = true;
                }
            },
            myLogin() {
                let phoneReg = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/,
                    pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![_\!@#\$%\^&\*\(\)_\+=|<>,\.{}:;\]\[\~\/\?\"'\\-]+$)[A-Za-z0-9_\!@#\$%\^&\*\(\)_\+=|<>,\.{}:;\]\[\~\/\?\"'\\-]{6,20}$/;
                if (!phoneReg.test(this.mobile)) {
                    this.mobileError = true;
                    this.mobileErrorMsg = '请输入11位手机号';
                    return;
                }
                if (!pwdReg.test(this.passWord)) {
                    this.passWordError = true;
                    this.passWordErrorMsg = '密码为6-20位数字和字母组合';
                    return;
                }
                if (this.checked) {
                     if(window.localStorage){
                         //支持
                         localStorage.setItem('mobile',this.mobile);
                     }else{
                         this.$cookie.setCookie('mobile',this.mobile,60*60*24*7);//保存一周
                     }
                }else{
                    if(window.localStorage){
                        //支持
                        localStorage.removeItem('mobile');
                    }else{
                        this.$cookie.delCookie('mobile');
                    }
                }
                let loginData = {
                    mobile: this.mobile,
                    password: this.passWord
                };
                this.$api.login(loginData).then(res => {
                    if (res.code == 100) {
                        this.$cookie.setCookie('tokenId', res.data.tokenId, 60 * 30);
                        this.$cookie.setCookie('userName', res.data.nickName, 60 * 30);
                        this.$cookie.setCookie('user',JSON.stringify(res.data), 60 * 30);
                        let redirectTo = this.$cookie.getRedirectTo();
                        if (redirectTo != null && redirectTo != ""){
                            window.location.href = redirectTo;
                        }else {
                            this.$router.push('/');
                        }
                    } else if(res.code == 909) {
                            this.passWordError = true;
                            this.passWordErrorMsg = '密码出错已达上限，请稍后再试';
                    } else {
                        this.passWordError = true;
                        this.passWordErrorMsg = res.msg;
                    }
                });
            },
            setChecked() {
                this.checked = !this.checked;
            }
        },
        metaInfo: {
            title: '用户登录-金谷财行',
            meta: [{
                name: 'keyWords',
                content: '用户登录,金谷财行'
            }]
        }
    };
</script>



<template>
    <div>
        <van-nav-bar
                title="过程管理系统"
                left-arrow
                class="back"
        />

        <van-cell-group class="loginBox">
            <van-field
                    v-model="username"
                    clearable
                    left-icon="manager-o"
                    placeholder="请输入用户名"
            />
            <van-field v-model="password"
                       type="password"
                       left-icon="lock"
                       placeholder="请输入密码"
            />
            <van-button type="primary loginBtn" @click="login()">登录{{test}}</van-button>
        </van-cell-group>
    </div>
</template>

<script type="text/ecmascript-6">
    import {getUrlParams} from '@/utils/index'
    import {mapState,mapMutations} from 'vuex'

    export default {
        data() {
            return {
                username: "140212199403171823",//指导老师
                password: "aaaa1111@",
                radio: '2',//中西医
                status: 0,
                testObj:{},
                test:''
            }
        },
        methods:{
            ...mapMutations([
                'changeToken'
            ]),
            login(){

                let params = {
                    login:this.username,
                    password:this.password
                }

                this.msv.v(this).login.logIn({
                    type:'post',
                    data:params,
                    bindName:'test',
                    success:(res,defaultFn)=>{
                        console.log(res)
                        defaultFn(res)
                    }
                });

            }
        }
    }
</script>

<style type="text/scss" lang="scss">

</style>
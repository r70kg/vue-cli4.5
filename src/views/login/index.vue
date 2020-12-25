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
            <van-button type="primary loginBtn" @click="login({username,password})">登录</van-button>
            <br>
            <van-button type="primary loginBtn" @click="refreshToken()">刷新token</van-button>
            <br>
            <van-button type="primary loginBtn" @click="getUserInfo()">用户信息</van-button>
        </van-cell-group>



        <!--<video-background
                :src="require('../../assets/girl.mp4')"
                style="max-height: 400px; height: 100vh;"
        >
            <h1 style="color: white;">Hello welcome!</h1>
        </video-background>-->
    </div>
</template>

<script type="text/ecmascript-6">
    import {getUrlParams} from '@/utils/index'
    import {mapState,mapMutations,mapActions} from 'vuex'
    import VideoBackground from 'vue-responsive-video-background-player'

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
        components:{
            VideoBackground
        },
        methods:{
            ...mapMutations([
                'changeToken'
            ]),
            ...mapActions([
                'login',
                'refreshToken'
            ])

        }
    }
</script>

<style type="text/scss" lang="scss">

</style>
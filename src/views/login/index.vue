<template>
    <div>
        <van-nav-bar
                title="过程管理系统"
                left-arrow
                class="back"
        />

        <van-cell-group class="loginBox">
            <van-field
                    v-model="userInfo.username"
                    clearable
                    left-icon="manager-o"
                    placeholder="请输入用户名"
            />
            <van-field v-model="userInfo.password"
                       type="password"
                       left-icon="lock"
                       placeholder="请输入密码"
            />
            <van-button type="primary loginBtn" @click="loginFn(userInfo)">登录</van-button>
            <van-button type="primary loginBtn" @click="register(userInfo)">注册</van-button>
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
    import {mapActions} from 'vuex'

    export default {
        data() {
            return {
                userInfo: {
                    username: "140212199403171823",
                    password: "aaaa",
                }
            }
        },
        components: {},
        methods: {
            ...mapActions([
                'login',
                'register'
            ]),
            registerFn(){

            },
            async loginFn(userInfo) {
                const {code} = await this.login(userInfo);
                if (code) {
                    this.$router.push({
                        name: 'home'
                    })
                }
            }
        }
    }
</script>

<style type="text/scss" lang="scss">

</style>
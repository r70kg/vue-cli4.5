<template>
    <div>
        <van-nav-bar
                title="首页"
                left-arrow
                class="back"
                @click.native="back"
        />


        <van-cell-group class="loginBox">
            <van-field
                    v-model="oldPassword"
                    clearable
                    left-icon="manager-o"
                    placeholder="旧密码"
            />
            <van-field v-model="newPassword"
                       type="password"
                       left-icon="lock"
                       placeholder="新密码"
            />
            <van-field v-model="aginPassword"
                       type="password"
                       left-icon="lock"
                       placeholder="确认新密码"
            />
            <van-button type="primary loginBtn" @click="update">更新密码</van-button>
        </van-cell-group>



        <van-button type="primary loginBtn" @click="logoutFn">退出</van-button>
    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex'

    export default {
        name: "",
        data(){
          return {
              oldPassword:'9',
              newPassword:'',
              aginPassword:''
          }
        },
        methods: {
            ...mapActions([
                'logout',
                'resetToken',
                'updatePassword',
                'getUserInfo'
            ]),
            logoutFn() {
                this.logout().then(() => {
                        this.$router.push({
                            name: 'login'
                        })
                    }
                )
            },
            update(){
                let {username, oldPassword, newPassword, aginPassword} = this;
                this.updatePassword({username, oldPassword, newPassword, aginPassword})
                    .then((res)=>{
                        /*this.resetToken();
                        this.$router.push({
                            name:'login'
                        })*/
                    })

                this.getUserInfo();
            },
            back(){
                this.$router.go(-1);
            }
        },
        computed:{
            ...mapState({
                username:state=>state.user.userInfo.username
            })
        }
    }
</script>

<style scoped>

</style>
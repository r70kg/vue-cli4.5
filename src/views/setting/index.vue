<template>
    <div>
        <van-nav-bar
                title="设置"
                left-arrow
                class="back"
        />
        <van-button type="primary loginBtn" @click="logoutFn">退出</van-button>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'

    export default {
        name: "",
        methods: {
            ...mapActions(['logout']),
            logoutFn() {
                this.logout().then(() => {
                        this.$router.push({
                            name: 'login'
                        })
                    }
                )
            }
        }
    }
</script>

<style scoped>

</style>
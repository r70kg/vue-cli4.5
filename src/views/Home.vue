<template>
  <div class="home" @click="send">
    发送
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data(){
    return {
      mgs:'Home',
      testObj:{}
    }
  },
  methods:{
    send(){
      let params = {
        login: "140212199403171823",//指导老师
        password: "aaaa1111@",
        project: "shanghai",
        imei:123,
        humanId:3
      }
      console.log(this)

      this.msv.login.logIn({
        type:'post',
        data:params,
        bindName:'testObj'
      })
    }
  },
  components: {
    HelloWorld
  },
  mounted(){
  }
}
</script>
<style lang="scss">
  .home{
    font-size: 24px;/*px*/
  }
</style>
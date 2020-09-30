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
      this.msv.v(this).login.logIn({
        type:'post',
        data:{
          username: "140212199403171823",//指导老师
          password: "000000",
          project: "shanghai",
          imei:123
        },
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

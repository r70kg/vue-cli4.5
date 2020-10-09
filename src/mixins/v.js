/**
 * Created by Dell on 2020/10/9.
 */
 // 局部混入 绑定各组件实例
 export default {
    created() {
        this.msv.v(this);
        console.log('全局混入的钩子函数');
    }
}
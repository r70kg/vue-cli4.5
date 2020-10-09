/**
 * Created by Dell on 2020/10/9.
 */
// 各个组件 混入绑定Vue组件实例
export default {
    mounted() {
        this.msv.v(this);
        console.log('混入的钩子函数');
    }
}
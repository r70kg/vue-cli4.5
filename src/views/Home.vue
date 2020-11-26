<template>
    <div class="home" @click="send">
        <van-nav-bar
                title="首页"
                left-arrow
                class="back"
        />

        <div @click="getIndexFn">=====</div>
        <div>
            {{mgs}}
            <v-chart class="vueTop" :options="polar" ref="echarts1"></v-chart>
        </div>
    </div>

</template>

<script>
    // @ is an alias to /src
    import HelloWorld from '@/components/HelloWorld.vue'
    import V from '@/mixins/v'
    import ECharts from 'vue-echarts'
    import 'echarts/lib/chart/line'
    import 'echarts/lib/component/polar'

    export default {
        name: 'Home',
        mixins: [V],
        components: {
            HelloWorld,
            'v-chart': ECharts
        },
        data() {
            return {
                mgs:'',
                polar: {}
            }

        },
        methods: {
            send() {
                /*console.log(this.msv)

                this.msv.user.getUserInfo({
                    type: 'post'
                })

                setTimeout(() => {
                    console.log(this.getUserInfo)
                }, 3000)*/
            },
            getIndexFn() {
                let that = this;

                if (window.WebSocket) {
                    console.log("支持");
                } else {
                    console.log("不支持");
                }
                var ws = new WebSocket('ws://localhost:8001');

                ws.onopen = function () {
                    console.log("open");

                    ws.send("hello");

                };

                ws.onmessage = function (evt) {

                    console.log(evt.data)
                    console.log(that)
                    that.mgs = evt.data

                    that.drawchart(evt.data);

                };

                ws.onclose = function (evt) {

                    console.log("WebSocketClosed!");

                };

                ws.onerror = function (evt) {

                    console.log("WebSocketError!");

                };
            },
            drawchart(data){
                data = JSON.parse(data)


                console.log(data)


                let _option = {
                    title: {
                        text: 'Beijing AQI'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        data: data.map(function (item) {
                            return item[0];
                        })
                    },
                    yAxis: {
                        splitLine: {
                            show: false
                        }
                    },
                    toolbox: {
                        left: 'center',
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    dataZoom: [{
                        startValue: '2014-06-01'
                    }, {
                        type: 'inside'
                    }],
                    visualMap: {
                        top: 10,
                        right: 10,
                        pieces: [{
                            gt: 0,
                            lte: 50,
                            color: '#096'
                        }, {
                            gt: 50,
                            lte: 100,
                            color: '#ffde33'
                        }, {
                            gt: 100,
                            lte: 150,
                            color: '#ff9933'
                        }, {
                            gt: 150,
                            lte: 200,
                            color: '#cc0033'
                        }, {
                            gt: 200,
                            lte: 300,
                            color: '#660099'
                        }, {
                            gt: 300,
                            color: '#7e0023'
                        }],
                        outOfRange: {
                            color: '#999'
                        }
                    },
                    series: {
                        name: 'Beijing AQI',
                        type: 'line',
                        data: data.map(function (item) {
                            return item[1];
                        }),
                        markLine: {
                            silent: true,
                            data: [{
                                yAxis: 50
                            }, {
                                yAxis: 100
                            }, {
                                yAxis: 150
                            }, {
                                yAxis: 200
                            }, {
                                yAxis: 300
                            }]
                        }
                    }
                }
                this.polar = _option;
            }
        },
        mounted() {
            // this.getIndexFn();
        }
    }
</script>
<style lang="scss">
    .home {
        font-size: 24px; /*px*/
    }
    .vueTop{
        width: 100%;
    }
    .vueTop>div{
        width: 100%!important;
    }
</style>
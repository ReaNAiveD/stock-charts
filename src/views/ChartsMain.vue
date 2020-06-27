<template>
    <div>
        <el-input v-model="ts_code" @change="changeCurrent"/>
        <charts-template class="charts-offset" :height="'750px'" ref="chartsTemplate"/>
    </div>
</template>

<script>
    import ChartsTemplate from "@/components/ChartsTemplate";
    import { fetchData, fetchDataSize } from "@/api/statistic";

    export default {
        name: "ChartsMain",
        components: {ChartsTemplate},
        data: function () {
            return {
                ts_code:'000001.SZ',
                dataset_raw : {},
                pageSize: 200,
                option: {
                    tooltip: {
                        trigger: 'axis',
                        position: function (pt) {
                            return [pt[0], '10%'];
                        }
                    },
                    title: {
                        left: 'center',
                        text: '大数据量面积图',
                    },
                    toolbox: {
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            }
                        }
                    },
                    xAxis: [{
                        type: 'time',
                        boundaryGap: false
                    },{
                        type: 'time',
                        gridIndex: 1,
                        boundaryGap: false
                    },{
                        type: 'time',
                        gridIndex: 2,
                        boundaryGap: false
                    },{
                        type: 'time',
                        gridIndex: 3,
                        boundaryGap: false
                    }],
                    yAxis: [{
                        name: '当日收盘',
                        type: 'value'
                    },{
                        name: 'pe_ttm',
                        gridIndex: 1,
                        type: 'value'
                    },{
                        name: 'ps_ttm',
                        gridIndex: 1,
                        type: 'value'
                    },{
                        name: 'pb',
                        gridIndex: 2,
                        type: 'value'
                    },{
                        name: 'total_share',
                        gridIndex: 2,
                        type: 'value'
                    },{
                        name: 'float_share',
                        gridIndex: 3,
                        type: 'value'
                    },{
                        name: 'free_share',
                        gridIndex: 3,
                        type: 'value'
                    }],
                    dataset: {
                        dimensions:[
                            {name: 'trade_date', type: 'time'},
                            'close',
                            'turnover_rate',
                            'turnover_rate_f',
                            'volume_rate',
                            'pe',
                            'pe_ttm',
                            'pb',
                            'ps',
                            'ps_ttm',
                            'dv_ratio',
                            'dv_ttm',
                            'total_share',
                            'float_share',
                            'free_share',
                            'total_mv',
                            'circ_mv'
                        ],
                        source: []
                    },
                    legend: {
                        data: ['close', 'turnover_rate'],
                        left: 10
                    },
                    dataZoom: [
                        {
                            show: true,
                            realtime: true,
                            start: 0,
                            end: 100,
                            xAxisIndex: [0, 1, 2, 3]
                        },
                        {
                            type: 'inside',
                            realtime: true,
                            start: 0,
                            end: 100,
                            xAxisIndex: [0, 1, 2, 3]
                        }],
                    grid: [{
                        left: 50,
                        right: 50,
                        height: '15%'
                    }, {
                        left: 50,
                        right: 50,
                        top: '30%',
                        height: '15%'
                    }, {
                        left: 50,
                        right: 50,
                        top: '55%',
                        height: '15%'
                    }, {
                        left: 50,
                        right: 50,
                        top: '80%',
                        height: '15%'
                    }],
                    series: [
                        {
                            name: 'close',
                            type: 'line',
                            smooth: true,
                            itemStyle: {
                                opacity: 0
                            },
                            lineStyle: {
                                color: 'rgb(255, 70, 131)'
                            },
                            encode: {
                                x: [0],
                                y: [1]
                            }
                        },
                        {
                            name: 'pe_ttm',
                            type: 'line',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            smooth: true,
                            itemStyle: {
                                opacity: 0
                            },
                            lineStyle: {
                                color: 'rgb(104,70,255)'
                            },
                            encode: {
                                x: [0],
                                y: 'pe_ttm'
                            }
                        },
                        {
                            name: 'ps_ttm',
                            type: 'line',
                            xAxisIndex: 1,
                            yAxisIndex: 2,
                            smooth: true,
                            itemStyle: {
                                opacity: 0
                            },
                            lineStyle: {
                                color: 'rgb(100,139,36)'
                            },
                            encode: {
                                x: [0],
                                y: 'ps_ttm'
                            }
                        },
                        {
                            name: 'pb',
                            type: 'line',
                            xAxisIndex: 2,
                            yAxisIndex: 3,
                            smooth: true,
                            itemStyle: {
                                opacity: 0
                            },
                            lineStyle: {
                                color: 'rgb(70,255,212)'
                            },
                            encode: {
                                x: [0],
                                y: 'pb'
                            }
                        },
                        {
                            name: 'total_share',
                            type: 'line',
                            xAxisIndex: 2,
                            yAxisIndex: 4,
                            smooth: true,
                            itemStyle: {
                                opacity: 0
                            },
                            lineStyle: {
                                color: 'rgb(147,70,255)'
                            },
                            encode: {
                                x: [0],
                                y: 'total_share'
                            }
                        },
                        {
                            name: 'float_share',
                            type: 'line',
                            xAxisIndex: 3,
                            yAxisIndex: 5,
                            smooth: true,
                            itemStyle: {
                                opacity: 0
                            },
                            lineStyle: {
                                color: 'rgb(255,150,70)'
                            },
                            encode: {
                                x: [0],
                                y: 'float_share'
                            }
                        },
                        {
                            name: 'free_share',
                            type: 'line',
                            xAxisIndex: 3,
                            yAxisIndex: 6,
                            smooth: true,
                            itemStyle: {
                                opacity: 0
                            },
                            lineStyle: {
                                color: 'rgb(70,122,255)'
                            },
                            encode: {
                                x: [0],
                                y: 'free_share'
                            }
                        }
                    ]
                }
            }
        },
        methods: {
            fetchStockData: function (ts_code) {
                this.dataset_raw = {
                    trade_date: [],
                    close: [],
                    turnover_rate: [],
                    turnover_rate_f: [],
                    volume_rate: [],
                    pe: [],
                    pe_ttm: [],
                    pb: [],
                    ps: [],
                    ps_ttm: [],
                    dv_ratio: [],
                    dv_ttm: [''],
                    total_share: [],
                    float_share: [],
                    free_share: [],
                    total_mv: [],
                    circ_mv: []
                };
                let count = 0;
                fetchDataSize(ts_code).then(res => {
                    count = res.data.data;
                    this.fetchPage(ts_code, this.pageSize, 0, count / this.pageSize);
                }).catch(err=>{
                    console.log(err)
                })
                // return [
                //     {
                //         symbol: '000002',
                //         name: '万科',
                //         industry_type: '房地产',
                //         ts_code: ts_code,
                //         trade_date: '20091231',
                //         close: 10.81,
                //         turnover_rate: 1.4141,
                //         turnover_rate_f: 1.699,
                //         volume_rate: 1.15,
                //         pe: 29.4702,
                //         pe_ttm: 25.2127,
                //         pb: 3.4015,
                //         ps: 2.8996,
                //         ps_ttm: 2.4765,
                //         dv_ratio: 0.5782,
                //         dv_ttm: 0.4625,
                //         total_share: 1099521.0218,
                //         float_share: 965609.491,
                //         free_share: 803700.0144,
                //         total_mv: 11885822.2457,
                //         circ_mv: 10438238.5977
                //     }
                // ]
            },
            fetchPage(ts_code, pageSize, offset, pageCount){
                console.log('start fetch ' + offset)
                if (this.ts_code !== ts_code) return;
                fetchData(ts_code, pageSize, offset).then(res => {
                    if (this.ts_code !== ts_code) return;
                    this.option.dataset.source = this.export_dataset(res.data.data);
                    this.$refs.chartsTemplate.drawChart(this.option);
                    if (offset < pageCount - 1) {
                        this.fetchPage(ts_code, pageSize, offset+1, pageCount);
                    }
                }).catch(err => {
                    console.log(err)
                    this.fetchPage(ts_code, pageSize, offset, pageCount);
                })
            },
            export_dataset: function (raw_data) {
                for (let i = 0; i < raw_data.length; i++) {
                    let value = raw_data[i];
                    this.dataset_raw.trade_date.push(value.trade_date.substr(0, 4) + '-'
                        + value.trade_date.substr(4, 2) + '-' + value.trade_date.substr(6, 2));
                    this.dataset_raw.close.push(value.close);
                    this.dataset_raw.turnover_rate.push(value.turnover_rate);
                    this.dataset_raw.turnover_rate_f.push(value.turnover_rate_f);
                    this.dataset_raw.volume_rate.push(value.volume_rate);
                    this.dataset_raw.pe.push(value.pe);
                    this.dataset_raw.pe_ttm.push(value.pe_ttm);
                    this.dataset_raw.pb.push(value.pb);
                    this.dataset_raw.ps.push(value.ps);
                    this.dataset_raw.ps_ttm.push(value.ps_ttm);
                    this.dataset_raw.dv_ratio.push(value.dv_ratio);
                    this.dataset_raw.dv_ttm.push(value.dv_ttm);
                    this.dataset_raw.total_share.push(value.total_share);
                    this.dataset_raw.float_share.push(value.float_share);
                    this.dataset_raw.free_share.push(value.free_share);
                    this.dataset_raw.total_mv.push(value.total_mv);
                    this.dataset_raw.circ_mv.push(value.circ_mv);
                }
                return this.dataset_raw;
            },
            changeCurrent(ts_code){
                this.ts_code = ts_code;
                this.fetchStockData(ts_code);
            }
        },
        created: function () {
            this.fetchStockData(this.ts_code);
        }
    }
</script>

<style scoped>
    .charts-offset{
        margin-top: 50px;
    }
</style>

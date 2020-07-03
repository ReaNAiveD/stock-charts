<template>
    <div>
        <el-input v-model="ts_code" @change="changeCurrent"/>
        <div class="info-container">
            <el-row>
                <el-col :xs="24" :sm="24" class="stock-title">
                    {{name}}
                </el-col>
                <el-col :xs="24" :sm="8" class="stock-info-piece">
                    <b>板块：</b>{{industry}}
                </el-col>
                <el-col :xs="24" :sm="8" class="stock-info-piece">
                    <b>最后更新日期：</b>{{latest_data.trade_date}}
                </el-col>
                <el-col :xs="24" :sm="8" class="stock-info-piece">
                    <b>收盘价：</b>{{latest_data.close}}
                </el-col>
                <el-col :xs="24" :sm="8" class="stock-info-piece">
                    <b>换手率：</b>{{latest_data.turnover_rate}}
                </el-col>
                <el-col :xs="24" :sm="8" class="stock-info-piece">
                    <b>换手率（流通股）：</b>{{latest_data.turnover_rate_f}}
                </el-col>
                <el-col :xs="24" :sm="8" class="stock-info-piece">
                    <b>量比：</b>{{latest_data.volume_rate}}
                </el-col>
                <el-col :xs="24" :sm="8" class="stock-info-piece">
                    <b>市盈率：</b>{{latest_data.pe}}
                </el-col>
                <el-col :xs="24" :sm="8" class="stock-info-piece">
                    <b>市盈率（TTM）：</b>{{latest_data.pe_ttm}}
                </el-col>
                <el-col :xs="24" :sm="8" class="stock-info-piece">
                    <b>市净率：</b>{{latest_data.pb}}
                </el-col>
                <el-col :xs="24" :sm="8" class="stock-info-piece">
                    <b>市销率：</b>{{latest_data.ps}}
                </el-col>
                <el-col :xs="24" :sm="8" class="stock-info-piece">
                    <b>市销率（TTM）：</b>{{latest_data.ps_ttm}}
                </el-col>
                <el-col :xs="24" :sm="8" class="stock-info-piece">
                    <b>股息率：</b>{{latest_data.dv_ratio}}
                </el-col>
                <el-col :xs="24" :sm="8" class="stock-info-piece">
                    <b>股息率（TTM）：</b>{{latest_data.dv_ttm}}
                </el-col>
                <el-col :xs="24" :sm="8" class="stock-info-piece">
                    <b>总股本：</b>{{latest_data.total_share}}
                </el-col>
                <el-col :xs="24" :sm="8" class="stock-info-piece">
                    <b>流通股本：</b>{{latest_data.float_share}}
                </el-col>
                <el-col :xs="24" :sm="8" class="stock-info-piece">
                    <b>自由流通股本：</b>{{latest_data.free_share}}
                </el-col>
                <el-col :xs="24" :sm="8" class="stock-info-piece">
                    <b>总市值：</b>{{latest_data.total_mv}}
                </el-col>
                <el-col :xs="24" :sm="8" class="stock-info-piece">
                    <b>流通市值：</b>{{latest_data.circ_mv}}
                </el-col>
            </el-row>
        </div>


        <div class="analysis">
            根据 {{ active_avg_info }}个交易日平均指标中的市盈率与市净率，建议 <b>{{ advice }}</b> 此股票
        </div>


        <el-tabs v-model="active_avg_info" class="info-container" @tab-click="handleClick">
            <el-tab-pane label="30个交易日平均指标" name="30">
                <el-row>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>板块：</b>{{industry}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>最后更新日期：</b>{{latest_data.trade_date}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>收盘价：</b>{{historical_avg["30"].close | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>换手率：</b>{{historical_avg["30"].turnover_rate | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>换手率（流通股）：</b>{{historical_avg["30"].turnover_rate_f | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>量比：</b>{{historical_avg["30"].volume_rate | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市盈率：</b>{{historical_avg["30"].pe | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市盈率（TTM）：</b>{{historical_avg["30"].pe_ttm | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市净率：</b>{{historical_avg["30"].pb | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市销率：</b>{{historical_avg["30"].ps | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市销率（TTM）：</b>{{historical_avg["30"].ps_ttm | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>股息率：</b>{{historical_avg["30"].dv_ratio | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>股息率（TTM）：</b>{{historical_avg["30"].dv_ttm | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>总股本：</b>{{historical_avg["30"].total_share | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>流通股本：</b>{{historical_avg["30"].float_share | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>自由流通股本：</b>{{historical_avg["30"].free_share | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>总市值：</b>{{historical_avg["30"].total_mv | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>流通市值：</b>{{historical_avg["30"].circ_mv | numberFilter}}
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="150个交易日平均指标" name="150">
                <el-row>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>板块：</b>{{industry}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>最后更新日期：</b>{{latest_data.trade_date}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>收盘价：</b>{{historical_avg["150"].close | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>换手率：</b>{{historical_avg["150"].turnover_rate | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>换手率（流通股）：</b>{{historical_avg["150"].turnover_rate_f | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>量比：</b>{{historical_avg["150"].volume_rate | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市盈率：</b>{{historical_avg["150"].pe | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市盈率（TTM）：</b>{{historical_avg["150"].pe_ttm | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市净率：</b>{{historical_avg["150"].pb | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市销率：</b>{{historical_avg["150"].ps | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市销率（TTM）：</b>{{historical_avg["150"].ps_ttm | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>股息率：</b>{{historical_avg["150"].dv_ratio | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>股息率（TTM）：</b>{{historical_avg["150"].dv_ttm | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>总股本：</b>{{historical_avg["150"].total_share | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>流通股本：</b>{{historical_avg["150"].float_share | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>自由流通股本：</b>{{historical_avg["150"].free_share | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>总市值：</b>{{historical_avg["150"].total_mv | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>流通市值：</b>{{historical_avg["150"].circ_mv | numberFilter}}
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="300个交易日平均指标" name="300">
                <el-row>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>板块：</b>{{industry}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>最后更新日期：</b>{{latest_data.trade_date}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>收盘价：</b>{{historical_avg["300"].close | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>换手率：</b>{{historical_avg["300"].turnover_rate | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>换手率（流通股）：</b>{{historical_avg["300"].turnover_rate_f | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>量比：</b>{{historical_avg["300"].volume_rate | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市盈率：</b>{{historical_avg["300"].pe | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市盈率（TTM）：</b>{{historical_avg["300"].pe_ttm | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市净率：</b>{{historical_avg["300"].pb | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市销率：</b>{{historical_avg["300"].ps | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市销率（TTM）：</b>{{historical_avg["300"].ps_ttm | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>股息率：</b>{{historical_avg["300"].dv_ratio | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>股息率（TTM）：</b>{{historical_avg["300"].dv_ttm | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>总股本：</b>{{historical_avg["300"].total_share | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>流通股本：</b>{{historical_avg["300"].float_share | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>自由流通股本：</b>{{historical_avg["300"].free_share | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>总市值：</b>{{historical_avg["300"].total_mv | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>流通市值：</b>{{historical_avg["300"].circ_mv | numberFilter}}
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="900个交易日平均指标" name="900">
                <el-row>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>板块：</b>{{industry}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>最后更新日期：</b>{{latest_data.trade_date}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>收盘价：</b>{{historical_avg["900"].close | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>换手率：</b>{{historical_avg["900"].turnover_rate | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>换手率（流通股）：</b>{{historical_avg["900"].turnover_rate_f | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>量比：</b>{{historical_avg["900"].volume_rate | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市盈率：</b>{{historical_avg["900"].pe | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市盈率（TTM）：</b>{{historical_avg["900"].pe_ttm | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市净率：</b>{{historical_avg["900"].pb | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市销率：</b>{{historical_avg["900"].ps | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市销率（TTM）：</b>{{historical_avg["900"].ps_ttm | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>股息率：</b>{{historical_avg["900"].dv_ratio | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>股息率（TTM）：</b>{{historical_avg["900"].dv_ttm | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>总股本：</b>{{historical_avg["900"].total_share | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>流通股本：</b>{{historical_avg["900"].float_share | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>自由流通股本：</b>{{historical_avg["900"].free_share | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>总市值：</b>{{historical_avg["900"].total_mv | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>流通市值：</b>{{historical_avg["900"].circ_mv | numberFilter}}
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="3000个交易日平均指标" name="3000">
                <el-row>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>板块：</b>{{industry}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>最后更新日期：</b>{{latest_data.trade_date}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>收盘价：</b>{{historical_avg["3000"].close | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>换手率：</b>{{historical_avg["3000"].turnover_rate | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>换手率（流通股）：</b>{{historical_avg["3000"].turnover_rate_f | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>量比：</b>{{historical_avg["3000"].volume_rate | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市盈率：</b>{{historical_avg["3000"].pe | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市盈率（TTM）：</b>{{historical_avg["3000"].pe_ttm | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市净率：</b>{{historical_avg["3000"].pb | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市销率：</b>{{historical_avg["3000"].ps | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>市销率（TTM）：</b>{{historical_avg["3000"].ps_ttm | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>股息率：</b>{{historical_avg["3000"].dv_ratio | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>股息率（TTM）：</b>{{historical_avg["3000"].dv_ttm | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>总股本：</b>{{historical_avg["3000"].total_share | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>流通股本：</b>{{historical_avg["3000"].float_share | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>自由流通股本：</b>{{historical_avg["3000"].free_share | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>总市值：</b>{{historical_avg["3000"].total_mv | numberFilter}}
                    </el-col>
                    <el-col :xs="24" :sm="8" class="stock-info-piece">
                        <b>流通市值：</b>{{historical_avg["3000"].circ_mv | numberFilter}}
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
        <charts-template class="charts-offset" :height="'750px'" ref="chartsTemplate"/>
    </div>
</template>

<script>
    import ChartsTemplate from "@/components/ChartsTemplate";
    import { fetchData, fetchDataSize, fetchLatest, getHistoricalAvg } from "@/api/statistic";

    export default {
        name: "ChartsMain",
        components: {ChartsTemplate},
        data: function () {
            return {
                ts_code:'000001.SZ',
                name: '',
                industry: '',
                active_avg_info: "30",
                advice: "",
                latest_data: {
                    trade_date: '',
                    close: 0,
                    turnover_rate: 0,
                    turnover_rate_f: 0,
                    volume_rate: 0,
                    pe: 0,
                    pe_ttm: 0,
                    pb: 0,
                    ps: 0,
                    ps_ttm: 0,
                    dv_ratio: 0,
                    dv_ttm: 0,
                    total_share: 0,
                    float_share: 0,
                    free_share: 0,
                    total_mv: 0,
                    circ_mv: 0
                },
                historical_avg: {
                    "30":{},
                    "150": {},
                    "300": {},
                    "900": {},
                    "3000": {}
                },
                dataset_raw : {},
                pageSize: 400,
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
        filters: {
            numberFilter(value) {
                if (value) {
                    return parseFloat(value).toFixed(4);
                }
                return '';
            }
        },
        methods: {
            fetchLatestData: function(ts_code) {
                fetchLatest(ts_code).then(res => {
                    this.name = res.data.data.name;
                    this.industry = res.data.data.industry_type;
                    this.latest_data = res.data.data;
                })
            },
            fetchHistoricalAvg: function(ts_code) {
                getHistoricalAvg(ts_code).then(res => {
                    this.historical_avg = res.data.data;
                    this.handleClick();
                })
            },
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
                    dv_ttm: [],
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
                this.fetchLatestData(ts_code);
                this.fetchHistoricalAvg(this.ts_code);
                this.fetchStockData(ts_code);
            },

            handleClick() {
                let pe_avg = this.historical_avg[this.active_avg_info].pe,
                    pb_avg = this.historical_avg[this.active_avg_info].pb,
                    pe_curr = this.latest_data.pe,
                    pb_curr = this.latest_data.pb;   // 市盈率 & 市净率

                // compare
                let pe_comp = Math.abs(pe_avg - pe_curr) > pe_avg * 0.1,
                    pb_comp = Math.abs(pb_avg - pb_curr) > pb_avg * 0.1;

                if (pe_comp && pb_comp) {
                    this.advice = "卖出";
                }
                else if (!pe_comp && !pb_comp) {
                    this.advice = "买入";
                }
                else {
                    this.advice = "持仓";
                } 
            }
        },
        created: function () {
            this.fetchLatestData(this.ts_code);
            this.fetchHistoricalAvg(this.ts_code);
            this.fetchStockData(this.ts_code);
        }
    }
</script>

<style scoped>
    .analysis {
        margin: 45px 0;
        color: brown;
    }

    .charts-offset{
        margin-top: 50px;
    }

    .stock-title{
        font-size: 24px;
        padding-bottom: 8px;
    }

    .stock-info-piece {
        padding-bottom: 4px;
    }

    .info-container {
        max-width: 1400px;
        margin: auto;
        margin-bottom: 30px;
    }
</style>

import mongoose from './db'

export default mongoose.model('daily_basic', {
    symbol: String,
    name: String,
    industry_type: String,
    ts_code: String,
    trade_date: String,
    close: Number,
    turnover_rate: Number,
    turnover_rate_f: Number,
    volume_rate: Number,
    pe: Number,
    pe_ttm: Number,
    pb: Number,
    ps: Number,
    ps_ttm: Number,
    dv_ratio: Number,
    dv_ttm: Number,
    total_share: Number,
    float_share: Number,
    free_share: Number,
    total_mv: Number,
    circ_mv: Number
})

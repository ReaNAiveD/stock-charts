import request from '@/utils/request'

export function fetchData(ts_code, pagesize, offset) {
    return request({
        url: '/daily/statistic',
        method : 'get',
        params: {
            tscode: ts_code,
            pagesize: pagesize,
            offset: offset
        }
    })
}

export function fetchDataSize(ts_code) {
    return request({
        url: '/daily/count',
        method : 'get',
        params: {
            tscode: ts_code
        }
    })
}

export function fetchLatest(ts_code) {
    return request({
        url: '/daily/latest',
        method : 'get',
        params: {
            tscode: ts_code
        }
    })
}

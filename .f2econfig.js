const { argv } = process
const build = argv[argv.length - 1] === 'build'
const { join } = require('path')

module.exports = {
    livereload: !build,
    build,
    gzip: true,
    useLess: true,
    buildFilter: (p) => /^(index|css|src)/.test(p),
    outputFilter: (p) => /^(index|css\/?(?=bundle|$)|static)/.test(p),
    middlewares: [
        {
            middleware: 'proxy',
            test: /^\/weather\.js/,
            url: 'http://d1.weather.com.cn/',
            pathname: () => 'dingzhi/101010100.html',
            renderHeaders: () => ({ referer: 'http://www.weather.com.cn/weather1d/101010100.shtml' })
        },
        { middleware: 'template', test: /index\.html/ },
        { middleware: 'webpack' },
        require('./lib').default
    ],
    output: join(__dirname, './output')
}
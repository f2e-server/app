import { MiddlewareCreater } from 'f2e-server'
import { out, Route } from 'f2e-serve'

let visit_times = 0;
const get_visit_times = () => ({ visits: ++visit_times })
const get_server_time = () => ({ time: new Date().toLocaleString() })
const get_param = async (req: any) => req.data

const creater: MiddlewareCreater = (conf) => {
    const route = new Route()

    route.on('visit', out.JsonOut(get_visit_times))
    route.on('time', out.ServerSent(get_server_time))
    route.on('jsonp', out.JsonpOut(get_param))
    route.on(/(^|\/)\w*$/, () => 'index.html')

    return {
        onRoute: route.execute
    }
}

export default creater
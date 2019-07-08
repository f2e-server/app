"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const f2e_serve_1 = require("f2e-serve");
let visit_times = 0;
const get_visit_times = () => ({ visits: ++visit_times });
const get_server_time = () => ({ time: new Date().toLocaleString() });
const get_param = async (req) => req.data;
const creater = (conf) => {
    const route = new f2e_serve_1.Route();
    route.on('visit', f2e_serve_1.out.JsonOut(get_visit_times));
    route.on('time', f2e_serve_1.out.ServerSent(get_server_time));
    route.on('jsonp', f2e_serve_1.out.JsonpOut(get_param));
    route.on(/(^|\/)\w*$/, () => 'index.html');
    return {
        onRoute: route.execute
    };
};
exports.default = creater;

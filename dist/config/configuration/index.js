"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _default = ()=>({
        logs: JSON.parse(process.env.LOGS),
        frontDomain: process.env.FRONT_DOMAIN,
        port: Number(process.env.PORT) || 5000
    });

//# sourceMappingURL=index.js.map
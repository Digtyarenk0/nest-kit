"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AppModule", {
    enumerable: true,
    get: function() {
        return AppModule;
    }
});
const _bull = require("@nestjs/bull");
const _cachemanager = require("@nestjs/cache-manager");
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _schedule = require("@nestjs/schedule");
const _cachemanagerredisstore = /*#__PURE__*/ _interop_require_wildcard(require("cache-manager-redis-store"));
const _envs = /*#__PURE__*/ _interop_require_default(require("../config/envs"));
const _nestjspino = require("nestjs-pino");
const _configuration = /*#__PURE__*/ _interop_require_default(require("../config/configuration"));
const _initmodule = require("./init/init.module");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const configImports = [
    _schedule.ScheduleModule.forRoot(),
    _config.ConfigModule.forRoot({
        isGlobal: true,
        load: [
            _configuration.default,
            _envs.default
        ]
    }),
    _cachemanager.CacheModule.register({
        isGlobal: true,
        store: _cachemanagerredisstore,
        url: process.env.REDIS_URL,
        password: process.env.REDIS_PASSWORD
    }),
    _bull.BullModule.forRoot({
        url: process.env.REDIS_URL,
        redis: {
            password: process.env.REDIS_PASSWORD
        }
    })
];
process.env.LOGS === 'true' && configImports.push(_nestjspino.LoggerModule.forRoot());
let AppModule = class AppModule {
};
AppModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            ...configImports,
            _initmodule.InitModule
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map
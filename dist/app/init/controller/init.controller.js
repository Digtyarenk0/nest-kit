"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InitController", {
    enumerable: true,
    get: function() {
        return InitController;
    }
});
const _common = require("@nestjs/common");
const _initservice = require("../service/init.service");
const _swagger = require("@nestjs/swagger");
const _decorators = require("../decorators");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function _ts_metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
let InitController = class InitController {
    getHello() {
        return this.appService.getHello();
    }
    constructor(appService){
        this.appService = appService;
    }
};
_ts_decorate([
    (0, _swagger.ApiOperation)({
        summary: 'Hello'
    }),
    (0, _decorators.InitResoposeSwagger)(),
    (0, _common.HttpCode)(_common.HttpStatus.OK),
    (0, _common.Get)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", []),
    _ts_metadata("design:returntype", String)
], InitController.prototype, "getHello", null);
InitController = _ts_decorate([
    (0, _common.Controller)(),
    _ts_metadata("design:type", Function),
    _ts_metadata("design:paramtypes", [
        typeof _initservice.InitService === "undefined" ? Object : _initservice.InitService
    ])
], InitController);

//# sourceMappingURL=init.controller.js.map
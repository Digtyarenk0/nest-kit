"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _common = require("@nestjs/common");
const _config = require("@nestjs/config");
const _core = require("@nestjs/core");
const _cookieparser = /*#__PURE__*/ _interop_require_default(require("cookie-parser"));
const _nestjspino = require("nestjs-pino");
const _appmodule = require("./app/app.module");
const _swagger = require("./swagger");
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
async function bootstrap() {
    const appModuleParams = {
        bufferLogs: true
    };
    const app = await _core.NestFactory.create(_appmodule.AppModule, appModuleParams);
    _swagger.Swagger.init(app);
    const configService = app.get(_config.ConfigService);
    app.useGlobalPipes(new _common.ValidationPipe());
    app.use((0, _cookieparser.default)());
    app.enableCors({
        origin: configService.get('frontDomain'),
        credentials: true
    });
    _common.Logger.log(`App logs: ${configService.get('logs')}`, 'Config');
    if (configService.get('logs')) {
        app.useLogger(app.get(_nestjspino.Logger));
    }
    await app.listen(configService.get('port'), ()=>{
        console.log(`Server started on port: ${configService.get('port')}`);
        console.log(`Swagger: ${configService.get('port')}/swagger`);
    });
}
bootstrap();

//# sourceMappingURL=main.js.map
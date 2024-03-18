"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Swagger", {
    enumerable: true,
    get: function() {
        return Swagger;
    }
});
const _swagger = require("@nestjs/swagger");
const _initmodule = require("./app/init/init.module");
const include = [
    _initmodule.InitModule
];
let Swagger = class Swagger {
    static init(app) {
        const options = {
            include,
            deepScanRoutes: false
        };
        const config = new _swagger.DocumentBuilder().setTitle('Swagger').setVersion('0.1').build();
        const document = _swagger.SwaggerModule.createDocument(app, config, options);
        _swagger.SwaggerModule.setup('swagger', app, document);
    }
};

//# sourceMappingURL=swagger.js.map
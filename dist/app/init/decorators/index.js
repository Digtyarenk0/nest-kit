"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "InitResoposeSwagger", {
    enumerable: true,
    get: function() {
        return InitResoposeSwagger;
    }
});
const _common = require("@nestjs/common");
const _swagger = require("@nestjs/swagger");
function InitResoposeSwagger() {
    return (0, _common.applyDecorators)((0, _swagger.ApiResponse)({
        status: _common.HttpStatus.OK,
        description: '',
        schema: {
            example: {
                status: _common.HttpStatus.OK,
                message: ''
            }
        }
    }));
}

//# sourceMappingURL=index.js.map
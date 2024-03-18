"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    default: function() {
        return _default;
    },
    getAppConfig: function() {
        return getAppConfig;
    }
});
const _mainnet = require("./mainnet");
const _testnet = require("./testnet");
const _type = require("./type");
const getAppConfig = (net)=>{
    if (net !== _type.ENV.mainnet && net !== _type.ENV.testnet) throw new Error(`NEST_CONFIG must be ${_type.ENV.mainnet} or ${_type.ENV.testnet}`);
    const app = net === _type.ENV.mainnet ? _mainnet.mainnetConfig : _testnet.testnetConfig;
    return app;
};
const _default = ()=>{
    const currentNetwork = process.env.NEST_CONFIG;
    if (currentNetwork !== _type.ENV.mainnet && currentNetwork !== _type.ENV.testnet) throw new Error(`NEST_CONFIG must be ${_type.ENV.mainnet} or ${_type.ENV.testnet}`);
    const app = currentNetwork === _type.ENV.mainnet ? _mainnet.mainnetConfig : _testnet.testnetConfig;
    return {
        app
    };
};

//# sourceMappingURL=index.js.map
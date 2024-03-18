/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger/plugin": { "models": [], "controllers": [[import("./app/init/init.controller"), { "InitController": { "getHello": { type: String } } }], [import("./app/init/controller/init.controller"), { "InitController": { "getHello": { type: String } } }]] } };
};
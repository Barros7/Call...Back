import express = require("express");
import "dotenv/config";
declare class App {
    app: express.Application;
    private corsWhitelist;
    constructor();
    private connectDatabases;
    private configRoutes;
    private configureCors;
    private config;
    private securityConfig;
    start(): void;
    private configureCustomMiddlewares;
}
declare const app: App;
export default app;

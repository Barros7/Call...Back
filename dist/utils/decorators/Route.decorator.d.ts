import METHOD from "../enums/methods.enum";
interface RouteConfigProps {
    method: METHOD;
    path: string;
    middleware?: any;
}
declare const route: import("express-serve-static-core").Router;
declare function routeConfig({ method, path, middleware, }: RouteConfigProps): MethodDecorator;
export { route, routeConfig };

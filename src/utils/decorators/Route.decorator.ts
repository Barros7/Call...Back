import { Request, Response, Router } from "express";
import app from "../../config/App";
import App from "../../config/App";
import METHOD from "../enums/methods.enum";

interface RouteConfigProps {
  method: METHOD;
  path: string;
  middleware?: any;
}

const route = Router();

function routeConfig({
  method,
  path,
  middleware,
}: RouteConfigProps): MethodDecorator {
  return function (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const response = async (req: Request, res: Response) => {
      try {
        const original = await descriptor.value(req, res);
        res.status(200).json(original);
      } catch (error: any) {
        res.status(error.status ?? 500).json({
          message: error.message ?? "Internal server error",
        });
      }
    };

    if (middleware) {
      route[method](path, middleware, response);
    } else {
      route[method](path, response);
    }
  };
}

export { route, routeConfig };

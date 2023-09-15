/**
 * To handle HTTP requests and serve responses properly, we will use the following
    modules to configure Express:
    body-parser: Request body-parsing middleware to handle the complexities of parsing streamable request
                 objects so that we can simplify browser-server communication by exchanging JSON in the request body. To install the module, run yarn add body-parser from the command line. Then, configure the Express app with bodyParser.json() and bodyParser.urlencoded({ extended: true }).
    cookie-parser: Cookie parsing middleware to parse and set cookies in request objects. To install the 
                    cookie-parser module, run yarn add cookie-parser from the command line.
    compression: Compression middleware that will attempt to compress response bodies for all requests that
                 traverse through the middleware. To install the compression module, run yarn add compression from the command line.
    helmet: Collection of middleware functions to help secure Express apps by setting various HTTP headers. 
            To install the helmet module, run yarn add helmet from the command line.
    cors: Middleware to enable cross-origin resource sharing (CORS). To install the cors module, run yarn
        add cors from the command line.
 */

import express from "express";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";

const app = express();
// 对req.body的信息进行解析（如果express的版本>=4.17则可以用express代替）
app.use(express.json());
// 对表单进行解析（如果express的版本>=4.17则可以用express代替）
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;

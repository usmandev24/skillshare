import { default as express } from 'express';
import * as http from 'http';
import * as path from 'path';
import { default as cookieParser } from 'cookie-parser';
import { default as logger } from 'morgan';
import { default as bodyParser } from 'body-parser'
import { router as indexRouter } from './routes/index.mjs';

import { default as handlebars } from "hbs";
import { default as DBG } from "debug";

import { normalizePort, create404, handleError, onError, onListening } from "./appsupport.mjs";


export const app = express();
const debug = DBG("skillshare:debug");
const dbgerror = DBG("skillshare:error");
const __dirname = import.meta.dirname ;                debug(__dirname)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
handlebars.registerPartials(path.join(__dirname, 'views', 'partials'));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);


app.use(create404);
app.use(handleError);

export const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

export const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);




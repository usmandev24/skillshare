import { default as express } from 'express';
import * as http from 'http';
import * as path from 'path';
import { default as cookieParser } from 'cookie-parser';
import { default as logger } from 'morgan';
import { default as bodyParser } from 'body-parser'
import { router as indexRouter } from './routes/index.mjs';
import { router as skillRouter } from './routes/skillRouts.mjs';
import { router as userRouter } from './routes/userRouts.mjs';
import { approotdir } from './approotdir.mjs';

import { default as hbs } from "hbs";
import { default as DBG } from "debug";

import { normalizePort, create404, handleError, onError, onListening } from "./appsupport.mjs";
import * as url from 'url'
const filename = url.fileURLToPath(import.meta.url)

export const app = express();
export const usersdir = path.join(approotdir, 'secrets','userData.json');
export const skillsdir = path.join(approotdir, "FsStoreData");
const debug = DBG("skillshare:debug");
const dbgerror = DBG("skillshare:error");
const __dirname = path.dirname(filename) ;                debug(__dirname)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/vendor/feather-icons', express.static(path.join(__dirname, 'node_modules', 'feather-icons', 'dist')));
app.use('/', indexRouter);
app.use('/skill', skillRouter);
app.use('/user', userRouter)

app.use(create404);
app.use(handleError);

export const port = normalizePort(process.env.PORT || 3000);
app.set('port', port);

export const server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);




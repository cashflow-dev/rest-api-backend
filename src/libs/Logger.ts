import moment from 'moment';
import bunyan from 'bunyan';
import chalk from 'chalk';
import 'dotenv/config';

const log = bunyan.createLogger({
  name: `${process.env.APP_NAME}`,
  src: true,
  streams: [
    {
      type: 'file',
      path: `${__dirname}/..${process.env.LOG_PATH}`,
      level: 'info',
    },
    {
      type: 'file',
      path: `${__dirname}/..${process.env.LOG_PATH}`,
      level: 'warn',
    },
    {
      type: 'file',
      path: `${__dirname}/..${process.env.LOG_PATH}`,
      level: 'error',
    },
    {
      type: 'file',
      path: `${__dirname}/..${process.env.LOG_PATH}`,
      level: 'fatal',
    },
  ],
});

class Logger {
  public static info(msg: string) {
    const time = moment().format('YYYY-MM-DD h:mm:ss a');
    const logMessage = `${time}: ${msg}`;
    console.log(chalk.inverse.bold(logMessage));
    log.info(logMessage);
  }

  public static warn(msg: string) {
    const time = moment().format('YYYY-MM-DD h:mm:ss a');
    const logMessage = `${time}: ${msg}`;
    console.log(chalk.bgYellow.black.bold(logMessage));
    log.warn(logMessage);
  }

  public static error(msg: string) {
    const time = moment().format('YYYY-MM-DD h:mm:ss a');
    const logMessage = `${time}: ${msg}`;
    console.log(chalk.bgRed.bold.white(logMessage));
    log.error(logMessage);
  }

  public static vebose(msg: string) {
    const time = moment().format('YYYY-MM-DD h:mm:ss a');
    const logMessage = `${time}: ${msg}`;
    log.info(logMessage);
  }

  public static debug(msg: string) {
    const time = moment().format('YYYY-MM-DD h:mm:ss a');
    const logMessage = `${time}: ${msg}`;
    log.debug(logMessage);
  }

  public static fatal(msg: string) {
    const time = moment().format('YYYY-MM-DD h:mm:ss a');
    const logMessage = `${time}: ${msg}`;
    console.log(chalk.bgRed.bold.white(logMessage));
    log.fatal(logMessage);
  }
}

export default Logger;

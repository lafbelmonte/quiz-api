/* eslint-disable @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any */
import winston, { createLogger, transports, format } from 'winston';

type NonEmptyArray<T> = [T, ...T[]];

class Logger {
  private tags: NonEmptyArray<string>;
  private logger: winston.Logger;

  public constructor(tags: NonEmptyArray<string>) {
    this.tags = tags;

    this.logger = createLogger({
      levels: winston.config.syslog.levels,
      transports: [new transports.Console({ level: 'debug' })],
      format: format.combine(
        format.colorize(),
        format.printf(({ level, message, tags, ...meta }) => {
          return `[${new Date(
            Date.now()
          ).toUTCString()}] ${level} ${message} ${JSON.stringify({
            tags,
            meta
          })}`;
        })
      ),
      defaultMeta: {
        tags: this.tags
      }
    });
  }

  private log(level: string, message: string, meta: Record<string, any> = {}) {
    this.logger.log(level, message, meta);
  }

  public tag(tags: NonEmptyArray<string>) {
    return new Logger([...this.tags, ...tags]);
  }

  public emerg(message: string, meta?: Record<string, any>) {
    this.log('emerg', message, meta);
  }

  public alert(message: string, meta?: Record<string, any>) {
    this.log('alert', message, meta);
  }

  public crit(message: string, meta?: Record<string, any>) {
    this.log('crit', message, meta);
  }

  public error(message: string, meta?: Record<string, any>) {
    this.log('error', message, meta);
  }

  public warning(message: string, meta?: Record<string, any>) {
    this.log('warning', message, meta);
  }

  public notice(message: string, meta?: Record<string, any>) {
    this.log('notice', message, meta);
  }

  public info(message: string, meta?: Record<string, any>) {
    this.log('info', message, meta);
  }

  public debug(message: string, meta?: Record<string, any>) {
    this.log('debug', message, meta);
  }
}

export default new Logger(['api']);

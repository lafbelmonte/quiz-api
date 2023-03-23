/* eslint-disable @typescript-eslint/no-empty-function */
import exitHook from 'async-exit-hook';
import Logger from './logger';

const logger = Logger.tag(['service']);

let options = {
  start: async () => {},
  stop: async () => {}
};

export function initialize(params: {
  start: () => Promise<void>;
  stop: () => Promise<void>;
}) {
  options = params;
}

export async function start() {
  logger.info('Service starting.');
  await options.start();
  logger.info('Service started.');
}

export async function stop() {
  logger.info('Service stopping.');
  await options.stop();
  logger.info('Service stopped.');
}

exitHook((callback) => {
  logger.crit('Exit hook handler triggered!');
  stop().then(() => callback());
});

exitHook.unhandledRejectionHandler((error, callback) => {
  logger.emerg('Unhandled rejection handler triggered!', error);
  stop().then(() => callback());
});

exitHook.uncaughtExceptionHandler((error, callback) => {
  logger.emerg('Uncaught exception handler triggered!', error);
  stop().then(() => callback());
});

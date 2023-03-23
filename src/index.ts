import Logger from './libs/logger';
import * as Service from './libs/service';

const logger = Logger.tag(['entry_point']);

async function main(entryPoint: string) {
  const { default: service } = await import(`./${entryPoint}`);

  logger.info(`Entry point: ${entryPoint}.`);

  Service.initialize(service);
  Service.start();
}

main(process.env.ENTRY_POINT || 'server');

import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
    transport: {
        target: 'pino-pretty'
    },
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,

})

log.info('Logger Test!');

export default log;
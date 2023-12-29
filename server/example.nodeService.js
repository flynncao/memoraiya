const service = require('node-windows')
const eventLogger = require('node-windows').EventLogger
const log = new eventLogger('Memoraiya')
const svc = new service.Service({
	name: 'Memoraiya Core Service',
	description: 'Memoraiya Node Service',
	script: 'E:\\flynncao-github\\memoraiya\\server\\output\\index.js'
})


svc.on('install', () => {
	log.info('Install complete.')
	svc.start()
	log.info('Service has started.')
})


svc.install()


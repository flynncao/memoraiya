const service = require('node-windows')
const eventLogger = require('node-windows').EventLogger
const log = new eventLogger('Memoraiya')
const svc = new service.Service({
	name: 'Memoraiya Service',
	description: 'Memoraiya Node Service',
	script: 'E:\\flynncao-github\\memoraiya\\server\\output\\index.js'
})


svc.on('uninstall', () => {
	log.info('Uninstall complete.')
	console.log('The service exists: ',svc.exists);
})


svc.uninstall()


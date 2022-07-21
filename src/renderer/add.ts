{
	const { ipcRenderer,remote } = require('electron')
	
	document.getElementById('todoForm')
	.addEventListener('submit', (event:Event) => {
		event.preventDefault()
		const input = event.target as HTMLFormElement
		ipcRenderer.send('add-todo',input['0'].value)
		input['0'].value = ''
	})
	
	document.getElementById('close')
	.addEventListener('click',() => {
		remote.getCurrentWindow().close()
	})
}
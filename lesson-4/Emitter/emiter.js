import EventEmitter from 'events'

const MyEmitter = new EventEmitter()

MyEmitter.on('someEvent', (data) => {

    setTimeout(()=> { console.log(data)}, 3000)
})


export { MyEmitter }
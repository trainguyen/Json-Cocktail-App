const jsonServer=require('json-server')
const server=jsonServer.create()
const router=jsonServer.router('db.json')
const middlewares=jsonServer.defaults();

//Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

//add custom routes before JSON Server router
server.get('/echo',(req,res)=>{
    res.jsonp(req.query)
})

server.use(jsonServer.bodyParser)
server.use((req,res,next)=>{
    if(req.method==='POST'){
        req.body.createAt = Date.now()
    }
    next()
})

server.use('/api',router)
// Use default router 
const PORT=3000;
server.listen(process.env.PORT || PORT,()=>{
    console.log('JSON Server is running')
})


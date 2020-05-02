const router=require('express').Router()
const fs=require('fs')
const neatCsv=require('neat-csv')
var csv2json=require('csv2json')

router.get('/',async function(req,res){
    fs.readFile('worldcities.csv',async (err,data)=>{
        if(err){
            res.status(200).json({err:true,data:"server error"})
        }
        else{
            res.status(200).json({err:false,data:await neatCsv(data)})
        }
    })
})


router.get('/data',async function(req,res){
    fs.readFile('worldcities.csv',async (err,data)=>{
        if(err){
            res.status(200).json({err:true,data:"server error"})
        }
        else{
            var result=[]
            var initial=await neatCsv(data)
            initial.map(item=>{
                result.push({city:item.city,population:item.population})
            })
            res.status(200).json({err:false,data:await result})
        }
    })
})


router.get('/create',async function(req,res){
    try {
        await fs.createReadStream('worldcities.csv')
        .pipe(await csv2json())
        .pipe(await fs.createWriteStream('cities.json'))
        res.status(200).json({err:false,message:"file created..."}) 
    } catch (error) {
        res.status(500).json({err:true,message:"file not created..."}) 
    }
    
})

router.get('/average',async function(req,res){
    fs.readFile('worldcities.csv',async (err,data)=>{
        if(err){
            res.status(500).json({err:true,result:err})
        }
        else{
            var result=0
            var initial=await neatCsv(data)
            initial.map(item=>{
                if(item.population!==''){
                    result+=parseInt(item.population)
                }
            })
            res.status(200).json(await {err:false,result:result/initial.length})
        }
    })
})

router.get('/min',async function(req,res){
    fs.readFile('worldcities.csv',async (err,data)=>{
        if(err){
            res.status(500).json({err:true,result:err})
        }
        else{
            var result=[]
            var initial=await neatCsv(data)
            initial.map(item=>{
                if(item.population){
                    result.push(parseInt(item.population))
                }
            })
            const min = Math.min(...result)
            var final=[]
            initial.map(item=>{
                if(item.population==min){
                    final.push({city:item.city,population:item.population})
                }
            })
            res.status(200).json(await {err:false,result:final})
        }
    })
})

router.get('/max',async function(req,res){
    fs.readFile('worldcities.csv',async (err,data)=>{
        if(err){
            res.status(500).json({err:true,result:err})
        }
        else{
            var result=[]
            var initial=await neatCsv(data)
            initial.map(item=>{
                if(item.population){
                    result.push(parseInt(item.population))
                }
            })
            const max = Math.max(...result)
            var final=[]
            initial.map(item=>{
                if(item.population==max){
                    final.push({city:item.city,population:item.population})
                }
            })
            res.status(200).json(await {err:false,result:final})
        }
    })
})

module.exports=router
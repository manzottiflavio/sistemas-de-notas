const express=require("express");
const {v4:uuidv4} = require("uuid");
const app=express();
app.use(express.json());



const customers=[];

function verifyIfAccountExists(request,response,next){
    const {cpf}= request.headers;
    
    
    const customer = customers.find((customer)=>customer.cpf === cpf);
    if(!customer){
        return response.status(400).json({error:"customer not found"});
    }
    request.customer=customer;
    
    return next();
}

app.post("/account",(request,response)=>{
    const {cpf,name}=request.body
    
    const customerAlreadyExists=customers.some((customer)=>customer.cpf === cpf);
    
    if(customerAlreadyExists){
        return response.status(400).json({Error: "customer already exists"});
    }
    
    
    customers.push({
        cpf,
        name,
        id:uuidv4(),
        data:new Date(),
        curso:[],
    });
    
   
    return response.status(201).send({message:"customer create successfull"});
    
});

app.put("/account", verifyIfAccountExists,(request, response)=>{
    const {customer}=request;
    const {name}=request.body;
    
    
    customer.name=name
    
    
    return response.status(201).send({message:"change information ok"});
    
    
})

app.get("/account",verifyIfAccountExists,(request, response)=>{
    const{customer}=request;
    
    return response.json(customer);
})


app.delete("/account", verifyIfAccountExists,(request, response)=>{
    const{customer}=request;


    customers.splice(customer, 1);

return response.status(201).json(customers)


})
app.listen(5555);


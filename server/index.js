const express = require('express')
const app = express()
const http = require('http').Server(app)
const port = process.env.PORT || 3001
const db = require("./config/database");
const cors = require('cors')
const bcrypt = require("bcryptjs")
const saltRounds=10
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET_KEY
const cookieParser=require('cookie-parser')

var corsOptions = {
	origin: '*',
	credentials: true,
	exposedHeaders: ["set-cookie"]
};
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));
app.use(cookieParser());


app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type,set-cookie');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.options('/let-me-in', (req, res,next) => {
    res.sendStatus(204);
	next()
});

app.get('/',(req,res)=>{
	res.end("Yes, I'm alive")
})

const verifyToken = async (authToken)=>{
	try{
		const payload = jwt.verify(authToken, secret)
		const query = `SELECT * FROM users WHERE uid = $1;`;
		const values = [payload.data];
		const { rows } = await db.query(query, values)
		if(rows.length==0){
			return {result:false}
		}else{
			return {result:true,data:rows[0],uid:payload.data}
		}
	}catch(e){
		return {result:false}
	}
}

app.post('/deletetodo',async (req,res)=>{
	const token = req.cookies.token
	const authData = await verifyToken(token)
	if(authData.result){
		const query = `DELETE FROM todos WHERE id=$1 AND uid=$2`;
		const values = [req.body.id,authData.uid];
		const { rows } = await db.query(query, values)
		console.log(rows)
		res.send({status:true})
	}else{
		res.send({status:false})
	}

})
app.post('/updatetodostatus',async (req,res)=>{
	const token = req.cookies.token
	const authData = await verifyToken(token)
	if(authData.result){
		const query = `UPDATE todos SET done = NOT done WHERE id = $1 and uid = $2`;
		const values = [req.body.id,authData.uid];
		const { rows } = await db.query(query, values)
		console.log(rows)
		res.send({status:true})
	}else{
		res.send({status:false})
	}
})


app.get('/checkAuth',async (req,res)=>{
	const token = req.cookies.token
	const authData = await verifyToken(token)
	res.status(200).json({result:authData.result,data:
		authData.result ? 
		{
			fname:authData.data.fname,
			lname:authData.data.lname,
			username:authData.data.username,
			email:authData.data.email
		}
		:{}
	})
})

app.get('/gettodos',async (req,res)=>{
	const token = req.cookies.token
	const authData = await verifyToken(token)
	if(authData.result){
		const query = `SELECT * FROM todos WHERE uid = $1;`;
		const values = [authData.uid];
		const { rows } = await db.query(query, values);
		res.send({status:true,result:rows})
	}else{
		res.send({result:false})
	}
})

app.post('/addnewtodo',async (req,res)=>{
	const token = req.cookies.token
	const authData = await verifyToken(token)
	if(authData.result){
		const query = `
	INSERT INTO todos (uid,title,"desc",enddate,endtime,startdate,starttime) 
	VALUES($1,$2,$3,$4,$5,$6,$7)
	RETURNING *;
	`;
		const values = [authData.uid, req.body.title,req.body.desc,req.body.enddate,req.body.endtime,getDate(),getTime()];
		const { rows } = await db.query(query, values)
		console.log(rows)
		res.send({status:true})
	}else{

		res.send({status:false})
	}
})

app.post("/let-me-in",async (req,res)=>{
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	const query = `SELECT * FROM users WHERE username = $1;`;
	const values = [req.body.user];
	const { rows } = await db.query(query, values);
	if(rows.length==0){
		res.send({status:false,result:"wrong username or password"})
	}else{
		const match = await bcrypt.compare(req.body.pass, rows[0].pass)
		if(match){
			const token = jwt.sign({
				data:rows[0].uid
			}, secret, { expiresIn: '7d' })
			var expiryDate = new Date(Number(new Date()) + (7*24*3600000));
			res.setHeader("Set-Cookie", `token=${token};expires=${expiryDate}; Path=/;HttpOnly`)
			res.send({status:true})
			return
		}
		else{
			res.send({status:false,result:"wrong username or password"})
		}
	}
})

app.post("/add-new-user",async (req,res)=>{
	const userquery = `
	SELECT * FROM users WHERE username = $1;
	`;
	const uservalues = [req.body.user];
	const dupUser = await db.query(userquery, uservalues);
	if( dupUser.rows.length!=0){
		res.send({status:false,user:true,result:"user exists"})
		return
	}
	const emailquery = `
	SELECT * FROM users WHERE email = $1;
	`;
	const emailvalues = [req.body.email];
	const dupEmail = await db.query(emailquery, emailvalues);
	if( dupEmail.rows.length!=0){
		res.send({status:false,email:true,result:"email exists"})
		return
	}
	const query = `
	INSERT INTO users (username,fname,lname,email,pass,uid) 
	VALUES($1,$2,$3,$4,$5,$6)
	RETURNING *;
	`;
	var passhash
	await bcrypt.hash(req.body.pass, saltRounds).then(function(hash) {
		passhash=hash
	});
	const values = [req.body.user, req.body.fname,req.body.lname,req.body.email,passhash,generateUid()];
	const { rows } = await db.query(query, values)
	res.send({status:true})

})

function generateUid() {
	var pass = '';
	var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (i = 1; i <= 16; i++) {
		var char = Math.floor(Math.random()
				* str.length + 1);
		pass += str.charAt(char)
	}
	return pass;
}

function getDate() {
	var now = new Date();
	return ((now.getFullYear()) + '-' + (now.getMonth()+1) + '-' + now.getDate())
}

function getTime() {
	var now = new Date();
	return (now.getHours() + ':' + ((now.getMinutes() < 10) ? ("0" + now.getMinutes()) : (now.getMinutes())))
}

http.listen(port,()=>{
	console.log(`listening on port ${port}`)
})


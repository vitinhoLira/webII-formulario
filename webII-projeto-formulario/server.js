const express = require('express');
const app = express();
const port = 8081;
const bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
const { Op } = require("sequelize");
const path = require('path');
const conexao = require("./conexao");
const Usuarios = require('./models/Usuarios;');
const Login = require('./models/Login.js');//Usuario (dados de login)

app.use(express.static(path.join(__dirname, 'public')));

//Configurando as visualizacoes
const exphbs = require('express-handlebars')
app.use(express.static(path.join(__dirname, '/views')));
app.set('views', path.join(__dirname, '/views'))
app.engine('hbs',
	exphbs.engine({
		defaultLayout: 'main',
		extname:'.hbs',
		layoutsDir: path.join(__dirname, 'views/layouts')
	})
);

app.set('view engine','hbs');



conexao.sequelize.authenticate().then(function(){
	console.log("Conectado!!")
}).catch(function(erro){
	console.log("Erro ao conectar: "+erro)
});

conexao.sequelize.sync({alter:true});

app.get('/', (req, res) => {

	res.render("login");

});

app.get('/README.pdf', (req, res) => {

	res.sendFile(__dirname + '/README.pdf')

});


app.get('/cadastro', (req, res) => {

	res.render("cadastro");

});

app.post('/cadastro/cadastrado', urlEncodedParser, (req, res) => {


	var username = req.body.username;
	var password = req.body.password;
	var matricula = req.body.matricula;
	var name = req.body.name;
	var email = req.body.email;
	var phone = req.body.phone;
	var street = req.body.street;
	var city = req.body.city;
	var university = req.body.university;
	var gender = req.body.gender;
	var birthdate = req.body.birthdate;

	const novoUsuario = { username: username, password: password, matricula: matricula, name: name, email: email, phone: phone, street: street, city: city, university: university, gender: gender, birthdate: birthdate }

	// console.log(novoUsuario);

	var usuarios = Usuarios.create(novoUsuario).then(function () {

		console.log("User inserido!");
		res.render("login");

	}).catch(function (erro) {

		console.log("deu algum erro ao inserir:" + erro);
		res.send("Deu algum erro");
	})

});

app.get('/filtro', (req, res) => {

	res.render('filtrar');

});

app.get('/filtro/encontrado', (req, res) => {

	const consulta = [];

	var username = req.query.username;
	var nome = req.query.name
	var matricula = req.query.matricula;
	var email = req.query.email;
	var street = req.query.street;
	var city = req.query.city;
	var university = req.query.university;
	var gender = req.query.gender;

	if (username) consulta.push({ username: { [Op.like]: `%${username}%` } });
	if (nome) consulta.push({ name: { [Op.like]: `%${nome}%` } });
	if (matricula) consulta.push({ matricula: { [Op.like]: `%${matricula}%` } });
	if (email) consulta.push({ email: { [Op.like]: `%${email}%` } });
	if (street) consulta.push({ street: { [Op.like]: `%${street}%` } });
	if (city) consulta.push({ city: { [Op.like]: `%${city}%` } });
	if (university) consulta.push({ university: { [Op.like]: `%${university}%` } });
	if (gender) consulta.push({ gender: { [Op.like]: `%${gender}%` } });

	// console.log(consulta);

	Usuarios.findAll({

		where: {

			[Op.or]: [consulta]

		}

	}).then(function (usuarios) {

		// var exibir = "";
		console.log(usuarios)

		// for (var i = 0; i < usuarios.length; i++) {

		// 	exibir += "<a><b>ID: </b>" + usuarios[i].id + "<br>";
		// 	exibir += "<a><b>Matricula: </b>" + usuarios[i].matricula + "<br>";
		// 	exibir += "<a><b>Login: </b>" + usuarios[i].username + "<br>";
		// 	exibir += "<a><b>Nome: </b>" + usuarios[i].name + "<br>";
		// 	exibir += "<a><b>Email: </b>" + usuarios[i].email + "<br>";
		// 	exibir += "<a><b>Endereço: </b>" + usuarios[i].street + "<br>";
		// 	exibir += "<a><b>Cidade: </b>" + usuarios[i].city + "<br>";
		// 	exibir += "<a><b>Universidade: </b>" + usuarios[i].university + "<br>";
		// 	exibir += "<a><b>Nascimento: </b>" + usuarios[i].birthdate + "<br>";
		// 	exibir += "<a><b>Sexo: </b>" + usuarios[i].gender + "<br>";


		// }

		
		res.render('encontrados',{user:usuarios});
	})

});

app.get('/deletaUsuario', (req,res)=>{
	
	var id = req.query.id;

	Usuarios.destroy({
		where:{
			id:id
		}
	}
	).then(function(usuario){
		console.log("Usuário removido com sucesso!");
		res.send("Usuário removido com sucesso!");
	}).catch(function(erro){
		console.log("Erro na remoção: "+erro);
		res.send("Ocorreu algum problema na remoção");
	})
		
});


// app.get('/',(req,res) => {

//     var menuCadandSearch = "<a href='http://localhost:8081/main/cadastroUser'>Cadastrar Usuário</a><br>";
//     menuCadandSearch+="<a href='http://localhost:8081/main/buscarUser'>Buscar Usuário</a>";
//     res.send(menuCadandSearch)


// })

// app.get('/main/cadastroUser',(req,res) => {

//     var form = "<form action='/main/cadastroUser/cadastrados' method='POST'>";
// 	form+="<input type='number' placeholder='id' name='id'<br>";
// 	form+="<input type='text' placeholder='Nome Completo' name='nome'<br>";
// 	form+="<input type='number' placeholder='Idade' name='idade'<br>";
//     form+="<input type='text' placeholder='Sexo' name='sexo'<br>";
//     form+="<input type='text' placeholder='E-mail' name='email'<br>";
//     form+="<input type='text' placeholder='Contato' name='contato'<br>";
//     form+="<input type='text' placeholder='Login' name='login'<br>";
//     form+="<input type='text' placeholder='Senha' name='senha'<br>";
//     form+="<label>  Data de Nasc  </label><input type='date' placeholder='Nascimento' name='nascimento'<br><br>";
//     form+="<input type='text' placeholder='Instituição de Ensino' name='universidade'<br>";
//     form+="<input type='text' placeholder='CPF' name='cpf'<br>";
// 	form+="<button>Cadastrar</button></form>";

//     res.send("<div>Cadastro de Usuário</div><br>"+form)

// })

// app.post('/main/cadastroUser/cadastrados', urlEncodedParser, (req,res)=>{

// 	var matricula = parseInt(req.body.id);
// 	var nome = req.body.nome;
// 	var idade = parseInt(req.body.idade);
//     var sexo = req.body.sexo;
//     var email = req.body.email;
//     var contato = parseInt(req.body.contato);
//     var login = req.body.login;
//     var senha = req.body.senha;
//     var nascimento = req.body.nascimento;
//     var universidade = req.body.universidade;
//     var cpf = req.body.cpf;

// 	var novoProduto = {id:matricula, nome:nome, idade:idade, sexo:sexo, email:email, contato:contato, login:login, senha:senha, nascimento:nascimento, universidade:universidade, cpf };

// 	fs.readFile('usersDados.json','utf8',(erro, texto)=>{
// 		if (erro)
// 			throw "Deu algum erro: "+erro;

// 		var meuBD = JSON.parse(texto);
// 		meuBD.usuarios.push(novoProduto);

// 		var meuBDString = JSON.stringify(meuBD);
// 		// console.log(meuBDString);

// 		fs.writeFile('usersDados.json',meuBDString,(erro)=>{
// 			if (erro){
// 				throw "Deu algum erro: "+erro;
// 			}
// 			else{
// 				res.send(meuBDString);
// 			}
// 		});

// 	});

// });

// app.get('/main/buscarUser',(req,res) => {

//     var form = "<form action='/main/buscarUser/filterUser' method='GET'>";
// 	form+="<input type='number' placeholder='id' name='id'<br>";
// 	form+="<input type='text' placeholder='Nome Completo' name='nome'<br>";
// 	form+="<input type='number' placeholder='Idade' name='idade'<br>";
//     form+="<input type='text' placeholder='masculino ou feminino' name='sexo'<br>";
//     form+="<input type='text' placeholder='E-mail' name='email'<br>";
//     // form+="<input type='text' placeholder='Instituição de Ensino' name='universidade'<br>";
//     form+="<input type='text' placeholder='CPF' name='cpf'<br>";
// 	form+="<button>Buscar</button></form>";

//     res.send('<div>Buscar Usuários</div>'+form)
// })

// app.get('/main/buscarUser/filterUser', (req,res)=>{

// 	var matricula = parseInt(req.query.id);
// 	var nome = req.query.nome;
// 	var idade = parseInt(req.query.idade);
//     var sexo = req.query.sexo;
//     var email = req.query.email;
//     var contato = parseInt(req.query.contato);
//     var cpf = req.query.cpf;

// 	console.log(req.query);

// 	fs.readFile('usersDados.json','utf8',(erro, texto)=>{
// 		if (erro)
// 			throw "Deu algum erro: "+ erro;
// 		var meuBD = JSON.parse(texto);
// 		var usuarios = meuBD.usuarios;

// 		console.log(usuarios)

// 		var encontrado = usuarios.filter(

// 			user => user.id == matricula ||
// 			user.nome.toLowerCase() == nome.toLowerCase() ||
// 			user.idade == idade ||
// 			user.sexo.toLowerCase() == sexo.toLowerCase() ||
// 			user.email.toLowerCase() == email.toLowerCase() ||
// 			user.contato == contato ||
// 			user.cpf == cpf);

// 			var exibicao = "";

// 		for(var i=0; i < encontrado.length;i++){

// 			exibicao+= "<a><b>ID: </b>"+encontrado[i].id+"<br>";
// 			exibicao+= "<b>Nome:</b> "+encontrado[i].nome+'<br>';
// 			exibicao+= "<b> Idade: </b> "+encontrado[i].idade+'<br>';
//             exibicao+= "<b> Sexo: </b> "+encontrado[i].sexo+'<br>';
// 			exibicao+= "<b> Email: </b> "+encontrado[i].email+'<br>';
//             exibicao+= "<b> Contato: </b> "+encontrado[i].contato+'<br>';
//             exibicao+= "<b> Login: </b> "+encontrado[i].login+'<br>';
//             exibicao+= "<b> Data de Nasc: </b> "+encontrado[i].nascimento+'<br>';
//             exibicao+= "<b> CPF: </b> "+encontrado[i].cpf+'<br>';
//             exibicao+= "</a><br><br>";
// 		}

// 		res.send('<div>Dados encontrados:</div> <br>'+exibicao);

// 	})


// });

app.listen(port, () => {

	console.log(`Esta aplicação está escutando a porta

    ${port}`)

})
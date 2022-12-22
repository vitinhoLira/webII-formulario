const express = require('express');
const app = express();
const port = 8081;
const fs = require('fs');
const bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({extended:false})


app.get('/',(req,res) => {

    var menuCadandSearch = "<a href='http://localhost:8081/main/cadastroUser'>Cadastrar Usuário</a><br>";
    menuCadandSearch+="<a href='http://localhost:8081/main/buscarUser'>Buscar Usuário</a>";
    res.send(menuCadandSearch)


})

app.get('/main/cadastroUser',(req,res) => {

    var form = "<form action='/main/cadastroUser/cadastrados' method='POST'>";
	form+="<input type='number' placeholder='id' name='id'<br>";
	form+="<input type='text' placeholder='Nome Completo' name='nome'<br>";
	form+="<input type='number' placeholder='Idade' name='idade'<br>";
    form+="<input type='text' placeholder='Sexo' name='sexo'<br>";
    form+="<input type='text' placeholder='E-mail' name='email'<br>";
    form+="<input type='text' placeholder='Contato' name='contato'<br>";
    form+="<input type='text' placeholder='Login' name='login'<br>";
    form+="<input type='text' placeholder='Senha' name='senha'<br>";
    form+="<label>  Data de Nasc  </label><input type='date' placeholder='Nascimento' name='nascimento'<br><br>";
    form+="<input type='text' placeholder='Instituição de Ensino' name='universidade'<br>";
    form+="<input type='text' placeholder='CPF' name='cpf'<br>";
	form+="<button>Cadastrar</button></form>";

    res.send("<div>Cadastro de Usuário</div><br>"+form)

})

app.post('/main/cadastroUser/cadastrados', urlEncodedParser, (req,res)=>{
	
	var matricula = parseInt(req.body.id);
	var nome = req.body.nome;
	var idade = parseInt(req.body.idade);
    var sexo = req.body.sexo;
    var email = req.body.email;
    var contato = parseInt(req.body.contato);
    var login = req.body.login;
    var senha = req.body.senha;
    var nascimento = req.body.nascimento;
    var universidade = req.body.universidade;
    var cpf = req.body.cpf;
	
	var novoProduto = {id:matricula, nome:nome, idade:idade, sexo:sexo, email:email, contato:contato, login:login, senha:senha, nascimento:nascimento, universidade:universidade, cpf };
	
	fs.readFile('usersDados.json','utf8',(erro, texto)=>{
		if (erro)
			throw "Deu algum erro: "+erro;
		
		var meuBD = JSON.parse(texto);
		meuBD.usuarios.push(novoProduto);
		
		var meuBDString = JSON.stringify(meuBD);
		// console.log(meuBDString);
		
		fs.writeFile('usersDados.json',meuBDString,(erro)=>{
			if (erro){
				throw "Deu algum erro: "+erro;
			}
			else{
				res.send(meuBDString);
			}
		});
		
	});
	
});

app.get('/main/buscarUser',(req,res) => {

    var form = "<form action='/main/buscarUser/filterUser' method='GET'>";
	form+="<input type='number' placeholder='id' name='id'<br>";
	form+="<input type='text' placeholder='Nome Completo' name='nome'<br>";
	form+="<input type='number' placeholder='Idade' name='idade'<br>";
    form+="<input type='text' placeholder='masculino ou feminino' name='sexo'<br>";
    form+="<input type='text' placeholder='E-mail' name='email'<br>";
    form+="<input type='text' placeholder='Instituição de Ensino' name='universidade'<br>";
    form+="<input type='text' placeholder='CPF' name='cpf'<br>";
	form+="<button>Buscar</button></form>";

    res.send('<div>Buscar Usuários</div>'+form)
})

app.get('/main/buscarUser/filterUser', (req,res)=>{
	
	var matricula = parseInt(req.query.id);
	var nome = req.query.nome;
	var idade = parseInt(req.query.idade);
    var sexo = req.query.sexo;
    var email = req.query.email;
    var contato = parseInt(req.query.contato);
    var cpf = req.query.cpf;
	
	console.log(req.query);
		
	fs.readFile('usersDados.json','utf8',(erro, texto)=>{
		if (erro)
			throw "Deu algum erro: "+ erro;
		var meuBD = JSON.parse(texto);
		var usuarios = meuBD.usuarios;

		console.log(usuarios)
		
		var encontrado = usuarios.filter(
			
			user => user.id == matricula || 
			user.nome.toLowerCase() == nome.toLowerCase() ||
			user.idade == idade ||
			user.sexo.toLowerCase() == sexo.toLowerCase() ||
			user.email.toLowerCase() == email.toLowerCase() || 
			user.contato == contato ||
			user.cpf == cpf);
		
			var exibicao = "";
		
		for(var i=0; i < encontrado.length;i++){

			exibicao+= "<a><b>ID: </b>"+encontrado[i].id+"<br>";
			exibicao+= "<b>Nome:</b> "+encontrado[i].nome+'<br>';
			exibicao+= "<b> Idade: </b> "+encontrado[i].idade+'<br>';
            exibicao+= "<b> Sexo: </b> "+encontrado[i].sexo+'<br>';
			exibicao+= "<b> Email: </b> "+encontrado[i].email+'<br>';
            exibicao+= "<b> Contato: </b> "+encontrado[i].contato+'<br>';
            exibicao+= "<b> Login: </b> "+encontrado[i].login+'<br>';
            exibicao+= "<b> Data de Nasc: </b> "+encontrado[i].nascimento+'<br>';
            exibicao+= "<b> CPF: </b> "+encontrado[i].cpf+'<br>';
            exibicao+= "</a><br><br>";
		}

		res.send('<div>Dados encontrados:</div> <br>'+exibicao);

	})
	
	
});

app.listen(port, () => {

    console.log(`Esta aplicação está escutando a porta
    
    ${port}`)

})
//criando tabela usuários
const conexao = require("../conexao");


const Usuarios = conexao.sequelize.define('usuarios', {

	//por padrão n precisar add um campo id pois já é criado automáticamente. definimos apenas os atributos da entidade

	matricula: {

		type: conexao.Sequelize.STRING //or Datatype.String

	},
	username: {

		type: conexao.Sequelize.STRING

	},

	password: {

		type: conexao.Sequelize.STRING

	},

	name: {

		type: conexao.Sequelize.STRING

	},
	email: {

		type: conexao.Sequelize.STRING

	},
	phone: {

		type: conexao.Sequelize.STRING

	},
	street: {

		type: conexao.Sequelize.STRING

	},
	city: {

		type: conexao.Sequelize.STRING

	},
	university: {

		type: conexao.Sequelize.STRING

	},
	gender: {

		type: conexao.Sequelize.STRING

	},
	birthdate: {

		type: conexao.Sequelize.STRING

	}
});

module.exports = Usuarios;

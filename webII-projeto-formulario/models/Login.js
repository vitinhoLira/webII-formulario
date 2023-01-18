const conexao = require('../conexao')


//criando tabela login

const Usuario = conexao.sequelize.define('login', {
	login: {
		type: conexao.Sequelize.STRING,
		unique: true,
		allowNull: false
	},
	nome: {
		type: conexao.Sequelize.STRING,
		allowNull: false
	},
	senha: {
		type: conexao.Sequelize.STRING,
		allowNull: false
	},
}, { timestamps: false, })

Usuario.sync()

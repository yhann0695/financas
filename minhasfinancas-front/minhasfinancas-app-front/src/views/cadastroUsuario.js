import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { withRouter } from 'react-router-dom';

import UsuarioService from '../app/service/usuarioService';
import { mensagemErro, mensagemSucesso } from '../components/toastr';

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    constructor(){
        super();
        this.usuarioService = new UsuarioService();
    }

    redirectLogin = () => {
        this.props.history.push('/login');
    }

    validar = () => {
        const mensagem = [];

        if(!this.state.nome) mensagem.push('O nome é obrigatório.');

        if(!this.state.email) mensagem.push('O campo email é obrigatório.');
        else if(!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) mensagem.push('Informe um email válido.');

        if(!this.state.senha || !this.state.senhaRepeticao) mensagem.push('Digite a senha duas vezes.');
        else if(this.state.senha !== this.state.senhaRepeticao) mensagem.push('As senhas precisam ser iguais.')

        return mensagem;
    }

    cadastrar = () => {
        const mensagens = this.validar();
        if(mensagens && mensagens.length > 0) {
            mensagens.forEach((mensagem, index) => {
                mensagemErro(mensagem)
            });
            return false;
        }
        const usuario = { email: this.state.email, nome: this.state.nome, senha: this.state.senha }
        this.usuarioService.salvar(usuario).then((response) => {
            mensagemSucesso('Usuário cadastrado! Faça o login para acessar o sistema')
            this.redirectLogin();
        }).catch(erro => {
            mensagemErro(erro.response.data)
        })
    }

    render() {
        return (
                <Card title="Cadastro de Usuário">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <fieldset>
                                    <FormGroup label="Nome: *" htmlFor="inputNome">
                                            <input type="nome"
                                            onChange={e =>  this.setState({nome: e.target.value})} 
                                            className="form-control" 
                                            id="inputNome"
                                            name="nome" />
                                    </FormGroup>
                                    <br />
                                    <FormGroup label="Email: *" htmlFor="inputEmail">
                                            <input type="email" 
                                            onChange={e =>  this.setState({email: e.target.value})}
                                            className="form-control" 
                                            id="inputEmail" 
                                            name="email"/>
                                            <small id="emailHelp" className="form-text text-muted">Não divulgamos o seu email.</small>
                                    </FormGroup>
                                    <br />
                                    <FormGroup label="Senha: *" htmlFor="inputSenha">
                                            <input type="password"
                                            onChange={e =>  this.setState({senha: e.target.value})} 
                                            className="form-control" 
                                            id="inputSenha" 
                                            name="senha" />
                                    </FormGroup>
                                    <br/>
                                    <FormGroup label="Repita a Senha: *" htmlFor="inputSenhaRepeticao">
                                            <input type="password" 
                                            onChange={e =>  this.setState({senhaRepeticao: e.target.value})}
                                            className="form-control" 
                                            id="inputSenhaRepeticao" 
                                            name="senhaRepeticao"/>
                                    </FormGroup>
                                    <br/>
                                    <button onClick={this.cadastrar} className="btn btn-success">Salvar</button>
                                    <button onClick={this.redirectLogin} className="btn btn-danger">Cancelar</button>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </Card>
        )
    }
}

export default withRouter( CadastroUsuario );
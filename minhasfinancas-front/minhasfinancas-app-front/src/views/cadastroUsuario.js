import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import { withRouter } from 'react-router-dom';

import UsuarioService from '../app/service/usuarioService';
import * as messages from '../components/toastr';

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

    cadastrar = () => {
        const { nome, email, senha, senhaRepeticao } = this.state;
        const usuario = { nome, email, senha, senhaRepeticao }

        try {
            this.usuarioService.validar(usuario);
        } catch (error) {
            const msgs = error.mensagens;
            msgs.forEach(msg => messages.mensagemErro(msg));
            return false;
        }

        this.usuarioService.salvar(usuario).then((response) => {
            messages.mensagemSucesso('Usuário cadastrado! Faça o login para acessar o sistema')
            this.redirectLogin();
        }).catch(erro => {
            messages.mensagemErro(erro.response.data)
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
import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';

class CadastroUsuario extends React.Component {

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    render() {
        return (
            <div className="container">
                <Card title="Cadastro de Usuário">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">
                                <fieldset>
                                    <FormGroup label="Nome: *" htmlFor="inputNome">
                                            <input type="nome" 
                                            className="form-control" 
                                            id="inputNome"
                                            name="nome" />
                                    </FormGroup>
                                    <br />
                                    <FormGroup label="Email: *" htmlFor="inputEmail">
                                            <input type="email" 
                                            className="form-control" 
                                            id="inputEmail" 
                                            name="email"/>
                                            <small id="emailHelp" className="form-text text-muted">Não divulgamos o seu email.</small>
                                    </FormGroup>
                                    <br />
                                    <FormGroup label="Senha: *" htmlFor="inputSenha">
                                            <input type="password" 
                                            className="form-control" 
                                            id="inputSenha" 
                                            name="senha" />
                                    </FormGroup>
                                    <br/>
                                    <FormGroup label="Repita a Senha: *" htmlFor="inputSenhaRepeticao">
                                            <input type="password" 
                                            className="form-control" 
                                            id="inputSenhaRepeticao" 
                                            name="senhaRepeticao"/>
                                    </FormGroup>
                                    <br/>
                                    <button className="btn btn-success">Salvar</button>
                                    <button className="btn btn-danger">Cancelar</button>
                                </fieldset>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        )
    }
}

export default CadastroUsuario;
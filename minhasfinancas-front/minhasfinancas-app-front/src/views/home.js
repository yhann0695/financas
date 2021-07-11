import React from 'react';

import UsuarioService from '../app/service/usuarioService';
import LocalStorageService from '../app/service/localstorageService';
import currencyFormatter from 'currency-formatter';

class Home extends React.Component {

    state = {
        saldo: 0
    }

    constructor(){
        super();
        this.usuarioService = new UsuarioService();
    }

    componentDidMount() {
        this.usuarioService.obterSaldoPorUsuario(this.usuarioLogadoId())
        .then((response) => {
            this.setState({saldo: response.data})
        }).catch((error) => {
            console.error(error.response);
        })
    }

    usuarioLogadoId() {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');
        return usuarioLogado.id;
    }



    render() {
        return (
            <div className="jumbotron">
                <h1 className="display-3">Bem vindo!</h1>
                <p className="lead">Esse é seu sistema de finanças.</p>
                <p className="lead" style={{color: this.state.saldo < 0 ? 'red' : 'black'}}>Seu saldo para o mês atual é de { currencyFormatter.format(this.state.saldo , {locale: 'pt-BR'}) }</p>
                <hr className="my-4" />
                <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg"
                        href="#/cadastroUsuario"
                        role="button"><i className="pi pi-users"></i> Cadastrar Usuários
                    </a>
                    <a className="btn btn-danger btn-lg"
                        href="#/cadastroLancamento"
                        role="button"><i className="pi pi-money-bill"></i> Cadastrar Lançamento
                    </a>
                </p>
            </div>
        )
    }
}

export default Home;
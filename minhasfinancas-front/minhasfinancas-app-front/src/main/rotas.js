import React from 'react';

import Login from '../views/login';
import CadastroUsuario from '../views/cadastroUsuario';
import Home from '../views/home';
import ConsultaLancamento from '../lancamentos/consultaLancamento';
import CadastroLancamento from '../lancamentos/cadastradoLancamento';

import { Route, Switch, HashRouter } from 'react-router-dom'

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/home" component={ Home } />
                <Route path="/login" component={ Login } />
                <Route path="/cadastroUsuario" component={ CadastroUsuario } />
                <Route path="/consultaLancamento" component={ ConsultaLancamento } />
                <Route path="/cadastroLancamento" component={ CadastroLancamento } />
            </Switch>
        </HashRouter>
    )
}

export default Rotas;
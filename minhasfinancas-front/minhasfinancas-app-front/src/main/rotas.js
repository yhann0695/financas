import React from 'react';

import Login from '../views/login';
import CadastroUsuario from '../views/cadastroUsuario';
import Home from '../views/home';
import ConsultaLancamento from '../lancamentos/consultaLancamento';

import { Route, Switch, HashRouter } from 'react-router-dom'

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/home" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/cadastroUsuario" component={CadastroUsuario} />
                <Route path="/consultaLancamento" component={ConsultaLancamento} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas;
import React from 'react';

import Login from '../views/login';
import CadastroUsuario from '../views/cadastroUsuario';
import Home from '../views/home';
import ConsultaLancamento from '../lancamentos/consultaLancamento';
import CadastroLancamento from '../lancamentos/cadastradoLancamento';
import { AuthConsumer } from '../main/provedorAutenticacao';

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'

function RotaAutenticada( { component: Component, isUsuarioAutenticado, ...props }) {
    return (
        <Route {...props} render={ (componentProps) => {
            if(isUsuarioAutenticado) {
                return (
                    <Component {...componentProps} />
                )
            } else { return( <Redirect to={ { pathname: '/login', state: { from: componentProps.location } } } /> )}
          }} />
    )
}

function Rotas(props) {
    return (
        <HashRouter>
            <Switch>
                <Route path="/cadastroUsuario" component={ CadastroUsuario } />
                <Route path="/login" component={ Login } />

                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={ Home } />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/consultaLancamento" component={ ConsultaLancamento } />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/cadastroLancamento/:id?" component={ CadastroLancamento } />
            </Switch>
        </HashRouter>
    )
}

export default () =>( 
    <AuthConsumer>
        { (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />) }
    </AuthConsumer>
);
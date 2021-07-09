import React from 'react';

import Card from '../components/card';
import FormGroup from '../components/form-group';
import SelectMenu from '../components/selectMenu';

import { withRouter } from 'react-router-dom';
import * as messages from '../components/toastr';

import LancamentoService from '../app/service/lancamentoService';
import LocalStorageService from '../app/service/localstorageService';
 
class CadastroLancamento extends React.Component {


    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: ''
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    submit = () => {
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const { descricao, valor, mes, ano, tipo } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado };

        this.service.salvar(lancamento).then((response) => {
            this.cancelar();
            messages.mensagemSucesso('Lançamento cadastrado!');
        }).catch((error) => {
            messages.mensagemErro('error.response.data');
        })
    }

    cancelar = () => {
        this.props.history.push('/consultaLancamento');
    }

    handlerChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        this.setState({ [name] : value })
    }

    render() {
        const tipos = this.service.comboTipos();
        const meses = this.service.comboMes();

        return (
            <Card title="Cadastro Lançamento">
                <div className="row">
                    <div className="col-md-12">
                    <FormGroup id="inputDescricao" label="Descricao: *">
                        <input id="inputDescricao" name="descricao" type="text" className="form-control"
                        value={this.state.descricao}
                        onChange={this.handlerChange} />
                    </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" name="ano" type="number" className="form-control"
                            value={this.state.ano}
                            onChange={this.handlerChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes" name="mes" lista={meses} className="form-control" 
                            value={this.state.mes}
                            onChange={this.handlerChange}/>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor" name="valor" type="number" className="form-control" 
                            value={this.state.valor}
                            onChange={this.handlerChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo" name="tipo" lista={tipos} className="form-control" 
                             value={this.state.tipo}
                             onChange={this.handlerChange}/>
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: *">
                            <input type="text" name="status" className="form-control" disabled
                             value={this.state.status} />
                        </FormGroup>
                    </div>
                </div>
                <br />
                    <button onClick={this.submit} className="btn btn-success">Salvar</button>
                    <button onClick={this.cancelar} className="btn btn-danger">Cancelar</button>
            </Card>
        )
    }
}

export default withRouter( CadastroLancamento )
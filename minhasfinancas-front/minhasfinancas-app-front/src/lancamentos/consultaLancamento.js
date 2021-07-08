import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import SelectMenu from '../components/selectMenu';
import LancamentoTable from '../lancamentos/lancamentoTable';

import LancamentoService from '../app/service/lancamentoService';
import LocalStorageService from '../app/service/localstorageService';

import * as messages from '../components/toastr';

class ConsultaLancamento extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: []
    }

    constructor(){
        super();
        this.service = new LancamentoService;
    }

    buscar = () => {
        if(!this.state.ano) {
            messages.mensagemErro('É preciso que seja informado o "Ano" do lançamento!')
            return false;
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

        const lancamentoFiltro = { 
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao:this.state.descricao,
            usuario: usuarioLogado.id
        }

        this.service.consultar(lancamentoFiltro).then((response) => {
            this.setState({lancamentos: response.data})
        }).catch(error => {
            console.log(error);
        })
    }

    render() {
        const meses = this.service.comboMes();
        const tipos = this.service.comboTipos();

        return (
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text" className="form-control" id="inputAno"
                                        value={this.state.ano}
                                        onChange={e => this.setState({ano: e.target.value})} />
                            </FormGroup>
                            <br/>
                            <FormGroup htmlFor="inputMes" label="Mês: *">
                                <SelectMenu id="inputMes" className="form-control" lista={meses}
                                            value={this.state.mes}
                                            onChange={e => this.setState({mes: e.target.value})} />
                            </FormGroup>
                            <br/>
                            <FormGroup htmlFor="inputDescricao" label="Descrição: *">
                                <input type="text" className="form-control" id="inputDescricao"
                                        value={this.state.descricao}
                                        onChange={e => this.setState({descricao: e.target.value})} />
                            </FormGroup>
                            <br/>
                            <FormGroup htmlFor="inputTipo" label="Tipo de Lançamento: *">
                                <SelectMenu id="inputTipo" className="form-control" lista={tipos}
                                            value={this.state.tipo}
                                            onChange={e => this.setState({tipo: e.target.value})} />
                            </FormGroup>
                            <br/>
                            <button onClick={this.buscar} className="btn btn-success">Buscar</button>
                            <button className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentoTable lancamentos={this.state.lancamentos} />
                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter( ConsultaLancamento )
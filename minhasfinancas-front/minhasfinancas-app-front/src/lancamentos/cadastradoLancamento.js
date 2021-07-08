import React from 'react';

import Card from '../components/card';
import FormGroup from '../components/form-group';
import SelectMenu from '../components/selectMenu';

import { withRouter } from 'react-router-dom';

import LancamentoService from '../app/service/lancamentoService';
 
class CadastroLancamento extends React.Component {


    constructor(){
        super();
        this.service = new LancamentoService();
    }



    render() {
        const tipos = this.service.comboTipos();
        const meses = this.service.comboMes();

        return (
            <Card title="Cadastro Lançamento">
                <div className="row">
                    <div className="col-md-12">
                    <FormGroup id="inputDescricao" label="Descricao: *">
                        <input id="inputDescricao" type="text" className="form-control" />
                    </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno" type="number" className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="inputMes" lista={meses} className="form-control" />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor" type="number" className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo" lista={tipos} className="form-control" />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: *">
                            <input type="text" className="form-control" disabled/>
                        </FormGroup>
                    </div>
                </div>
                <br />
                    <button className="btn btn-success">Salvar</button>
                    <button className="btn btn-danger">Cancelar</button>
            </Card>
        )
    }
}

export default withRouter( CadastroLancamento )
import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import SelectMenu from '../components/selectMenu';
import LancamentoTable from '../lancamentos/lancamentoTable';

class ConsultaLancamento extends React.Component {
    render() {
        const meses = this.comboMes();
        const tipos = this.comboTipos();
        const lancamentos = [
            { descricao: 'asda', valor: 1234, mes: 1, tipo: 'Receita', status: 'eFETIVADO' },
            { descricao: 'asda', valor: 1234, mes: 1, tipo: 'Receita', status: 'eFETIVADO' }
        ];

        return (
            <Card title="Consulta Lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup htmlFor="inputAno" label="Ano: *">
                                <input type="text" className="form-control" id="inputAno" />
                            </FormGroup>
                            <br/>
                            <FormGroup htmlFor="inputMes" label="Mês: *">
                                <SelectMenu id="inputMes" className="form-control" lista={meses} />
                            </FormGroup>
                            <br/>
                            <FormGroup htmlFor="inputTipo" label="Tipo de Lançamento: *">
                                <SelectMenu id="inputTipo" className="form-control" lista={tipos} />
                            </FormGroup>
                            <br/>
                            <button className="btn btn-success">Salvar</button>
                            <button className="btn btn-danger">Cancelar</button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentoTable lancamentos={lancamentos} />
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    comboTipos() {
        return [
            { label: 'selecione...', value: '' },
            { label: 'Despesa', value: 'DESPESA' },
            { label: 'Receita', value: 'RECEITA' }
        ];
    }

    comboMes() {
        return [
            { label: 'Selecione...', value: '' },
            { label: 'Janeiro', value: 1 },
            { label: 'Fevereiro', value: 2 },
            { label: 'Março', value: 3 },
            { label: 'Abril', value: 4 },
            { label: 'Maio', value: 5 },
            { label: 'Junho', value: 6 },
            { label: 'Julho', value: 7 },
            { label: 'Agosto', value: 8 },
            { label: 'Setembro', value: 9 },
            { label: 'Outubro', value: 10 },
            { label: 'Novembro', value: 11 },
            { label: 'Dezembro', value: 12 },
        ];
    }
}

export default withRouter( ConsultaLancamento )
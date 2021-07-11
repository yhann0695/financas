import React from 'react';
import { withRouter } from 'react-router-dom';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import SelectMenu from '../components/selectMenu';
import LancamentoTable from '../lancamentos/lancamentoTable';

import LancamentoService from '../app/service/lancamentoService';
import LocalStorageService from '../app/service/localstorageService';

import * as messages from '../components/toastr';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

class ConsultaLancamento extends React.Component {

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        showConfirmDialog: false,
        lancamentoExcluir: {},
        lancamentos: []
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

    editarAction = (id) => {
        this.props.history.push(`/cadastroLancamento/${id}`);
    }

    abrirConfirmacao = (lancamento) => {
        this.setState({ showConfirmDialog: true, lancamentoExcluir: lancamento }) 
    }

    excluirAction = () => {
        this.service.excluir(this.state.lancamentoExcluir.id).then((response) => {
            const lancamentos = this.state.lancamentos;
            const index = lancamentos.indexOf(this.state.lancamentoExcluir);
            lancamentos.splice(index, 1);
            this.setState({ lancamentos: lancamentos, showConfirmDialog: false });
            messages.mensagemSucesso('Lançamento excluído');
        }).catch((error) => {
            messages.mensagemErro('Não foi possível excluir o lançamento');
        })
    }

    alterarStatus = (lancamento, status) => {
        this.service.alterarStatus(lancamento.id, status).then((response) => {
            const lancamentos = this.state.lancamentos;
            const index = lancamentos.indexOf(lancamento);
            if(index !== -1) {
                lancamento['status'] = status;
                lancamentos[index] = lancamento;
                this.setState( {lancamentos} );
            }
            messages.mensagemSucesso('Status atualizado');
        })
    }

    cancelarExclusao = () => {
        this.setState({ showConfirmDialog: false, lancamentoExcluir: {} })
    }

    cadastrarLancamento = () => {
        this.props.history.push('/cadastroLancamento');
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

        const confirmDialogFooter = (
            <div>
                <Button label="Confirmar" icon="pi pi-check" onClick={() => this.excluirAction()}  autoFocus />
                <Button label="Cancelar"  icon="pi pi-times" onClick={() => this.cancelarExclusao()} className="p-button-text" />
            </div>
        )

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
                            <button onClick={this.buscar} className="btn btn-success"><i className="pi pi-search"> Pesquisar</i></button>
                            <button onClick={this.cadastrarLancamento} className="btn btn-danger"><i className="pi pi-plus"> Cadastrar</i></button>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentoTable lancamentos={this.state.lancamentos}
                                            editarAction={this.editarAction}
                                            excluirAction={this.abrirConfirmacao}
                                            alterarStatus={this.alterarStatus} />
                        </div>
                    </div>
                </div>
                <Dialog header="Confirme sua decisão" 
                        visible={this.state.showConfirmDialog} 
                        style={{ width: '50vw' }}
                        footer={confirmDialogFooter} 
                        modal={true} 
                        onHide={() => this.setState({showConfirmDialog: false})}>
                    <p>Tem certeza que deseja excluir o lançamento?</p>
                </Dialog>
            </Card>
        )
    }
}

export default withRouter( ConsultaLancamento )
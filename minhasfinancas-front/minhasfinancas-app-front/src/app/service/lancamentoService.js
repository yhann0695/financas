import ApiService from '../apiservice'

import ErroValidacao from '../exception/erroValidacao';
import Constants from '../../utils/constants';

export default class LancamentoService extends ApiService {

    constructor() {super('/lancamento')}

    comboTipos = () => {
        return [
            { label: 'selecione...', value: '' },
            { label: 'Despesa', value: 'DESPESA' },
            { label: 'Receita', value: 'RECEITA' }
        ];
    }

    comboMes = () => {
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

    consultar = (lancamentoFiltro) => { 
        let params = `?ano=${lancamentoFiltro.ano}`;

        if(lancamentoFiltro.mes) params = `${params}&mes=${lancamentoFiltro.mes}`;

        if(lancamentoFiltro.tipo) params = `${params}&tipo=${lancamentoFiltro.tipo}`;

        if(lancamentoFiltro.status) params = `${params}&status=${lancamentoFiltro.status}`;

        if(lancamentoFiltro.usuario) params = `${params}&usuario=${lancamentoFiltro.usuario}`;

        if(lancamentoFiltro.descricao) params = `${params}&descricao=${lancamentoFiltro.descricao}`;

        return this.get(`/pesquisa${params}`);
    }

    validar = (lancamento) => { 
        const erros = [];

        if(!lancamento.ano) { erros.push(Constants.INFORME_ANO) }
        if(!lancamento.mes) { erros.push(Constants.INFORME_MES) }
        if(!lancamento.descricao) { erros.push(Constants.INFORME_DESCRICAO) }
        if(!lancamento.tipo) { erros.push(Constants.INFORME_TIPO) }
        if(!lancamento.valor) { erros.push(Constants.INFORME_VALOR) }

        if(erros && erros.length > 0) { throw new ErroValidacao(erros) }
    }

    alterarStatus = (id, status) => { return this.put(`/${id}/atualizar-status`, { status }) }

    excluir = (id) => { return this.delete(`/${id}`) }

    obterLancamento = (id) => { return this.get(`/${id}`) }

    salvar = (lancamento) => { return this.post('/', lancamento) }

    atualizar = (lancamento) => { return this.put(`/${lancamento.id}`, lancamento) }
}
package com.financas.minhasfinancas.service;

import com.financas.minhasfinancas.dto.AtualizaStatusDTO;
import com.financas.minhasfinancas.dto.LancamentoDTO;
import com.financas.minhasfinancas.exceptions.RegraNegocioException;
import com.financas.minhasfinancas.model.Lancamento;
import com.financas.minhasfinancas.repository.LancamentoRepository;
import com.financas.minhasfinancas.utils.Mensagens;
import com.financas.minhasfinancas.utils.enums.StatusLancamento;
import com.financas.minhasfinancas.utils.enums.TipoLancamento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LancamentoService {
    
    @Autowired
    private LancamentoRepository lancamentoRepository;

    public void cadastrar(LancamentoDTO lancamento) {
        this.validarDados(lancamento);
        Lancamento lancamentoEntity = new Lancamento(lancamento);
        lancamentoEntity.setStatus(StatusLancamento.PENDENTE);
        lancamentoRepository.save(lancamentoEntity);
    }

    public void alterar(Long id, LancamentoDTO lancamento) {
        this.findById(id);
        this.validarDados(lancamento);
        Lancamento lancamentoEntity = new Lancamento(lancamento);
        lancamentoRepository.save(lancamentoEntity);
    }

    public Long excluir(Long id) {
        Lancamento lancamento = findById(id);
        lancamentoRepository.deleteById(lancamento.getId());
        return id;
    }

    public List<LancamentoDTO> listarLancamentos() {
        return lancamentoRepository.findAll()
                .stream()
                .map(LancamentoDTO::new)
                .collect(Collectors.toList());
    }

    public List<LancamentoDTO> pesquisar(String descricao, Integer mes, Integer ano, Long usuario) {
        return lancamentoRepository.listarLancamentos(descricao, mes, ano, usuario)
                .stream()
                .map(LancamentoDTO::new)
                .collect(Collectors.toList());
    }

    public void atualizarStatus(Long id, AtualizaStatusDTO dto) {
        lancamentoRepository.findById(id)
                .map(entity -> {
                    StatusLancamento statusSelecionado = StatusLancamento.valueOf(dto.getStatus());
                    if(statusSelecionado == null) {
                        throw new RegraNegocioException("Erro na atualização");
                    }
                    entity.setStatus(statusSelecionado);
                    LancamentoDTO lancamentoEntity = new LancamentoDTO(entity);
                    atualizaStatus(lancamentoEntity);
                    return HttpStatus.CREATED;
                });
    }

    public void atualizaStatus(LancamentoDTO lancamento) {
        validarDados(lancamento);
        Lancamento lancamentoEntity = new Lancamento(lancamento);
        lancamentoRepository.save(lancamentoEntity);
    }

    public BigDecimal obterSaldoPorUsuario(Long id) {
        BigDecimal receitas = lancamentoRepository.ObterSaldoPorTipoLancamentoEUsuarioEStatus(id, TipoLancamento.RECEITA, StatusLancamento.EFETIVADO);
        BigDecimal desepesas = lancamentoRepository.ObterSaldoPorTipoLancamentoEUsuarioEStatus(id, TipoLancamento.DESPESA, StatusLancamento.EFETIVADO);

        if(receitas == null) receitas = BigDecimal.ZERO;
        if(desepesas == null) desepesas = BigDecimal.ZERO;

        return receitas.subtract(desepesas);
    }

    public LancamentoDTO obterLancamento(Long id) {
        return lancamentoRepository.findById(id)
                .map(LancamentoDTO::new)
                .orElseThrow(() -> new RegraNegocioException(Mensagens.ID));
    }

    private Lancamento findById(Long id) {
        return lancamentoRepository
                .findById(id)
                .orElseThrow(() -> new RegraNegocioException(Mensagens.ID));
    }

    private void validarDados(LancamentoDTO dto) {
        if(dto.getDescricao() == null || dto.getDescricao().trim().equals(""))
            throw new RegraNegocioException(Mensagens.DESCRICAO_INVALIDA);

        if(dto.getMes() == null || dto.getMes() < 1 || dto.getMes() > 12)
            throw new RegraNegocioException(Mensagens.MES_INVALIDO);

        if(dto.getAno() == null || dto.getAno().toString().length() != 4)
            throw new RegraNegocioException(Mensagens.ANO_INVALIDO);


        if(dto.getUsuario() == null || dto.getUsuario().getId() == null)
            throw new RegraNegocioException(Mensagens.USUARIO_INVALIDO);


        if(dto.getValor() == null || dto.getValor().compareTo(BigDecimal.ZERO) < 1 )
            throw new RegraNegocioException(Mensagens.VALOR_INVALIDO);

        if(dto.getTipo() == null)
            throw new RegraNegocioException(Mensagens.TIPO_INVALIDO);
    }



}
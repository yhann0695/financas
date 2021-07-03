package com.financas.minhasfinancas.repository;

import com.financas.minhasfinancas.model.Lancamento;

import java.util.List;

public interface LancamentoRepositoryCustom {

    List<Lancamento> listarLancamentos(String descricao, Integer mes, Integer ano);
}

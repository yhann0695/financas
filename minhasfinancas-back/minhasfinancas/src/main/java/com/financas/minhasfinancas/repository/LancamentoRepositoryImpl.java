package com.financas.minhasfinancas.repository;

import com.financas.minhasfinancas.model.Lancamento;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import java.util.List;

public class LancamentoRepositoryImpl implements LancamentoRepositoryCustom{

    @PersistenceContext
    @Autowired
    private EntityManager em;

    @Override
    public List<Lancamento> listarLancamentos(String descricao, Integer mes, Integer ano) {
       String query = "select l from Lancamento as l ";
       String condicao = "where";
       String descricaoo = " (:descricao = null or UPPER(l.descricao) LIKE '%' || UPPER(:descricao) || '%')";

       if(descricao != null) {
           query += condicao + descricaoo;
           condicao = " and";
       }

        if(mes != null) {
            query += condicao + " l.mes = :mes";
            condicao = " and";
        }

        if(ano != null) {
            query += condicao + " l.ano = :ano";
        }

        TypedQuery<Lancamento> lancamentoTypedQuery = em.createQuery(query, Lancamento.class);

        if(descricao != null) lancamentoTypedQuery.setParameter("descricao", descricao);


        if(mes != null) lancamentoTypedQuery.setParameter("mes", mes);


        if(ano != null) lancamentoTypedQuery.setParameter("ano", ano);

        return lancamentoTypedQuery.getResultList();
    }


}

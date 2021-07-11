package com.financas.minhasfinancas.repository;

import com.financas.minhasfinancas.model.Lancamento;

import com.financas.minhasfinancas.model.Usuario;
import com.financas.minhasfinancas.utils.enums.StatusLancamento;
import com.financas.minhasfinancas.utils.enums.TipoLancamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.websocket.server.PathParam;
import java.math.BigDecimal;
import java.util.Optional;

@Repository
public interface LancamentoRepository extends JpaRepository<Lancamento, Long>, LancamentoRepositoryCustom{

    @Query(value = "SELECT SUM(L.valor) FROM Lancamento L JOIN L.usuario U " +
            "WHERE U.id =:idUsuario and L.tipo =:tipo AND L.status = :status GROUP BY U" )
    BigDecimal ObterSaldoPorTipoLancamentoEUsuarioEStatus(@Param("idUsuario") Long idUsuario,
                                                          @Param("tipo") TipoLancamento tipo,
                                                          @Param("status") StatusLancamento status);
}
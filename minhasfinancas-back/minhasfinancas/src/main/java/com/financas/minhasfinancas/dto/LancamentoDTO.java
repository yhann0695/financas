package com.financas.minhasfinancas.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.financas.minhasfinancas.model.Lancamento;
import com.financas.minhasfinancas.model.Usuario;
import com.financas.minhasfinancas.utils.enums.StatusLancamento;
import com.financas.minhasfinancas.utils.enums.TipoLancamento;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.Date;

@NoArgsConstructor
@Data
public class LancamentoDTO {

    private Long id;

    private String descricao;

    private Integer mes;

    private Integer ano;

    @NotNull
    private UsuarioDTO usuario;

    private BigDecimal valor;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private Date dataCadastro;

    private TipoLancamento tipo;

    private StatusLancamento status;

    public LancamentoDTO(Lancamento dto) {
        this.id = dto.getId();
        this.descricao = dto.getDescricao();
        this.mes = dto.getMes();
        this.ano = dto.getAno();
        this.usuario = new UsuarioDTO(dto.getUsuario());
        this.valor = dto.getValor();
        this.dataCadastro = dto.getDataCadastro();
        this.tipo = dto.getTipo();
        this.status = dto.getStatus();
    }

}

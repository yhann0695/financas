package com.financas.minhasfinancas.model;

import com.financas.minhasfinancas.dto.LancamentoDTO;
import com.financas.minhasfinancas.utils.enums.StatusLancamento;
import com.financas.minhasfinancas.utils.enums.TipoLancamento;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "TB_LANCAMENTOO")
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@Data
public class Lancamento implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_LANCAMENTO")
    @EqualsAndHashCode.Include
    private Long id;

    @Column(name = "DS_LANCAMENTO")
    private String descricao;

    @Column(name = "MES_LANCAMENTO")
    private Integer mes;

    @Column(name = "ANO_LANCAMENTO")
    private Integer ano;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ID_USUARIO", nullable = false)
    private Usuario usuario;
    
    @Column(name = "VL_LANCAMENTO")
    private BigDecimal valor;

    @Column(name = "DT_CADASTRO_LANCAMENTO")
    private Date dataCadastro;

    @Column(name = "TIPO_LANCAMENTO")
    @Enumerated(EnumType.STRING)
    private TipoLancamento tipo;

    @Column(name = "STATUS_LANCAMENTO")
    @Enumerated(EnumType.STRING)
    private StatusLancamento status;

    public Lancamento(LancamentoDTO dto) {
        this.id = dto.getId();
        this.descricao = dto.getDescricao();
        this.mes = dto.getMes();
        this.ano = dto.getAno();
        this.usuario = new Usuario(dto.getUsuario());
        this.valor = dto.getValor();
        this.dataCadastro = dto.getDataCadastro();
        this.tipo = dto.getTipo();
        this.status = dto.getStatus();
    }

}
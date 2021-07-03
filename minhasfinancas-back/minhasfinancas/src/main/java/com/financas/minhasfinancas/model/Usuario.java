package com.financas.minhasfinancas.model;

import com.financas.minhasfinancas.dto.UsuarioDTO;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name = "TB_USUARIOO")
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Usuario implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID_USUARIO")
    @EqualsAndHashCode.Include
    private Long id;

    @Column(name = "DS_USUARIO")
    private String nome;

    @Column(name = "EMAIL_USUARIO")
    private String email;

    @Column(name = "SENHA_USUARIO")
    private String senha;

    public Usuario(Long id) {
        this.id = id;
    }

    public Usuario(UsuarioDTO dto) {
        this.id = dto.getId();
        this.nome = dto.getNome();
        this.email = dto.getEmail();
        this.senha = dto.getSenha();
    }
}
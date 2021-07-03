package com.financas.minhasfinancas.dto;

import com.financas.minhasfinancas.model.Usuario;
import lombok.Data;

@Data
public class UsuarioDTO {

    private Long id;
    private String nome;
    private String email;
    private String senha;

    public UsuarioDTO(){}

    public UsuarioDTO(Usuario entity) {
        this.id = entity.getId();
        this.nome = entity.getNome();
        this.email = entity.getEmail();
        this.senha = entity.getSenha();
    }

}

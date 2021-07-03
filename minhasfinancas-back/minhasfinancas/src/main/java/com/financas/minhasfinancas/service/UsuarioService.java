package com.financas.minhasfinancas.service;

import com.financas.minhasfinancas.dto.UsuarioDTO;
import com.financas.minhasfinancas.exceptions.RegraNegocioException;
import com.financas.minhasfinancas.model.Usuario;
import com.financas.minhasfinancas.repository.UsuarioRepository;
import com.financas.minhasfinancas.utils.Mensagens;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional
    public void cadastrar(UsuarioDTO usuarioDTO) {
        this.validarEmail(usuarioDTO.getEmail());
        Usuario usuario = new Usuario(usuarioDTO);
        usuarioRepository.save(usuario);
    }

    public UsuarioDTO autenticar(String email, String senha) {
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);
        UsuarioDTO usuarioDTO = new UsuarioDTO(usuario.get());

        if(!usuarioDTO.getEmail().equals(email))
            throw new RegraNegocioException(Mensagens.EMAIL_INVALIDO);

       
        if(!usuarioDTO.getSenha().equals(senha))
            throw new RegraNegocioException(Mensagens.SENHA_INVALIDA);

       return usuarioDTO;
    }

    private void validarEmail(String email) {
        boolean existe = usuarioRepository.existsByEmail(email);
        
        if(existe) 
            throw new RegraNegocioException(Mensagens.EMAIL_EXISTENTE);
    }
}
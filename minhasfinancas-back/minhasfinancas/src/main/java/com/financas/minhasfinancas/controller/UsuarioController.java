package com.financas.minhasfinancas.controller;

import com.financas.minhasfinancas.dto.UsuarioDTO;
import com.financas.minhasfinancas.service.LancamentoService;
import com.financas.minhasfinancas.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private LancamentoService lancamentoService;

    @PostMapping
    public void cadastrar(@RequestBody UsuarioDTO usuario) {
        usuarioService.cadastrar(usuario);
    }

    @PostMapping("/autenticar")
    public ResponseEntity<UsuarioDTO> autenticar(@RequestBody UsuarioDTO usuario) {
        return ResponseEntity.ok(usuarioService.autenticar(usuario.getEmail(), usuario.getSenha()));
    }

    @GetMapping("{id}/saldo")
    public BigDecimal obterSaldo(@PathVariable Long id) {
        return lancamentoService.obterSaldoPorUsuario(id);
    }
}

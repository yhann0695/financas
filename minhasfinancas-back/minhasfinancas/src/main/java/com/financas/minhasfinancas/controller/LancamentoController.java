package com.financas.minhasfinancas.controller;

import com.financas.minhasfinancas.dto.AtualizaStatusDTO;
import com.financas.minhasfinancas.dto.LancamentoDTO;
import com.financas.minhasfinancas.service.LancamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/lancamento")
public class LancamentoController {

    @Autowired
    private LancamentoService lancamentoService;

    @PostMapping
    public void cadastrar(@RequestBody @Valid LancamentoDTO lancamento) {
        lancamentoService.cadastrar(lancamento);
    }

    @PatchMapping("/{id}")
    public void alterar(@RequestBody LancamentoDTO lancamento, @PathVariable Long id) {
        lancamentoService.alterar(id, lancamento);
    }

    @GetMapping
    public ResponseEntity<List<LancamentoDTO>> listarLancamentos() {
        List<LancamentoDTO> lancamentoDTOS = lancamentoService.listarLancamentos();
        return ResponseEntity.ok(lancamentoDTOS);
    }

    @GetMapping("/pesquisa")
    public ResponseEntity<List<LancamentoDTO>> pesquisar(@RequestParam(value = "descricao", required = false) String descricao ,
                                                         @RequestParam(value = "mes", required = false) Integer mes,
                                                         @RequestParam(value = "ano", required = false) Integer ano,
                                                         @RequestParam(value = "usuario", required = false) Long usuario) {

        return ResponseEntity.ok(lancamentoService.pesquisar(descricao, mes, ano, usuario));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> excluir(@PathVariable Long id) {
        return ResponseEntity.ok(lancamentoService.excluir(id));
    }

    @PutMapping("/{id}/atualizar-status")
    public void atualizarStatus(@PathVariable Long id, @RequestBody AtualizaStatusDTO dto) {
        lancamentoService.atualizarStatus(id, dto);
    }
}

import ApiService from '../apiservice'

import ErroValidacao from '../exception/erroValidacao';
import Constants from '../../utils/constants';

class UsuarioService extends ApiService {

    constructor(){super('/usuario')}

    autenticar(credenciais){ return this.post('/autenticar', credenciais) }

    obterSaldoPorUsuario(id) { return this.get(`/${id}/saldo`)}

    salvar(usuario) { return this.post('/', usuario)}

    validar(usuario) { 
        const erros = [];

        if(!usuario.nome) erros.push(Constants.NOME_OBRIGATORIO);

        if(!usuario.email) erros.push(Constants.EMAIL_OBRIGATORIO);
        else if(!usuario.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) erros.push(Constants.EMAIL_INVALIDO);

        if(!usuario.senha || !usuario.senhaRepeticao) erros.push(Constants.SENHA_REPETIR);
        else if(usuario.senha !== usuario.senhaRepeticao) erros.push(Constants.SENHA_DIFERENTE);

        if(erros && erros.length > 0) { throw new ErroValidacao(erros) }
    }
}

export default UsuarioService;
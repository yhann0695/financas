import ApiService from '../apiservice'

class UsuarioService extends ApiService {

    constructor(){super('/usuario')}

    autenticar(credenciais){ return this.post('/autenticar', credenciais) }
}

export default UsuarioService;
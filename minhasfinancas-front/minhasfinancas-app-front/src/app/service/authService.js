import LocalStorageService from './localstorageService';
import Constants from '../../utils/constants';

export default class AuthService {

    static isUsuarioAutenticado() {
        const usuario = LocalStorageService.obterItem(Constants.USUARIO_LOGADO)
        return usuario && usuario.id;
    }

    static removerUsuarioAutenticado() {
        LocalStorageService.removerItem(Constants.USUARIO_LOGADO)
    }

    static logar(usuario){ 
        LocalStorageService.addItem(Constants.USUARIO_LOGADO, usuario)
    }

    static obterUsuarioAutenticado() {
        return LocalStorageService.obterItem(Constants.USUARIO_LOGADO)
    }

}
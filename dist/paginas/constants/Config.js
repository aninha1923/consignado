"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
class Config {
}
exports.Config = Config;
Config.URL_HOME = process.env.BASE_URL || 'https://blog.agibank.com.br/';
Config.HOME_PATH = process.env.HOME_PATH || '/';
Config.TEXTO_PADRAO = process.env.TEXTO_PADRAO || 'Qual taxa de juros ?';
Config.TEXTO_INVALIDO = process.env.TEXTO_INVALIDO || 'asdasdasdasd';
Config.BOTAO_LUPA = process.env.BOTAO_LUPA || 'a.slide-search.astra-search-icon';
Config.INPUT_BUSCA = process.env.INPUT_BUSCA || 'input[type="search"]';
Config.MENU_BUSCA = process.env.MENU_BUSCA || '.ast-search-menu-icon.slide-search';

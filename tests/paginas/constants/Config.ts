export class Config {

  static readonly URL_HOME: string = process.env.BASE_URL || '';
  static readonly HOME_PATH: string = process.env.HOME_PATH || '';
  static readonly TEXTO_PADRAO: string = process.env.TEXTO_PADRAO || '';
  static readonly TEXTO_INVALIDO: string = process.env.TEXTO_INVALIDO || '';

  static readonly BOTAO_LUPA: string = process.env.BOTAO_LUPA || '';
  static readonly INPUT_BUSCA: string = process.env.INPUT_BUSCA || '';
  static readonly MENU_BUSCA: string = process.env.MENU_BUSCA || '';
}

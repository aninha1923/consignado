import { Page, Locator } from '@playwright/test';
import { BlogAgibankConstants } from './constants/blogAgibank.constants';

export class BlogAgibankPage {
  private readonly page: Page;
  private readonly btnLupa: Locator;
  private readonly inputPesquisa: Locator;
  private readonly menuBusca: Locator;
  private readonly mensagemNaoEncontrada: Locator;

  constructor(page: Page) {
    this.page = page;

    this.btnLupa = page
      .locator(BlogAgibankConstants.SELECTORS.BOTAO_LUPA + ':visible')
      .first();

    this.inputPesquisa = page.locator(
      BlogAgibankConstants.SELECTORS.INPUT_BUSCA
    );

    this.menuBusca = page.locator(
      BlogAgibankConstants.SELECTORS.MENU_BUSCA
    );

    this.mensagemNaoEncontrada = page.locator(
      ':text("Lamentamos, mas nada foi encontrado para sua pesquisa")'
    );
  }

  async acessarHome(): Promise<void> {
    await this.page.goto(BlogAgibankConstants.URL_HOME, { 
      waitUntil: 'domcontentloaded' 
    });
  }

  private async abrirBusca(): Promise<void> {
    await this.btnLupa.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(300);

    try {
      await this.btnLupa.click();
      await this.inputPesquisa.waitFor({ state: 'visible', timeout: 2000 });
    } catch {
      await this.btnLupa.click({ force: true });
      await this.inputPesquisa.waitFor({ state: 'visible' });
    }

    await this.inputPesquisa.focus();
  }

  async pesquisar(
    texto: string = BlogAgibankConstants.BUSCA.TEXTO_PADRAO
  ): Promise<void> {
    await this.abrirBusca();
    await this.inputPesquisa.fill(texto);
    await this.inputPesquisa.press('Enter');
    await this.page.waitForTimeout(500);
  }

  async validarResultadoVisivel(termoPesquisa: string): Promise<boolean> {
    try {
      const resultado = this.page.getByText(termoPesquisa, { exact: true });
      return await resultado.first().isVisible();
    } catch {
      return false;
    }
  }

  async validarTextoNaBusca(termoPesquisa: string): Promise<boolean> {
    try {
      const resultado = this.page.getByText(termoPesquisa, { exact: true });
      const quantidade = await resultado.count();
      
      if (quantidade === 0) {
        return false;
      }

      return await resultado.first().isVisible().catch(() => false);
    } catch {
      return false;
    }
  }

  async obterValorInputBusca(): Promise<string> {
    try {
      return await this.inputPesquisa.inputValue();
    } catch {
      return '';
    }
  }

  async isMensagemNaoEncontradaVisivel(): Promise<boolean> {
    try {
      const count = await this.mensagemNaoEncontrada.count();
      return count > 0 && await this.mensagemNaoEncontrada.first().isVisible();
    } catch {
      return false;
    }
  }
}
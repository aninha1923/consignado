"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogAgibankPage = void 0;
const blogAgibank_constants_1 = require("./constants/blogAgibank.constants");
class BlogAgibankPage {
    constructor(page) {
        this.page = page;
        this.btnLupa = page
            .locator(blogAgibank_constants_1.BlogAgibankConstants.SELECTORS.BOTAO_LUPA + ':visible')
            .first();
        this.inputPesquisa = page.locator(blogAgibank_constants_1.BlogAgibankConstants.SELECTORS.INPUT_BUSCA);
        this.menuBusca = page.locator(blogAgibank_constants_1.BlogAgibankConstants.SELECTORS.MENU_BUSCA);
    }
    async acessarHome() {
        await this.page.goto(blogAgibank_constants_1.BlogAgibankConstants.URL_HOME, { waitUntil: 'domcontentloaded' });
    }
    async abrirBusca() {
        await this.btnLupa.waitFor({ state: 'visible' });
        await this.page.waitForTimeout(300);
        try {
            await this.btnLupa.click();
            await this.inputPesquisa.waitFor({ state: 'visible', timeout: 2000 });
        }
        catch {
            await this.btnLupa.click({ force: true });
            await this.inputPesquisa.waitFor({ state: 'visible' });
        }
        await this.inputPesquisa.focus();
    }
    async pesquisar(texto = blogAgibank_constants_1.BlogAgibankConstants.BUSCA.TEXTO_PADRAO) {
        await this.abrirBusca();
        await this.inputPesquisa.fill(texto);
        await this.inputPesquisa.press('Enter');
        await this.page.waitForTimeout(500);
    }
    async pesquisainvalida(texto = blogAgibank_constants_1.BlogAgibankConstants.BUSCA.TEXTO_INVALIDO) {
        await this.pesquisar(texto);
    }
    async isResultadoVisivel(termoPesquisa) {
        const resultado = this.page.getByText(termoPesquisa, { exact: true });
        return await resultado.first().isVisible().catch(() => false);
    }
    async isMensagemNaoEncontradaVisivel() {
        const mensagemNaoEncontrada = this.page.locator(':text("Lamentamos, mas nada foi encontrado para sua pesquisa")');
        const count = await mensagemNaoEncontrada.count();
        const visivel = count > 0 && await mensagemNaoEncontrada.first().isVisible();
        return visivel;
    }
}
exports.BlogAgibankPage = BlogAgibankPage;

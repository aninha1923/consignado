"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
const agibank_1 = require("./paginas/agibank");
const blogAgibank_constants_1 = require("./paginas/constants/blogAgibank.constants");
test_1.test.describe('Blog Agibank - Busca', () => {
    let blogAgibankPage;
    test_1.test.beforeEach(async ({ page }) => {
        blogAgibankPage = new agibank_1.BlogAgibankPage(page);
        await blogAgibankPage.acessarHome();
    });
    (0, test_1.test)('Deve pesquisar artigo válido e validar resultado', async () => {
        const termoPesquisa = blogAgibank_constants_1.BlogAgibankConstants.BUSCA.TEXTO_PADRAO;
        await blogAgibankPage.pesquisar(termoPesquisa);
        const resultadoVisivel = await blogAgibankPage.isResultadoVisivel(termoPesquisa);
        (0, test_1.expect)(resultadoVisivel).toBeTruthy();
        console.log(`Resultado para "${termoPesquisa}" encontrado e visível.`);
    });
    (0, test_1.test)('Deve exibir mensagem ao pesquisar termo inválido', async () => {
        const termoPesquisa = blogAgibank_constants_1.BlogAgibankConstants.BUSCA.TEXTO_INVALIDO;
        await blogAgibankPage.pesquisainvalida(termoPesquisa);
        const mensagemNaoEncontrada = await blogAgibankPage.isMensagemNaoEncontradaVisivel();
        (0, test_1.expect)(mensagemNaoEncontrada).toBe(true);
        console.log(`Mensagem de "nada encontrado" exibida: ${mensagemNaoEncontrada}`);
    });
});

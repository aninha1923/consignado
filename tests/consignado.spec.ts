import { test, expect } from '@playwright/test';
import { BlogAgibankPage } from './paginas/agibank';
import { BlogAgibankConstants } from './paginas/constants/blogAgibank.constants';

test.describe('Blog Agibank - Funcionalidade de Busca', () => {
  let blogAgibankPage: BlogAgibankPage;

  test.beforeEach(async ({ page }) => {
    blogAgibankPage = new BlogAgibankPage(page);
    await blogAgibankPage.acessarHome();
  });

  test('Deve validar que o texto pesquisado EXISTE nos resultados', async () => {
    const termoPesquisa = BlogAgibankConstants.BUSCA.TEXTO_PADRAO;
    await blogAgibankPage.pesquisar(termoPesquisa);
    const valorDigitado = await blogAgibankPage.obterValorInputBusca();
    const existe = await blogAgibankPage.validarTextoNaBusca(termoPesquisa);
    expect(existe, `✅ Texto padrão "${valorDigitado}" foi encontrado na pesquisa`).toBe(true);
  });

  test('Deve validar que o texto NÃO EXISTE quando nenhum resultado é encontrado', async () => {
    const termoPesquisa = BlogAgibankConstants.BUSCA.TEXTO_INVALIDO;

    await blogAgibankPage.pesquisar(termoPesquisa);
    const valorDigitado = await blogAgibankPage.obterValorInputBusca();
    
    const existe = await blogAgibankPage.validarTextoNaBusca(termoPesquisa);
    expect(existe, 
      `❌ Termo inválido "${termoPesquisa}" não foi encontrado essa pesquisar.`
    ).toBe(false);
  });
});
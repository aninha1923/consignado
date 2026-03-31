# Projeto de Automação de Testes - Blog Agibank 🚀

Este projeto contém a automação de testes de aceitação para o Blog do Agibank, utilizando **Playwright** com **TypeScript**. A arquitetura foi desenhada seguindo o padrão **Page Objects** para garantir manutenibilidade e escalabilidade.

---

## 🛠️ Tecnologias Utilizadas

*   **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
*   **Framework de Testes:** [Playwright](https://playwright.dev/)
*   **Relatórios:** [Allure Report](https://allurereport.org/)
*   **CI/CD:** [Azure Pipelines](https://azure.microsoft.com/pt-br/products/devops/pipelines/)
*   **Gerenciamento de Variáveis:** [Dotenv](https://www.npmjs.com/package/dotenv)

---

## 🏗️ Estrutura do Projeto

```text
├── tests/
│   ├── consignado.spec.ts          # Arquivo principal de testes (Specs)
│   └── paginas/                    # Page Objects e Constantes
│       ├── agibank.ts              # Ações e elementos da página
│       └── constants/
│           ├── Config.ts           # Classe de configuração (ponte para o .env)
│           └── blogAgibank.constants.ts # Mapeamento de seletores e URLs
├── playwright.config.ts            # Configurações globais do Playwright
├── azure-pipelines.yml             # Pipeline principal do Azure DevOps
├── .env                            # Arquivo de variáveis de ambiente (local)
└── package.json                    # Dependências e scripts do projeto
```

---

## 🚀 Como Executar Localmente

### 1. Pré-requisitos
*   Node.js (v18 ou superior)
*   npm instalado

### 2. Instalação
```bash
# Instalar dependências do projeto
npm install

# Instalar os navegadores do Playwright
npx playwright install
```

### 3. Configuração do Ambiente
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
BASE_URL=https://blog.agibank.com.br/
HOME_PATH=/
TEXTO_PADRAO="Qual taxa de juros ?"
TEXTO_INVALIDO=asdasdasdasd
BOTAO_LUPA="a.slide-search.astra-search-icon"
INPUT_BUSCA='input[type="search"]'
MENU_BUSCA=".ast-search-menu-icon.slide-search"
```

### 4. Execução dos Testes
```bash
# Executar todos os testes em modo headless
npm run test:e2e

# Executar testes com interface visual (UI Mode)
npx playwright test --ui
```

---

## 📊 Relatórios (Allure)

Para gerar e visualizar o relatório de execução:
```bash
# Gerar o relatório HTML
npm run allure:generate:html

# Abrir o relatório no navegador
npm run allure:open
```

---

## ⚙️ CI/CD (Azure Pipelines)

O projeto está configurado para rodar automaticamente no Azure DevOps. O pipeline executa as seguintes etapas:
1.  **Setup de Ambiente:** Instalação de Node.js, NPM e Java (necessário para o Allure).
2.  **Configuração de Variáveis:** Gera o arquivo `.env` dinamicamente a partir das variáveis cadastradas no Azure.
3.  **Execução:** Roda os testes usando o container oficial do Playwright (`mcr.microsoft.com/playwright`).
4.  **Publicação:** Gera o relatório Allure e o disponibiliza como um artefato da build para consulta.

---

## 📝 Boas Práticas Adotadas
*   **Page Object Model (POM):** Separação clara entre a lógica do teste e a interação com os elementos da página.
*   **Data Driven:** Uso de variáveis de ambiente para facilitar a troca de URLs e massa de dados sem alterar o código.
*   **Resiliência:** Implementação de retentativas (retries) e timeouts otimizados para evitar falsos negativos em ambientes de CI.

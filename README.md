# Azure Function ViaCEP

Azure Function para consultar CEP (Código de Endereçamento Postal) brasileiro usando a API ViaCEP.

## 📋 Descrição

Esta Azure Function permite consultar informações de endereço a partir de um CEP brasileiro. A função utiliza a API pública [ViaCEP](https://viacep.com.br/) para obter dados como logradouro, bairro, cidade, estado, entre outros.

## 🚀 Funcionalidades

- Consulta de CEP brasileiro (8 dígitos)
- Retorna informações completas do endereço
- Validação automática do formato do CEP
- Tratamento de erros e CEPs inválidos
- Suporte para CEP com ou sem formatação (00000-000 ou 00000000)

## 📦 Pré-requisitos

- [Node.js](https://nodejs.org/) v20 ou superior
- [Azure Functions Core Tools](https://docs.microsoft.com/azure/azure-functions/functions-run-local) v4
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/IgorAnjos/azure-function-viacep.git
cd azure-function-viacep
```

2. Instale as dependências:
```bash
npm install
```

3. Compile o TypeScript:
```bash
npm run build
```

## 🏃 Executando Localmente

Para executar a função localmente:

```bash
npm start
```

A função estará disponível em: `http://localhost:7071/api/ConsultaCep`

## 📝 Como Usar

### Exemplo 1: Query Parameter

```bash
curl "http://localhost:7071/api/ConsultaCep?cep=01001000"
```

### Exemplo 2: Route Parameter

```bash
curl "http://localhost:7071/api/ConsultaCep/01001000"
```

### Exemplo 3: CEP com formatação

```bash
curl "http://localhost:7071/api/ConsultaCep?cep=01001-000"
```

### Resposta de Sucesso

```json
{
  "cep": "01001-000",
  "logradouro": "Praça da Sé",
  "complemento": "lado ímpar",
  "bairro": "Sé",
  "localidade": "São Paulo",
  "uf": "SP",
  "ibge": "3550308",
  "gia": "1004",
  "ddd": "11",
  "siafi": "7107"
}
```

### Resposta de Erro - CEP Não Encontrado

```json
{
  "error": "CEP not found"
}
```

### Resposta de Erro - CEP Inválido

```json
{
  "error": "CEP must contain 8 digits"
}
```

## 🛠️ Tecnologias Utilizadas

- **Azure Functions** - Plataforma serverless da Microsoft
- **TypeScript** - Linguagem de programação
- **Node.js** - Runtime JavaScript
- **Axios** - Cliente HTTP para requisições
- **ViaCEP API** - API pública para consulta de CEP

## 📄 Estrutura do Projeto

```
azure-function-viacep/
├── ConsultaCep/
│   └── index.ts          # Função principal
├── host.json             # Configuração do host Azure Functions
├── package.json          # Dependências do projeto
├── tsconfig.json         # Configuração TypeScript
├── .gitignore           # Arquivos ignorados pelo Git
└── README.md            # Documentação
```

## 🧪 Deploy no Azure

Para fazer deploy no Azure:

1. Crie uma Function App no portal Azure
2. Configure as credenciais de deploy
3. Execute:

```bash
func azure functionapp publish <nome-da-sua-function-app>
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

Este projeto é open source e está disponível sob a licença MIT.

## 👨‍💻 Autor

Igor Anjos

## 🔗 Links Úteis

- [Documentação ViaCEP](https://viacep.com.br/)
- [Azure Functions Docs](https://docs.microsoft.com/azure/azure-functions/)
- [TypeScript Docs](https://www.typescriptlang.org/)
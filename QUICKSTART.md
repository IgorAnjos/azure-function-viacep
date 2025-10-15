# Guia Rápido - Azure Function ViaCEP

## 🚀 Início Rápido (5 minutos)

### 1️⃣ Instalar Dependências
```bash
npm install
```

### 2️⃣ Compilar o Código
```bash
npm run build
```

### 3️⃣ Criar Configuração Local
```bash
cp local.settings.json.example local.settings.json
```

### 4️⃣ Iniciar a Função Localmente
```bash
npm start
```

### 5️⃣ Testar a Função
Abra outro terminal e execute:
```bash
curl "http://localhost:7071/api/ConsultaCep?cep=01001000"
```

## 📋 Resultado Esperado

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

## 🧪 Mais Exemplos

Consulte o arquivo [EXEMPLOS.md](./EXEMPLOS.md) para mais exemplos de uso incluindo:
- Diferentes formatos de CEP
- Integração com JavaScript/Python/PowerShell
- Exemplos com formulários HTML
- Tratamento de erros

## 📚 Documentação Completa

Leia o [README.md](./README.md) para informações detalhadas sobre:
- Arquitetura do projeto
- Deploy no Azure
- Contribuição
- Tecnologias utilizadas

## ❓ Problemas Comuns

### Erro: "func: command not found"
Instale o Azure Functions Core Tools:
```bash
npm install -g azure-functions-core-tools@4 --unsafe-perm true
```

### Erro: "Cannot find module"
Execute novamente:
```bash
npm install
npm run build
```

### CEP retorna erro 404
Verifique se o CEP tem 8 dígitos e é um CEP válido brasileiro.

## 🎯 Próximos Passos

1. Explore os exemplos em [EXEMPLOS.md](./EXEMPLOS.md)
2. Leia sobre como contribuir em [CONTRIBUTING.md](./CONTRIBUTING.md)
3. Faça deploy no Azure seguindo o README

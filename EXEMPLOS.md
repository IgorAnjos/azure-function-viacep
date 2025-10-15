# Exemplos de Uso - Azure Function ViaCEP

Este arquivo contém exemplos práticos de como usar a Azure Function para consulta de CEP.

## Formato da URL

A função aceita o CEP de duas formas:

### 1. Query Parameter
```
GET /api/ConsultaCep?cep={cep}
```

### 2. Route Parameter
```
GET /api/ConsultaCep/{cep}
```

## Exemplos com cURL

### Consulta CEP válido (São Paulo - Praça da Sé)
```bash
curl "http://localhost:7071/api/ConsultaCep?cep=01001000"
```

**Resposta:**
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

### Consulta CEP com formatação
```bash
curl "http://localhost:7071/api/ConsultaCep?cep=01001-000"
```

### Consulta usando Route Parameter
```bash
curl "http://localhost:7071/api/ConsultaCep/01001000"
```

### CEP do Rio de Janeiro - Centro
```bash
curl "http://localhost:7071/api/ConsultaCep?cep=20040020"
```

### CEP de Belo Horizonte - Centro
```bash
curl "http://localhost:7071/api/ConsultaCep?cep=30130100"
```

## Exemplos de Erros

### CEP não encontrado
```bash
curl "http://localhost:7071/api/ConsultaCep?cep=00000000"
```

**Resposta:**
```json
{
  "error": "CEP not found"
}
```

### CEP inválido (menos de 8 dígitos)
```bash
curl "http://localhost:7071/api/ConsultaCep?cep=123"
```

**Resposta:**
```json
{
  "error": "CEP must contain 8 digits"
}
```

### Sem parâmetro CEP
```bash
curl "http://localhost:7071/api/ConsultaCep"
```

**Resposta:**
```json
{
  "error": "CEP parameter is required. Use ?cep=00000000 or /api/ConsultaCep/{cep}"
}
```

## Exemplos com JavaScript (fetch)

### Buscar CEP em aplicação web
```javascript
async function consultarCep(cep) {
  try {
    const response = await fetch(`/api/ConsultaCep?cep=${cep}`);
    const data = await response.json();
    
    if (response.ok) {
      console.log('Endereço:', data);
      return data;
    } else {
      console.error('Erro:', data.error);
      return null;
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
    return null;
  }
}

// Uso
consultarCep('01001000').then(endereco => {
  if (endereco) {
    document.getElementById('logradouro').value = endereco.logradouro;
    document.getElementById('bairro').value = endereco.bairro;
    document.getElementById('cidade').value = endereco.localidade;
    document.getElementById('estado').value = endereco.uf;
  }
});
```

## Exemplos com Python (requests)

```python
import requests

def consultar_cep(cep):
    url = f"http://localhost:7071/api/ConsultaCep?cep={cep}"
    response = requests.get(url)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Erro: {response.json()['error']}")
        return None

# Uso
endereco = consultar_cep('01001000')
if endereco:
    print(f"Logradouro: {endereco['logradouro']}")
    print(f"Bairro: {endereco['bairro']}")
    print(f"Cidade: {endereco['localidade']}")
    print(f"Estado: {endereco['uf']}")
```

## Exemplos com PowerShell

```powershell
# Consultar CEP
$cep = "01001000"
$url = "http://localhost:7071/api/ConsultaCep?cep=$cep"
$response = Invoke-RestMethod -Uri $url -Method Get

# Exibir resultado
Write-Host "Logradouro: $($response.logradouro)"
Write-Host "Bairro: $($response.bairro)"
Write-Host "Cidade: $($response.localidade)"
Write-Host "Estado: $($response.uf)"
```

## CEPs de Teste

Aqui estão alguns CEPs válidos para testes:

| CEP | Localização |
|-----|-------------|
| 01001-000 | Praça da Sé - São Paulo/SP |
| 20040-020 | Centro - Rio de Janeiro/RJ |
| 30130-100 | Centro - Belo Horizonte/MG |
| 40020-000 | Centro - Salvador/BA |
| 50010-000 | Recife Antigo - Recife/PE |
| 60060-000 | Centro - Fortaleza/CE |
| 70040-902 | Asa Sul - Brasília/DF |
| 80010-000 | Centro - Curitiba/PR |
| 90010-000 | Centro Histórico - Porto Alegre/RS |

## Integração com Formulários HTML

```html
<!DOCTYPE html>
<html>
<head>
    <title>Consulta CEP</title>
</head>
<body>
    <h1>Consulta de CEP</h1>
    <form id="cepForm">
        <label>CEP: <input type="text" id="cep" maxlength="9" placeholder="00000-000"></label>
        <button type="submit">Buscar</button>
    </form>
    
    <div id="resultado" style="display:none; margin-top: 20px;">
        <h2>Resultado:</h2>
        <p><strong>Logradouro:</strong> <span id="logradouro"></span></p>
        <p><strong>Bairro:</strong> <span id="bairro"></span></p>
        <p><strong>Cidade:</strong> <span id="localidade"></span></p>
        <p><strong>Estado:</strong> <span id="uf"></span></p>
        <p><strong>DDD:</strong> <span id="ddd"></span></p>
    </div>
    
    <script>
        document.getElementById('cepForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const cep = document.getElementById('cep').value;
            
            try {
                const response = await fetch(`/api/ConsultaCep?cep=${cep}`);
                const data = await response.json();
                
                if (response.ok) {
                    document.getElementById('logradouro').textContent = data.logradouro;
                    document.getElementById('bairro').textContent = data.bairro;
                    document.getElementById('localidade').textContent = data.localidade;
                    document.getElementById('uf').textContent = data.uf;
                    document.getElementById('ddd').textContent = data.ddd;
                    document.getElementById('resultado').style.display = 'block';
                } else {
                    alert('Erro: ' + data.error);
                }
            } catch (error) {
                alert('Erro ao consultar CEP: ' + error.message);
            }
        });
    </script>
</body>
</html>
```

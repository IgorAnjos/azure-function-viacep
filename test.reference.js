/**
 * Manual test file for testing the ConsultaCep function locally
 * This is not an automated test but a reference for how to test the function
 */

// Example test cases for CEP validation

// Valid CEP examples:
// - 01001000 (Praça da Sé, São Paulo)
// - 20040020 (Centro, Rio de Janeiro)
// - 30130100 (Centro, Belo Horizonte)

// Invalid CEP examples:
// - 00000000 (Invalid CEP)
// - 123 (Too short)
// - abcd1234 (Contains letters - will be cleaned to 1234, still invalid)

// Test with curl:
// curl "http://localhost:7071/api/ConsultaCep?cep=01001000"
// curl "http://localhost:7071/api/ConsultaCep/01001000"
// curl "http://localhost:7071/api/ConsultaCep?cep=01001-000"

// Expected response for valid CEP (01001000):
// {
//   "cep": "01001-000",
//   "logradouro": "Praça da Sé",
//   "complemento": "lado ímpar",
//   "bairro": "Sé",
//   "localidade": "São Paulo",
//   "uf": "SP",
//   "ibge": "3550308",
//   "gia": "1004",
//   "ddd": "11",
//   "siafi": "7107"
// }

console.log("Test reference file for ConsultaCep Azure Function");
console.log("Use npm start to run the function locally and test with curl");

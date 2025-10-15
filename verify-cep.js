/**
 * Simple verification script to test the CEP query logic
 * This simulates what the Azure Function does without requiring the runtime
 */
const axios = require('axios');

async function testCepQuery(cep) {
  console.log(`\n=== Testing CEP: ${cep} ===`);
  
  // Clean CEP (same logic as in the function)
  const cepClean = cep.replace(/\D/g, '');
  
  // Validate length
  if (cepClean.length !== 8) {
    console.log('❌ Error: CEP must contain 8 digits');
    return;
  }
  
  try {
    console.log(`Querying ViaCEP API for: ${cepClean}`);
    const response = await axios.get(`https://viacep.com.br/ws/${cepClean}/json/`);
    
    if (response.data.erro) {
      console.log('❌ CEP not found');
      return;
    }
    
    console.log('✅ Success! CEP Data:');
    console.log(JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

async function runTests() {
  console.log('Starting CEP Query Verification Tests\n');
  
  // Test valid CEPs
  await testCepQuery('01001000');  // São Paulo - Praça da Sé
  await testCepQuery('01001-000'); // Same CEP with formatting
  await testCepQuery('20040020');  // Rio de Janeiro - Centro
  
  // Test invalid CEPs
  await testCepQuery('00000000');  // Invalid CEP
  await testCepQuery('123');       // Too short
  
  console.log('\n=== Tests Complete ===');
}

runTests().catch(console.error);

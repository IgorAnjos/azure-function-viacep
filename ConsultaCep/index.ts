import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import axios from "axios";

/**
 * Interface representing the ViaCEP API response
 */
interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

/**
 * Azure Function to query Brazilian CEP using ViaCEP API
 * 
 * @param request - HTTP request containing the CEP parameter
 * @param context - Azure Functions invocation context
 * @returns HTTP response with CEP information or error message
 */
export async function consultaCep(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  context.log(`HTTP function processed request for url "${request.url}"`);

  // Get CEP from query parameter or route parameter
  const cep = request.query.get('cep') || request.params.cep;

  // Validate CEP parameter
  if (!cep) {
    return {
      status: 400,
      jsonBody: {
        error: "CEP parameter is required. Use ?cep=00000000 or /api/ConsultaCep/{cep}"
      }
    };
  }

  // Remove any non-numeric characters from CEP
  const cepClean = cep.replace(/\D/g, '');

  // Validate CEP format (must be 8 digits)
  if (cepClean.length !== 8) {
    return {
      status: 400,
      jsonBody: {
        error: "CEP must contain 8 digits"
      }
    };
  }

  try {
    // Query ViaCEP API
    context.log(`Querying ViaCEP for CEP: ${cepClean}`);
    const response = await axios.get<ViaCepResponse>(`https://viacep.com.br/ws/${cepClean}/json/`);

    // Check if CEP was found
    if (response.data.erro) {
      return {
        status: 404,
        jsonBody: {
          error: "CEP not found"
        }
      };
    }

    // Return the CEP information
    return {
      status: 200,
      jsonBody: response.data
    };

  } catch (error) {
    context.error(`Error querying ViaCEP: ${error}`);

    // Handle specific error scenarios
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return {
          status: 404,
          jsonBody: {
            error: "CEP not found"
          }
        };
      }
    }

    return {
      status: 500,
      jsonBody: {
        error: "Error querying CEP service",
        details: error instanceof Error ? error.message : "Unknown error"
      }
    };
  }
}

app.http('consultaCep', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'ConsultaCep/{cep?}',
  handler: consultaCep
});

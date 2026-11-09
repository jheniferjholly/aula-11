// 1. Carrega as variáveis do arquivo .env para a memória (process.env)
require('dotenv').config();

// 2. Importa a função fábrica 'createClient' do SDK oficial do Supabase
const { createClient } = require('@supabase/supabase-js');

// 3. Resgata as credenciais de dentro do Cofre Digital (.env)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// 4. Validação de Segurança: impede que o servidor suba sem as chaves
if (!supabaseUrl || !supabaseKey) {
    console.error('❌ [ERRO CRÍTICO DE SEGURANÇA]: SUPABASE_URL ou SUPABASE_KEY não encontradas no arquivo .env!');
    console.error('Verifique se o arquivo .env está na raiz do projeto e sem espaços ao redor do sinal de =.');
    process.exit(1);
}

// 5. Instancia a ponte oficial de comunicação com a nuvem do Supabase
const supabase = createClient(supabaseUrl, supabaseKey);

console.log('✅ [SUPABASE SDK]: Ponte de comunicação instanciada com segurança!');

// 6. Exporta a instância única para ser reutilizada em rotas e controllers
module.exports = supabase;
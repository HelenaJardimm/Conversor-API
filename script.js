const apiKey = '778685bd123827e00fea1855';
const apiURL = 'https://v6.exchangerate-api.com/v6/${apiKey}/latest/';

// Função para buscar taxa de câmbio via API 
async function getExchangeRate(daMoeda, paraMoeda) { 
    try{ 
        const response = await fetch(`${apiUrl}${daMoeda}`); 
        const data = await response.json(); 
        if(data.result === "success"){   
            return data.conversion_rates[paraMoeda]; 
        }else{ 
            throw new Error('Erro ao buscar as taxas de câmbio'); 
        } 
    }catch(error){ 
        console.error("Erro:", error); 
        return null; 
    } 
 }; 
 document.getElementById("currencyForm").addEventListener('submit', async function(event){ 
    event.preventDefault(); 
    const valor = parseFloat(document.getElementById('amount').value); 
    const daMoeda = document.getElementById('daMoeda').value; 
    const paraMoeda = document.getElementById('paraMoeda').value; 
    const exchangeRate = getExchangeRate(daMoeda, paraMoeda); 
    if(exchangeRate){ 
        const convertedValue = valor * exchangeRate; 
        const conversao = document.getElementById('conversao'); 
        conversao.textContent = `Resultado: ${convertedValue.toFixed(2)} ${paraMoeda}`; 
    }else{ 
        alert('Não foi possível buscar o valor da cotação!'); 
    } 
 });
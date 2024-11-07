document.getElementById('currency-form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Obter os valores do formulário
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    if (amount === '' || isNaN(amount)) {
        alert('Por favor, insira um valor válido');
        return;
    }
    // URL da API de câmbio (use a sua chave de API)
    const apiKey = '778685bd123827e00fea1855';
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;
    // Fazer a requisição à API
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.result === 'success') {
                // Obter a taxa de conversão
                const rate = data.conversion_rates[toCurrency];
                const convertedAmount = (amount * rate).toFixed(2);
                // Exibir o resultado na página
                document.getElementById('result').innerHTML =
                    `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
            } else {
                alert('Erro ao buscar a taxa de câmbio. Tente novamente.');
            }
        })
        .catch(error => {
            console.error('Erro ao acessar a API:', error);
            alert('Não foi possível acessar a API de câmbio.');
        });
 });

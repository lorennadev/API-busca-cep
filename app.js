const botaoSalva = document.getElementById('botaoSalva');
const botaoExibir = document.getElementById('botaoExibir');
const botaoApaga = document.getElementById('limpa');
//-------------------------------------------------------
const exibeDados = document.getElementById('exibe');
const notifica = document.getElementById('notifica');
const input = document.getElementById('cep');
//ao digitar no campo input CEP ele executa a função
input.addEventListener('input', buscaCep);
//Função buscar cep
function buscaCep() {
    //pega o valor do input cep
    const cep = document.getElementById('cep').value;
    //define a url da requisição (onde será busado o CEP)
    let url = `https://viacep.com.br/ws/${cep}/json/`;
    // verifica se o cep digitado contém 8 dígitos
    if (cep.length == 8) {
        fetch(url)//requisição para buscar os dados do cep
            .then(response => response.json())// pega a resposta
            .then(data => {//pega os dados da resposta
                if (data.erro) { // verifica se deu erro (se o cep for inválido)
                    notifica.textContent = "CEP Inválido";
                    notifica.open = true;
                    return// se for inválido para a execução aqui
                }
                // exibe a mensagem de que o cep foi encontrado
                notifica.textContent = "CEP encontrado";
                // abre a janela de diálogo
                notifica.open = true;
                //fechar a notificação depois de dois segundos
                setTimeout(() => { notifica.open = false }, 2000);
                // coloco os daods recebidos nos devidos campos (input)
                document.getElementById('rua').value = data.logradouro
                document.getElementById('bairro').value = data.bairro
                document.getElementById('cidade').value = data.localidade
                document.getElementById('estado').value = data.uf
            })
    } else {
        notifica.textContent = "Digite 8 números válidos";
        notifica.open = true;
    }
}
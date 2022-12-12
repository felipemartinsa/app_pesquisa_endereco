document.addEventListener('DOMContentLoaded', pesquisarEndereco)

function pesquisarEndereco(){

    let ajax = new XMLHttpRequest;

    let campo = document.getElementById("cep");
    campo.addEventListener('keyup', (e) => {
        if (e.key == 'Enter') {

            let aviso = document.getElementById('aviso');
            aviso.style = 'display: none';

            let valor = campo.value;
            
            if (valor.length != 8 || !(/^\d+$/.test(valor))) {
                aviso.innerHTML = 'O CEP deve possuir 8 caracteres numéricos! ex: 12345678';
                aviso.style = 'display: block;';
                return
            }; 

            let url = `https://viacep.com.br/ws/${valor}/json/`;

            ajax.open('GET',url);
            ajax.onreadystatechange = () => {
                if (ajax.readyState == 4 && ajax.status == 200) { 
                    let resposta = JSON.parse(ajax.responseText);
                    if (!(resposta.hasOwnProperty('erro'))){
                        document.getElementById('endereco').value = resposta["logradouro"];
                        document.getElementById('bairro').value = resposta["bairro"];
                        document.getElementById('cidade').value = resposta["localidade"];
                        document.getElementById('uf').value = resposta["uf"];
                    } else {
                        aviso.innerHTML = 'CEP não encontrado no banco de dados!';
                        aviso.style = 'display: block;';
                    }
                };
            };
            ajax.send();   
            
        }
    })

}
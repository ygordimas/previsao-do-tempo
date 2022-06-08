# Previsão do Tempo
---
>Status: Projeto finalizado
---
>Autor: Ygor Dimas
---
>Contato: [Linkedin](https://www.linkedin.com/in/ygor-dimas/)
---
> Para acessar a **GitHub Page** do projeto, clique [aqui](https://ygordimas.github.io/previsao-do-tempo/).
---

# Descrição Geral
O foco deste projeto é a utilização de APIs para a recuperação de informações de bases de dados externas.

Inicialmente, o usuário insere o código postal desejado na área indicada e a aplicação busca dados da localidade informada através da API do site [ViaCep](https://viacep.com.br/).
Tais dados (latitude e longitude) são então analisados pela [Weather API](https://www.weatherapi.com/), capaz de fornecer informações acerca do clima atual e previsões do tempo para dias futuros.

Estas informações abastecidas pela Weather API são então apresentadas na páginaatravés de cards separados por categorias — clima atual, previsões para o dia atual e previsões para os dois dias seguintes a data atual.

## Objetivos

Além da estruturação da página com HTML5 e a estilização dos elementos com CSS3, o desenvolvimento do projeto serviu como estimulo para o estudo aprofundado de tópicos de javascript um pouco mais avançados, como a utilização de funções assíncronas que permitem a comunicação com servidores externos ao projeto e que, ao executarem a resposta do servidor, permitem que novos elementos sejam criados com as informações fornecidas e adicionados à pagina de forma dinâmica.

## Tópicos de FrontEnd abordados

- CSS Grid
- CSS Flex
- Animações com CSS
- Responsividade (Media Queries)
- Javascript Assíncrono
- APIs

# Resultados

### Layout geral (dispositivos com mais de 1400px de largura)
![Layout geral da página](https://github.com/ygordimas/previsao-do-tempo/blob/main/raw/w_1401_preenchido.png)
![Layout geral da página com mensagem de erro](https://github.com/ygordimas/previsao-do-tempo/blob/main/raw/w_1401_erro.png)
### Layout para dispositivos entre 980px e 1400px de largura
![Layout para dispositivos entre 980 pixels e 1400 pixels de largura](https://github.com/ygordimas/previsao-do-tempo/blob/main/raw/w_1400.png)
### Layout para dispositivos entre 767px e 979px de largura
![Layout para dispositivos entre 767 pixels e 979 pixels de largura](https://github.com/ygordimas/previsao-do-tempo/blob/main/raw/w_979.png)
### Layout para dispositivos com até 766px de largura
![Layout para dispositivos com até 766px de largura](https://github.com/ygordimas/previsao-do-tempo/blob/main/raw/w_766.png)

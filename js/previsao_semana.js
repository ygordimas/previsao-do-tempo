const cepInput = document.getElementById("cepInput");
const cepAviso = document.querySelector(".areaCepAviso");
const cidadeInput = document.querySelector("#cidade");
const estadoInput = document.querySelector("#estadoInput");
const botaoEnvia = document.querySelector("#botaoEnvia");
const areaInfo = document.getElementById("areaInfo");
const infosHoje = document.createElement("div");
infosHoje.classList.add("hojeArea");

const previsoes = document.createElement("div");
previsoes.classList.add("previsoesArea");

let latitude, longitude, temperatura;

const hoje = new Date();
const amanha = new Date(hoje);
const amanhaMaisUm = new Date(hoje);
const amanhaMaisDois = new Date(hoje);
amanha.setDate(amanha.getDate() + 1);
amanhaMaisUm.setDate(amanhaMaisUm.getDate() + 2);
amanhaMaisDois.setDate(amanhaMaisDois.getDate() + 3);
const meses = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

async function getCep(cep) {
  const responseCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const cepInfo = await responseCep.json();

  if (!cepInfo.erro) {
    const localidade = {
      cidade: cepInfo.localidade,
      estado: cepInfo.uf,
    };

    cidadeInput.value = localidade.cidade;
    estadoInput.value = localidade.estado;
  } else {
    cidadeInput.value = `CEP Inválido`;
    estadoInput.value = `CEP Inválido`;
    areaInfo.innerHTML = ``;
  }
}

cepInput.addEventListener("blur", function () {
  const cep = this.value;
  const cepValido = /[0-9]{8}/g;

  if (cep.match(cepValido)) {
    getCep(cep);
    cepAviso.style.visibility = "hidden";
  } else {
    cepAviso.style.visibility = "visible";
    cidadeInput.value = `CEP Inválido`;
    estadoInput.value = `CEP Inválido`;
    areaInfo.innerHTML = ``;
  }

  // fetchGeo(cidade, estado)
});

botaoEnvia.addEventListener("click", (event) => {
  event.preventDefault();

  if (cidadeInput.value === `CEP Inválido` || cepInput.value === "") {
    cidadeInput.style.border = `1px solid red`;
    estadoInput.style.border = `1px solid red`;
    cepInput.style.border = `1px solid red`;

    setTimeout(() => {
      cidadeInput.style.border = `1px solid var(--main-txt-color)`;
      estadoInput.style.border = `1px solid var(--main-txt-color)`;
      cepInput.style.border = `none`;
    }, 2000);
    return;
  }

  botaoLoadingAnimacao();
  clearDivs();

  fetchGeo(cidadeInput.value, estadoInput.value);
});

/*WEATHER API*/
async function fetchGeo(cidade, estado) {
  const responseGeolocation = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cidade},${estado},076&appid=38fe5f0e298f3edf79048384cd436a89`
  );
  const geoInfo = await responseGeolocation.json();
  // console.log(geoInfo[0].lat)
  // console.log(geoInfo[0].lon)
  const lat = geoInfo[0].lat;
  const lon = geoInfo[0].lon;
  // const responseWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=38fe5f0e298f3edf79048384cd436a89&lang=pt_br&units=metric `)
  const responseWeather = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=e9093dcdb40d47a6b46160842220604&q=${lat},${lon}&days=7&aqi=yes&lang=pt`
  );
  const weatherInfo = await responseWeather.json();

  const weatherPrevisoes = weatherInfo.forecast.forecastday;
  const climaPrevisoes = [];
  weatherPrevisoes.slice(1).forEach((day) => {
    const previsao = {};
    previsao.data = day.date;
    previsao.tempmax = day.day.maxtemp_c;
    previsao.tempmin = day.day.mintemp_c;
    previsao.umidade = day.day.avghumidity;
    previsao.tempmedia = day.day.avgtemp_c;
    previsao.clima = day.day.condition.text;
    previsao.chuva = day.day.daily_chance_of_rain;

    climaPrevisoes.push(previsao);
  });

  const climaHoje = {};
  climaHoje.icone = weatherInfo.current.condition.icon;
  climaHoje.dianoite = weatherInfo.current.is_day;
  climaHoje.temperatura = weatherInfo.current.temp_c;
  climaHoje.clima = weatherInfo.current.condition.text;
  climaHoje.umidade = weatherInfo.current.humidity;
  climaHoje.mintemp = weatherPrevisoes[0].day.mintemp_c;
  climaHoje.maxtemp = weatherPrevisoes[0].day.maxtemp_c;
  climaHoje.chuva = weatherPrevisoes[0].day.daily_chance_of_rain;

  criaCardAgora(climaHoje);
  criaCardHoje(climaHoje);
  criaCardPrevisoes(climaPrevisoes);
  botaoRetiraAnimacao();
}

function criaCardAgora(hoje) {
  /*CARD AGORA*/
  const agoraCard = document.createElement("div");
  agoraCard.classList.add("card");
  agoraCard.classList.add("cardAgora");

  /*CRIA ELEMENTOS DO CARD*/
  const agoraTitulo = document.createElement("div");
  const iconImagem = document.createElement("img");
  const agoraClima = document.createElement("div");
  const agoraTemperatura = document.createElement("div");
  const agoraUmidade = document.createElement("div");

  /*TITULO AGORA*/
  agoraTitulo.classList.add("cardTitulo");
  agoraTitulo.textContent = "agora";
  agoraCard.appendChild(agoraTitulo);

  /*IMAGEM AGORA*/
  let diaOuNoite = "day";
  if (hoje.dianoite == 0) {
    diaOuNoite = "night";
  }
  iconImagem.setAttribute(
    "src",
    `img/64x64/${diaOuNoite}/${hoje.icone.slice(-7, -4)}.png`
  );
  agoraCard.appendChild(iconImagem);

  /*TEMPERATURA AGORA*/
  agoraTemperatura.innerHTML = `<p>temperatura</p><span>${hoje.temperatura.toFixed(
    1
  )}ºC</span>`;
  agoraCard.appendChild(agoraTemperatura);

  /*UMIDADE AGORA*/
  agoraUmidade.innerHTML = `<p>umidade</p><span>${hoje.umidade}%</span>`;
  agoraCard.appendChild(agoraUmidade);

  /*CLIMA AGORA*/
  agoraClima.classList.add("infoClima");
  agoraClima.innerHTML = `${hoje.clima}`;
  agoraCard.appendChild(agoraClima);

  /*FINALIZA AGORA CARD*/
  infosHoje.appendChild(agoraCard);
}

function criaCardHoje(hoje) {
  /*CARD HOJE*/
  const cardHoje = document.createElement("div");
  cardHoje.classList.add("card");
  cardHoje.classList.add("cardHoje");

  /*ELEMENTOS DO CARD*/
  const hojeTitulo = document.createElement("div");
  const hojeInfo = document.createElement("div");
  hojeInfo.classList.add("cardHojeInfo");
  const hojeTempMin = document.createElement("div");
  const hojeTempMax = document.createElement("div");
  const hojeChuva = document.createElement("div");

  /*TITULO HOJE*/
  hojeTitulo.classList.add("cardTitulo");
  hojeTitulo.textContent = `previsões para hoje`;
  cardHoje.appendChild(hojeTitulo);

  /*TEMPERATURA MÍNIMA*/
  hojeTempMin.innerHTML = `<p>temperatura mínima</p><span>${hoje.mintemp}ºC</span>`;
  hojeInfo.appendChild(hojeTempMin);

  /*TEMPERATURA MÁXIMA*/
  hojeTempMax.innerHTML = `<p>temperatura máxima</p><span>${hoje.maxtemp}ºC</span>`;
  hojeInfo.appendChild(hojeTempMax);

  /*CHANCE DE CHUVA*/
  hojeChuva.innerHTML = `<p>chance de chuva</p><span>${hoje.chuva}%</span>`;
  hojeInfo.appendChild(hojeChuva);

  cardHoje.appendChild(hojeInfo);
  infosHoje.appendChild(cardHoje);
  areaInfo.appendChild(infosHoje);
}

function criaCardPrevisoes(dias) {
  dias.forEach((dia) => {
    /*CRIA CARD*/
    const previsaoCard = document.createElement("div");
    previsaoCard.classList.add("card");
    previsaoCard.classList.add("previsaoCard");
    /*CRIA ELEMENTOS DO CARD*/
    const mediaTemperatura = document.createElement("div");
    const maxTemperatura = document.createElement("div");
    const minTemperatura = document.createElement("div");
    const mediaHumidade = document.createElement("div");
    const previsaoClima = document.createElement("div");
    const chanceDeChuva = document.createElement("div");

    /*DATA E TITULO*/
    const previsaoTitulo = document.createElement("div");
    previsaoTitulo.innerHTML = `<p>previsões para ${dia.data.slice(
      8,
      10
    )}/${dia.data.slice(5, 7)}</p>`;
    previsaoTitulo.classList.add("cardTitulo");
    previsaoCard.appendChild(previsaoTitulo);

    /*CONTEÚDO DOS ELEMENTOS*/
    mediaTemperatura.innerHTML = `<p>temperatura média</p><span>${dia.tempmedia}ºC</span>`;
    maxTemperatura.innerHTML = `<p>temperatura máxima</p><span>${dia.tempmax}ºC</span>`;
    minTemperatura.innerHTML = `<p>temperatura mínima</p><span>${dia.tempmin}ºC</span>`;
    mediaHumidade.innerHTML = `<p>umidade</p><span>${dia.umidade}%</span>`;
    chanceDeChuva.innerHTML = `<p>chance de chuva</p><span>${dia.chuva}%</span>`;
    previsaoClima.innerHTML = `<p class="infoClima">${dia.clima}</p>`;

    previsaoCard.appendChild(mediaTemperatura);
    previsaoCard.appendChild(maxTemperatura);
    previsaoCard.appendChild(minTemperatura);
    previsaoCard.appendChild(mediaHumidade);
    previsaoCard.appendChild(chanceDeChuva);
    previsaoCard.appendChild(previsaoClima);

    previsoes.appendChild(previsaoCard);
  });

  areaInfo.appendChild(previsoes);
}

function clearDivs() {
  areaInfo.innerHTML = "";
  infosHoje.innerHTML = "";
  previsoes.innerHTML = "";
}

function botaoLoadingAnimacao() {
  const loadingDiv = document.createElement("div");
  loadingDiv.classList.add("loading");
  botaoEnvia.textContent = "";
  loadingDiv.innerHTML = `<i class="ph-arrows-clockwise"></i>`;
  botaoEnvia.appendChild(loadingDiv);
}

function botaoRetiraAnimacao() {
  botaoEnvia.innerHTML = `atualizar localização`;
}

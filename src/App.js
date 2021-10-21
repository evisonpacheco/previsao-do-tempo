import React, { useState } from "react";
/*
Olá tudo bem? 

Então vamos lá vou deixar esse desafio pra você.

Quero que você melhore a usabilidade do nosso verificador de clima.

Estava pensando aqui e precisamos das seguintes melhorias:

Mostrar para o usuário de alguma maneira que estamos buscando a informação
meteorologia da cidade dele, acho que precisamos de um "loading", o que acha?
Que tal escrever "Buscando..." dentro do botão enquanto a requisição esta sendo feita?

Seria legal também a gente mostrar para o usuário a cidade e estado dele,
pra ele ter certeza que estamos mostrando a previsão do tempo da cidade correta, o que acha?

Podemos também limpar o campo de busca após a busca ser realizada! Isso melhora a usabilidade
do nosso sistema.

O que acha de informamos o usuário quando a cidade não for encontrada ou tivermos algum 
erro na nossa requisição? Legal ne?

E por último temos varias outras informações que podemos mostrar para o usuário,
como por exemplo, visibilidade, sensação termica, humidade, velocidade do vento.

Vamos listras alguma dessas informações para o usuário? Sinta-se a vontade para modificar
o layout como você quiser!!

*/

function App() {
  const [city, setCity] = useState("");
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean);

  const handleSearch = () => {
    fetch(
      `${process.env.REACT_APP_BASE_URL}current.json?key=${process.env.REACT_APP_KEY}&q=${city}&lang=pt`
    )
      .then((res) => {
        setIsLoading(1)
        if (res.status === 200) {
          return res.json();
        }
        if (res.status !== 200) {
          alert('Erro! Verifique os dados inseridos');
        }
      })
      .then((data) => {
        setIsLoading(0)
        console.log(data);
        setWeatherForecast(data);
        setCity("")
      });

  };

  return (
    <body>
      <header>
        <p>PREVISÃO DO TEMPO</p>
      </header>

      <main>
        <div className="jumbotron">
          <h1>Verique agora a previsão do tempo na sua cidade!</h1>
          <p className="lead">
            Digite o nome da sua cidade no campo abaixo e em seguida clique em pesquisar.
          </p>
          <div class='botao'>
            <input
              type="text"
              class="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <button className="btn btn-lg btn-primary" onClick={handleSearch}>
            Pesquisar
          </button>

          {isLoading ? (
            <div className="mt-4 d-flex align-items-center">
              <h3> Pesquisando ... </h3>
            </div>
          ) : null}

          {weatherForecast ? (
            <>
              <div class='results'>
                <h3>
                  Mostrando resultados para a cidade de: <br></br> {weatherForecast.location.name} em: {weatherForecast.location.region}, {weatherForecast.location.country}
                </h3>
                <img
                  src={`${weatherForecast.current.condition.icon}`}
                  alt="Weather Icon"
                />
                <p className='lead'>A previsão é: {weatherForecast.current.condition.text}</p>
                <p className="lead">
                  Temperatura Real de: {weatherForecast.current.temp_c}&#8451;
                </p>
                <p className='lead'>
                  Sensação Térmica de: {weatherForecast.current.feelslike_c}&#8451;
                </p>
                <p className='lead'>
                  Umidade de: {weatherForecast.current.humidity}%
                </p>

              </div>
            </>
          ) : null}
        </div>
      </main>
      <footer>
        <p>&copy; Desenvolvido por <a href='https://github.com/evisonpacheco' target='_blank' rel="noreferrer"><img src="./images/github.svg" alt="Ícone do GitHub" /> Evison</a></p>
      </footer>
    </body>
  );
}

export default App;

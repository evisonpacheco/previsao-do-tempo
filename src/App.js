import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    fetch(
      `${process.env.REACT_APP_BASE_URL}current.json?key=${process.env.REACT_APP_KEY}&q=${city}&lang=pt`
    )
      .then((res) => {
        setIsLoading(true)
        if (res.status === 200) {
          return res.json();
        }
        if (res.status !== 200) {
          alert('Erro! Verifique os dados inseridos.');
        }
      })
      .then((data) => {
        setIsLoading(false)
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
          {isLoading ?('Pesquisando ...')
           : ('Pesquisar')}
          </button>

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
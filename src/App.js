import React, { useState } from "react";

function App() {
    const [city, setCity] = useState("");
    const [weatherForecast, setWeatherForecast] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error400, setError400] = useState(null);
    const [error666, setError666] = useState(null);

    function clearResults() {
        // criar função para limpar campos
    }

    const handleSearch = () => {
        if (city === "") {
            setError666(666)
        } else {
            setIsLoading(true);
            fetch(
                `${process.env.REACT_APP_BASE_URL}current.json?key=${process.env.REACT_APP_KEY}&q=${city}&lang=pt`
            )
                .then((res) => {
                    clearResults()
                    setIsLoading(false)
                    if (res.status === 200) {
                        return res.json()
                    }
                    if (res.status === 400) {
                        setError400(400)
                    }
                    if (res.status === 666) {
                        setError666(666)
                    }
                })
                .then((data) => {
                    clearResults()
                    setIsLoading(false)
                    setWeatherForecast(data);
                    setCity("")
                })
        }

    };



    return (
        <body>
            <header class="header">
                <p class="header__text">Previsão do tempo</p>
            </header>
            <main class="main">
                <h1 class="main__title">Verique a previsão do tempo na sua cidade!</h1>
                <p class="main__text">
                    Digite o nome da sua cidade no campo abaixo e em seguida clique em pesquisar.
                </p>
                <input class="main__textbox"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button class="main__button" onClick={handleSearch}>
                    {isLoading ? "Pesquisando" : "Pesquisar"}
                </button>

                {weatherForecast ? (
                    <div class="results">
                        <h3 class="results__title">
                            Mostrando resultados para a cidade de: <br></br> {weatherForecast.location.name} em {weatherForecast.location.region}, {weatherForecast.location.country}
                        </h3>
                        <img
                            src={`${weatherForecast.current.condition.icon}`}
                            alt="Ícone do Tempo"
                        />
                        <p class="results__paragraph">A previsão é: {weatherForecast.current.condition.text}</p>
                        <p class="results__paragraph">
                            Temperatura de: {weatherForecast.current.temp_c}&#8451;
                        </p>
                        <p class="results__paragraph">
                            Sensação Térmica de: {weatherForecast.current.feelslike_c}&#8451;
                        </p>
                        <p class="results__paragraph">
                            Umidade de: {weatherForecast.current.humidity}%
                        </p>
                    </div>
                ) : null}

                {error400 ? (
                    <div class="results--error">
                        <h3 class="results__title">Cidade não encontrada</h3>
                    </div>
                ) : null}

                {error666 ? (
                    <div class="results--error">
                        <h3 class="results__title">Por favor preencha uma cidade</h3>
                    </div>
                ) : null}
            </main>
            <footer class="footer">
                <p class="footer__text">
                    &copy; Desenvolvido por
                    <a class="footer__link" href="https://github.com/evisonpacheco" target="_blank" rel="noreferrer"><img class="footer_image" src="./images/github.svg" alt="Ícone do GitHub" />Evison</a>
                </p>
            </footer>
        </body>
    );
}

export default App;
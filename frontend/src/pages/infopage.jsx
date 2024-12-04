import "../styles/main.css"
import { Link } from 'react-router-dom';

const InfoPage = () => {

    return (
    <>
        <div>
            <h1>Tietoja sovelluksesta</h1>
            <h2>Tekijä: Henri Nieminen</h2>
            <div>
                <h3>Käyttöohjeet:</h3>
            </div>
            <div>
                <h3>Käytetyt materiaalit</h3>
                <p>Työssä ei ole tähän asti käytetty mitään joka olisi
                    lisenssinalaista. CSS:ssän sijaan ollaan käytetty SASSIA,
                    joka on ekstensio CSS kielestä ja helpottaa luokkien ja selektoreiden
                    käyttöä. Myös reactin muita kirjastoja kuten toastify, router, jne. on
                    käytetty. Suunnitelmana on myös lokalisoida (i8n)
                </p>
                <p>Tekoäly työkaluja (Github Co-Pilot) on lähinnä käytetty pieninen ongelmien
                    ratkaisuun jos ei ole nettihauilla löytynyt suoraviivaista
                    vastausta.
                </p>
            </div>
        </div>
        <Link to="/">Go back</Link>
    </>
    );
};

export default InfoPage;

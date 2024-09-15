import reversalBaseline from "../../assets/Reversal Baseline.png"
import multipleBaseline from "../../assets/Multiple Baseline.png"
import { Link } from "react-router-dom"
import "./Home.scss"

export function Home() {

    return (
        <main className="home">

            <section className="hero">
                <div className="hero__left">
                    <h1 className="hero__title">Save time while graphing</h1>
                    <p className="hero__copy">Spend less time creating graphs, and more time with other things. Single Subject Graphs generates graphs from your data sheets instantly. All data remains on your device, so you never have to worry about your data. Automatically formatted to meet APA guidelines. Available for Multiple Baseline Graphs, or Reverse Baseline Graphs.</p>
                </div>
                <div className="hero__right">
                    <img src={reversalBaseline} alt="reversal graph" className="hero__img" />
                </div>
            </section>
            <section className="product-card product-card--gray">
                <Link to="/reversal">
                    <h2>Reversal Graph / ABAB Graph</h2>
                    <img src={reversalBaseline} alt="image of a reversal graph" className="home__img" />
                    <button className="link-button">Generate Now</button>
                </Link>
            </section>
            <section className="product-card">
                <Link to="/multiple-baseline">
                    <h2 className="multiple__title">Multiple Baseline Graph</h2>
                    <img src={multipleBaseline} alt="image of a multiple baseline graph" className="home__img" />
                    <button className="link-button">Generate Now</button>
                </Link>
            </section>
        </main>
    )
}
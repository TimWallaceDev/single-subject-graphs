import reversalBaseline from "../../assets/reversal.png"
import multipleBaseline from "../../assets/multiple-baseline.png"
import { Link } from "react-router-dom"
import "./Home.scss"

export function Home() {

    return (
        <main className="home">

            <section className="hero">
                <div className="hero__left">
                    <h2>Unlock the Power of Advanced Graphing Techniques</h2>
                    <p>Unlock the full potential of your data with our cutting-edge reversal and multiple baseline graphs. Our platform offers intuitive and interactive graphing tools that turn complex datasets into clear, actionable insights.

                        Visualize your data with precision and clarity, whether you’re comparing multiple trends over time or analyzing intricate patterns with reversal baselines. Our graphs are designed to simplify data analysis and enhance your presentations, making it easy to uncover key insights and communicate findings effectively.</p>
                </div>
                <div className="hero__right">
                    <img src={reversalBaseline} alt="reversal graph" className="hero__img"/>
                </div>
            </section>
            <Link to="/reversal">
                <h2>Reversal Graph / ABAB Graph</h2>
                <img src={reversalBaseline} alt="image of a reversal graph" className="home__img" />
            </Link>
            <Link to="/multiple-baseline">
                <h2>Multiple Baseline Graph</h2>
                <img src={multipleBaseline} alt="image of a multiple baseline graph" className="home__img" />
            </Link>
        </main>
    )
}
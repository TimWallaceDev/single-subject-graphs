import reversalBaseline from "../../assets/reversal.png"
import multipleBaseline from "../../assets/multipleBaseline.png"
import { Link } from "react-router-dom"

export function Home() {

    return (
        <main>
            <h1>ABA Graphs</h1>

            <Link to="/multiple-baseline">
                <h2>Multiple Baseline Graph</h2>
                <img src={multipleBaseline} alt="image of a multiple baseline graph" />
            </Link>

            <Link to="/reversal">
                <h2>Reversal Graph / ABAB Graph</h2>
                <img src={reversalBaseline} alt="image of a reversal graph" />
            </Link>
        </main>
    )
}
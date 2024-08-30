import { Link } from "react-router-dom"
import "./Nav.scss"

export function Nav() {

    return (
        <nav className="nav">
            <Link to="/">
                <h1 className="nav__title">ABA Graphs</h1>
            </Link>

            <ul className="nav__items">
                <li className="nav__item">
                    <Link to="/reversal">
                        <span className="nav__link">Reversal Graph</span>
                    </Link>
                </li>
                <li className="nav__item">
                    <Link to="/multiple-baseline">
                        <span className="nav__link">Multiple Baseline Graph</span>
                    </Link>
                </li>

            </ul>
        </nav>
    )
}
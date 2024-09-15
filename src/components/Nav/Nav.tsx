import { Link } from "react-router-dom"
import "./Nav.scss"

export function Nav() {

    return (
        <nav className="nav">
            <Link to="/">
                <span className="nav__title">Single Subject Graphs</span>
            </Link>

            <ul className="nav__items">
                <li className="nav__item">
                    <Link to="/reversal">
                        <span className="nav__link">Reversal Graph Generator</span>
                    </Link>
                </li>
                <li className="nav__item">
                    <Link to="/multiple-baseline">
                        <span className="nav__link">Multiple Baseline Graph Generator</span>
                    </Link>
                </li>

            </ul>
        </nav>
    )
}
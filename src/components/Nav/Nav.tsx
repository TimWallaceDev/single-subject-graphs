import { Link } from "react-router-dom"
import hamburger from "../../assets/icons/menu.svg"
import "./Nav.scss"
import { useState } from "react"

export function Nav() {

    const [mobileOpen, setMobileOpen] = useState<boolean>(false)

    function toggleMobileMenu() {
        //if open remove opened class
        if (mobileOpen) {
            //remove opened class
            setMobileOpen(false)
        }
        else {
            setMobileOpen(true)
            //add opened class
        }
    }

    return (
        <nav className="nav">
            <div className="navbar">

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

                <span className="hamburger" onClick={toggleMobileMenu}>
                    <img src={hamburger} alt="hamburger menu icon" className={ mobileOpen ? "hamburger-icon hamburger-icon--open" : "hamburger-icon"}></img>
                </span>

            </div>
            <div className={mobileOpen ? "mobile-menu mobile-menu--open" : "mobile-menu mobile-menu--closed"}>
                <ul className="mobile-nav__items">
                    <li className="mobile-nav__item">
                        <Link to="/reversal">
                            <span className="mobile-nav__link">Reversal Graph Generator</span>
                        </Link>
                    </li>
                    <li className="mobile-nav__item">
                        <Link to="/multiple-baseline">
                            <span className="mobile-nav__link">Multiple Baseline Graph Generator</span>
                        </Link>
                    </li>

                </ul>
            </div>
        </nav>
    )
}
import "./Reference.scss";
import copy from "../../assets/content_copy.svg"
import { useState } from "react";


interface ReferenceProps {
    title: string;
}

export function Reference(props: ReferenceProps) {

    const title = props.title

    const [popupIsVisible, setPopupIsVisible] = useState(false)


    function copyReference() {
        setPopupIsVisible(true)
        navigator.clipboard.writeText(`Tim Wallace. (2024). Single Subject Graphs. ${title}. https://www.singlesubjectgraphs.com`)
        setTimeout(() => {
            setPopupIsVisible(false)
        }, 1000)
    }

    return (
        <div className="reference">
            <div className="reference__top">
                <p className="reference__label">APA Reference</p>
                <button className="reference__button" onClick={copyReference}>
                    {popupIsVisible ?
                        <span>
                            Copied!
                        </span>
                        :
                        <>
                            <span>

                                Copy
                            </span>
                            <img src={copy} alt="copy icon" />
                        </>
                    }
                </button>
                {/* <div className={popupIsVisible ? "reference__popup reference__popup--visible" : "reference__popup reference__popup--hidden"}>Copied!</div> */}
            </div>

            <div className="reference__information">Tim Wallace. (2024). Single Subject Graphs. {title}. https://www.singlesubjectgraphs.com</div>
        </div>
    )
}
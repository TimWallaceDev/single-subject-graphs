import { ReversalGraph } from "../../components/ReversalGraph/ReversalGraph";
import Papa from "papaparse";
import { ChangeEvent, useState } from "react";
import "./Reversal.scss"
import spreadsheet from "../../assets/spreadsheet.png"
import svg from "../../assets/graphsvg.svg"
import download from "../../assets/icons/download.svg"
import uploadFile from "../../assets/icons/upload_file.svg"
import { DataPoint } from "../../interface";
import Plotly from "plotly.js-basic-dist";


export function Reversal() {
    const [data, setData] = useState<DataPoint[] | null>(null)
    const [fields, setFields] = useState<string[] | null>(null)
    const [title, setTitle] = useState<string>("Title")

    function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        const fileInput = event.target;
        const files = fileInput.files; // FileList | null
        let file
        if (files && files.length > 0) {
            file = files[0];
        }
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                if (e.target) {
                    const contents = e.target.result as string;
                    if (contents !== null) {
                        parseCSV(contents);
                    }
                }
            };
            reader.readAsText(file);
        }
    }

    function parseCSV(contents: string) {
        Papa.parse(contents, {
            header: true,
            dynamicTyping: true,
            complete: function (results) {
                const data: DataPoint[] = results.data as DataPoint[];
                setData(data)
                if (results.meta.fields) {
                    setFields(results.meta.fields)
                }
            }
        });
    }

    const handleDownload = () => {
        // Use Plotly to get the SVG image
        const plotElement = document.getElementsByClassName('plot')[0] as HTMLElement;
        Plotly.toImage(plotElement, { format: 'png', width: 700, height: 450 })
            .then((url) => {
                const a = document.createElement('a');
                a.href = url;
                a.download = title + '.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
    };


    return (
        <main className="product">
            <h1 className="product__title">Reversal Graph Generator</h1>
            <section className="instructions-wrapper">
                <h2 className="product__subtitle product__subtitle--underline">Data Sheet Instructions</h2>
        
                <div className="instructions">

                    <ol className="instructions__list">
                        <li className="instructions__item">
                            <span>
                                Add Headings in the first row of the the spreadsheet:
                            </span>
                            <ul>
                                <li>
                                    first heading should be "session". This will be the label for the X-axis
                                </li>
                                <li>
                                    second heading should be "condition". THIS IS IMPORTANT
                                </li>
                                <li>
                                    Third heading should describe the value of the data. e.g. "number of responses". This will be used as the label on the Y-axis.
                                </li>
                            </ul>
                        </li>
                        <li className="instructions__item">
                            Then add all the data to the sheet. Each entry should have the session name, condition, and value. In the example below, you can replace "Baseline" and "Intervention" with your conditions.
                        </li>
                        <li className="instructions__item">
                            Export your spreadsheet as a CSV file.
                            <br />

                            In google sheets go to file - Download - Comma Separated Values (.csv)
                        </li>
                        <li className="instructions__item">
                            Upload the CSV file to this website
                        </li>
                        <li className="instructions__item">
                            View your graph and add a title
                        </li>
                    </ol>
                    <div className="instructions__spreadsheet">
                        <figcaption className="instructions__spreadsheet-label">Example Spreadsheet</figcaption>
                        <img src={spreadsheet} alt="spreadsheet example" className="instructions__image" />
                    </div>
                </div>
            </section>
            <section className="form">
                <h3 className="form__title">Upload File</h3>
                <div className="file">
                    <label htmlFor="fileInput" className="file__label">
                        <span className="button__text">Upload Data Sheet</span>
                        <img src={uploadFile} alt="file upload icon"/>
                    </label>
                    <input type="file" id="fileInput" className="choose-file-button" accept=".csv" name="file" onChange={(e) => handleFileSelect(e)} />
                </div>
            </section>
            {/* conditionally render the graph is data has been added */}
            {
                data && fields &&
                <section className="render">
                    <h1 className="render__heading">Add a Title / Save</h1>
                    <div className="render__inputs">

                        <input className="render__title-input" type="text" placeholder="Graph Title" onChange={(e) => handleTitleChange(e)} />

                        <button onClick={handleDownload} className="download-svg-button">
                            <span className="button__text">
                                Download PNG
                            </span>
                            <img src={download} alt="download icon" className="button__icon"></img>
                        </button>
                    </div>
                    <ReversalGraph csvData={data} fields={fields} title={title} />
                </section>
            }
            {(!data || !fields) &&
                <img src={svg} alt="illustration of a graph" className="render__placeholder-image" />
            }
        </main>
    )

    function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
        const updatedTitle = e.target.value
        setTitle(updatedTitle)
    }
}
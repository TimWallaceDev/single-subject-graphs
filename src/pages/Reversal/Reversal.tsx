import { ReversalGraph } from "../../components/ReversalGraph/ReversalGraph";
import Papa from "papaparse";
import { useState } from "react";
import "./Reversal.scss"
import spreadsheet from "../../assets/spreadsheet.png"
import { DataPoint } from "../../interface";


export function Reversal() {
    const [data, setData] = useState<DataPoint[] | null>(null)
    const [fields, setFields] = useState<string[] | null>(null)

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
                if (e.target){
                    const contents = e.target.result as string;
                    if (contents !== null){
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
                if (results.meta.fields){
                    setFields(results.meta.fields)
                }
            }
        });
    }


    if (!data || !fields) {
        return (
            <main className="reversal">
                <h1>Reversal Graph Generator</h1>
                <h2>Instructions</h2>
                <ol className="instructions">
                    <li>
                        <span>
                            Enter your data in a spreadsheet. Make sure to use the following the format in the example:
                        </span>
                        <ul>
                            <li>
                                first heading should be "session"
                            </li>
                            <li>
                                second heading should be "condition". THIS IS IMPORTANT
                            </li>
                            <li>
                                Third heading should describe the value. This will be used as the label on the Y-axis.
                            </li>
                        </ul>
                        <span>
                            Then add all the data to the sheet. Each entry should have the session name, condition, and value. In the example below, you can replace "Baseline" and "Intervention" with something more descriptive. 
                        </span>
                    </li>
                    <li>
                        Export your spreadsheet as a CSV file.
                        <br />

                        In google sheets go to file - Download - Comma Separated Values (.csv)
                    </li>
                    <li>
                        Upload the CSV file to this website
                    </li>
                    <li>
                        View your graph and add a title
                    </li>
                </ol>
                <h3>Example Spreadsheet</h3>
                <img src={spreadsheet} alt="spreadsheet example"/>
                <form>
                    <h1>Add Data</h1>
                    <input type="file" id="csvFileInput" accept=".csv" name="file" onChange={(e) => handleFileSelect(e)} />
                </form>
            </main>
        )
    }

    return (
        <main className="reversal">
            <h1>Heres the graph</h1>
            <ReversalGraph csvData={data} fields={fields} />
        </main>
    )
}
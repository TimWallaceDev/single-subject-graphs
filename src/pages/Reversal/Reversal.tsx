
import { MultipleBaselineGraph } from "../../components/MultipleBaseline";
import { ReversalGraph } from "../../components/ReversalGraph/ReversalGraph";
import Papa from "papaparse";
import { useState } from "react";
import "./Reversal.scss"


export function Reversal() {
    const [data, setData] = useState(null)
    const [title , setTitle] = useState("")
    const [fields, setFields] = useState(null)

    function handleFileSelect(event) {
        event.preventDefault()
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const contents = e.target.result;
                parseCSV(contents);
            };
            reader.readAsText(file);
        }
    }

    function parseCSV(contents) {
        Papa.parse(contents, {
            header: true,
            dynamicTyping: true,
            complete: function (results) {
                // console.log({results})
                const data = results.data;
                setData(data)
                setFields(results.meta.fields)
            }
        });
    }


    if (!data) {
        return (
            <main className="reversal">
                <h1>Reversal Graph Generator</h1>
                <h2>Instructions</h2>
                <p>Export your data from a spreadsheet into a CSV. The structure should be as follows.</p>
                <p>Sessions, Condition, Value</p>
                <p>Session name, condition name, value</p>
                <form onSubmit={(e) => handleFileSelect(e)}>
                    <h1>Add Data</h1>
                    <input type="file" id="csvFileInput" accept=".csv" name="file" onChange={(e) => handleFileSelect(e)} />
                </form>
            </main>
        )
    }

    return (
        <main className="reversal">
            <h1>Heres the graph</h1>
            <ReversalGraph csvData={data} title={title} fields={fields}/>
        </main>
    )
}
import { useState } from "react";
import { MultipleBaselineGraph } from "../../components/MultipleBaseline/MultipleBaseline";
import Papa from "papaparse";


export function MultipleBaseline() {
    const [data, setData] = useState(null)
    const [fields, setFields] = useState(null)

    console.log({fields})

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
                const data = results.data;
                setData(data)
                setFields(results.meta.fields)
            }
        });
    }

    if (!data) {
        return (
            <>
                <h1>Multiple Baseline Graph Generator</h1>
                <h2>Instructions</h2>
                <p>Export your data from a spreadsheet into a CSV. The structure should be as follows.</p>
                <p>Sessions, Condition, Value</p>
                <p>Session name, condition name, value</p>
                <form>
                    <h1>Add Data</h1>
                    <input type="file" id="csvFileInput" accept=".csv" name="file" onChange={(e) => handleFileSelect(e)} />
                </form>
            </>
        )
    }

    return (
        <>
            <h1>Heres the graph</h1>
            <MultipleBaselineGraph csvData={data} fields={fields}/>
        </>
    )
}
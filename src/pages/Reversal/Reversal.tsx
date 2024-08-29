import { ReversalGraph } from "../../components/ReversalGraph";
import { ChangeEvent, useState } from "react";
import Papa from "papaparse";


export function Reversal() {
    const [data, setData] = useState(null)

    function handleFileSelect(event: ChangeEvent<HTMLInputElement>) {
        event.preventDefault()
        if (!event.target.files){
            return
        }
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

    function parseCSV(contents: string | ArrayBuffer | null) {
        Papa.parse(contents, {
            header: true,
            dynamicTyping: true,
            complete: function (results: { data: any; }) {
                const data = results.data;
                setData(data)
            }
        });
    }



    if (!data) {
        return (
            <>
                <h1>Reversal Graph Generator</h1>
                <h2>Instructions</h2>
                <p>Export your data from a spreadsheet into a CSV. The structure should be as follows.</p>
                <p>Sessions, Condition, Value</p>
                <p>Session name, condition name, value</p>
                <form>
                    <h1>Add Data</h1>
                    <input type="file" id="csvFileInput" accept=".csv" name="file" onChange={(e) => handleFileSelect(e)} />
                    <button type="submit">chart</button>
                </form>
            </>
        )
    }

    return (
        <>
            <h1>Heres the graph</h1>
            <ReversalGraph csvData={data} />
        </>
    )
}
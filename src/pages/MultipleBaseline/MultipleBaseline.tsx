import { useState } from "react";
import { MultipleBaselineGraph } from "../../components/MultipleBaseline";
import Papa from "papaparse";


export function MultipleBaseline() {
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
                console.log({results})
                const data = results.data;
                setData(data)
                setFields(results.meta.fields)
            }
        });
    }

    function handleTitleChange(e){
        setTitle(e.target.value)
    }

    if (!data) {
        return (
            <>
                <h1>Multiple Baseline Graph Generator</h1>
                <h2>Instructions</h2>
                <p>Export your data from a spreadsheet into a CSV. The structure should be as follows.</p>
                <p>Sessions, Condition, Value</p>
                <p>Session name, condition name, value</p>
                <form onSubmit={(e) => handleFileSelect(e)}>
                    <h1>Add Data</h1>
                    <input type="text" placeholder="title" name="title" onChange={(e) => handleTitleChange(e)}></input>
                    <input type="file" id="csvFileInput" accept=".csv" name="file" onChange={(e) => handleFileSelect(e)} />
                    <button type="submit">chart</button>
                </form>
            </>
        )
    }
    else {
        console.log("data exists", { data })
    }

    return (
        <>
            <h1>Heres the graph</h1>
            <MultipleBaselineGraph csvData={data} title={title} fields={fields}/>
        </>
    )
}
import Plot from 'react-plotly.js';
import { DataPoint } from '../../interface';
import { CSVToColumns } from '../../functions/CSVToColumns';
import { ColumnsToPlotObjects } from '../../functions/ColumnsToPlotObjects';
import { MaxHeightOfGraph } from '../../functions/MaxHeightOfGraph';
import { CreateLines } from '../../functions/CreateLines';
import { CalculateDomains } from '../../functions/CalculateDomains';

interface GraphProps {
    csvData: DataPoint[],
    fields: string[],
    title: string,
    YAxisLabel: string,
    XAxisLabel: string
}

interface XAxisObject {
    showgrid: boolean,
    anchor: string,
    ticklen: number,
    tickwidth: number,
    range: number[],
    tickvals: number[],
    ticktext: string[]
}

export const MultipleBaselineGraph = (props: GraphProps) => {
    const { csvData, fields, title, YAxisLabel, XAxisLabel } = props;

    //separate data into columns
    const columns = CSVToColumns(csvData, fields)

    //create Plot objects from columns
    const data = ColumnsToPlotObjects(columns)

    //get the max height for all graphs
    const maxHeight = MaxHeightOfGraph(columns)

    //add lines
    const lines = CreateLines(columns, maxHeight)

    function generateTicks(csvData: DataPoint[], blank: boolean) {
        const sessionLabel = fields[0]
        const text = []
        const vals = []
        for (let i = 0; i < csvData.length + 1; i++) {
            if (i === 0) {
                text.push("")
            }
            else if (blank) {
                text.push("")
            }
            else {
                const currentObject = csvData[i - 1]
                const tick = currentObject[sessionLabel].toString()
                text.push(tick)
            }

            vals.push(i)

        }
        return { text: [...text], vals: [...vals] }
    }

    const firstLineX = lines[0].x0

    const annotations = []
    //add baseline / treatment annotations
    annotations.push(
        {
            text: "baseline",
            xref: "paper",
            yref: "paper",
            x: firstLineX / 2,
            y: 1,
            showarrow: false,

        },
        {
            text: "treatment",
            xref: "paper",
            yref: "paper",
            x: firstLineX + firstLineX / 2,
            y: 1,
            showarrow: false,

        },
    )

    //add Y axis title
    annotations.push(
        {
            text: YAxisLabel,  // The text you want to display
            xref: "paper",                // Use 'paper' to refer to the full plotting area
            yref: "paper",
            x: -0.07,                         // Position at the left side (x = 0)
            y: 0.5,                       // Centered vertically (y = 0.5)
            xanchor: 'right',             // Align text to the right (so it doesn't overlap)
            yanchor: 'middle',            // Center vertically
            showarrow: false,             // No arrow pointing to the text
            textangle: -90,          // Rotate text 90 degrees counterclockwise
            font: { size: 14 }
        }
    )

    //add X axis title
    annotations.push(
        {
            text: XAxisLabel,  // The text you want to display
            xref: "paper",                // Use 'paper' to refer to the full plotting area
            yref: "paper",
            x: 0.5,                     // Position at the left side (x = 0)
            y: -0.07,                       // Centered vertically (y = 0.5)
            xanchor: 'center',             // Align text to the right (so it doesn't overlap)
            yanchor: 'top',            // Center vertically
            showarrow: false,             // No arrow pointing to the text
            font: { size: 14 }
        }
    )

    //add set annotations
    for (let i = 0; i < data.length / 2; i++) {
        const annotation = {
            text: "set " + (i + 1),
            xref: "x" + (i + 1),
            yref: "y" + (i + 1),
            x: 20,
            y: 1,
            showarrow: false,
        }
        annotations.push({ ...annotation })
    }

    //calculate domains for each graph
    const domains = CalculateDomains(data.length / 2)

    interface Layout {
        title: string,
        annotations: typeof annotations,   //graph annotations array
        margin: { l: 75, r: 25, t: 100, b: 100 }, //margins
        font: {
            family: 'Arial, Helvetica, sans-serif',
            size: 14,
            color: '#000'
        },
        grid: { rows: number, columns: number, pattern: 'independent' }, // Define a grid for stacking
        shapes: typeof lines,
        showlegend: boolean,
        height: number,
        width: number,
        xaxis: XAxisObject,
        yaxis: object,
        [key: string]: any;
    }

    //generate layout
    const layout: Layout = {
        title: title,
        annotations: annotations,   //graph annotations array
        margin: { l: 75, r: 25, t: 100, b: 100 }, //margins
        font: {
            family: 'Arial, Helvetica, sans-serif',
            size: 14,
            color: '#000'
        },
        grid: { rows: data.length / 2, columns: 1, pattern: 'independent' }, // Define a grid for stacking
        shapes: lines,
        showlegend: false,
        height: data.length * 150,
        width: 700,
        xaxis: {
            showgrid: false,
            anchor: "",
            ticklen: 4,
            tickwidth: 1,
            range: [],
            tickvals: [],
            ticktext: []
        },
        yaxis: {
            showgrid: false,
            anchor: "",
            ticklen: 4,
            tickwidth: 1,
            range: [],
            tickvals: [],
            ticktext: []
        }
    }

    //loop over all the data objects to create layout objects

    for (let i = 1; i < data.length / 2 + 1; i++) {
        //create the object key
        let yaxis = "yaxis"
        let xaxis = "xaxis"
        const yAnchor = "y" + i
        const xAnchor = "x" + i

        const singleYAxis = {
            showgrid: false,
            domain: domains[i - 1],
            anchor: yAnchor,
            showline: true,
            zeroline: true,
            linewidth: 1,
            range: [0, maxHeight + 2],  // Fixing the range
            ticklen: 4,
            tickwidth: 1
        }



        const singleXAxis: XAxisObject = {
            showgrid: false,
            anchor: xAnchor,
            ticklen: 4,
            tickwidth: 1,
            range: [0, csvData.length + 1],
            tickvals: [],
            ticktext: []
        }

        if (i == data.length / 2) {
            singleXAxis["tickvals"] = generateTicks(csvData, false).vals
            singleXAxis["ticktext"] = generateTicks(csvData, false).text
        }
        else {
            singleXAxis["tickvals"] = generateTicks(csvData, true).vals
            singleXAxis["ticktext"] = generateTicks(csvData, true).text
        }


        if (i > 1) {
            yaxis += i
            xaxis += i
        }

        //add the single axis to the layout object
        layout[xaxis] = { ...singleXAxis }
        layout[yaxis] = { ...singleYAxis }
    }

    let ratio = 1

    function checkMobile(){
        const currentWidth = window.innerWidth
        console.log({currentWidth})
        if (currentWidth < 700){
            console.log("need mobile")
            const deviceWidth = window.innerWidth
            ratio = (deviceWidth - 32) / 700
        }
    }

    checkMobile()
    console.log(ratio)

    return (
        <Plot
            className='plot'
            data={data}
            layout={layout as Partial<Plotly.Layout>}
            style={{"scale": ratio.toString()}}
        />
    );
};


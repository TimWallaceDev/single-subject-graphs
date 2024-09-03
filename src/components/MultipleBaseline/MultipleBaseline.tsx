import Plot from 'react-plotly.js';
import { DataPoint } from '../../interface';
import { CSVToColumns } from '../../functions/CSVToColumns';
import { ColumnsToPlotObjects } from '../../functions/ColumnsToPlotObjects';
import { MaxHeightOfGraph } from '../../functions/MaxHeightOfGraph';
import { CreateLines } from '../../functions/CreateLines';
import { CalculateDomains } from '../../functions/CalculateDomains';
import { Layout } from 'plotly.js';

interface GraphProps {
    csvData: DataPoint[],
    fields: string[]
}

export const MultipleBaselineGraph = (props: GraphProps) => {
    const { csvData, fields } = props;

    console.log({ fields })

    //separate data into columns
    const columns = CSVToColumns(csvData, fields)

    //create Plot objects from columns
    const data = ColumnsToPlotObjects(columns)

    //get the max height for all graphs
    const maxHeight = MaxHeightOfGraph(columns)

    //add lines
    const lines = CreateLines(columns, maxHeight)

    function generateTicks(length: number) {
        const ticks = []
        const vals = []
        for (let i = 1; i < length + 1; i++) {
            if (i === 0) {
                ticks.push("")
            }
            else {
                ticks.push(i)
            }

            vals.push(i)

        }
        return { ticks, vals }
    }

    const firstLineX = lines[0].x0
    console.log({ lines })

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

    //add axis titles
    annotations.push(
        {
            text: "Vertical Annotation",  // The text you want to display
            xref: "paper",                // Use 'paper' to refer to the full plotting area
            yref: "paper",
            x: -0.07,                         // Position at the left side (x = 0)
            y: 0.5,                       // Centered vertically (y = 0.5)
            xanchor: 'right',             // Align text to the right (so it doesn't overlap)
            yanchor: 'middle',            // Center vertically
            showarrow: false,             // No arrow pointing to the text
            textangle: -90,          // Rotate text 90 degrees counterclockwise
            font: { size: 12 }
        }
    )


    //add set annotations
    for (let i = 0; i < 3; i++){
        const annotation = {
            text: "set " + (i + 1),
            xref: "x" + (i + 1),
            yref: "y" + (i + 1),
            x: 20,
            y: 1,
            showarrow: false,
        }
        annotations.push({...annotation})
    }

    //add title

    //calculate domains for each graph
    const domains = CalculateDomains(3)


    //generate layout

    const layout = {
        title: "Title",
        annotations: annotations,
        margin: { l: 75, r: 75, t: 100, b: 100 },
        font: {
            family: 'Times New Roman, serif',
            size: 12,
            color: '#000'
        },
        grid: { rows: data.length / 2, columns: 1, pattern: 'independent' }, // Define a grid for stacking
        yaxis: {
            title: "",
            showgrid: false,
            domain: domains[0],
            anchor: 'y1',
            showline: true,
            zeroline: true,
            linewidth: 1,
            range: [0, maxHeight + 2],  // Fixing the range
            ticklen: 4,
            tickwidth: 1
        },
        xaxis: {
            title: '',
            showgrid: false,
            tickvals: generateTicks(csvData.length).vals,
            ticktext: generateTicks(csvData.length).ticks,
            anchor: 'x1',
            ticklen: 4,
            tickwidth: 1,
            range: [0, 21]
            // linewidth: 1
        },
        yaxis2: {
            title: '',
            showgrid: false,
            domain: domains[1],
            anchor: 'y2',
            showline: true,
            range: [0, maxHeight + 2],  // Fixing the range
            ticklen: 4,
            tickwidth: 1
            // linewidth: 1
        },
        xaxis2: {
            // title: 'Sessions',
            showgrid: false,
            tickvals: generateTicks(csvData.length).vals,
            ticktext: generateTicks(csvData.length).ticks,
            anchor: 'x2',
            showline: true,
            ticklen: 4,
            tickwidth: 1,
            range: [0, 21]
            // linewidth: 1,
        },
        yaxis3: {
            title: '',
            showgrid: false,
            domain: domains[2],
            anchor: 'y3',
            showline: true,
            range: [0, maxHeight + 2],  // Fixing the range
            ticklen: 4,
            tickwidth: 1
            // linewidth: 1
        },
        xaxis3: {
            title: 'Sessions',
            showgrid: false,
            tickvals: generateTicks(csvData.length).vals,
            ticktext: generateTicks(csvData.length).ticks,
            anchor: 'x3',
            showline: true,
            ticklen: 2,
            tickwidth: 1,
            range: [0, 21]
            // linewidth: 1,
        },

        shapes: lines,
        showlegend: false,
        height: data.length * 150
    }


    return (
        <Plot
            data={data}
            layout={layout as Partial<Layout>}
        />
    );
};


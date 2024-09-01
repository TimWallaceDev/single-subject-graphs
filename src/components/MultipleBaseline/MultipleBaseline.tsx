import Plot from 'react-plotly.js';
import { DataPoint } from '../../interface';

interface GraphProps {
    csvData: DataPoint[],
    title: string,
    fields: string[]
}
//start with csv data DONE
//separate data into different columns DONE
//separate columns into baseline / intervention
//

export const MultipleBaselineGraph = (props: GraphProps) => {
    const { csvData, title, fields } = props;
    const conditionName = fields[2];

    const columns = []
    const setNames = fields.filter(field => field !== "session")

    //loop over every data point
    for (let i = 0; i < csvData.length; i++) {
        //loop over every set in the datapoint
        const point = csvData[i]
        for (let j = 0; j < setNames.length; j++) {
            const dataValue = point[setNames[j]]
            if (!columns[j]) {
                columns[j] = []
            }
            columns[j].push(dataValue)
            // console.log(dataValue)
        }
    }
    //we have an array of arrays for each set. Each set is an array of datapoints
    console.log({ columns })

    let maxHeight = 10

    const single = [
        {
            "x": [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6"
            ],
            "y": [
                "0",
                "3",
                "1",
                "2",
                "1",
                "2"
            ],
            "type": "scatter",
            "mode": "lines+markers",
            "name": "Baseline",
            "marker": {
                "color": "black"
            }
        },
        {
            "x": [
                "7",
                "8",
                "9",
                "10"
            ],
            "y": [
                "7",
                "8",
                "7",
                "8"
            ],
            "type": "scatter",
            "mode": "lines+markers",
            "name": "Intervention",
            "marker": {
                "color": "black"
            }
        }
    ]

    const double = [
        {
            "x": ["1", "2", "3"],
            "y": ["0", "3", "1"],
            "type": "scatter",
            "mode": "lines+markers",
            "name": "Baseline",
            "marker": { "color": "black" },
            "xaxis": "x1",
            "yaxis": "y1"
        },
        {
            "x": ["4", "5", "6", "7", "8", "9", "10"],
            "y": ["6", "7", "9", "7", "8", "7", "8"],
            "type": "scatter",
            "mode": "lines+markers",
            "name": "Intervention",
            "marker": { "color": "black" },
            "xaxis": "x1",
            "yaxis": "y1"
        },
        {
            "x": ["1", "2", "3", "4", "5", "6"],
            "y": ["2", "4", "2", "3", "2", "3"],
            "type": "scatter",
            "mode": "lines+markers",
            "name": "Comparison",
            "marker": { "color": "black" },
            "xaxis": "x2",
            "yaxis": "y2"
        },
        {
            "x": ["7", "8", "9", "10"],
            "y": ["6", "7", "6", "7"],
            "type": "scatter",
            "mode": "lines+markers",
            "name": "Post-Intervention",
            "marker": { "color": "black" },
            "xaxis": "x2",
            "yaxis": "y2",
        },
        {
            "x": ["1", "2", "3", "4", "5", "6", "7", "8"],
            "y": ["2", "4", "2", "3", "2", "3", "3", "2"],
            "type": "scatter",
            "mode": "lines+markers",
            "name": "Comparison",
            "marker": { "color": "black" },
            "xaxis": "x3",
            "yaxis": "y3"
        },
        {
            "x": ["9", "10"],
            "y": ["6", "7"],
            "type": "scatter",
            "mode": "lines+markers",
            "name": "Post-Intervention",
            "marker": { "color": "black" },
            "xaxis": "x3",
            "yaxis": "y3",
        },
    ]

    // const lines = [];

    //go over each object in single
    //find the last x value
    //get the max height
    // for (let i = 0; i <= double.length - 2; i++) {
    //     const lastIndex = double[i].x.length
    //     const lastX = double[i].x[lastIndex]
    //     lines.push({
    //         type: 'line',
    //         x0: lastIndex + 0.5,
    //         y0: 0,
    //         x1: lastIndex + 0.5,
    //         y1: maxHeight, // Use the calculated max height
    //         line: {
    //             color: 'black',
    //             width: 2,
    //             dash: 'dot', // Line style
    //         },
    //     });
    // }


    // console.log({ lines });

    function generateTicks(length: number) {
        const ticks = []
        const vals = []
        for (let i = 0; i < length + 1; i++) {
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

    //calculate domains for each graph


    return (
        <Plot
            data={double}
            layout={{
                title: title,
                font: {
                    family: 'Times New Roman, serif',
                    size: 12,
                    color: '#000'
                },
                grid: { rows: double.length / 2, columns: 1, pattern: 'independent' }, // Define a 2-row grid for stacking
                yaxis: {
                    // title: conditionName,
                    showgrid: false,
                    domain: [0.66, 1],
                    anchor: 'y1',
                    showline: true,
                    zeroline: true,
                    linewidth: 1,
                    range: [0, maxHeight],  // Fixing the range
                    ticklen: 4,
                    tickwidth: 1
                },  // First subplot y-axis
                xaxis: {
                    // title: 'Sessions',
                    showgrid: false,
                    tickvals: generateTicks(csvData.length).vals,
                    ticktext: generateTicks(csvData.length).ticks,
                    anchor: 'x1',
                    ticklen: 4,
                    tickwidth: 1
                    // linewidth: 1
                },
                yaxis2: {
                    // title: 'Comparison',
                    showgrid: false,
                    domain: [0.33, 0.60],
                    anchor: 'y2',
                    showline: true,
                    range: [0, maxHeight],  // Fixing the range
                    ticklen: 4,
                    tickwidth: 1
                    // linewidth: 1
                }, // Second subplot y-axis
                xaxis2: {
                    // title: 'Sessions',
                    showgrid: false,
                    tickvals: generateTicks(csvData.length).vals,
                    ticktext: generateTicks(csvData.length).ticks,
                    anchor: 'x2',
                    showline: true,
                    ticklen: 4,
                    tickwidth: 1
                    // linewidth: 1,
                },
                yaxis3: {
                    // title: 'Comparison',
                    showgrid: false,
                    domain: [0, 0.3],
                    anchor: 'y2',
                    showline: true,
                    range: [0, maxHeight],  // Fixing the range
                    ticklen: 4,
                    tickwidth: 1
                    // linewidth: 1
                }, // Second subplot y-axis
                xaxis3: {
                    // title: 'Sessions',
                    showgrid: false,
                    tickvals: generateTicks(csvData.length).vals,
                    ticktext: generateTicks(csvData.length).ticks,
                    anchor: 'x2',
                    showline: true,
                    ticklen: 2,
                    tickwidth: 1
                    // linewidth: 1,
                },
                
                // shapes: lines,
                showlegend: false,
                height: double.length * 150
            }}
        />
    );
};


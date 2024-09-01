import Plot from 'react-plotly.js';
import { DataPoint } from '../../interface';

interface GraphProps {
    csvData: DataPoint[],
    title: string,
    fields: string[]
}
interface LineSegment {
    "x": string[],
    "y": string[],
    "type": "scatter",
    "mode": "lines+markers",
    "name": "Baseline",
    "marker": { "color": "black" },
    "xaxis": string,
    "yaxis": string
}
//start with csv data DONE
//separate data into different columns DONE
//separate columns into baseline / intervention
//

export const MultipleBaselineGraph = (props: GraphProps) => {
    const { csvData, title, fields } = props;

    const columns: string[][] = []
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
        }
    }
    //we have an array of arrays for each set. Each set is an array of datapoints

    //turn columns into objects. 
    const data = []

    //go over each column
    for (let i = 0; i < columns.length; i++) {
        const column = columns[i]
        const lastDataPoint = column[0]
        let condition = lastDataPoint.split("-")[0]
        const tmpData: LineSegment = {
            "x": [],
            "y": [],
            "type": "scatter",
            "mode": "lines+markers",
            "name": "Baseline",
            "marker": { "color": "black" },
            "xaxis": "x1",
            "yaxis": "y1",
        }
        //go over each datapoint in the column
        for (let j = 0; j < column.length; j++) {
            //set the count of the x and y axis
            tmpData["xaxis"] = "x" + (i + 1).toString()
            tmpData["yaxis"] = "y" + (i + 1).toString()
            //get the condition for this 'half' of datapoints
            const currentDataPoint = column[j]
            const currentCondition = currentDataPoint.split("-")[0]
            const currentValue = currentDataPoint.split("-")[1]
            //check for new condition. if we find one, we will push the current object to data, and reset the tmpData
            if (condition !== currentCondition) {
                //push the first half of the column data
                data.push({ ...tmpData })
                //reset the tmpData
                tmpData["x"] = []
                tmpData["y"] = []
                //set the new condition
                condition = currentCondition
            }

            //add the data to tmpData
            tmpData["x"].push((j + 1).toString())
            tmpData["y"].push(currentValue)
        }
        //push the second half of the column data
        data.push({ ...tmpData })
    }



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

    //get the max height for all graphs
    let maxHeight = 0
    for (const column of columns) {
        for (const dataPoint of column) {
            const height = parseInt(dataPoint.split("-")[1])
            if (height > maxHeight) {
                maxHeight = height
            }

        }
    }

    //go over each column
    //go over each datapoint in the column
    //find the point where the condition changes. 
    const lines = []
    let lastXPos = 0
    for (let i = 0; i < columns.length; i++) {
        const column = columns[i]
        const lastDataPoint = column[0]
        const condition = lastDataPoint.split("-")[0]
        let lineXPos = 0
        for (let j = 0; j < column.length; j++) {
            const currentDataPoint = column[j]
            const currentCondition = currentDataPoint.split("-")[0]
            //check for new condition. This will be where a line is added. 
            if (condition !== currentCondition) {
                lineXPos = j
                break;
            }
        }
        //create a new line object
        //the max height will be the height of the line
        //the lineXPos will be the x position of the line. 
        const xref = "x" + (i + 1).toString()
        const yref = "y" + (i + 1).toString()
        console.log(xref, yref)
        const newLine = {
            type: 'line',
            x0: lineXPos + 0.5,
            y0: 0,
            x1: lineXPos + 0.5,
            y1: maxHeight + 20, // Use the calculated max height
            line: {
                color: 'black',
                width: 2,
                dash: 'dot', // Line style
            },
            xref: xref,
            yref: yref
        }
        const newHorizontalLine = {
            type: 'line',
            x0: lastXPos + 0.5,
            y0: maxHeight + 2,
            x1: lineXPos + 0.5,
            y1: maxHeight + 2, // Use the calculated max height
            line: {
                color: 'black',
                width: 2,
                dash: 'dot', // Line style
            },
            xref: xref,
            yref: yref
        }
        lines.push({ ...newLine });
        if (i > 0) {
            lines.push({ ...newHorizontalLine })
        }
        console.log({ newLine })
        lastXPos = lineXPos
    }

    console.log({ lines })

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
    //add baseline / treatment annotations

    //add axis titles

    //add set annotations

    //calculate domains for each graph

    //add lines


    return (
        <Plot
            data={data}
            layout={{
                title: title,
                font: {
                    family: 'Times New Roman, serif',
                    size: 12,
                    color: '#000'
                },
                grid: { rows: data.length / 2, columns: 1, pattern: 'independent' }, // Define a 2-row grid for stacking
                yaxis: {
                    // title: conditionName,
                    showgrid: false,
                    domain: [0.75, 1],
                    anchor: 'y1',
                    showline: true,
                    zeroline: true,
                    linewidth: 1,
                    range: [0, maxHeight + 2],  // Fixing the range
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
                    tickwidth: 1,
                    range: [0, 21]
                    // linewidth: 1
                },
                yaxis2: {
                    // title: 'Comparison',
                    showgrid: false,
                    domain: [0.45, 0.70],
                    anchor: 'y2',
                    showline: true,
                    range: [0, maxHeight + 2],  // Fixing the range
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
                    tickwidth: 1,
                    range: [0, 21]
                    // linewidth: 1,
                },
                yaxis3: {
                    // title: 'Comparison',
                    showgrid: false,
                    domain: [0.15, 0.4],
                    anchor: 'y3',
                    showline: true,
                    range: [0, maxHeight + 2],  // Fixing the range
                    ticklen: 4,
                    tickwidth: 1
                    // linewidth: 1
                }, // Second subplot y-axis
                xaxis3: {
                    // title: 'Sessions',
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
            }}
        />
    );
};


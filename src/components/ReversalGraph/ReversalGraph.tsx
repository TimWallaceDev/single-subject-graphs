import Plot from 'react-plotly.js';
import { DataPoint } from '../../interface';
import "./ReversalGraph.scss"
import { Annotations, Data, Shape } from 'plotly.js';

interface GraphProps {
    csvData: DataPoint[],
    fields: string[]
}

export const ReversalGraph = (props: GraphProps) => {
    const { csvData, fields } = props;
    const conditionName = fields[2];
    // console.log({csvData})
    const separatedData = [];
    const conditions = [csvData[0].condition];
    let tmpCondition: string = csvData[0].condition;
    let tmpData: DataPoint[] = [];
    let maxHeight: number = 0;

    // Process data
    for (let i = 0; i < csvData.length; i++) {
        const tmpDataPoint = csvData[i];
        tmpDataPoint.order = i + 1;
        if (typeof tmpDataPoint[conditionName] === 'number' && tmpDataPoint[conditionName] > maxHeight) {
            maxHeight = tmpDataPoint[conditionName];
        }
        // console.log(tmpDataPoint.condition)
        if (tmpDataPoint.condition !== tmpCondition) {
            separatedData.push(tmpData);
            tmpData = [tmpDataPoint];
            tmpCondition = tmpDataPoint.condition;
            conditions.push(tmpDataPoint.condition);
        } else {
            tmpData.push(tmpDataPoint);
        }
    }

    separatedData.push(tmpData);

    const objects = [];
    const lines = [];
    const annotations = []
    let totalItem = 1;

    for (let i = 0; i < separatedData.length; i++) {
        const tmpArray = separatedData[i];
        const tmpTime = tmpArray.map(item => item.order == 0 ? "" : item.order.toString());
        const tmpValue = tmpArray.map(item => item[conditionName].toString());

        objects.push({
            x: tmpTime,
            y: tmpValue,
            type: 'scatter',
            mode: 'lines+markers',
            name: separatedData[i][0].condition,
            marker: { color: "black" },
        });

        if (objects.length > 1) {
            lines.push({
                type: 'line',
                x0: totalItem - 0.5,
                y0: 0,
                x1: totalItem - 0.5,
                y1: maxHeight, // Use the calculated max height
                line: {
                    color: 'black',
                    width: 2,
                    dash: 'dot', // Line style
                },
            });
        }

        const centerX = (totalItem + totalItem + tmpArray.length - 1) / 2;

        annotations.push({
            x: centerX,
            y: maxHeight + 1,
            xref: 'x',
            yref: 'y',
            text: separatedData[i][0].condition,  // The title text
            showarrow: false,
            font: {
                size: 12,
                color: 'black'
            },
            xanchor: 'center',
            yanchor: 'bottom',
            align: 'center'
        });

        totalItem += tmpArray.length;
    }


    function generateTicks(csvData: DataPoint[]) {
        const sessionLabel = fields[0]
        const ticks = []
        const vals = []
        for (let i = 0; i < csvData.length; i++) {

            //create label
            const currentObject = csvData[i]
            console.log({ currentObject })
            const tick = currentObject[sessionLabel].toString()
            console.log(tick)
            ticks.push(tick)

            //create value
            vals.push(i + 1)

        }
        return { ticks, vals }
    }

    console.log({ objects })

    console.log()

    return (
        <Plot
            data={objects as Data[]}
            layout={{
                title: "title",
                font: {
                    family: 'Times new Roman, serif', // Font family for the title
                    size: 12, // Font size for the title
                    color: '#000' // Font color for the title
                },
                yaxis: {
                    title: conditionName,
                    showgrid: false,
                    range: [0, maxHeight + 1],
                    ticklen: 4,
                    tickwidth: 1
                },
                xaxis: {
                    title: 'Sessions',
                    showgrid: false,
                    tickvals: generateTicks(csvData).vals, // Custom tick values
                    ticktext: generateTicks(csvData).ticks, // Custom tick text
                    range: [0, csvData.length + 1],
                    ticklen: 4,
                    tickwidth: 1
                },
                shapes: lines as Shape[], // Add lines to the layout
                showlegend: false, // Optionally show legend
                annotations: annotations as Annotations[],
                margin: {
                    l: 75,  // Left margin
                    r: 75,  // Right margin
                    t: 100,  // Top margin
                    b: 100   // Bottom margin
                }
            }
            }
        />
    );
};

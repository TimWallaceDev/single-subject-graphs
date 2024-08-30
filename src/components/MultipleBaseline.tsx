import Plot from 'react-plotly.js';
import { DataPoint } from '../interface';

interface GraphProps {
    csvData: DataPoint[],
    title: string,
    fields: string[]
}

export const MultipleBaselineGraph = (props: GraphProps) => {
    const { csvData, title, fields } = props;
    const conditionName = fields[2];

    console.log({ csvData });

    const separatedData = [];
    const conditions = [csvData[0].condition];
    let tmpCondition: string = csvData[0].condition;
    let tmpData: DataPoint[] = [];
    let maxHeight: number = 0;

    // Process data
    for (let i = 0; i < csvData.length; i++) {
        const tmpDataPoint = csvData[i];
        tmpDataPoint.order = i + 1;
        if (tmpDataPoint[conditionName] > maxHeight) {
            maxHeight = tmpDataPoint[conditionName];
        }
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
        const tmpTime = tmpArray.map(item => item.order == 0 ? "" : item.order);
        const tmpValue = tmpArray.map(item => item[conditionName]);

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
            y: maxHeight,
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

    console.log({ lines });

    function generateTicks(length: number){
        const ticks = []
        const vals = []
        for (let i = 0; i < length + 1; i++){
            if (i === 0){
                ticks.push("")
            }
            else {
                ticks.push(i)
            }

            vals.push(i)

        }
        return {ticks, vals}
    }

    return (
        <Plot
            data={objects}
            layout={{
                title: title,
                font: {
                    family: 'Times new Roman, serif', // Font family for the title
                    size: 12, // Font size for the title
                    color: '#000' // Font color for the title
                },
                yaxis: { title: conditionName, showgrid: false },
                xaxis: {
                    title: 'Sessions',
                    showgrid: false,
                    tickvals: generateTicks(csvData.length).vals, // Custom tick values
                    ticktext: generateTicks(csvData.length).ticks // Custom tick text
                },
                shapes: lines, // Add lines to the layout
                showlegend: false, // Optionally show legend
                annotations: annotations
            }
            }
        />
    );
};

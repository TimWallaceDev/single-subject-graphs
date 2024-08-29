import Plot from 'react-plotly.js';
import { DataPoint } from '../interface';

interface GraphProps {
    csvData: DataPoint[];
}

export const ReversalGraph = ({ csvData }: GraphProps) => {
    if (csvData.length === 0) {
        return <div>No data available</div>;
    }

    //get data as CSV (interface csvData)

    const dataArray = [];
    const conditions: string[] = [csvData[0].condition];
    let tmpCondition = null
    let tmpData: DataPoint[] = [];
    let maxHeight = 0;
    const symbols: string[] = ['circle', 'square', 'triangle-up', 'diamond', 'cross', 'x']
    let symbolIndex = 0
    const conditionsMap = {}

    // Separate data based on condition
    //we will have an array of arrays
    csvData.forEach((tmpDataPoint, i) => {
        tmpDataPoint.order = i;
        maxHeight = Math.max(maxHeight, tmpDataPoint.value);

        //we have found a new condition
        if (tmpDataPoint.condition !== tmpCondition) {
            if (dataArray.length > 0){
                dataArray.push(tmpData);
            }
            tmpData = [tmpDataPoint];
            tmpCondition = tmpDataPoint.condition;
            conditions.push(tmpDataPoint.condition);
            //add symbol for new condition
            if (!conditionsMap[tmpCondition]) {
                conditionsMap[tmpCondition] = symbols[symbolIndex]
                symbolIndex++
            }

        } else {
            tmpData.push(tmpDataPoint);
        }
    });
    dataArray.push(tmpData);

    console.log({dataArray})


    const traceObjects = [];
    const separatorLines = [];
    let totalItems = 0;

    dataArray[0].forEach((tmpArray) => {
        const tmpTime = tmpArray.map(item => item.order);
        const tmpValue = tmpArray.map(item => item.value);

        console.log({ tmpArray })

        traceObjects.push({
            x: tmpTime,
            y: tmpValue,
            type: 'scatter',
            mode: 'lines+markers',
            name: tmpArray[0].condition,
            marker: {
                color: "black",
                symbol: conditionsMap[tmpArray[0].condition]
            },
        });

        if (traceObjects.length > 1) {
            separatorLines.push({
                type: 'line',
                x0: totalItems - 0.5,
                y0: 0,
                x1: totalItems - 0.5,
                y1: maxHeight,
                line: {
                    color: 'black',
                    width: 1,
                },
            });
        }

        totalItems += tmpArray.length;
    });

    console.log(traceObjects)

    return (
        <Plot
            data={traceObjects}
            layout={{
                title: 'Reversal Graph',
                yaxis: { title: 'Value' },
                xaxis: { title: 'Session' },
                shapes: separatorLines,
            }}
        />
    );
};

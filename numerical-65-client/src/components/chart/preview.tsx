import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
    ScaleChartOptions
} from 'chart.js';

import { Line } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options: ChartOptions<'line'> = {
    responsive: true,
    interaction: {
        intersect: false,
        mode: 'index',
    },

    plugins: {

        legend: {
            position: 'right' as const,
        },
        title: {
            display: true,
            text: 'Function preview',
        },
    },

};
interface approxValues {
    iteration: number,
    value: number
}
interface propsInterface {
    data: approxValues[],
    approxValue: number
}
const PreviewChart = (props: propsInterface) => {
    const [legend, setLegend] = useState<number[]>([])
    const [values, setValues] = useState<number[]>([])
    console.log(props.data);


    useEffect(() => {
        if (props.data.length > 0) {
            let tempIter: number[] = []
            let tempValues: number[] = []
            let markI = -100
            for (let i = 0; i < props.data.length; i++) {
                if (props.data[i].iteration < props.approxValue && props.data[i].iteration + 1 > props.approxValue) {
                    console.log(i);
                    markI = i + 1
                    tempIter.push(props.approxValue)
                    tempValues.push(0)
                    continue
                }
                if (markI != i) {
                    tempIter.push(props.data[i].iteration)
                    tempValues.push(props.data[i].value)
                }

            }

            setLegend(tempIter)
            setValues(tempValues)
        }
    }, [])

    return (
        <div>
            {
                legend && <Line
                    style={{ width: '50vw', height: '50vh' }}
                    data={{
                        labels: legend,
                        datasets: [
                            {
                                label: `approximate value`,
                                data: values.map((value, index) => {

                                    return value == 0 ? props.approxValue : null
                                }), borderWidth: 5,

                                borderColor: `rgb(255, 0, 38)`,
                                backgroundColor: `rgb(255, 0, 38)`
                            },
                            {
                                label: `value`,
                                data: values,
                                borderColor: `rgb(4, 0, 255)`,
                                backgroundColor: `rgba(4, 0, 255, 0.5)`,
                                pointRadius: 0,
                            },
                        ]
                    }}
                    options={options}
                />
            }

        </div>
    )
}

export default PreviewChart


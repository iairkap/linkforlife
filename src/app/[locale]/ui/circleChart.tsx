import React from 'react';
import '../sass/components/pieChart.scss';
import { PieChart } from '@mui/x-charts/PieChart';

interface PieChartProps {
    totalNumber: number;
    confirmedNumber: number;
}

const MyPieChart: React.FC<PieChartProps> = ({ totalNumber, confirmedNumber }) => {
    const data = [
        { value: confirmedNumber, label: 'Confirmed', fill: '#F1E8E5' },
        { value: totalNumber - confirmedNumber, label: 'Not Confirmed', fill: '#FFC7BF' },
    ];

    const size = {
        width: 400,
        height: 200,
    };

    return (
        <div className='pie-chartFa'>
            <div className='pie-container'>
                <PieChart
                    hideLegend={true}
                    colors={['#F1E8E5', '#FFC7BF']}
                    series={[
                        {
                            data,
                            innerRadius: 30,
                            paddingAngle: -20,
                            outerRadius: 80,
                            startAngle: -90,
                            endAngle: 90,
                        },
                    ]}
                    {...size}
                />
            </div>
            <div className='number-position' style={{
                position: 'absolute',
                bottom: '0%', /* Position relative to the parent container */
                left: '50%',
                transform: 'translate(-50%, 50%)', /* Center within the container */
            }}>
                <h4>{totalNumber}</h4>
            </div>
        </div >
    );
};

export default MyPieChart;
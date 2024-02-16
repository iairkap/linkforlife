import React from 'react';
import "../sass/components/dashboardPieChart.scss"

interface LegendProps {
    colors: string[];
    labels: string[];
    data: number[];
}

function Legend({ colors, labels, data }: LegendProps) {
    const total = data.reduce((a, b) => a + b, 0);

    console.log(labels)

    const hebrewLabels = labels.map((label) => {
        if (label === 'Is Attending') {
            return 'השתתפות';
        }
        if (label === 'Not Attending') {
            return 'לא משתתף';
        }
        if (label === 'Not Confirmed') {
            return 'לא מאושר';
        }
        return label;
    }
    )

    return (
        <div>
            <div>Total: {total}</div>
            {colors.map((color, i) => (
                <div key={i} className='containerbisbas'>

                    <div className='refernce-container'>
                        <div className='flex-row'>
                            <div style={{ width: '1.875rem', height: '0.25rem', backgroundColor: color, borderRadius: "6.25rem" }}></div>
                            <h4 className='label-span'>
                                {hebrewLabels[i]}
                            </h4>
                        </div>
                        <h4 className='number-span'>
                            {data[i]}
                        </h4>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Legend;
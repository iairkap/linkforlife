import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface DonutChartProps {
    invitedTotal?: number;
    isAttendingTotal?: number;
    notAttendingTotal?: number;
    notConfirmedTotal?: number;
    data: number[];
    colors: string[];
}

function DonutChart({ colors, data }: DonutChartProps) {


    const ref = useRef<SVGSVGElement>(null);
    /*     const [data, setData, ] = useState([0, 0, 0]);
     */


    useEffect(() => {
        d3.select(ref.current).selectAll("*").remove();

        const totalRadius = 125; // Esto establece el radio total del gráfico de rosquilla
        const arcWidth = 30; // Esto establece el grosor de los arcos
        const arc = d3.arc().innerRadius(totalRadius - arcWidth).outerRadius(totalRadius).cornerRadius(10); // Esto ajusta el grosor de los arcos
        const pie = d3.pie().padAngle(0.05); // Esto agrega un espacio entre los segmentos

        const svg = d3.select(ref.current)
            .attr('width', totalRadius * 2)
            .attr('height', totalRadius * 2)
            .append('g')
            .attr('transform', `translate(${totalRadius}, ${totalRadius})`);
        svg.selectAll('path')
            .data(pie(data))
            .enter()
            .append('path')
            .attr('d', arc as any)
            .attr('fill', (d, i) => colors[i]);

        const total = data.reduce((a, b) => a + b, 0); // Esto calcula el total de los datos
        svg.append('text') // Esto agrega el total al centro del gráfico de rosquilla
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle') // Alinea el texto verticalmente en el centro
            .style('font-size', '48px')
            .style('fill', '#4E5159')
            .style('font-family', 'Roboto') // Cambia 'Arial' por la tipografía que desees
            .text(total);

        svg.append('text') // Esto agrega la palabra "Total" debajo del total
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle') // Alinea el texto verticalmente en el centro
            .attr('dy', '2em') // Aumenta este valor para agregar más espacio entre los textos
            .style('font-size', '16px')
            .style('fill', '#4E5159')
            .style('font-family', 'Roboto') // Cambia 'Arial' por la tipografía que desees
            .text('Total');
    }, [data]);

    return (
        <svg ref={ref}></svg>
    );
}

export default DonutChart;
$(document).ready(function() {
	$.getJSON(
		'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json',
		function(data) {
			const dataset = data.data;

			const w = 1000;
			const h = 500;
			const padding = 20;
			var tempColor;

			var maxX = d3.max(dataset, d => d[1]);
			var minDate = new Date(dataset[0][0]);
			var maxDate = new Date(dataset[dataset.length - 1][0]);

			var xScale = d3
				.scaleTime()
				.domain([minDate, maxDate])
				.range([0, w]);

			var yScale = d3
				.scaleLinear()
				.domain([0, maxX])
				.range([h, 0]);

			const xAxis = d3.axisBottom(xScale);
			const yAxis = d3.axisLeft(yScale);

			var svg = d3
				.select('body')
				.append('svg')
				.attr('width', w)
				.attr('height', h)
				.style('padding', '20px 80px');

			var tooltip = d3
				.select('body')
				.append('div')
				.attr('id', 'tooltip')
				.style('opacity', 0);

			svg
				.selectAll('rect')
				.data(dataset)
				.enter()
				.append('rect')
				.attr('class', 'bar')
				.attr('x', d => xScale(new Date(d[0])))
				.attr('y', d => yScale(d[1]))
				.attr('width', 2)
				.attr('height', d => h - yScale(d[1]))
				.attr('fill', 'navy')
				.on('mouseover', d => {
					tooltip
						.transition()
						.style('opacity', 1)
						.style('visibility', 'visible');
					tooltip
						.html('GDP: $' + d[1] + ' ' + '<br>' + 'Date: ' + d[0])
						.style('left', d3.event.pageX + 30 + 'px')
						.style('top', event.pageY + -30 + 'px');
				});

			svg.on('mouseout', d => {
				tooltip.transition().style('visibility', 'hidden');
			});

			svg
				.append('g')
				.attr('transform', 'translate(0,500)')
				.attr('id', 'x-axis')
				.call(xAxis);

			svg
				.append('g')
				.attr('transform', 'translate(0)')
				.attr('id', 'y-axis')
				.call(yAxis);
		}
	);
});

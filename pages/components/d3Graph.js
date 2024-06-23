"use client";

import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const D3Graph = ({ graph }) => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current)
            .attr("width", 960)
            .attr("height", 600)
            .style("border", "1px solid black");

        const width = +svg.attr("width");
        const height = +svg.attr("height");

        svg.selectAll("*").remove(); // Clear previous graph

        const link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(graph.links, d => `${d.source}-${d.target}`) // Use unique key to bind data
            .enter().append("line")
            .attr("stroke", "#000")  // Ensure the stroke is visible
            .attr("stroke-opacity", 0.6)
            .attr("stroke-width", 1.5)
            .on("mouseover", displayDescription)
            .on("mouseout", hideDescription);

        const node = svg.append("g")
            .attr("class", "nodes")
            .attr("color", "#fff")
            .selectAll("circle")
            .data(graph.nodes, d => d.entity) // Use unique key to bind data
            .enter().append("circle")
            .attr("r", 10)
            .attr("fill", "#000")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended))
            .on("mouseover", displayDescription)
            .on("mouseout", hideDescription);

        const label = svg.append("g")
            .attr("class", "labels")
            .selectAll("text")
            .data(graph.nodes, d => d.entity) // Use unique key to bind data
            .enter().append("text")
            .attr("class", "label")
            .attr("dx", 12)
            .attr("dy", ".35em")
            .text(d => d.entity);

        const simulation = d3.forceSimulation(graph.nodes)
            .force("link", d3.forceLink(graph.links).id(d => d.entity).distance(200))
            .force("charge", d3.forceManyBody().strength(-200))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .force("collision", d3.forceCollide().radius(50))
            .velocityDecay(0.6)
            .alphaDecay(0.03)
            .on("tick", ticked);

        function ticked() {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x = Math.max(20, Math.min(width - 20, d.x)))
                .attr("cy", d => d.y = Math.max(20, Math.min(height - 20, d.y)));

            label
                .attr("x", d => d.x + 15)
                .attr("y", d => d.y);
        }

        function dragstarted(event, d) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        function displayDescription(event, d) {
            const descriptionBox = document.getElementById("description-box");
            descriptionBox.style.display = "block";
            descriptionBox.style.color = "black";
            descriptionBox.style.left = (event.pageX + 15) + "px";
            descriptionBox.style.top = (event.pageY + 15) + "px";
            descriptionBox.innerHTML = `<strong>${ d?.entity ? d.entity : ""} 
                                        </strong><br>${d?.description}`;
        }

        function hideDescription() {
            const descriptionBox = document.getElementById("description-box");
            descriptionBox.style.display = "none";
        }

    }, [graph]);

    return (
        <>
            <svg ref={svgRef}></svg>
            <div className="description-box" id="description-box"></div>
            <style jsx>{`
                .description-box {
                    position: absolute;
                    background-color: white;
                    border: 1px solid #ccc;
                    padding: 10px;
                    display: none;
                    pointer-events: none;
                    max-width: 300px;
                }
            `}</style>
        </>
    );
};

const areEqual = (prevProps, nextProps) => {
    return prevProps.graph.nodes === nextProps.graph.nodes && prevProps.graph.links === nextProps.graph.links;
};

export default React.memo(D3Graph, areEqual);

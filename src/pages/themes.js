import React from "react";
import { Graph } from "react-d3-graph";

export default function themes(){

    const graphOptions = {
        nodeHighlightBehavior: true,
        node: {
            color: "lightgreen",
            size: 1200,
            highlightStrokeColor: "blue",
        },
        link: {
            highlightColor: "lightblue",
        }
    }

    const data = {
        nodes: [
            {id: 'Alice'},
            {id: 'Bob'},
            {id: 'Kitchen'},
            {id: 'Park'}
        ],
        links: [
            {source: 'Alice', target: 'Kitchen', text:'eat breakfast'},
            {source: 'Bob', target: 'Kitchen', text:'in'},
        ]
    }

    const onClickNode = function(nodeId) {
        window.alert(`Clicked node ${nodeId}`);
    };

    const onClickLink = function(source, target) {
        window.alert(`Clicked link between ${source} and ${target}`);
    };

    return (
        <div style={{width: '100%', height: '100%'}}>
            <Graph
                style={{width: '100%', height: '100%', display: 'block !important'}}
                id="graph-id"
                config={graphOptions}
                data={data}
                onClickNode={onClickNode}
                onClickLink={onClickLink}/>
        </div>
    )
}


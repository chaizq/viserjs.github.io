<template>
  <div>
    <v-graph type="tree" :data="data" :width="graph.width" :height="graph.width"
      :layout="graph.layout" :modes="graph.modes"
      :defaultNode="graph.defaultNode" 
    >
      <v-node :formatter="node.formatter"></v-node>
      <v-edge :formatter="edge.formatter"></v-edge>
    </v-graph>
  </div>
</template>

<script>

const data = {
  id: "Modeling Methods",
  children: [
    {
      id: "Classification",
      children: [
        { id: "Logistic regression" },
        { id: "Linear discriminant analysis" },
        { id: "Rules" },
        { id: "Decision trees" },
        { id: "Naive Bayes" },
        { id: "K nearest neighbor" },
        { id: "Probabilistic neural network" },
        { id: "Support vector machine" }
      ]
    },
    {
      id: "Consensus",
      children: [
        {
          id: "Models diversity",
          children: [
            { id: "Different initializations" },
            { id: "Different parameter choices" },
            { id: "Different architectures" },
            { id: "Different modeling methods" },
            { id: "Different training sets" },
            { id: "Different feature sets" }
          ]
        },
        {
          id: "Methods",
          children: [
            { id: "Classifier selection" },
            { id: "Classifier fusion" }
          ]
        },
        {
          id: "Common",
          children: [
            { id: "Bagging" },
            { id: "Boosting" },
            { id: "AdaBoost" }
          ]
        }
      ]
    },
    {
      id: "Regression",
      children: [
        { id: "Multiple linear regression" },
        { id: "Partial least squares" },
        { id: "Multi-layer feedforward neural network" },
        { id: "General regression neural network" },
        { id: "Support vector regression" }
      ]
    }
  ]
};

const graph = {
  data,
  container: 'mount',
  type: 'tree',
  width: 500,
  height: 500,
  pixelRatio: 2,
  renderer: 'svg',
  fitView: true,
  modes: {
    default: ['collapse-expand', 'drag-canvas']
  },
  defaultNode: {
    size: 26,
    anchorPoints: [[ 0, 0.5 ], [ 1, 0.5 ]],
    style: {
      fill: '#C6E5FF',
      stroke: '#5B8FF9'
    },
  },
  layout: {
    type: 'dendrogram',
    direction: 'LR',
    nodeSep: 30,
    rankSep: 100
  }
};
const node = {
  formatter: node => {
    return {
      size: 26,
      style: {
        fill: '#C6E5FF',
        stroke: '#5B8FF9'
      },
      label: node.id,
      labelCfg: {
        position: node.children && node.children.length > 0 ? 'left' : 'right',
        offset: 5
      }
    }
  }
}
const edge = {
  formatter: () => {
    return {
      shape: 'cubic-horizontal',
      color: '#A3B1BF',
    }
  },
}

export default {
  data() {
    return {
      data,
      graph,
      node,
      edge
    };
  },
  methods: {

  }
};
</script>

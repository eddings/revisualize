import { csvParse } from 'd3';

import { DatasetPreset } from '../../DataConfiguration/Toolbar/DatasetPreset';
import DatasetNode from './Datasets/DatasetNode';
import URLDatasetNode from './Datasets/URLDatasetNode';
import GraphNode from './GraphNode';
import TransformNode from './Transforms/TranformNode';

export default class DataImporter {
  public onNewDataset: (d?: DatasetNode) => void;

  constructor() {
    this.onNewDataset = null;
  }

  // adapted from https://stackoverflow.com/a/26298948
  public readFileFromDisk(e: any) {

    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (onloadEvent: any) => {
      const contents = onloadEvent.target;
      this.convertCSVToDatasetNode(contents.result);
    }

    reader.readAsText(file);
  }

  private convertCSVToDatasetNode(contents: any) {
    const csvContent = csvParse(contents);
    const datasetNode = new URLDatasetNode();

    datasetNode.fields = csvContent.columns;
    datasetNode.name = 'new Dataset';
    datasetNode.values = csvContent;

    if (this.onNewDataset !== null) {
      this.onNewDataset(datasetNode);
    }
  }

  private fetchCSV(preset: DatasetPreset, node: URLDatasetNode = new URLDatasetNode()) {
    const reader = new FileReader();

    reader.onloadend = (e: any) => {
      const dataArray = csvParse(e.srcElement.result);
      node.fields = Object.keys(dataArray[0]);
      node.values = dataArray;

      if (this.onNewDataset !== null) {
        this.onNewDataset(node);
      }
    };

    fetch(preset.url)
      .then(res => res.blob())
      .then(blob => reader.readAsText(blob));
  }

  private fetchJSON(preset: DatasetPreset, node: URLDatasetNode = new URLDatasetNode()) {
    fetch(preset.url)
      .then(response => response.json())
      .then(dataArray => {
        node.fields = Object.keys(dataArray[0]);
        node.values = dataArray;

        node.name = preset.name;
        node.url = preset.url;
        node.format = preset.format;

        if (this.onNewDataset !== null) {
          this.onNewDataset(node);
        }
      });
  }

  public importPreset(preset: DatasetPreset, node?: URLDatasetNode) {
    if (preset.url.includes('.json')) {
      this.fetchJSON(preset, node);
    } else if (preset.url.includes('.csv')) {
      this.fetchCSV(preset, node);
    }
  }

  public loadFieldsAndValuesToNode(node: GraphNode) {
    if (node instanceof URLDatasetNode) {
      this.importPreset(node.getSchema() as DatasetPreset, node);
    } else if (node instanceof TransformNode) {
      const rootDatasetNode = node.getRootDatasetNode();
      if (rootDatasetNode !== null) {
        this.loadFieldsAndValuesToNode(rootDatasetNode);
      }
    }
  }
}
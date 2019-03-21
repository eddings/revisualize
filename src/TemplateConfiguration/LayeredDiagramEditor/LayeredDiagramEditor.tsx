import * as $ from 'jquery';
import 'jquery-ui/ui/widgets/draggable';
import 'jquery-ui/ui/widgets/sortable';
import * as React from 'react';

import TemplateBlock from '../TemplateBlock/TemplateBlock';
import Template from '../../TemplateConfiguration/TemplateModel/Template';
import AddTemplateButton from './AddTemplateButton';
import AddTemplateButtonObserver from './AddTemplateButtonObserver';

import './LayeredDiagramEditor.css';

interface Props {
  id: string,
  dragPlumbing: any,
  templates: Template[],
  onNewConnection: (event: any) => void,
  onDetachedConnection: (event: any) => void,
  onConnectionMoved: (event: any) => void,
  addTemplate: (template: Template) => void,
  deleteTemplate: (template: Template) => void
}
interface State {
  userDefinedLayerNumber: number;
  collapsedLayers: number[];
}

const plumbingConfig = {
  Anchor: ['Left', 'Right'],
  Connector: [ 'Bezier', { stub: 5 } ],
  PaintStyle: { strokeWidth: 2, stroke: 'teal' }
};

export default class LayeredDiagramEditor extends React.Component<Props, State> {
  private buttonObserver: AddTemplateButtonObserver;

  constructor(props: Props) {
    super(props);

    this.renderTemplate = this.renderTemplate.bind(this);
    this.toggleCollapseLayer = this.toggleCollapseLayer.bind(this);

    this.buttonObserver = new AddTemplateButtonObserver();

    this.state = {
      userDefinedLayerNumber: 0,
      collapsedLayers: []
    }
  }

  private configurePlumbing() {
    const plumbing = this.props.dragPlumbing;

    plumbing.bind('connection', this.props.onNewConnection);
    plumbing.bind('connectionDetached', this.props.onDetachedConnection);
    plumbing.bind('connectionMoved', this.props.onConnectionMoved);

    const container = document.querySelector(`#${this.props.id} .diagram`);

    plumbing.setContainer(container);
    plumbing.importDefaults(plumbingConfig);
  }

  private getTemplatesPerLayer(templates: Template[] = this.props.templates): Map<number, Template[]> {
    const templatePerLayerMap = new Map<number, Template[]>();

    templates.forEach(template => {
      const layer = template.getHierarchyLevel();

      if (templatePerLayerMap.get(layer) === undefined) {
        templatePerLayerMap.set(layer, []);
      }

      templatePerLayerMap.get(layer).push(template);
    });

    return templatePerLayerMap;
  }

  private toggleCollapseLayer(layerIndex: number) {
    const collapsedLayers = this.state.collapsedLayers;
    const indexInState = collapsedLayers.indexOf(layerIndex);

    if (indexInState === -1) {
      collapsedLayers.push(layerIndex);
    } else {
      collapsedLayers.splice(indexInState, 1);
    }

    this.setState({ collapsedLayers });
    window.setTimeout(this.props.dragPlumbing.repaintEverything, 500);
  }

  private renderTemplate(template: Template, layer: number) {
    return (
      <TemplateBlock
        key={ template.id }
        delete={ () => this.props.deleteTemplate(template) }
        dragPlumbing={ this.props.dragPlumbing }
        template={ template }
        level={ layer }
        toggleChildTemplate={ () => null }
      />
    );
  }

  private renderLayerTopWidget(index: number) {
    return (
      <div className="layerWidgets top" key={ index }>
        {/* <h2>{ index }</h2> */}
        <AddTemplateButton
          layer={ index }
          addTemplate={ this.props.addTemplate }
          buttonObserver={ this.buttonObserver }
        />
      </div>
    );
  }

  private renderTemplates(layerIndex: number, templatesOnLayer: Template[]) {
    return (
      <div className="templates">
        { templatesOnLayer.map(this.renderTemplate) }
      </div>
    );
  }

  private renderLayerBottomWidget(layerIndex: number) {
    let icon = 'unfold_less';
    let label = 'collapse'

    if (this.state.collapsedLayers.indexOf(layerIndex) > -1) {
      icon = 'unfold_more';
      label = 'expand';
    }

    return (
      <div className="layerWidgets bottom" key={ layerIndex }>
        <button onClick={ () => this.toggleCollapseLayer(layerIndex) }>
          <i className="icon material-icons">{ icon }</i>
          <span>{ label }</span>
        </button>
      </div>
    );
  }

  private renderLayer(layerIndex: number, templatesOnLayer: Template[] = []) {
    const even = layerIndex % 2 === 0 ? 'even' : 'uneven';
    const collapsed = this.state.collapsedLayers.indexOf(layerIndex) > -1 ? 'collapsed' : '';

    return (
      <div key={ layerIndex } className={ `layer ${even} ${collapsed}` }>
        { this.renderLayerTopWidget(layerIndex) }
        { this.renderTemplates(layerIndex, templatesOnLayer) }
        { this.renderLayerBottomWidget(layerIndex) }
      </div>
    );
  }

  private renderLayersLazy(numberOfLayers: number) {
    const layerMap = this.getTemplatesPerLayer();
    // to ensure the order in which the layers appear
    const layers: any[] = [];

    for (let i = 0; i < numberOfLayers; i++) {
      let templatesOnThatLayer = layerMap.get(i);
      if (templatesOnThatLayer === undefined) {
        templatesOnThatLayer = [];
      }
      layers.push(this.renderLayer(i, templatesOnThatLayer));
    }

    // layerMap.forEach((value, key) => {
    //   const nextLayer = this.renderLayer(key, value);
    //   layers.push([key, nextLayer]);
    // });

    // layers.sort((layerA, layerB) => {
    //   return layerA[0] - layerB[0];
    // });

    return (
      <div className="layers">
        { layers }
      </div>
    );
  }

  private renderLayersEager() {
    const layerMap = this.getTemplatesPerLayer();
    // to ensure the order in which the layers appear
    const layers: any[] = [];

    for (let i=3; i >= 0; i--) {
      const nextLayer = this.renderLayer(i, layerMap.get(i));
      layers.push(nextLayer);
    }

    return (
      <div className="layers">
        { layers }
      </div>
    );
  }

  private renderPlaceholderLayer(numberOfLayers: number) {
    return (
      <div className="layer">
        <AddTemplateButton
          layer={ numberOfLayers }
          addTemplate={ this.props.addTemplate }
          buttonObserver={ this.buttonObserver }
        />
      </div>
    );
  }

  public render() {
    let numberOfLayers = 0;
    const layerMap = this.getTemplatesPerLayer();

    layerMap.forEach((value, key) => {
      numberOfLayers = Math.max(numberOfLayers, key + 1);
    });

    return (
      <div id={ this.props.id } className="layeredDiagramContainer" style={{ height: window.innerHeight - 75 }}>
        <div className="layeredDiagramEditor">
          <div className="column">
            { this.renderLayersLazy(numberOfLayers) }
          </div>
          <div className="column placeholder" style={{ height: window.innerHeight - 100 }}>
            { this.renderPlaceholderLayer(numberOfLayers) }
          </div>
        </div>
      </div>
    );
  }

  private makeTemplatesSortable() {
    $(`#${this.props.id} .templates`).sortable({
      placeholder: 'templatePlaceholder',
      handle: '.templateHeader',
      sort: (event, ui) => {
        this.props.dragPlumbing.repaintEverything();
      },
      stop: (event, ui) => {
        this.props.dragPlumbing.repaintEverything();
      },

    });

    // $(`#${this.props.id} .container .template`).draggable({
    //   // placeholder: 'templatePlaceholder',
    //   handle: '.templateHeader',
    //   containment: 'parent',
    //   zIndex: 100,
    //   drag: (event, ui) => {
    //     this.props.dragPlumbing.repaintEverything();
    //   },
    // });
  }

  public componentDidMount() {
    this.configurePlumbing();
  }

  public componentDidUpdate() {
    this.makeTemplatesSortable();
  }
}
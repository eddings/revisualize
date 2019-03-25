import Template from "./Template";
import { SelectionDef } from "vega-lite/build/src/selection";
import { MarkEncoding } from "./MarkEncoding";
import { Mark } from "vega-lite/build/src/mark";

export default class PlotTemplate extends Template {
  public selection?: SelectionDef;
  public staticMarkProperties?: Map<MarkEncoding, any>;
  public type: Mark;

  constructor(parent: Template = null) {
    super([], null, parent);
  }
}
import { Data } from 'vega-lite/build/src/data';

import { MarkEncoding } from './MarkEncoding';
import { BarBinSpacingMixins } from 'vega-lite/build/src/mark';
import { Transform } from 'vega-lite/build/src/transform';
import { Config } from 'vega-lite';
import { LayoutType } from './LayoutType';

export default abstract class Template {
  public id: string;
  public hierarchyLevel: number;
  public data: Data;
  public description: string;
  public bounds: any;
  public spacing: BarBinSpacingMixins;
  public width: number;
  public height: number;
  public transform: Transform;
  public config: Config;

  public encodings: Map<MarkEncoding, any>;
  public overwrittenEncodings: Map<MarkEncoding, any>

  constructor(public visualElements: Template[], public layout: LayoutType, public parent: Template) {
    this.id = `template${Math.round(Math.random() * 10000)}`;
    this.hierarchyLevel = -1;
    this.data = null;

    this.encodings = new Map();
    this.overwrittenEncodings = new Map();
  }

  /**
   * Returns the flattened hierarchy of templates succeeding this one.
   */
  public getFlatHierarchy(): Template[] {
    const successors: Template[] = [];

    successors.push(this);

    this.visualElements.forEach(successor => {
      successors.push(...successor.getFlatHierarchy());
    });

    return successors;
  }

  /**
   * Returns the hierarchy level of this template, starting at 0.
   */
  public getHierarchyLevel(): number {
    if (this.hierarchyLevel > -1) {
      return this.hierarchyLevel;
    }

    // since the template may have visual elements from different leves, output the highest value
    // between all sub-hierarchies
    if (this.visualElements.length === 0) {
      return 0;
    }

    const subHierarchies = this.visualElements.map(v => v.getHierarchyLevel());

    this.hierarchyLevel = Math.max(...subHierarchies) + 1;
    return this.hierarchyLevel;
  }

  public setEncodedValue(encoding: MarkEncoding, value: any) {
    this.encodings.set(encoding, value);
  }

  public getEncodedValue(encoding: MarkEncoding) {
    return this.encodings.get(encoding);
  }
}
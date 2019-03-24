export const populationLayerChart: any = {
  "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
  "description": "The population of the German city of Falkensee over time",
  "width": 500,
  "data": {
    "values": [
      {"year": "1875", "population": 1309},
      {"year": "1890", "population": 1558},
      {"year": "1910", "population": 4512},
      {"year": "1925", "population": 8180},
      {"year": "1933", "population": 15915},
      {"year": "1939", "population": 24824},
      {"year": "1946", "population": 28275},
      {"year": "1950", "population": 29189},
      {"year": "1964", "population": 29881},
      {"year": "1971", "population": 26007},
      {"year": "1981", "population": 24029},
      {"year": "1985", "population": 23340},
      {"year": "1989", "population": 22307},
      {"year": "1990", "population": 22087},
      {"year": "1991", "population": 22139},
      {"year": "1992", "population": 22105},
      {"year": "1993", "population": 22242},
      {"year": "1994", "population": 22801},
      {"year": "1995", "population": 24273},
      {"year": "1996", "population": 25640},
      {"year": "1997", "population": 27393},
      {"year": "1998", "population": 29505},
      {"year": "1999", "population": 32124},
      {"year": "2000", "population": 33791},
      {"year": "2001", "population": 35297},
      {"year": "2002", "population": 36179},
      {"year": "2003", "population": 36829},
      {"year": "2004", "population": 37493},
      {"year": "2005", "population": 38376},
      {"year": "2006", "population": 39008},
      {"year": "2007", "population": 39366},
      {"year": "2008", "population": 39821},
      {"year": "2009", "population": 40179},
      {"year": "2010", "population": 40511},
      {"year": "2011", "population": 40465},
      {"year": "2012", "population": 40905},
      {"year": "2013", "population": 41258},
      {"year": "2014", "population": 41777}
    ],
    "format": {
      "parse": {"year": "date:'%Y'"}
    }
  },
  "layer": [
    {
      "mark": "rect",
      "data": {
        "values": [
          {
            "start": "1933",
            "end": "1945",
            "event": "Nazi Rule"
          },
          {
            "start": "1948",
            "end": "1989",
            "event": "GDR (East Germany)"
          }
        ],
        "format": {
          "parse": {"start": "date:'%Y'", "end": "date:'%Y'"}
        }
      },
      "encoding": {
        "x": {
          "field": "start",
          "type": "temporal",
          "timeUnit": "year",
          "axis": null
        },
        "x2": {
          "field": "end",
          "timeUnit": "year"
        },
        "color": {"field": "event", "type": "nominal"}
      }
    },
    {
      "mark": "line",
      "encoding": {
        "x": {
          "field": "year",
          "type": "temporal",
          "timeUnit": "year"
        },
        "y": {"field": "population", "type": "quantitative"},
        "color": {"value": "#333"}
      }
    },
    {
      "mark": "point",
      "encoding": {
        "x": {
          "field": "year",
          "type": "temporal",
          "timeUnit": "year"
        },
        "y": {"field": "population", "type": "quantitative"},
        "color": {"value": "#333"}
      }
    }
  ]
};

export const barchartSpec: any = {
  '$schema': 'https://vega.github.io/schema/vega-lite/v3.json',
  'description': 'A simple bar chart with embedded data.',
  'data': {
    'values': [
      {'a': 'A','b': 28}, {'a': 'B','b': 55}, {'a': 'C','b': 43},
      {'a': 'D','b': 91}, {'a': 'E','b': 81}, {'a': 'F','b': 53},
      {'a': 'G','b': 19}, {'a': 'H','b': 87}, {'a': 'I','b': 52}
    ]
  },
  'mark': 'bar',
  'encoding': {
    'x': {'field': 'a', 'type': 'ordinal'},
    'y': {'field': 'b', 'type': 'quantitative'}
  }
};

export const scatterplotMatrixSpec: any = {
  "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
  "repeat": {
    "row": ["Horsepower", "Acceleration", "Miles_per_Gallon"],
    "column": ["Miles_per_Gallon", "Acceleration", "Horsepower"]
  },
  "spec": {
    "data": {"url": "https://vega.github.io/editor/data/cars.json"},
    "mark": "point",
    "selection": {
      "brush": {
        "type": "interval",
        "resolve": "union",
        "on": "[mousedown[event.shiftKey], window:mouseup] > window:mousemove!",
        "translate": "[mousedown[event.shiftKey], window:mouseup] > window:mousemove!",
        "zoom": "wheel![event.shiftKey]"
      },
      "grid": {
        "type": "interval",
        "resolve": "global",
        "bind": "scales",
        "translate": "[mousedown[!event.shiftKey], window:mouseup] > window:mousemove!",
        "zoom": "wheel![!event.shiftKey]"
      }
    },
    "encoding": {
      "x": {"field": {"repeat": "column"}, "type": "quantitative"},
      "y": {
        "field": {"repeat": "row"},
        "type": "quantitative",
        "axis": {"minExtent": 30}
      },
      "color": {
        "condition": {
          "selection": "brush",
          "field": "Origin",
          "type": "nominal"
        },
        "value": "grey"
      }
    }
  }
};

export const candlestickSpec: any = {
  "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
  "width": 320,
  "description": "A candlestick chart inspired by an example in Protovis (http://mbostock.github.io/protovis/ex/candlestick.html)",
  "data": {
    "format": {
      "parse": {
        "date": "date:'%Y-%m-%d'"
      }
    },
    "values": [
      {
        "date": "2009-06-01",
        "open": 28.7,
        "high": 30.05,
        "low": 28.45,
        "close": 30.04,
        "signal": "short",
        "ret": -4.89396411092985
      },
      {
        "date": "2009-06-02",
        "open": 30.04,
        "high": 30.13,
        "low": 28.3,
        "close": 29.63,
        "signal": "short",
        "ret": -0.322580645161295
      },
      {
        "date": "2009-06-03",
        "open": 29.62,
        "high": 31.79,
        "low": 29.62,
        "close": 31.02,
        "signal": "short",
        "ret": 3.68663594470045
      },
      {
        "date": "2009-06-04",
        "open": 31.02,
        "high": 31.02,
        "low": 29.92,
        "close": 30.18,
        "signal": "short",
        "ret": 4.51010886469673
      },
      {
        "date": "2009-06-05",
        "open": 29.39,
        "high": 30.81,
        "low": 28.85,
        "close": 29.62,
        "signal": "short",
        "ret": 6.08424336973478
      },
      {
        "date": "2009-06-08",
        "open": 30.84,
        "high": 31.82,
        "low": 26.41,
        "close": 29.77,
        "signal": "short",
        "ret": 1.2539184952978
      },
      {
        "date": "2009-06-09",
        "open": 29.77,
        "high": 29.77,
        "low": 27.79,
        "close": 28.27,
        "signal": "short",
        "ret": -5.02431118314424
      },
      {
        "date": "2009-06-10",
        "open": 26.9,
        "high": 29.74,
        "low": 26.9,
        "close": 28.46,
        "signal": "short",
        "ret": -5.46623794212217
      },
      {
        "date": "2009-06-11",
        "open": 27.36,
        "high": 28.11,
        "low": 26.81,
        "close": 28.11,
        "signal": "short",
        "ret": -8.3743842364532
      },
      {
        "date": "2009-06-12",
        "open": 28.08,
        "high": 28.5,
        "low": 27.73,
        "close": 28.15,
        "signal": "short",
        "ret": -5.52763819095477
      },
      {
        "date": "2009-06-15",
        "open": 29.7,
        "high": 31.09,
        "low": 29.64,
        "close": 30.81,
        "signal": "long",
        "ret": 3.4920634920635
      },
      {
        "date": "2009-06-16",
        "open": 30.81,
        "high": 32.75,
        "low": 30.07,
        "close": 32.68,
        "signal": "short",
        "ret": 0.155038759689914
      },
      {
        "date": "2009-06-17",
        "open": 31.19,
        "high": 32.77,
        "low": 30.64,
        "close": 31.54,
        "signal": "short",
        "ret": 5.82822085889571
      },
      {
        "date": "2009-06-18",
        "open": 31.54,
        "high": 31.54,
        "low": 29.6,
        "close": 30.03,
        "signal": "short",
        "ret": 8.17610062893082
      },
      {
        "date": "2009-06-19",
        "open": 29.16,
        "high": 29.32,
        "low": 27.56,
        "close": 27.99,
        "signal": "short",
        "ret": 8.59872611464968
      },
      {
        "date": "2009-06-22",
        "open": 30.4,
        "high": 32.05,
        "low": 30.3,
        "close": 31.17,
        "signal": "short",
        "ret": 15.4907975460123
      },
      {
        "date": "2009-06-23",
        "open": 31.3,
        "high": 31.54,
        "low": 27.83,
        "close": 30.58,
        "signal": "short",
        "ret": 11.7370892018779
      },
      {
        "date": "2009-06-24",
        "open": 30.58,
        "high": 30.58,
        "low": 28.79,
        "close": 29.05,
        "signal": "long",
        "ret": -10.4234527687296
      },
      {
        "date": "2009-06-25",
        "open": 29.45,
        "high": 29.56,
        "low": 26.3,
        "close": 26.36,
        "signal": "long",
        "ret": 0
      },
      {
        "date": "2009-06-26",
        "open": 27.09,
        "high": 27.22,
        "low": 25.76,
        "close": 25.93,
        "signal": "long",
        "ret": 0
      },
      {
        "date": "2009-06-29",
        "open": 25.93,
        "high": 27.18,
        "low": 25.29,
        "close": 25.35,
        "signal": "long",
        "ret": 5.26315789473684
      },
      {
        "date": "2009-06-30",
        "open": 25.36,
        "high": 27.38,
        "low": 25.02,
        "close": 26.35,
        "signal": "long",
        "ret": 6.73758865248228
      }
    ]
  },
  "encoding": {
    "x": {"field": "date", "type": "temporal", "title": "Date in 2009"},
    "color": {
      "condition": {
        "test": "datum.open < datum.close",
        "value": "#06982d"
      },
      "value": "#ae1325"
    }
  },
  "layer": [
    {
      "mark": "rule",
      "encoding": {
        "y": {
          "field": "low", "type": "quantitative",
          "scale": {"zero": false}
        },
        "y2": {"field": "high"}
      }
    },
    {
      "mark": "bar",
      "encoding": {
        "y": {"field": "open", "type": "quantitative"},
        "y2": {"field": "close"},
        "size": {"value": 5}
      }
    }
  ]
};

export const concatenateSpec: any = {
  "$schema": "https://vega.github.io/schema/vega-lite/v3.json",
  "data": {"url": "https://vega.github.io/editor/data/movies.json"},
  "spacing": 15,
  "bounds": "flush",
  "vconcat": [{
    "mark": "bar",
    "height": 60,
    "encoding": {
      "x": {
        "bin": true,
        "field": "IMDB_Rating",
        "type": "quantitative",
        "axis": null
      },
      "y": {
        "aggregate": "count",
        "type": "quantitative",
        "scale": {
          "domain": [0,1000]
        },
        "title": ""
      }
    }
  }, {
    "spacing": 15,
    "bounds": "flush",
    "hconcat": [{
      "mark": "rect",
      "encoding": {
        "x": {
          "bin": true,
          "field": "IMDB_Rating",
          "type": "quantitative"
        },
        "y": {
          "bin": true,
          "field": "Rotten_Tomatoes_Rating",
          "type": "quantitative"
        },
        "color": {
          "aggregate": "count",
          "type": "quantitative"
        }
      }
    }, {
      "mark": "bar",
      "width": 60,
      "encoding": {
        "y": {
          "bin": true,
          "field": "Rotten_Tomatoes_Rating",
          "type": "quantitative",
          "axis": null
        },
        "x": {
          "aggregate": "count",
          "type": "quantitative",
          "scale": {
            "domain": [0,1000]
          },
          "title": ""
        }
      }
    }]
  }],
  "config": {
    "view": {
      "stroke": "transparent"
    }
  }
};
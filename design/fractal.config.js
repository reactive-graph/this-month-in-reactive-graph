'use strict';

const path = require('path');
const fractal = module.exports = require('@frctl/fractal').create();
const mandelbrot = require('@frctl/mandelbrot');
const pkg = require(path.join(__dirname, 'package.json'));

fractal.set('project.title', 'Reactive Graph - Design System');
fractal.set('project.version', pkg.version);

fractal.components.set('path', path.join(__dirname, 'components'));
fractal.components.set('ext', '.hbs');
fractal.components.set('default.status', 'prototype');
fractal.components.set('default.preview', '@preview');
fractal.components.set('statuses', {
  prototype: {
    label: "Prototype",
    description: "Do not implement.",
    color: "#dc0073"
  },
  wip: {
    label: "WIP",
    description: "Work in progress. Implement with caution.",
    color: "#f5b700"
  },
  ready: {
    label: "Ready",
    description: "Ready to implement.",
    color: "#04e762"
  },
  deprecated: {
    label: "Deprecated",
    description: "Deprecated component slated for removal.",
    color: "firebrick"
  },
})

fractal.docs.set('path', path.join(__dirname, 'docs'));
fractal.docs.set('ext', '.md');
fractal.docs.set('statuses', {
  alpha: {
    label: "Alpha",
    description: "This documentation is a draft.",
    color: "#dc0073"
  },
  beta: {
    label: "Beta",
    description: "Work in progress. The documentation is actively being written but not ready yet.",
    color: "#f5b700"
  },
  stable: {
    label: "Stable",
    description: "The documentation is stable.",
    color: "#04e762"
  },
  outdated: {
    label: "Outdated",
    description: "Outdated documentation, needs updating.",
    color: "firebrick"
  }
});
fractal.docs.set('default.status', 'alpha');
const handlebars = require('@frctl/handlebars')({
  helpers: {
    componentList: function () {
      let ret = "<ul>";
      const options = Array.from(arguments).pop();
      for (let component of fractal.components.flatten()) {
        ret = ret + "<li>" + options.fn(component.toJSON()) + "</li>";
      }
      return ret + "</ul>";
    }
  }
});
fractal.docs.engine(handlebars);

fractal.web.set('static.path', path.join(__dirname, 'public'));
fractal.web.set('builder.dest', path.join(__dirname, 'build'));
fractal.web.set('server.sync', true);

const customTheme = mandelbrot({
    styles: [
      'default',
      '/css/fractal.css',
      '/css/reactive-graph.css'
    ],
    favicon: '/favicon/favicon.svg',
    skin: {
      name: 'default',
      accent: '#00a1e4',
      complement: '#dc0073',
      links: '#00a1e4',
    },
    nav: ['search', 'docs', 'components'],
    navigation: 'split',
    information: [
      {
        label: 'Name',
        value: require('./package.json').name,
      },
      {
        label: 'Version',
        value: require('./package.json').version,
      },
      {
        label: 'Built on',
        value: new Date(),
        type: 'time', // Outputs a <time /> HTML tag
        format: (value) => {
          return value.toLocaleDateString('en');
        }
      }
    ],
  }
);

// specify a directory to hold the theme override templates
customTheme.addLoadPath(path.join(__dirname, 'theme', 'views'));

fractal.web.theme(customTheme);

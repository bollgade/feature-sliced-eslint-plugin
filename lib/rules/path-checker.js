/* eslint-disable  */ //! For testing
/**
 * @fileoverview Feature sliced relative path checker
 * @author BollGade
 */
"use strict";
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const path = require('path');

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: null,
    docs: {
      description: "Feature sliced relative path checker",
      recommended: false,
      url: null,
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          }
        }
      }
    ],
  },

  create(context) {
    const alias = context.options[0]?.alias || '';

    return {
      ImportDeclaration(node) {
        // example app/entities/Article
        const value =  normalizePath(node.source.value);
        const importTo = alias ? value.replace(alias,'') : value;

        // example P:\1MyPrograms\lang\Web\production-project\src\entities\Article
        const fromFilename = normalizePath(context.filename);

        if(shouldBeRelative(fromFilename, importTo)){
          context.report({node: node, message: 'Within one slice paths should be relative'})
        }
      }
    };
  },
};

const layers = {
  'app': 'app',
  'pages': 'pages',
  'widgets': 'widgets',
  'features': 'features',
  'entities': 'entities',
  'shared': 'shared',
}

function isPathRelative(path) {
  return path === '.' || path.startsWith('./') || path.startsWith('../')
}

function shouldBeRelative(from, to) {

  if (isPathRelative(to)){
    return false
  }

  // example entities/Article
  const toArray = to.split(/\\|\//);
  const toLayer = toArray[0];
  const toSlice = toArray[1];


  if(!toLayer || !toSlice || !layers[toLayer]) {
    return false;
  }

  const projectFrom = from.split('src')[1];

  const fromArray = projectFrom.split(/\\|\//);
  const fromLayer = fromArray[1];
  const fromSlice = fromArray[2];

  if(!fromLayer || !fromSlice || !layers[fromLayer]) {
    return false;
  }

  if (fromLayer === 'shared' && toLayer === 'shared') {
    const toSharedSlice = toArray[2];
    const fromSharedSlice = fromArray[3];
    
    return fromSharedSlice === toSharedSlice
  }

  return fromSlice === toSlice && toLayer === fromLayer
}

function normalizePath(str) {
  return str.replace(/\\/g, '/');
}
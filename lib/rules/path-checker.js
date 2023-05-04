/* eslint-disable  */ //! For testing
/**
 * @fileoverview Feature sliced relative path checker
 * @author BollGade
 */
"use strict";
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Feature sliced relative path checker",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        // example app/entities/Article
        const importTo = node.source.value

        // example P:\1MyPrograms\lang\Web\production-project\src\entities\Article
        const fromFilename = context.getFilename(); 

        context.report({node: node, message: 'LINTER ERROR!!!!'})
      }
    };
  },
};

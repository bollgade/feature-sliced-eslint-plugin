/**
 * @fileoverview feature sliced relative path checker
 * @author BollGade
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/path-checker"),
  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {ecmaVersion: 6, sourceType: 'module'}
});
ruleTester.run("path-checker", rule, {
  valid: [
    {
      filename: 'P:\\Folder\\lang\\Web\\production-project\\src\\entities\\Article',
      code: "import { Article } from '../../ui/ArticleList/ArticleList'",
      errors: [{ message: "Within one slice paths should be relative" }],
    },
    {
      filename: '/Users/bollgade/dev/Blog_pet-React/src/entities/Article/ui/Article.tsx',
      code: "import { Article } from '../../ui/ArticleList/ArticleList'",
      errors: [{ message: "Within one slice paths should be relative" }],
    },
  ],

  invalid: [
    {
      filename: 'P:\\Folder\\lang\\Web\\production-project\\src\\entities\\Article',
      code: "import { Article } from 'entities/Article/ui/ArticleList/ArticleList'",
      errors: [{ message: "Within one slice paths should be relative" }],
    },
    {
      filename: '/Users/bollgade/dev/Blog_pet-React/src/entities/Article/ui/Article.tsx',
      code: "import { Article } from 'entities/Article/ui/ArticleList/ArticleList'",
      errors: [{ message: "Within one slice paths should be relative" }],
    },
    {
      filename: '/Users/bollgade/dev/Blog_pet-React/src/entities/Article/ui/Article.tsx',
      code: "import { Article } from '@entities/Article/ui/ArticleList/ArticleList'",
      errors: [{ message: "Within one slice paths should be relative" }],
      options: [{
        alias: '@'
      }]
    },
  ],
});

// /Users/bollgade/dev/Blog_pet-React.ts/src/widgets/ThemeSwitcher/ui/ThemeSwitcher.tsx
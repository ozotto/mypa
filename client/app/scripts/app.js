'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
  .module('clientApp', [
    'ngResource',
    'ngRoute',
    'ui.bootstrap',
    'frapontillo.bootstrap-switch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'homeCtrl'
      })
      .when('/home2', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/photo', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/test', {
        templateUrl: 'views/test.html',
        controller: 'testCtrl'
      })
      .when('/newArticle', {
        templateUrl:'views/articleNew.html',
        controller: 'articleNew'
      })
      .when('/articles', {
        templateUrl:'views/articleList.html',
        controller: 'articleList'
      })
      .when('/articles/:articleId', {
        templateUrl:'views/viewArticle.html',
        controller: 'viewArticle'
      })
      .when('/categories', {
        templateUrl: 'views/categories.html',
        controller: 'controllerCategory'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'controlContact'
      })
      .when('/TestHome2', {
        templateUrl: 'views/TestHome2.html',
        controller: 'controlTestHome2'
      })
      .when('/originalTime', {
        templateUrl: 'views/originalTime.html',
        controller: 'originalTime'
      })
      .when('/directive', {
        templateUrl: 'views/directive.html',
        controller: 'mydirective'
      })
      .when('/newhome', {
        templateUrl: 'views/newhome.html',
        controller: 'mynewhome'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

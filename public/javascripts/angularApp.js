//Defining Our Angular App

var app = angular.module('breddit', ['ui.router']);
//***********************************************************//
//States (Partials)

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'mainController'
    })
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'postsController'
    });

  $urlRouterProvider.otherwise('home');

}]);
//***********************************************************//
//Posts Factory

app.factory('postsFactory', [function() {

  var o = {
    posts: []
  };
  return o;
}]);
//***********************************************************//
//Main Controller

app.controller('mainController', ['$scope', 'postsFactory', function($scope, postsFactory) {

  $scope.test = 'One convenient stop for all of your bread-baking needs';
  $scope.posts = postsFactory.posts;

  $scope.addPost = function() {
    if(!$scope.title || $scope.title === '') {
      return;
    }

    $scope.posts.push({
      title: $scope.title,
      link: $scope.link,
      votes: 0,
      comments: [
        {author: 'Preeya', body: 'Cool post!', votes: 0},
        {author: 'Cassidy', body: 'Cool post!', votes: 0},
        {author: 'Randy', body: 'Cool post!', votes: 0}
      ]
    });
    console.log('***** new post has been submitted *****');

    $scope.title = '';
    $scope.link = '';
  };

  $scope.upvote = function(post) {
    post.votes += 1;
  };

  $scope.downvote = function(post) {
    post.votes -= 1;
  };
}]);
//***********************************************************//
//Posts Controller

app.controller('postsController', ['$scope', '$stateParams', 'postsFactory', function($scope, $stateParams, postsFactory) {

  $scope.post = postsFactory.posts[$stateParams.id];

  $scope.addComment = function() {

    if($scope.body === '') {
      return;
    }
    $scope.post.comments.push({
      body: $scope.body,
      author: 'user',
      votes: 0
    });
    $scope.body = '';
  };

}]);
//***********************************************************//

/**
 * コンストラクタです.
 * @param $scope
 * @param searchService
 * @constructor
 */
function SearchController($scope, $http, searchService) {
    $http.get("/jsondata/kanji.json")
    .then(function(response) {
      searchService.initJsonData(response.data);
      $scope.users = searchService.getData();
    });
    $scope.search = "";
}
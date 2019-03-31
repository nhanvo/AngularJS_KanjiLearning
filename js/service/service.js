/**
 * コンストラクタです.
 * @constructor
 */
function SearchService() {
    var jsonData = null;
}

/*
    Init data
*/
SearchService.prototype.initJsonData = function(jData) {
    jsonData = jData;
}

/**
 * サンプルデータを返します.
 * @returns {Array} 検索対象データ
 */
SearchService.prototype.getData = function ($http, response) {
    return jsonData;
};

/**
 * オブジェクト内の値がキーワードと部分一致するかどうか判定
 * @param obj 検索対象オブジェクト
 * @param keyword キーワード配列
 * @returns {boolean}
 */
SearchService.prototype.keywordJudge = function (obj, keyword) {
    var self = this;

    if (angular.isArray(obj)) {
        // 配列の場合
        // 格納されている要素を順番にチェックし、ひとつでも部分一致した場合trueを返す
        return obj.some(function (child) {
            return self.keywordJudge(child, keyword);
        });
    } else if (angular.isObject(obj)) {
        // オブジェクトの場合
        // 子要素を順番にチェックし、ひとつでも部分一致した場合trueを返す
        var properties = Object.getOwnPropertyNames(obj);
        return properties.some(function (property) {
            var child = obj[property];
            return self.keywordJudge(child, keyword);
        });
    } else if (obj != null) {
        // オブジェクト、配列以外で、値がある場合
        // 文字列に変換し、部分一致した場合trueを返す
        return angular.toJson(obj).search(keyword) != -1;
    }
    // nullまたはundefinedの場合
    return false;
};
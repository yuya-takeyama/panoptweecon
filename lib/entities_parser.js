var EntitiesParser = function () {
};

EntitiesParser.prototype = {
  parse: function (entities) {
    var urls = []
      , hashtags = [];

    if (entities.urls) {
      urls = entities.urls.reduce(function (sum, url) {
        if (sum.indexOf(url.expanded_url) === -1) {
          sum.push(url.expanded_url);
        }
        return sum;
      }, []);
    }

    if (entities.hashtags) {
      hashtags = entities.hashtags.reduce(function (sum, hashtag) {
        if (sum.indexOf(hashtag.text) === -1) {
          sum.push(hashtag.text);
        }
        return sum;
      }, []);
    }

    return {
      'urls':urls,
      'hashtags': hashtags
    };
  }
};

module.exports = EntitiesParser;

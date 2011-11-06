var map = function () {
  var self = this;
  this.urls.forEach(function (url) {
    if (typeof url === 'string') {
      emit(url, {
        "users": [self.user_id],
        "unique_count": 0,
        "total_count": 1,
      });
    }
  });
};

var reduce = function (key, values) {
  var result = {
    "users": [],
    "unique_count": 0,
    "total_count": 0
  };

  values.forEach(function (value) {
    value.users.forEach(function (user) {
      if (result.users.indexOf(user) === -1) {
        result.users.push(user);
        result.unique_count++;
      }
    });
    result.total_count += value.total_count;
  });
  return result;
};

db.tweets.mapReduce(map, reduce, {"out": "mr_result"});

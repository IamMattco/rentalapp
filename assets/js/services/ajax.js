App.service("Ajax", function ($http, $route, $q) {

    var token = localStorage.getItem("Token");
    var activeRequests = 0;
    var activeRequestsLoader = null;

    /*
     * AJAX SEND
     *
     * Ajax.send({
            id: $scope.ID,
            src: "customers",
            data: $scope.Customer,
            success: function(response) {
            }
       });
     */

    this.send = function (options) {

        if (typeof options.showloader == 'undefined') { options.showloader = true };

        var http_url = "",
            http_method = "";

        if (options.id === 0) {
            http_url = "/api/" + options.src;
            http_method = "POST";
        } else {
            http_url = "/api/" + options.src + "/" + options.id;
            http_method = "PUT";
        }

        var dataResponse = angular.copy(options.data);

        var objectKeys = Object.keys(dataResponse);

        for (var i = 0; i < objectKeys.length; i++) {
            var currentValue = objectKeys[i];
        }

        $http({
            url: http_url,
            method: http_method,
            data: dataResponse,
            headers: {
                "Content-Type": "application/json"
            },
            complete: function () {
                activeRequests -= 1;

                if (activeRequests === 0) {
                    clearTimeout(activeRequestsLoader);
                    activeRequestsLoader = null;
                    document.querySelector("#main").classList.remove("loading-view");
                }
            }
        }).then(function (response) {
            if (options.success !== undefined) {

                var resultData = angular.copy(response.data);

                var objectResponseKeys = Object.keys(resultData);

                for (var i = 0; i < objectResponseKeys.length; i++) {
                    var currentValue = objectResponseKeys[i];
                }

                response.data = resultData;

                options.success(response);
            }
        }, function (response) {
            
            activeRequests -= 1;
            
            if (activeRequests === 0) {
                clearTimeout(activeRequestsLoader);
                activeRequestsLoader = null;
                document.querySelector("#main").classList.remove("loading-view");
            }
        });
    };

    /*
     * AJAX GET
     *
     * Ajax.get({
            url: "/api/customers/" + $scope.ID,
            success: function (response) {
                // something here
            }
        });
     *
     */

    this.get = function (options) {

        if (typeof options.showloader == 'undefined') { options.showloader = true };

        $http({
            method: "GET",
            url: options.url,
            data: options.data,
            complete: function (response) {
                activeRequests -= 1;

                if (activeRequests === 0) {
                    clearTimeout(activeRequestsLoader);
                    activeRequestsLoader = null;
                    document.querySelector("#main").classList.remove("loading-view");
                }

            }
        }).then(function (response) {
            if (options.success !== undefined) {

                var objectResponseKeys = Object.keys(response.data);

                for (var i = 0; i < objectResponseKeys.length; i++) {
                    var currentValue = objectResponseKeys[i];

                }
                options.success(response);
            }
        }, function (response) {
            // error handling            
            if (response.data.Message) { notification(response.data.Message, "fail"); } else { notification(response.data.ExceptionMessage, "fail"); };
            activeRequests -= 1;

            if (activeRequests === 0) {
                clearTimeout(activeRequestsLoader);
                activeRequestsLoader = null;
                document.querySelector("#main").classList.remove("loading-view");
            }
        });
    };

    /*
     * AJAX POST
     *
     * Ajax.post({
            url: "/api/customers/" + $scope.ID,
            data: Some.data,
            success: function (response) {
                // something here
            }
        });
     */

    this.post = function (options) {

        if (typeof options.showloader == 'undefined') { options.showloader = true };

        if (typeof options.data !== "undefined") {
            var objectKeys = Object.keys(options.data);

            for (var i = 0; i < objectKeys.length; i++) {
                var currentValue = objectKeys[i];
            }
        }

        $http({
            url: options.url,
            method: "POST",
            data: options.data,
            complete: function () {
                activeRequests -= 1;

                if (activeRequests === 0) {
                    clearTimeout(activeRequestsLoader);
                    activeRequestsLoader = null;
                    document.querySelector("#main").classList.remove("loading-view");
                }
            }
        }).then(function (response) {
            if (options.success !== undefined) {
                var objectResponseKeys = Object.keys(response.data);

                for (var i = 0; i < objectResponseKeys.length; i++) {
                    var currentValue = objectResponseKeys[i];

                    if (_.isString(response.data[currentValue]) === true) {
                        if (response.data[currentValue].includes("-") && response.data[currentValue].length === 19) {
                            var dateFormat = response.data[currentValue];
                            dateFormat = Helper.ukDate(dateFormat);

                            response.data[currentValue] = dateFormat;
                        }
                    }
                }

                options.success(response);
            }
        }, function (response) {
            // error handling
            if (response.data.Message) { notification(response.data.Message, "fail"); } else { notification(response.data.ExceptionMessage, "fail"); };
            activeRequests -= 1;

            if (activeRequests === 0) {
                clearTimeout(activeRequestsLoader);
                activeRequestsLoader = null;
                document.querySelector("#main").classList.remove("loading-view");
            }
        });
    }

    /*
     * AJAX PUT
     *
     * Ajax.put({
            url: "/api/customers/" + $scope.ID,
            data: Some.data,
            success: function (response) {
                // something here
            }
        });
     */

    this.put = function (options) {

        if (typeof options.showloader == 'undefined') { options.showloader = true };

        if (typeof options.data !== 'undefined') {
            var objectKeys = Object.keys(options.data);

            for (var i = 0; i < objectKeys.length; i++) {
                var currentValue = objectKeys[i];
            }
        }

        $http({
            url: options.url,
            method: "PUT",
            data: options.data,
            complete: function () {
                activeRequests -= 1;

                if (activeRequests === 0) {
                    clearTimeout(activeRequestsLoader);
                    activeRequestsLoader = null;
                    document.querySelector("#main").classList.remove("loading-view");
                }
            }
        }).then(function (response) {
            if (options.success !== undefined) {
                var objectResponseKeys = Object.keys(response.data);

                for (var i = 0; i < objectResponseKeys.length; i++) {
                    var currentValue = objectResponseKeys[i];

                    if (_.isString(response.data[currentValue]) === true) {
                        if (response.data[currentValue].includes("-") && response.data[currentValue].length === 19) {
                            var dateFormat = response.data[currentValue];
                            dateFormat = Helper.ukDate(dateFormat);

                            response.data[currentValue] = dateFormat;
                        }
                    }

                    if (i === objectResponseKeys.length - 1) {
                        options.success(response);
                    }
                }
            }
        }, function (response) {
            // error handling
            if (response.data.Message) { notification(response.data.Message, "fail"); } else { notification(response.data.ExceptionMessage, "fail"); };
            activeRequests -= 1;

            if (activeRequests === 0) {
                clearTimeout(activeRequestsLoader);
                activeRequestsLoader = null;
                document.querySelector("#main").classList.remove("loading-view");
            }
        });
    }

    /*
     * Update model
     */

    this.updateModel = function (options) {

        if (typeof options.showloader == 'undefined') { options.showloader = true };

        $http({
            method: "GET",
            url: options.url + "/" + options.id,
            complete: function (response) {
                activeRequests -= 1;

                if (activeRequests === 0) {
                    clearTimeout(activeRequestsLoader);
                    activeRequestsLoader = null;
                    document.querySelector("#main").classList.remove("loading-view");
                }

            }
        }).then(function (response) {

            var data = response.data,
                _url = "",
                _method = "";

            if (options.id === 0) {
                _url = options.url;
                _method = "POST";
            } else {
                _url = options.url + "/" + response.data.ID;
                _method = "PUT";
            }

            for (var property in options.data) {
                if (options.data.hasOwnProperty(property)) {
                    data[property] = options.data[property]
                }
            }

            $http({
                url: _url,
                method: _method,
                data: data,
                headers: { "Authorization": "Bearer " + localStorage.getItem("Token") },
            }).then(function (response) {
                if (options.success !== undefined) {
                    if (options.id === 0) {
                        $route.reload();
                    } else {
                        options.success(response);
                    }
                }
            });
        }, function (response) {
            // error handling
            if (response.data.Message) { notification(response.data.Message, "fail"); } else { notification(response.data.ExceptionMessage, "fail"); };
            activeRequests -= 1;

            if (activeRequests === 0) {
                clearTimeout(activeRequestsLoader);
                activeRequestsLoader = null;
                document.querySelector("#main").classList.remove("loading-view");
            }
        });
    };

    /*
     * Delete model
     */

    this.delete = function (options) {
        $http({
            url: options.url,
            method: "DELETE",
            headers: { "Authorization": "Bearer " + localStorage.getItem("Token") },
        }).then(function (response) {
            if (options.success !== undefined) {
                options.success(response);
            }
        }, function (response) {
            // error handling
            if (response.data.Message) { notification(response.data.Message, "fail"); } else { notification(response.data.ExceptionMessage, "fail"); };

        });
    }

    //allow mutiple promises 

    //$q.all([
    //    Ajax.doQuery("/api/customers/"),
    //    Ajax.doQuery("/api/customers/")
    //]).then(function (data) {
    //});

    this.doQuery = function (requestUrl) {
        var d = $q.defer();
        var result = this.get({
            url: requestUrl, success: function (response) {
                d.resolve(response)
            }
        });
        return d.promise
    };

});

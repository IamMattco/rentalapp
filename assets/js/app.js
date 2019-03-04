var App = angular.module("rentalapp", ["ngRoute"]);

function notify(message, status) {
    var className;
    if (status === "success") {
        className = "alert-success";
    }  else {
        className = "alert-danger";
    }

    var template = '<div class="alert ' + className + '" role="alert">' + message + '</div>';

    document.getElementById("notifications").innerHTML = template;

    setTimeout(function() {
        document.getElementById("notifications").innerHTML = "";
    }, 3000);
}

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
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
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
                var objectResponseKeys = Object.keys(response.data);

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

});

App.directive("rentLogin", function ($filter, $location, Ajax, $sce) {
    return {
        restrict: "E",
        link: function ($scope, element, attrs) {
            $scope.loginUser = function($event) {

                if ($scope.loginForm.$valid === true) {
                    console.log($scope.user);
                    Ajax.post({
                        url: "/users/authenticate",
                        data: "email=" + $scope.user.email + "&password=" + $scope.user.password,
                        success: function(response) {
                            sessionStorage.setItem("token", response.data.data.token);

                            document.getElementById("loginLink").style.display = "none";
                            document.getElementById("registerLink").style.display = "none";
                            document.getElementById("logoutLink").style.display = "block";

                            $("#loginModal").modal("hide");

                            notify("Uytkownik zalogowany!", "success");
                        }
                    });
                } else {
                    notify("Proszę wypełnić formularz");
                }

                $event.preventDefault();
            }
        },
        template:  '<div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel" aria-hidden="true">' +
        '<div class="modal-dialog" role="document">' +
            '<div class="modal-content">' +
                '<div class="modal-header">' +
                    '<h5 class="modal-title" id="loginModalLabel">Logowanie</h5>' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                    '<span aria-hidden="true">&times;</span>' +
                    '</button>' +
                '</div>' +
                '<div class="modal-body">' +
                    '<form name="loginForm">' +
                        '<div class="form-group">' +
                            '<label for="exampleInputEmail1">Email address</label>' +
                            '<input type="email" class="form-control" ng-model="user.email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" required>' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="exampleInputPassword1">Password</label>' +
                            '<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" ng-model="user.password" required>' +
                        '</div>' +
                        '<button type="submit" class="btn btn-primary" ng-click="loginUser($event)">Submit</button>' +
                    '</form>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>'

    }
});

App.directive("rentSignup", function($filter, $location, Ajax, $sce) {
    return {
        restrict: "E",
        link: function( $scope, element, attr) {
            $scope.registerUser = function($event) {

                Ajax.post({
                    url: "/users/register",
                    data: "name=" + $scope.user.name + "&email=" + $scope.user.email + "&password=" + $scope.user.password,
                    success: function(response) {
                    
                        $("#registerModal").modal("hide");

                        notify("Uytkownik utworzony!", "success");
                    }
                });

                $event.preventDefault();
            }
        },
        template: '<div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel" aria-hidden="true">' +
            '<div class="modal-dialog" role="document">' +
                '<div class="modal-content">' +
                    '<div class="modal-header">' +
                        '<h5 class="modal-title" id="registerModalLabel">Rejestracja</h5>' +
                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
                        '<span aria-hidden="true">&times;</span>' +
                        '</button>' +
                    '</div>' +
                    '<div class="modal-body">' +
                    '<form name="regForm">' +
                    '<div class="form-group">' +
                        '<label for="name">Name</label>' +
                        '<input type="email" class="form-control" ng-model="user.name" id="name" aria-describedby="emailHelp" placeholder="Name">' +
                    '</div>' +
                        '<div class="form-group">' +
                            '<label for="exampleInputEmail1">Email address</label>' +
                            '<input type="email" class="form-control" ng-model="user.email" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" >' +
                        '</div>' +
                        '<div class="form-group">' +
                            '<label for="exampleInputPassword1">Password</label>' +
                            '<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" ng-model="user.password">' +
                        '</div>' +
                        '<button type="submit" class="btn btn-primary" ng-click="registerUser($event)">Submit</button>' +
                    '</form>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>'
    }
})

App.config(function ($routeProvider, $httpProvider, $locationProvider, $provide) {

    $routeProvider
        .when("/", {
            templateUrl: "/templates/home.html",
            controller: "homeController",
        })
        .when("/products/", {
            templateUrl: "/templates/products.html",
            controller: "productsController"
        })
        .when("/products/:id", {
            templateUrl: "/templates/product.html",
            controller: "productController"
        })
        .when("/product_details/:id", {
            templateUrl: "/templates/productDetails.html",
            controller: "productDetailsController"
        })
        .otherwise({
            redirectTo: "/404"
        });

    // $locationProvider.html5Mode(true);
});

App.controller("homeController", function($scope) {

});

App.controller("productsController", function($scope, $http) {
    if (sessionStorage.getItem("token") !== null) {
        $scope.is_admin = true;
    } else {
        $scope.is_admin = false;
    }

    $scope.loadData = function(query) {

        var _path = "/products";

        if (query !== undefined) {
            _path += "?query=" + query;
        }

        $http({
            url: _path,
            method: "GET",
            headers: {
                "x-access-token": sessionStorage.getItem("token"),
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function (response) {
            $scope.products = response.data.data.products;
        });
    }

    $scope.loadData();

    $scope.deleteProduct = function($event, id) {
        if (confirm("Czy chcesz usunąć produkt z bazy danych?")) {
            $http({
                url: "/products/" + id,
                method: "DELETE",
                headers: {
                    "x-access-token": sessionStorage.getItem("token"),
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function (response) {
                $scope.loadData();
            });
        } else {
            // Do nothing!
        }

        $event.preventDefault();
    }

    $scope.editProduct = function($event, id) {
        window.location.href = "/#!/product_details/" + id;

        $event.preventDefault();
    }

    $scope.searchForm = function($event, id) {
        $scope.loadData($scope.search);

        $event.preventDefault();
    }
});

App.controller("productController", function($scope, $routeParams, $http) {

    if (sessionStorage.getItem("token") !== null) {
        $scope.is_admin = true;
    } else {
        $scope.is_admin = false;
    }

    $http({
        url: "/products/" + $routeParams.id,
        method: "GET",
        headers: {
            "x-access-token": sessionStorage.getItem("token"),
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(function (response) {
        $scope.product = response.data.data.products;
        console.log($scope.product);
    });
});

App.controller("productDetailsController", function($scope, $routeParams, $http) {
    $scope.pageTitle = "Edycja produktu";
    $scope.id = $routeParams.id;

    if ($scope.id === "0") {
        $scope.pageTitle = "Nowy produkt";
    } else {
        $http({
            url: "/products/" + $scope.id,
            method: "GET",
            headers: {
                "x-access-token": sessionStorage.getItem("token"),
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(function (response) {
            $scope.product = response.data.data.products;
            console.log($scope.product);
        });
    }

    $scope.saveItem = function($event) {

        if ($scope.id === "0") {
            var _url = "/products",
                _method = "POST";
        } else {
            var _url = "/products/" + $scope.id,
                _method = "PUT";
        }
        
        if ($scope.productDetails.$valid === true) {
            $http({
                url: _url,
                method: _method,
                data: "name=" + $scope.product.name + "&price=" + $scope.product.price +"&cpu=" + $scope.product.cpu + "&gpu=" + $scope.product.gpu + "&quantities=" + $scope.product.quantities + "&rent_from=" + $scope.product.rent_from + "&rent_to=" + $scope.product.rent_to + "&description=" + $scope.product.description + "&leased=" + $scope.product.leased,
                headers: {
                    "x-access-token": sessionStorage.getItem("token"),
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function (response) {
                notify("Produkt zapisany", "success");
                window.location.href = "/#!/products";
            }, function (response) {
                notify(response.data.Message);
            });
        } else {
            notify("Proszę uzupełnić wszystkie wymagane pola");
        }

        $event.preventDefault();
    }

});

window.onload = function() {
    if (sessionStorage.getItem("token") !== null) {
        document.getElementById("loginLink").style.display = "none";
        document.getElementById("registerLink").style.display = "none";
        document.getElementById("logoutLink").style.display = "block";

        document.getElementById("logoutLink").addEventListener("click", function(e) {
            document.getElementById("loginLink").style.display = "block";
            document.getElementById("registerLink").style.display = "block";
            document.getElementById("logoutLink").style.display = "none";

            sessionStorage.clear();

            window.location.reload();

            e.preventDefault();
        });
    }
}
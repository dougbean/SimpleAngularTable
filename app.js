(function(angular) {
	
	'use strict';
	var app = angular.module("myApp", []); 
	app.controller("dataController",  ['$scope',  '$http', function($scope, $http) {
		
		var users = []; 
		var filtered = [];
		var reverseSort = false;
		
		$scope.currentPage = 0; 
		$scope.itemsPerPage = 5; //todo: make a text box for this or remove it from $scope
		$scope.pagedList = []; 
		$scope.searchText = ''; 
		
		$scope.setPage = function(pageIndex){
			$scope.currentPage = pageIndex;
		};

		$scope.onBlur = function () {
			setPagination();
		};

		$scope.keyPress = function () {
			setPagination();
		}; 
		
		function setPagination() {

			filtered = search($scope.searchText);

			if (filtered.length > 0) {
				paginate(filtered);
			} else {
				if (users.length > 0 && $scope.itemsPerPage > 0) {
					paginate(users);
				}
			}
		};
		
		function search(criteria){

			var filtered = [];

			if (users && users.length > 0 && (criteria))
			{	
			   for (var index in users) {
			   
				   var global_match = "g";
				   var regExp = new RegExp(criteria, global_match);	   
				   
				   var first_name = users[index].first_name;	    
				   var last_name = users[index].last_name;
				   var country = users[index].country;
				
				   var first_name_result = first_name.match(regExp);	   
				   var last_name_result = last_name.match(regExp);
				   var country_result = country.match(regExp);
				
				   if (first_name_result !== null) {
					   if (first_name_result == users[index].first_name) { 
						   filtered.push(users[index]);
					   }
				   }

				   if (last_name_result !== null) {
					   if (last_name_result == users[index].last_name) { 
						   filtered.push(users[index]);
					   }
				   }

				   if (country_result !== null) {
					   if (country_result == users[index].country) { 
						   filtered.push(users[index]);
					   }
				   }
			 }
		  }
		  return filtered;
		}

		function paginate(list) {
			setTwoDimensionalArray(list);
		};
		
		function setTwoDimensionalArray(list) {
			$scope.pagedList = [];
			for (var i = 0; i < list.length; i++) {
				
				var innerArrayIndex = getRemainder(i, $scope.itemsPerPage);
				var pageIndex = getPageIndex(i, $scope.itemsPerPage);
				
				if (innerArrayIndex === 0) {
					$scope.pagedList[pageIndex] = [list[i]];
				} else {
					$scope.pagedList[pageIndex].push(list[i]);
				}
			}
			$scope.currentPage = 0;
		}
		
		function getRemainder(index, itemsPerPage) {
			return (index % itemsPerPage);
		}
		
		function getPageIndex(index, itemsPerPage) {
			return Math.floor(index / itemsPerPage);
		}
		
		$scope.sort = function(header){
			sort(header);
		}; 

		function sort(header){
			if (filtered.length > 0) {
				  sortList(filtered, header)
				  paginate(filtered);
			} else {
				if (users.length > 0 && $scope.itemsPerPage > 0) {
					 sortList(users, header)
					 paginate(users);
				}
			}
		}
		
	   function sortList(list, header){
			if(reverseSort === false){
				sortByKeyAscending(list, header);
				reverseSort = true;
			}else{
				sortByKeyDescending(list, header);
				reverseSort = false;
			}
		}
		  
		function sortByKeyAscending(array, key) {
			return array.sort(function(a, b) {
				var x = a[key]; var y = b[key];
				return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});
		 }
		   
		 function sortByKeyDescending(array, key) {
			return array.sort(function(a, b) {
				var x = a[key]; var y = b[key];
				return ((x > y) ? -1 : ((x < y) ? 1 : 0));
			});
		 }

		 $scope.submitOnClick = function () {
			var oneList = [];
			for(var i in $scope.pagedList){
			   for(var x in $scope.pagedList[i]){
				   if($scope.pagedList[i][x].id){
					   oneList.push($scope.pagedList[i][x]);
				   }
			   }
			}
			
			for(var i in oneList)
			{
			   console.log(oneList[i]);
			}
		 };

		 /* get mock data from local function */
		 
	     users = getData();
		 if(users.length > 0 && $scope.itemsPerPage > 0)
		  {
			 paginate(users);
		  }

		 function getData() {
			 var data = [{ "id": 1, "first_name": "Charles", "last_name": "Murray", "email": "cmurray0@netlog.com", "country": "Poland" },
			 { "id": 2, "first_name": "Eric", "last_name": "Watson", "email": "ewatson1@patch.com", "country": "Colombia" },
			 { "id": 3, "first_name": "Christopher", "last_name": "Wagner", "email": "cwagner2@51.la", "country": "Nigeria" },
			 { "id": 4, "first_name": "Sarah", "last_name": "Hughes", "email": "shughes3@mozilla.com", "country": "Brazil" },
			 { "id": 5, "first_name": "Frances", "last_name": "Ray", "email": "fray4@google.ca", "country": "China" },
			 { "id": 6, "first_name": "Philip", "last_name": "White", "email": "pwhite5@yelp.com", "country": "Brazil" },
			 { "id": 7, "first_name": "Peter", "last_name": "Hernandez", "email": "phernandez6@nih.gov", "country": "Mexico" },
			 { "id": 8, "first_name": "Anne", "last_name": "White", "email": "awhite7@eepurl.com", "country": "China" },
			 { "id": 9, "first_name": "Julia", "last_name": "Fisher", "email": "jfisher8@naver.com", "country": "Brazil" },
			 { "id": 10, "first_name": "Stephen", "last_name": "Coleman", "email": "scoleman9@php.net", "country": "Philippines" },
			 { "id": 11, "first_name": "Helen", "last_name": "Riley", "email": "hrileya@bravesites.com", "country": "China" },
			 { "id": 12, "first_name": "Dorothy", "last_name": "Welch", "email": "dwelchb@home.pl", "country": "Indonesia" },
			 { "id": 13, "first_name": "Christopher", "last_name": "Coleman", "email": "ccolemanc@miitbeian.gov.cn", "country": "Czech Republic" },
			 { "id": 14, "first_name": "Jeremy", "last_name": "Foster", "email": "jfosterd@xing.com", "country": "Colombia" },
			 { "id": 15, "first_name": "Aaron", "last_name": "Hart", "email": "ahart2r@examiner.com", "country": "Argentina" }];
			 return data;
		 } 
		 
		/* get mock data from local function */

		/* use $http to get data */
		/* 
		$http.get('data.json').success(function(data) {

		   users = data;

			 if(users.length > 0 && $scope.itemsPerPage > 0)
			 {
				paginate(users);
			 }
		}); 
		*/
		/* use $http to get data */
	}]);
})(window.angular);
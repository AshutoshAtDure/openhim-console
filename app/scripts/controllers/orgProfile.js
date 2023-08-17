export function OrgProfileCtrl ($scope, $location, Alerting, $routeParams, Api) {
    $scope.userInfo = []
    $scope.users = ''
    $scope.sourceSystems = []
    $scope.programs = []
    $scope.resourceTypes = []
    $scope.subscriptionDetail = []
    $scope.subscriptions = []
    let userDetails = localStorage.getItem('userDetails')
    userDetails = JSON.parse(userDetails)
    $scope.userDetails = userDetails
    let orgid = userDetails.orgId
    let userId = userDetails._id
    $scope.activeArr = [];
    let subscriptionFor = userDetails.subscriptionFor;
    let subscriptionArr = [['649d8dd5dc3f428709eee141', 'hiu'], ['649d8dd5dc3f428709eee140', 'hip'], ['649d8dd5dc3f428709eee142', 'dashboard']]

    $scope.activeInactiveMapping = function () {
      $scope.activeArr = subscriptionArr.filter((ele) => {
      console.log(ele, subscriptionFor)
          ele[0] === subscriptionFor[0]
      }
      )
      console.log($scope.activeArr)
      if ($scope.activeArr[0]) {
      if($scope.activeArr[0][1] == 'hiu') {
        document.getElementById('hiuActive').classList.remove('hide')
        document.getElementById('hipInActive').classList.remove('hide')
        document.getElementById('dashboardInActive').classList.remove('hide')
      } else if ($scope.activeArr[0][1] == 'hip') {
        document.getElementById('hiuInActive').classList.remove('hide')
        document.getElementById('hipActive').classList.remove('hide')
        document.getElementById('dashboardInActive').classList.remove('hide')
      } else if ($scope.activeArr[0][1] == 'dashboard') {
        document.getElementById('hiuInActive').classList.remove('hide')
        document.getElementById('hipInActive').classList.remove('hide')
        document.getElementById('dashboardActive').classList.remove('hide')
      }
    }
    }

    Api.getTargetProgram.query({}, function (response) {
      $scope.isLoading = false
      Alerting.AlertReset()
      $scope.programs = response;
    
    }, function (err) {
      Alerting.AlertReset()
      $scope.isLoading = false
      if (err.status === 404) {
          Alerting.AlertAddMsg('bottom', 'info', 'Something went wrong!')
      } else {
          Alerting.AlertAddMsg('bottom', 'info', 'Something went wrong!')
      }
    })

    Api.getResourceType.query({}, function (response) {
      $scope.isLoading = false
      Alerting.AlertReset()
      $scope.resourceTypes = response;
    
    }, function (err) {
      Alerting.AlertReset()
      $scope.isLoading = false
      if (err.status === 404) {
          Alerting.AlertAddMsg('bottom', 'info', 'Something went wrong!')
      } else {
          Alerting.AlertAddMsg('bottom', 'info', 'Something went wrong!')
      }
    })

    $scope.changeActiveTab = function(str) {
        if(str == 'myProfile') {
        document.getElementById('myProfileBtn').classList.add('active')
        document.getElementById('mySubscriptionBtn').classList.remove('active')
        document.getElementById('userAccessManagementBtn').classList.remove('active')
        document.getElementById('myProfileDiv').classList.remove('hide')
        document.getElementById('mySubscriptionDiv').classList.add('hide')
        document.getElementById('userAccessManagementDiv').classList.add('hide')
        } else if(str == 'mySubscription') {
            document.getElementById('myProfileBtn').classList.remove('active')
            document.getElementById('mySubscriptionBtn').classList.add('active')
            document.getElementById('userAccessManagementBtn').classList.remove('active')

            document.getElementById('myProfileDiv').classList.add('hide')
            document.getElementById('mySubscriptionDiv').classList.remove('hide')
            document.getElementById('userAccessManagementDiv').classList.add('hide')
        } else if (str == 'userAccessManagement'){
            document.getElementById('myProfileBtn').classList.remove('active')
            document.getElementById('mySubscriptionBtn').classList.remove('active')
            document.getElementById('userAccessManagementBtn').classList.add('active')

            document.getElementById('myProfileDiv').classList.add('hide')
            document.getElementById('mySubscriptionDiv').classList.add('hide')
            document.getElementById('userAccessManagementDiv').classList.remove('hide')
        }
      }

    Api.getAllUsers.query({}, function (response) {
        $scope.isLoading = false
        Alerting.AlertReset()
        $scope.users = response;
        console.log($scope.users)
        console.log(orgid)
        $scope.userInfo = $scope.users.filter((user) => {
          console.log(orgid, user)
            if(orgid === user._id ) {
                return user
            }
        })
      }, function (err) {
        Alerting.AlertReset()
        $scope.isLoading = false
        if (err.status === 404) {
            Alerting.AlertAddMsg('bottom', 'info', 'Something went wrong!')
        } else {
            Alerting.AlertAddMsg('bottom', 'info', 'Something went wrong!')
        }
      })
      

      $scope.subscriptionDetails = function () {
        let userid = orgid
      Api.getSubscriptionDetails.query({userid}, function (response) {
        $scope.isLoading = false
        Alerting.AlertReset()
        $scope.subscriptionDetail = response;
        $scope.mapping()
        $scope.activeInactiveMapping()
      
      }, function (err) {
        Alerting.AlertReset()
        $scope.isLoading = false
        if (err.status === 404) {
            Alerting.AlertAddMsg('bottom', 'info', 'Something went wrong!')
        } else {
            Alerting.AlertAddMsg('bottom', 'info', 'Something went wrong!')
        }
      })
    }

    $scope.mapping  = function () {
      if ($scope.subscriptionDetail.length) {
        $scope.subscriptions = $scope.subscriptionDetail.map((element) => {
          
           element.resourceName = $scope.resourceTypes.filter((ele) => {
            return ele._id === element.resourceType._id
           })[0].name
       
           element.sourceName = $scope.sourceSystems.filter((ele) => {
            return ele._id === element.sourceSystem._id
          })[0].name
           element.programName = $scope.programs.filter((ele) => {
            console.log(ele, element )
            return ele._id === element.programType
          })[0].name
           return element;
        })
      }
      console.log($scope.subscriptions)
    }

      Api.getSourceSystem.query({}, async function (response) {
        $scope.isLoading = false
        Alerting.AlertReset()
        $scope.sourceSystems = await response;
        console.log(response, $scope.sourceSystems)
        $scope.subscriptionDetails()
        
      
      }, function (err) {
        Alerting.AlertReset()
        $scope.isLoading = false
        if (err.status === 404) {
            Alerting.AlertAddMsg('bottom', 'info', 'Something went wrong!')
        } else {
            Alerting.AlertAddMsg('bottom', 'info', 'Something went wrong!')
        }
      })

      Api.getMySubscription.query({orgid}, function (response) {
        $scope.isLoading = false
        Alerting.AlertReset()
        $scope.mySubscription = response
        // $scope.sourceSystems = response;
        // $scope.subscriptionDetails()
      }, function (err) {
        Alerting.AlertReset()
        $scope.isLoading = false
        if (err.status === 404) {
            Alerting.AlertAddMsg('bottom', 'info', 'Something went wrong!')
        } else {
            Alerting.AlertAddMsg('bottom', 'info', 'Something went wrong!')
        }
      })

      $scope.updateSubscription = function () {
        let arr = []
        document.getElementById('hip').checked ? arr.push({
          for: document.getElementById('hip').value,
          isActive: true 
        }) : ''
        document.getElementById('hiu').checked ? arr.push({
          for: document.getElementById('hiu').value,
          isActive: true 
        }) : ''
        document.getElementById('dashboard').checked ? arr.push({
          for: document.getElementById('dashboard').value,
          isActive: true 
        }) : ''
       
      
        const body = { 
          orgId: $scope.userDetails.orgId, 
          userId: orgid, 
          subscriptionFor: arr
      } 

      Api.updatedubscription.save(body, function (response) {
        $scope.isLoading = false
        Alerting.AlertReset()
        Alerting.AlertAddMsg('bottom', 'info', 'Subscription updation request sent succesfully!')
      
      }, function (err) {
        Alerting.AlertReset()
        $scope.isLoading = false
        if (err.status === 404) {
            Alerting.AlertAddMsg('bottom', 'info', 'Something went wrong!')
        } else {
            Alerting.AlertAddMsg('bottom', 'info', 'Something went wrong!')
        }
      })
      
      }

      $scope.addSubscription = function () {
        let programType = document.getElementById('programId').value
        let sourceSystem = document.getElementById('sourceId').value
        let resourceType = document.getElementById('resourceId').value
        console.log($scope.userInfo[0])
        let userId = $scope.userInfo[0]._id
        let subscriptionId = $scope.userDetails.orgId
        const body = {
           programType,
           sourceSystem,
           resourceType,
           userId: orgid,
           subscriptionId
        }
      console.log(body);
      Api.addSubscription.save(body, function (response) {
        $scope.isLoading = false
        Alerting.AlertReset()
        Alerting.AlertAddMsg('bottom', 'info', 'Subscription added succesfully!')
        $scope.subscriptionDetails()
      
      }, function (err) {
        Alerting.AlertReset()
        $scope.isLoading = false
        if (err.status === 404) {
            Alerting.AlertAddMsg('bottom', 'info', 'Something went wrong!')
        } else {
            Alerting.AlertAddMsg('bottom', 'info', 'Something went wrong!')
        }
      })
    }

    $scope.removeSubscription = function (item) {
      let subscriptionId = $scope.userDetails.orgId
      const body = {
        isActive: false, 
        comment: "wrong data is entered" 
      }
      console.log(body)
      const id = subscriptionId
      Api.removeSubscription.patch({id}, body, function (response) {
        $scope.isLoading = false
        Alerting.AlertReset()
      
      }, function (err) {
        Alerting.AlertReset()
        $scope.isLoading = false
        if (err.status === 404) {
            Alerting.AlertAddMsg('bottom', 'info', 'Something went wrong!')
        } else {
            Alerting.AlertAddMsg('bottom', 'info', 'Something went wrong!')
        }
      })
    }
}
export function PendingUserViewCtrl ($scope, $location, Alerting, $routeParams, Api) {
    $scope.userInfo = ''
    $scope.users = ''
    $scope.isLoading = false
    $scope.showRequestForInfo = false;
    $scope.tabName = ''
    $scope.infoArray = [['fieldName1', 'Desc1']]
    $scope.requestforInfoArr = [
      {
        name: 'FirstName',
        value: 'firstname'
      }, 
      {
        name: 'LastName',
        value: 'surname'
      }, 
      {
        name: 'Organization Name',
        value: 'orgName'
      }, 
      {
        name: 'Parent Organisation Name',
        value: 'parentOrg'
      }, 
      {
        name: 'Email',
        value: 'email'
      }, 
      {
        name: 'Organization Type',
        value: 'orgType'
      }, 
      {
        name: 'Department',
        value: 'department'
      }, 
      {
        name: 'Address',
        value: 'address'
      }, 
      {
        name: 'Country',
        value: 'country'
      },
      {
        name: 'Province',
        value: 'state'
      }, 
      {
        name: 'City',
        value: 'city'
      }, 
      {
        name: 'Zipcode',
        value: 'zipcode'
      }, 
      {
        name: 'Operational Status',
        value: 'operationalStatus'
      }, 
      {
        name: 'Organization Registration ID',
        value: 'facilityIdentifier'
      }, 
      {
        name: 'Registration Date',
        value: 'regDate'
      }, 
      {
        name: 'Purpose Of Use',
        value: 'purpose'
      }, 
      {
        name: 'Target Program',
        value: 'target'
      }, 
      {
        name: 'Subscription For',
        value: 'subscriptionFor'
      }, 
      {
        name: 'Resource Type',
        value: 'resourceType'
      },
      {
        name: 'Type Of Services Offered',
        value: 'typeOfServices'
      }, 
      {
        name: 'Human Resource For Health, Numbers By Cadre',
        value: 'humanResource'
      }, 
      {
        name: 'Opening Time',
        value: 'openingTime'
      }, 
      {
        name: 'Closing Time',
        value: 'closingTime'
      }, 
      {
        name: 'Common And Mapped Identifiers Per Location',
        value: 'indentifiers'
      },
      {
        name: 'Details On Infrastructure - Power, Water, Etc',
        value: 'additionalInfo'
      }, 
    ];
    $scope.requestedInfoArray = [];
    $scope.tab = $routeParams.state;
    if($scope.tab == 'registered') {
        $scope.tabName = 'Registered Users'
        document.getElementById('approve').classList.add('hide')
        document.getElementById('reject').classList.add('hide')
        document.getElementById('reinstate').classList.add('hide')
        Api.getUsers.query({}, function (response) {
          $scope.isLoading = false
          Alerting.AlertReset()
          $scope.users = response;
          console.log($scope.users)
          $scope.userInfo = $scope.users.filter((user) => {
              if($routeParams.userId === user._id ) {
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
    } else if($scope.tab == 'rejected') {
      $scope.tabName = 'Rejected Requests'
      document.getElementById('reject').classList.add('hide')
      document.getElementById('cancel').classList.add('hide')
      document.getElementById('reinstate').classList.add('hide')
    
      Api.getRejectedUsers.query({}, function (response) {
        $scope.isLoading = false
        Alerting.AlertReset()
        $scope.users = response;
        console.log($scope.users)
        $scope.userInfo = $scope.users.filter((user) => {
            if($routeParams.userId === user._id ) {
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
  }
    
    else if($scope.tab == 'cancelled') {
        $scope.tabName = 'Rejected Users'
        document.getElementById('reject').classList.add('hide')
        document.getElementById('cancel').classList.add('hide')
        document.getElementById('approve').classList.add('hide')
        Api.getCancelledSubscriber.query({}, function (response) {
          $scope.isLoading = false
          Alerting.AlertReset()
          $scope.users = response;
          console.log($scope.users)
          $scope.userInfo = $scope.users.filter((user) => {
              if($routeParams.userId === user._id ) {
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
    } else if($scope.tab == 'pending') {
        $scope.tabName = 'Pending Users'
        document.getElementById('cancel').classList.add('hide')
        document.getElementById('reinstate').classList.add('hide')
        Api.getPendingUsers.query({}, function (response) {
          $scope.isLoading = false
          Alerting.AlertReset()
          $scope.users = response;
          console.log($scope.users)
          $scope.userInfo = $scope.users.filter((user) => {
              if($routeParams.userId === user._id ) {
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
    }
  $scope.sendRequestForInfo = function () {
    $scope.infoArray.map((ele) => {
      const name = document.getElementById(ele[0]).value;
      const desc = document.getElementById(ele[1]).value
      var obj = {
        fieldName : name,
        comment: desc
      }
      $scope.requestedInfoArray.push(obj)
    })
    $scope.isLoading = true
    const body = {
        userId: $routeParams.userId,
        requestedField: $scope.requestedInfoArray
    }
    Api.sendMoreInfoRequest.save(body, function (response) {
        $scope.isLoading = false;
        if (str == accept) {
            Alerting.AlertAddMsg('bottom', 'info', 'Request for more information has been submitted.')
        } else {
            Alerting.AlertAddMsg('bottom', 'info', 'Some error has occurred.') 
        } 
    })
    }

    $scope.confirmDelete = function () {
        Alerting.AlertReset()
        document.getElementById('confirmPopup').classList.remove('hide')
    }
    
    $scope.addRow = function() {
      $scope.infoArray.push([`fieldName${($scope.infoArray.length + 1 )}`, `Desc${($scope.infoArray.length + 1)}`])
      const infoDiv = document.getElementById('askForInfoDiv');
      var newDiv = document.createElement("div");
      newDiv.classList.add('infoContainer')
      newDiv.innerHTML = `
        <div class="col-lg-4 p-2">
          <div class="mb-3">
            <label class="form-label" for="fieldName${$scope.infoArray.length}" ng-model="fieldName${$scope.infoArray.length}" name="fieldName${$scope.infoArray.length}">Field Name<sup>*</sup></label>
            <select class="form-select" ng-model="fieldName${$scope.infoArray.length}" id="fieldName${$scope.infoArray.length}" aria-label="fieldName${$scope.infoArray.length}">
              <option selected disabled>Please Select</option>
            </select>
          </div>
        </div>
        <div class="col-lg-4 p-2">
          <div class="mb-3">
            <label class="form-label" for="Desc${$scope.infoArray.length}">If Other</label>
            <input type="text" class="form-control" id="Desc${$scope.infoArray.length}" placeholder="" />
          </div>
        </div>
      `;

      infoDiv.appendChild(newDiv);
      for (var i = 0; i < $scope.requestforInfoArr.length; i++) {
        const element = document.createElement('option');
        element.value = $scope.requestforInfoArr[i].value
        element.innerHTML = $scope.requestforInfoArr[i].name
        document.getElementById(`fieldName${$scope.infoArray.length}`).appendChild(element)
      }
    }

    $scope.requestForMoreInfo = function( ){
      $scope.showRequestForInfo = !$scope.showRequestForInfo
    }

    $scope.acceptReject = function (id, str) {
        console.log(id, str)
        $scope.isLoading = true
        const body = {
            approved: str === 'accept'
        }
        Api.acceptReject.patch({id}, body, function (response) {
            $scope.isLoading = false;
            if (str == 'accept') {
              $window.location = `#!/pendingRequests`
                Alerting.AlertAddMsg('bottom', 'info', 'Registration request has been approved.')
            } else {
                Alerting.AlertAddMsg('bottom', 'info', 'Registeration request has been rejected.') 
            } 
        })
      }

      $scope.cancel = function (str) {
        var id  = $routeParams.userId;
        if (str == 'close') {
        document.getElementById('confirmPopup').classList.add('hide')
        return;
        }
        $scope.isLoading = true
        const body = {
            isActive: false,
            comment: document.getElementById('reasonTextBox').value
        }
        Api.cancelSubscription.patch({id}, body, function (response) {
            $scope.isLoading = false;
            Alerting.AlertAddMsg('bottom', 'info', 'User Subscription has been cancelled')
            document.getElementById('confirmPopup').classList.add('hide')
        })
      }


      $scope.acceptCancelled = function (str) {
        var id  = $routeParams.userId;
        $scope.isLoading = true
        const body = {
            isActive: true,
            comment: 'subscription re-activated'
        }
        Api.reactivateSubscription.patch({id}, body, function (response) {
            $scope.isLoading = false;
            Alerting.AlertAddMsg('bottom', 'info', 'User Subscription has been Reinstated')
        })
      }
  
}
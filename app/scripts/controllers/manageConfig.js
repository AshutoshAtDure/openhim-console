export function ManageConfigCtrl ($scope, $location, Alerting, $routeParams, Api) {
    $scope.userInfo = ''
    $scope.users = ''
    $scope.username = '';
    $scope.password = '';
    $scope.url = '';
    $scope.urlDetails= '';
    $scope.apiName = '';
    $scope.isLoading = false
    console.log('called')
    $scope.id = $routeParams.registrationId;
    console.log($scope.id)
    let userDetails = localStorage.getItem('userDetails')
    userDetails = JSON.parse(userDetails)
    $scope.userDetails = userDetails
    let orgid = $scope.userDetails.orgId

   
    


    $scope.changeAPIActiveTab = function(str) {
        if(str == 'params') {
            document.getElementById('params').classList.add('active')
            document.getElementById('auth').classList.remove('active')
            document.getElementById('headers').classList.remove('active')
            document.getElementById('body1').classList.remove('active')
    
            document.getElementById('paramsTab').classList.remove('hide')
            document.getElementById('authTab').classList.add('hide')
            document.getElementById('headersTab').classList.add('hide')
            document.getElementById('bodyTab').classList.add('hide')
    
           
         
            } else if(str == 'auth') {
                document.getElementById('params').classList.remove('active')
                document.getElementById('auth').classList.add('active')
                document.getElementById('headers').classList.remove('active')
                document.getElementById('body1').classList.remove('active')
    
                document.getElementById('paramsTab').classList.add('hide')
                document.getElementById('authTab').classList.remove('hide')
                document.getElementById('headersTab').classList.add('hide')
                document.getElementById('bodyTab').classList.add('hide')
    
           
            }
            else if(str == 'headers') {
                document.getElementById('params').classList.remove('active')
                document.getElementById('auth').classList.remove('active')
                document.getElementById('headers').classList.add('active')
                document.getElementById('body1').classList.remove('active')
    
                document.getElementById('paramsTab').classList.add('hide')
                document.getElementById('authTab').classList.add('hide')
                document.getElementById('headersTab').classList.remove('hide')
                document.getElementById('bodyTab').classList.add('hide')
    
         
            }
            else if(str == 'body') {
                document.getElementById('params').classList.remove('active')
                document.getElementById('auth').classList.remove('active')
                document.getElementById('headers').classList.remove('active')
                document.getElementById('body1').classList.add('active')
    
                document.getElementById('headersTab').classList.add('hide')
                document.getElementById('authTab').classList.add('hide')
                document.getElementById('headersTab').classList.add('hide')
                document.getElementById('bodyTab').classList.remove('hide')   
            }

      }

        let id = $scope.id
        Api.addNewAPI.query({id}, function (response) {
            console.log('came')
            Alerting.AlertReset()
            $scope.isLoading = false
            $scope.urlDetails = response;
            if(response.interval.recurringType == 'weekly') {
              document.getElementById('weekly').checked = true
            } else if (response.interval.recurringType == 'monthly') {
              document.getElementById('monthly').checked = true
            } else if (response.interval.recurringType == 'eod') {
              document.getElementById('eod').checked = true
            } else if (response.interval.recurringType == 'hourly') {
              document.getElementById('hourly').checked = true
            }
            $scope.url = response.api;
            $scope.apiName = response.name;
            $scope.username = response.authorization.userid;
            $scope.password = response.authorization.password;
            document.getElementById('basic-default-name').value = response.interval.hour
          }, function (err) {
            Alerting.AlertReset()
            console.log(err)
            $scope.isLoading = false
            if (err.status === 404) {
              Alerting.AlertAddMsg('bottom', 'info', 'Method not found!')
            }
          })
          

          $scope.addNewUrl = function () {
            $scope.isLoading = true
            const url = $scope.url
            const username = $scope.username
            const password = $scope.password
            const body = {
              api: url,
              authorization: {
                authorizationtype: '',
                userid: username,
                password
              },
              params: [],
              orgId: orgid,
              interval: {
      
              }
            }
    
            if(document.getElementById('hourly').checked) {
              body.interval.recurringType = 'hourly'
              body.interval.hour = document.getElementById('basic-default-name').value
            } else if (document.getElementById('weekly').checked) {
              body.interval.recurringType = 'weekly'
            } else if (document.getElementById('monthly').checked) {
              body.interval.recurringType = 'monthly'
            } else if (document.getElementById('eod').checked) {
              body.interval.recurringType = 'eod'
            }
            console.log(body)
            let id = $scope.id
            Api.manageAPI.put({id}, body, function (response) {
                Alerting.AlertReset()
                $scope.isLoading = false
                Alerting.AlertAddMsg('bottom', 'info', 'Configured a new API Successfully!')
              }, function (err) {
                Alerting.AlertReset()
                $scope.isLoading = false
                if (err.status === 404) {
                  Alerting.AlertAddMsg('bottom', 'info', 'Method not found!')
                } else {
                  Alerting.AlertAddMsg('bottom', 'danger', 'An error occurred while trying to request API Configuration!')
                }
              })
          }
}
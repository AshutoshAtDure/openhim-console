
import moment from 'moment'
export function PendingUsersCtrl ($scope, $location, $window, Alerting, Api) {
    $scope.isLoading = false
    $scope.chosenId = ''
    $scope.isLoading = true;
    $scope.callApis = function () {
    
    Api.getPendingUsers.query({}, function (response) {
        $scope.isLoading = false
        Alerting.AlertReset()
        response.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())
        let res = response.map((ele) => { ele.updated = moment(ele.updated).utc().format('YYYY-MM-DD'); return ele})
        $scope.users = res;
        $scope.getExistingSubscriptionRequest()
        $scope.showFormCtrl = false
      }, function (err) {
        Alerting.AlertReset()
        $scope.isLoading = false
        if (err.status === 404) {
          Alerting.AlertAddMsg('forgotPassword', 'danger', 'Could not authenticate email address')
        } else {
          Alerting.AlertAddMsg('forgotPassword', 'danger', 'An error occurred while trying to request a password reset. Please contact your system administrator')
        }
      })

      $scope.getExistingSubscriptionRequest = function () {
        
      Api.getPendingSubscriptions.query({},function (response) {
        $scope.isLoading = false
        Alerting.AlertReset()
        response.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())
        let res = response.map((ele) => { ele.updated = moment(ele.created).utc().format('YYYY-MM-DD'); return ele})
        const req = res.map((ele) => {
            return {
              orgName: ele.orgId.orgName,
              _id: ele._id,
              subscriptionFor: ele.subscriptionFor,
              updated: ele.updated,
              ExistingUser: 'Existing'
            }
        })
        $scope.users.push(...req)
        console.log(req)
      }, function (err) {
        Alerting.AlertReset()
        $scope.isLoading = false
        if (err.status === 404) {
          Alerting.AlertAddMsg('forgotPassword', 'danger', 'Could not authenticate email address')
        } else {
          Alerting.AlertAddMsg('forgotPassword', 'danger', 'An error occurred while trying to request a password reset. Please contact your system administrator')
        }
      })
      }


      Api.getRegisteredUsers.query({}, function (response) {
        Alerting.AlertReset()
        response.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())
        let res = response.map((ele) => { ele.updated = moment(ele.updated).utc().format('YYYY-MM-DD'); return ele})
        console.log(res);
        $scope.registered = res;
        $scope.isLoading = false
        $scope.showFormCtrl = false
      }, function (err) {
        Alerting.AlertReset()
        $scope.isLoading = false
        if (err.status === 404) {
          Alerting.AlertAddMsg('forgotPassword', 'danger', 'Could not authenticate email address')
        } else {
          Alerting.AlertAddMsg('forgotPassword', 'danger', 'An error occurred while trying to request a password reset. Please contact your system administrator')
        }
      })
 
      Api.getRejectedUsers.query({}, function (response) {
        Alerting.AlertReset()
        $scope.isLoading = false
        response.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())
        let res = response.map((ele) => { ele.updated = moment(ele.updated).utc().format('YYYY-MM-DD'); return ele})
        $scope.rejected = res;
        $scope.showFormCtrl = false
      }, function (err) {
        Alerting.AlertReset()
        $scope.isLoading = false
        if (err.status === 404) {
          Alerting.AlertAddMsg('forgotPassword', 'danger', 'Could not authenticate email address')
        } else {
          Alerting.AlertAddMsg('forgotPassword', 'danger', 'An error occurred while trying to request a password reset. Please contact your system administrator')
        }
      })

      Api.getCancelledSubscriber.query({}, function (response) {
        Alerting.AlertReset()
        $scope.isLoading = false
        response.sort((a, b) => new Date(b.updated).getTime() - new Date(a.updated).getTime())
        let res = response.map((ele) => { ele.expiry = moment(ele.expiry).utc().format('YYYY-MM-DD'); return ele})
        $scope.cancelled = res;
      
        $scope.showFormCtrl = false
      }, function (err) {
        Alerting.AlertReset()
        $scope.isLoading = false
        if (err.status === 404) {
          Alerting.AlertAddMsg('forgotPassword', 'danger', 'Could not authenticate email address')
        } else {
          Alerting.AlertAddMsg('forgotPassword', 'danger', 'An error occurred while trying to request a password reset. Please contact your system administrator')
        }
      })
    }

    $scope.callApis();

      $scope.acceptReject = function (id, str) {
        console.log(id, str)// Replace with your A
        $scope.isLoading = true
        if (str == 'closePopup') {
          document.getElementById('confirmPopup').classList.add('hide')
          $scope.isLoading = false
          $scope.chosenId = ''
          return
        }
        const reason = document.getElementById('reasonTextBox').value
        const body = {
            approved: str === 'accept'
        }
        if (str == 'reject') { 
          body.comment = reason;
          id = $scope.chosenId
        }
        Api.acceptReject.patch({id}, body, function (response) {
            $scope.isLoading = false;
            $scope.callApis()
            if (str == 'accept') {
                Alerting.AlertAddMsg('bottom', 'info', 'Registration request has been approved.')
            } else {
                Alerting.AlertAddMsg('bottom', 'info', 'Registeration request has been rejected.') 
            } 
        })
      }


      $scope.confirmDelete = function (id) {
        Alerting.AlertReset()
        document.getElementById('confirmPopup').classList.remove('hide')
        $scope.chosenId = id
      }

      $scope.viewUser = function (id, state) {
        $window.location = `#!/pendingUserRequest/${id}/${state}`
      }

      $scope.changeActiveTab = function(str) {
        if(str == 'pending') {
        document.getElementById('pendingBtn').classList.add('active')
        document.getElementById('registeredBtn').classList.remove('active')
        document.getElementById('rejectedBtn').classList.remove('active')
        document.getElementById('cancelledBtn').classList.remove('active')

        document.getElementById('pending').classList.remove('hide')
        document.getElementById('registered').classList.add('hide')
        document.getElementById('rejected').classList.add('hide')
        document.getElementById('cancelled').classList.add('hide')
        } else if(str == 'registered') {
            document.getElementById('pendingBtn').classList.remove('active')
            document.getElementById('registeredBtn').classList.add('active')
            document.getElementById('rejectedBtn').classList.remove('active')
            document.getElementById('cancelledBtn').classList.remove('active')

            document.getElementById('pending').classList.add('hide')
            document.getElementById('registered').classList.remove('hide')
            document.getElementById('rejected').classList.add('hide')
            document.getElementById('cancelled').classList.add('hide')
        } else if (str == 'rejected'){
            document.getElementById('pendingBtn').classList.remove('active')
            document.getElementById('registeredBtn').classList.remove('active')
            document.getElementById('rejectedBtn').classList.add('active')
            document.getElementById('cancelledBtn').classList.remove('active')

            document.getElementById('pending').classList.add('hide')
            document.getElementById('registered').classList.add('hide')
            document.getElementById('rejected').classList.remove('hide')
            document.getElementById('cancelled').classList.add('hide')
        } else if (str == 'cancelled') {
          document.getElementById('pendingBtn').classList.remove('active')
          document.getElementById('registeredBtn').classList.remove('active')
          document.getElementById('rejectedBtn').classList.remove('active')
          document.getElementById('cancelledBtn').classList.add('active')

          document.getElementById('pending').classList.add('hide')
          document.getElementById('registered').classList.add('hide')
          document.getElementById('rejected').classList.add('hide')
          document.getElementById('cancelled').classList.remove('hide')

        }
      }
    }
  
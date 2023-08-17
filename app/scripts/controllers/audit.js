
export function OrgAuditCtrl ($scope, $location, Alerting, $routeParams, Api) {
let userDetails = localStorage.getItem('userDetails')
userDetails = JSON.parse(userDetails)
$scope.userDetails = userDetails;
const orgid = $scope.userDetails.orgId
$scope.dataTransferLogs = []
$scope.fileUploadLogs = []

Api.getFileUploadLog.query({orgid}, function (response) {
    $scope.isLoading = false
    Alerting.AlertReset()
    $scope.fileUploadLogs = response;

}, function (err) {
    Alerting.AlertReset()
    $scope.isLoading = false
    if (err.status === 404) {
        Alerting.AlertAddMsg('bottom', 'info', 'Something went wrong!')
    } else {
        Alerting.AlertAddMsg('bottom', 'info', 'Something went wrong!')
    }
})

Api.getDataTransferLog.query({orgid}, function (response) {
    $scope.isLoading = false
    Alerting.AlertReset()
    $scope.dataTransferLogs = response;

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
    if(str == 'fileUpload') {
    document.getElementById('fileUploadBtn').classList.add('active')
    document.getElementById('onlineTransferBtn').classList.remove('active')
    document.getElementById('dataConfigurationBtn').classList.remove('active')

    document.getElementById('fileUploadDiv').classList.remove('hide')
    document.getElementById('onlineTransferDiv').classList.add('hide')
    document.getElementById('dataConfigurationDiv').classList.add('hide')
    } else if(str == 'onlineTransfer') {
        document.getElementById('fileUploadBtn').classList.remove('active')
        document.getElementById('onlineTransferBtn').classList.add('active')
        document.getElementById('dataConfigurationBtn').classList.remove('active')

        document.getElementById('fileUploadDiv').classList.add('hide')
        document.getElementById('onlineTransferDiv').classList.remove('hide')
        document.getElementById('dataConfigurationDiv').classList.add('hide')
    } else if (str == 'dataConfiguration'){
        document.getElementById('fileUploadBtn').classList.remove('active')
        document.getElementById('onlineTransferBtn').classList.remove('active')
        document.getElementById('dataConfigurationBtn').classList.add('active')

        document.getElementById('fileUploadDiv').classList.add('hide')
        document.getElementById('onlineTransferDiv').classList.add('hide')
        document.getElementById('dataConfigurationDiv').classList.remove('hide')
    }
  }
}
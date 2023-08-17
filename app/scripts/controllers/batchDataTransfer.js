export function BatchDataTransferCtrl ($scope, $location, Alerting, $routeParams, Api) {

    $scope.programs = []
    $scope.resourceTypes = []
    $scope.sourcesystems = []
    let userDetails = localStorage.getItem('userDetails')
    userDetails = JSON.parse(userDetails)
    $scope.userDetails = userDetails
    const stepButtons = document.querySelectorAll('.step-button');
    const progress = document.querySelector('#progress');

    console.log($scope.userDetails)

    $scope.setStepper = function(step) {
        progress.setAttribute('value', 100/3 * (step - 1))
        stepButtons.forEach((item, index)=>{
            if(step > index){
                item.classList.add('done');
            }
            if(step < index){
                item.classList.remove('done');
            }
        })

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

      Api.getSourceSystem.query({}, function (response) {
        $scope.isLoading = false
        Alerting.AlertReset()
        $scope.sourcesystems = response;
      
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
            Alerting.AlertAddMsg('bottom', 'danger', 'Something went wrong!')
        } else {
            Alerting.AlertAddMsg('bottom', 'info', 'Something went wrong!')
        }
      })


      $scope.uploadFile = function() {
        const fileInputElement = document.getElementById('formFile')
        const resource = document.getElementById('resourceId').value
        const program = document.getElementById('programId').value
        const source = document.getElementById('systemId').value
        const formData = new FormData();
        formData.append("orgid", $scope.userDetails.orgId);
        formData.append("userid", $scope.userDetails._id);
        formData.append("file", fileInputElement.files[0]);
        formData.append("resource", resource);
        formData.append("program", program);
        formData.append("system", source);
    
        
        Api.fileUpload.save(formData, function (response) {
            Alerting.AlertReset()
            $scope.setStepper(2)
            Api.uploadDataToFhir.save(function (response) {
                console.log(response)
                $scope.setStepper(3)
                Api.runShFile.save(function (response) {
                    Alerting.AlertAddMsg('bottom', 'success', 'Succesfully completed data transfer!')
                    $scope.setStepper(4)
                }, function (err) {
                    Alerting.AlertAddMsg('bottom', 'danger', 'Error in running ETL!')
                })
            }, function (err) {
                Alerting.AlertAddMsg('bottom', 'danger', 'Error in uploading data to FHIR!')
            })
          }, function (err) {
            Alerting.AlertReset()
            console.log(err)
            $scope.isLoading = false
            if (err.status === 404) {
              Alerting.AlertAddMsg('bottom', 'info', 'Method not found!')
            }
          })
      }
}
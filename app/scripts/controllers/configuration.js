export function configurationCtrl ($scope, $location, $window, Alerting, Api) {
    $scope.isLoading = false;
    $scope.username = '';
    $scope.password = '';
    $scope.url = '';
    $scope.urls = '';
    $scope.programs = []
    $scope.resourceTypes = []
    $scope.sourcesystems = []
    $scope.systemList = [];
    $scope.showIncompleteErr = false;
    $scope.showConfigIncompleteErr = false;
  
    $scope.isExpanded = false;
    let userDetails = localStorage.getItem('userDetails')
    userDetails = JSON.parse(userDetails)
    $scope.userDetails = userDetails
    let orgid = $scope.userDetails.orgId
    $scope.orgid = orgid
    $scope.orgName = ''
    const stepButtons = document.querySelectorAll('.step-button');
    const progress = document.querySelector('#progress');

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

    $scope.toggleView = function (str) {
       if(str === 'yes') {
         document.getElementById('toggleDiv').classList.add('hide')
       } else {
        document.getElementById('toggleDiv').classList.remove('hide')
       }
    }

    $scope.addMapper = function () {
      const resource = document.getElementById('resourceId').value
      const program = document.getElementById('programId').value
      const source = document.getElementById('systemId').value
      if (resource !== 'Please Select' && program !== 'Please Select' && source !== 'Please Select') {
        $scope.showIncompleteErr = false
      } else {
        $scope.showIncompleteErr = true
        return;
      }
      const body = {
      subscriptionId: $scope.orgid,
   
       mapDataConfig: [
        {
            programType: program,
            sourceSystem: source,
            resourceType: resource,
            mapper: "64cc9a7c080c82356ba8b277",
            isfhircompliant: true
        }]
      }
      Api.addMapperConfig.save(body ,function (response) {
        console.log('came')
        Alerting.AlertReset()
        $scope.isLoading = false
        $scope.getMapper()
        Alerting.AlertAddMsg('bottom', 'info', 'Configured Mapping Successfully!')
      }, function (err) {
        Alerting.AlertReset()
        console.log(err)
        $scope.isLoading = false
        if (err.status === 404) {
          Alerting.AlertAddMsg('bottom', 'info', 'Method not found!')
        }
      })
    }

    $scope.getMapper = function () {
      Api.getMappers.query({orgid}, function (response) {
        $scope.isLoading = false
        Alerting.AlertReset()
        $scope.systemList = response;
      
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

    $scope.getMapper()


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

    $scope.changeActiveTab = function(str) {
        if(str == 'transfer') {
        document.getElementById('transfer').classList.add('active')
        document.getElementById('manage').classList.remove('active')

        document.getElementById('transferTab').classList.remove('hide')
        document.getElementById('manageTab').classList.add('hide')
     
        } else if(str == 'manage') {
            document.getElementById('transfer').classList.remove('active')
            document.getElementById('manage').classList.add('active')

            document.getElementById('transferTab').classList.add('hide')
            document.getElementById('manageTab').classList.remove('hide')
        }
      }

      $scope.changeSubActiveTab = function(str) {
        if(str == 'mapData') {
        document.getElementById('mapData').classList.add('active')
        document.getElementById('dataTransferMethod').classList.remove('active')

        document.getElementById('mapDataTab').classList.remove('hide')
        document.getElementById('transferMethodTab').classList.add('hide')
     
        } else if(str == 'dataTransfer') {
            document.getElementById('mapData').classList.remove('active')
            document.getElementById('dataTransferMethod').classList.add('active')

            document.getElementById('mapDataTab').classList.add('hide')
            document.getElementById('transferMethodTab').classList.remove('hide')
        }
      }

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

      $scope.changeInnerSubActiveTab = function(str) {
        if(str == 'fileUpload') {
        document.getElementById('fileUploadBtn').classList.add('active')
        document.getElementById('sftpBtn').classList.remove('active')
        document.getElementById('apiBtn').classList.remove('active')
        document.getElementById('realTimeBtn').classList.remove('active')

        document.getElementById('fileUploadTab').classList.remove('hide')
        document.getElementById('sftpTab').classList.add('hide')
        document.getElementById('apiTab').classList.add('hide')
        document.getElementById('realTimeTab').classList.add('hide')

       
     
        } else if(str == 'sftp') {
            document.getElementById('fileUploadBtn').classList.remove('active')
            document.getElementById('sftpBtn').classList.add('active')
            document.getElementById('apiBtn').classList.remove('active')
            document.getElementById('realTimeBtn').classList.remove('active')

            document.getElementById('fileUploadTab').classList.add('hide')
            document.getElementById('sftpTab').classList.remove('hide')
            document.getElementById('apiTab').classList.add('hide')
            document.getElementById('realTimeTab').classList.add('hide')

       
        }
        else if(str == 'api') {
            document.getElementById('fileUploadBtn').classList.remove('active')
            document.getElementById('sftpBtn').classList.remove('active')
            document.getElementById('apiBtn').classList.add('active')
            document.getElementById('realTimeBtn').classList.remove('active')

            document.getElementById('fileUploadTab').classList.add('hide')
            document.getElementById('sftpTab').classList.add('hide')
            document.getElementById('apiTab').classList.remove('hide')
            document.getElementById('realTimeTab').classList.add('hide')

     
        }
        else if(str == 'realTime') {
            document.getElementById('fileUploadBtn').classList.remove('active')
            document.getElementById('sftpBtn').classList.remove('active')
            document.getElementById('apiBtn').classList.remove('active')
            document.getElementById('realTimeBtn').classList.add('active')

            document.getElementById('fileUploadTab').classList.add('hide')
            document.getElementById('sftpTab').classList.add('hide')
            document.getElementById('apiTab').classList.add('hide')
            document.getElementById('realTimeTab').classList.remove('hide')

           
        }
      }

      $scope.getAllUrls = function () {
        $scope.isLoading = true
        let id = orgid
        Api.addNewAPIOrg.query({orgid}, function (response) {
            console.log('came')
            Alerting.AlertReset()
            $scope.isLoading = false
            $scope.urls = response;
          }, function (err) {
            Alerting.AlertReset()
            console.log(err)
            $scope.isLoading = false
            if (err.status === 404) {
              Alerting.AlertAddMsg('bottom', 'info', 'Method not found!')
            }
          })
      }

      $scope.proceed = function () {
        $scope.changeSubActiveTab('dataTransfer')
      }

      $scope.parseJsonFile = async function (file) {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader()
          fileReader.onload = event => resolve(JSON.parse(event.target.result))
          fileReader.onerror = error => reject(error)
          fileReader.readAsText(file)
        })
      }
      
    

      $scope.uploadMapper = async function () {
        console.log('ran')
        const file = document.getElementById('formFile').files[0];
        const object = await $scope.parseJsonFile(file)
        console.log(object)
        $scope.isLoading = true
        Api.addMapper.save(object,function (response) {
            console.log('came')
            Alerting.AlertReset()
            $scope.isLoading = false
            Alerting.AlertAddMsg('bottom', 'info', 'Configured Mapping JSON Successfully!')
          }, function (err) {
            Alerting.AlertReset()
            console.log(err)
            $scope.isLoading = false
            if (err.status === 404) {
              Alerting.AlertAddMsg('bottom', 'info', 'Method not found!')
            }
          })
      }

      $scope.runURL = function (item) {
        $scope.setStepper(1)
        console.log('called', item)
        const url = item.api
        const username = item.authorization.userid;
        const password = item.authorization.password
        const body = {
            api: url,
            userid: username,
            password 
        }
        Api.runConfiguredUrl.save(body,function (response) {
            Alerting.AlertReset()
            $scope.setStepper(2)
            Api.uploadDataToFhir.save(function (response) {
                console.log(response)
                $scope.setStepper(3)
                Api.runShFile.save(function (response) {
                    console.log(response)
                    $scope.setStepper(4)
                }, function (err) {
                    console.log(err)
                })
            }, function (err) {
                console.log(err)
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

      $scope.getAllUrls()

      $scope.viewUser = function (id) {
        $window.location = `#!/manageConfig/${id}`
      }

      $scope.deleteAPI = function (id) {
        Api.deleteAPI.delete({id}, function (response) {
          Alerting.AlertReset()
          $scope.isLoading = false
          Alerting.AlertAddMsg('bottom', 'info', 'API deleted Successfully!')
        }, function (err) {
          Alerting.AlertReset()
          $scope.isLoading = false
          if (err.status === 404) {
            Alerting.AlertAddMsg('bottom', 'info', 'Method not found!')
          } else {
            Alerting.AlertAddMsg('bottom', 'danger', 'An error occurred while trying to request API Deletion!')
          }
        })
      }
    
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
          programType: "649d8d1fdc3f428709eee135", 
          sourceSystem: "649d8e83dc3f428709eee14b", 
          resourceType: "649d8e30dc3f428709eee145", 
          interval: {
          },
          name: document.getElementById('apiName').value
        }
     
        if(document.getElementById('hourly').checked) {
          body.interval.recurringType = 'hourly'
          body.interval.hour = document.getElementById('numberOdHours').value
        } else if (document.getElementById('weekly').checked) {
          body.interval.recurringType = 'weekly'
        } else if (document.getElementById('monthly').checked) {
          body.interval.recurringType = 'monthly'
        } else if (document.getElementById('eod').checked) {
          body.interval.recurringType = 'eod'
        }
        console.log(body)

        if (username !== '' && password !== '' && document.getElementById('apiName').value !== '' && url !== '' && body.interval) {
          $scope.showConfigIncompleteErr = false
        } else {
          $scope.showConfigIncompleteErr = true
          return;
        }
      
        Api.addNewAPI.save(body, function (response) {
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
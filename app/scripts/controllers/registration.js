export function RegistrationCtrl ($scope, $location, Alerting, Api) {
  $scope.showFormCtrl = true;
  $scope.isLoading = false
  $scope.showIncompleteErr = false;
  $scope.showCheckboxErr = false;
  $scope.countries = [];
  $scope.provinces = [];
  $scope.districts = [];
  $scope.isLoading = false
  $scope.resources = [];
  $scope.programs = [];
  $scope.sources = [];
  $scope.subscriptionFor = [];
  $scope.users = [];
  $scope.forms = {};
  $scope.forms.form1 = {};
  $scope.forms.form2 = {};
  $scope.forms.form3 = {};// Initialize $scope.forms.form1 as an object
  $scope.forms.form1.userEmail = '';
  $scope.forms.form1.firstName = '';
  $scope.forms.form1.lastName = '';
  $scope.forms.form1.orgName = '';
  $scope.forms.form1.parentOrgName = '';
  $scope.forms.form1.orgType = '';
  $scope.forms.form1.department = '';
  $scope.forms.form1.address = '';
  $scope.forms.form1.city = '';
  $scope.forms.form1.state = '';
  $scope.forms.form1.country = '';
  $scope.forms.form1.zipcode = '';
  $scope.forms.form1.recordDate = '';
  $scope.forms.form1.operationalStatus = '';
  $scope.forms.form1.facilityIdentifier = '';
  $scope.forms.form1.regDate = '';


  $scope.forms.form2.purpose = '';
  $scope.forms.form2.target = '';
  $scope.forms.form2.subscriptionFor = '';
  $scope.forms.form2.resourceType = '';
  $scope.forms.form2.additionalInfo = '';

  $scope.forms.form2.typeOfServices = '';
  $scope.forms.form2.humanResource = '';
  $scope.forms.form2.indentifiers = '';
  $scope.forms.form2.details = '';
  $scope.forms.form2.openingTime = '';
  $scope.forms.form2.closingTime = '';
  if(!$scope.showCheckboxErr && !$scope.showIncompleteErr) {
    document.getElementById('submitBtn').classList.remove('disabled')
}

Api.getCountry.query(function (response) {
  $scope.isLoading = false
  
  $scope.countries = response;
  Alerting.AlertReset()
}, function (err) {
  $scope.isLoading = false
  Alerting.AlertReset()
})

Api.getMaster.query(function (response) {
  $scope.isLoading = false
  $scope.resources = response.resourcetype;
  $scope.programs = response.targetprogram;
  $scope.sources = response.sourcesystem;
  $scope.subscriptionFor = response.subscriptionfor;
  $scope.users = response.usertype;
  Alerting.AlertReset()
}, function (err) {
  console.log(err)
  $scope.isLoading = false
  Alerting.AlertReset()
}) 



  $scope.onCountryChange = async function () {
    var parentid = JSON.parse(document.getElementById('country').value)._id
    Api.getProvince.query({parentid}, function (response) {
      $scope.isLoading = false
      $scope.provinces = response;
      Alerting.AlertReset()
    }, function (err) {
      $scope.isLoading = false
      Alerting.AlertReset()
    })
  }

  $scope.onProvinceChange = async function () {
    var parentid = JSON.parse(document.getElementById('state').value)._id
    Api.getDistrict.query({parentid}, function (response) {
      $scope.isLoading = false
      $scope.districts = response;
      Alerting.AlertReset()
    }, function (err) {
      $scope.isLoading = false
      Alerting.AlertReset()
    })
  }

  $scope.submitForms = function () {
    
    const email = $scope.forms.form1.userEmail.$modelValue || '';
    const firstname = $scope.forms.form1.firstName.$modelValue || '';
    const surname = $scope.forms.form1.lastName.$modelValue || '';
    const orgName =  $scope.forms.form1.orgName.$modelValue || '';
    const parentOrg = $scope.forms.form1.parentOrgName.$modelValue || '';
    const orgType = $scope.forms.form1.orgType.$modelValue || '';
    const department = $scope.forms.form1.department.$modelValue || '';
    const address = $scope.forms.form1.address.$modelValue || '';
    const city = JSON.parse(document.getElementById('city').value).name
    const state = JSON.parse(document.getElementById('state').value).name
    const country = JSON.parse(document.getElementById('country').value).name
    const zipcode = $scope.forms.form1.zipcode.$modelValue || '';
    const regDate = $scope.forms.form1.regDate.$modelValue || '';
 
    const operationalStatus = $scope.forms.form1.operationalStatus.$modelValue || '';
    const facilityIdentifier = $scope.forms.form1.facilityIdentifier.$modelValue || '';
  
    const purpose = $scope.forms.form2.purpose.$modelValue || '';
    const target = $scope.forms.form2.target.$modelValue || '';
    const subscriptionFor = $scope.forms.form2.subscriptionFor.$modelValue || '';
   
    const resourceType = $scope.forms.form2.resourceType.$modelValue || '';
    const additionalInfo = $scope.forms.form2.additionalInfo.$modelValue || '';

    const typeOfServices = $scope.forms.form3.typeOfServices.$modelValue || ''
    const humanResource = $scope.forms.form3.humanResource.$modelValue || '';
    const indentifiers = $scope.forms.form3.indentifiers.$modelValue || '';
    const details = $scope.forms.form3.details.$modelValue || '';
    const openingTime = $scope.forms.form3.openingTime.$modelValue || '';
    const closingTime = $scope.forms.form3.closingTime.$modelValue || '';
    let body = {
        email,
        firstname,
        surname,
        orgName,
        parentOrg,
        orgType,
        department,
        address,
        city,
        state,
        country,
        zipcode,
        operationalStatus,
        facilityIdentifier,
        regDate,
        purpose,
        target,
        subscriptionFor: [
          {
            for: subscriptionFor,
            isActive: true 
          },
        ],
        details,
        resourceType,
        additionalInfo,
        typeOfServices,
        humanResource,
        indentifiers,
        openingTime,
        closingTime
    }
    const requiredFeilds = ['firstname', 'surname', 'email', 'orgName', 'orgType', 'address', 'city', 'state', 'country', 'operationalStatus', 'target',
      'subscriptionFor', 'resourceType']
    $scope.showIncompleteErr = false;
    $scope.showCheckboxErr = false;
    requiredFeilds.forEach((feild) => {
        if(body[feild] == '' || body[feild] == undefined) {
            $scope.showIncompleteErr = true;
        }
    })
    if(!document.getElementById('defaultCheck1').checked || !document.getElementById('defaultCheck2').checked) {
        $scope.showCheckboxErr = true;
    }
    if(!$scope.showCheckboxErr && !$scope.showIncompleteErr) {

    $scope.isLoading = true
      Api.registerNewUser.save(body, function () {
        $scope.isLoading = false
        Alerting.AlertReset()
        Alerting.AlertAddMsg('bottom', 'info', 'User Registration request sent!')
        $scope.showFormCtrl = false
      }, function (err) {
        $scope.isLoading = false
        Alerting.AlertReset()
        if (err.status === 404) {
          Alerting.AlertAddMsg('bottom', 'danger', 'Could not authenticate request')
        } else {
          Alerting.AlertAddMsg('bottom', 'danger', 'An error occurred while trying to request registeration')
        }
      })
    }


  }
}
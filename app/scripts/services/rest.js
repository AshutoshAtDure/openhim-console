export function Api ($rootScope, $resource, config) {
  // fetch API server details
  const protocol = config.protocol
  const host = config.host
  const hostPath = (config.hostPath || '').replace(/(^\/)|(\/$)/g, '')
  const port = config.port
  const server = protocol + '://' + host + ':' + port + (/^\s*$/.test(hostPath) ? '' : '/' + hostPath)
  const mediatorPath = 'http' + '://' + host + ':' + '5001'

  return {
    Me: $resource(server + '/me'),

    AuthenticateLocal: $resource(server + '/authenticate/local', {}, {
      save: { method: 'POST' }
    }),

    AuthenticateOpenid: $resource(server + '/authenticate/openid', {}, {
      getToken: { method: 'POST' }
    }),

    registerNewUser: $resource(server + '/newregistration ', {}, {
      save: { method: 'POST', body: '@body' }
    }),

    addNewAPI: $resource(server + '/customurl',{ id: '@_id' }, {
      save: { method: 'POST', body: '@body' },
      put: { method: 'PUT', body: '@body' },
      query: {method: 'GET'}
    }),

  addNewAPIOrg: $resource(server + '/customurl',{ id: '@_orgid' }, {
      query: {method: 'GET', isArray: true}

      
    }),

    manageAPI: $resource(server + '/customurl/:id',{ id: '@_id' }, {
      put: { method: 'PUT', body: '@body' },
    }),

    deleteAPI: $resource(server + '/customurl/:id',{ id: '@_id' }, {
      delete: { method: 'DELETE'},
    }),

    getCountry: $resource(server + '/getorganisationunit?level=1', {}, {
      query: {method: 'GET', isArray: true}
    }),
    

    getMaster: $resource(server + '/getallmasterlist', {}, {
      query: {method: 'GET'}
    }),


    getProvince: $resource(server + `/getorganisationunit?level=2`, {}, {
      query: {method: 'GET', isArray: true}
    }),

    getFileUploadLog: $resource(server + `/fileupload/:id`, { id: '@_id' }, {
      query: {method: 'GET', isArray: true}
    }),

    getDataTransferLog: $resource(server + `/cronjob/:id`, { id: '@_id' }, {
      query: {method: 'GET', isArray: true}
    }),

    getPendingSubscriptions: $resource(server + `/mysubscription?status=pending`, {},  {
      query: {method: 'GET', isArray: true}
    }),

    getMySubscription: $resource(server + `/mysubscription/:id`, { id: '@_id' }, {
      query: {method: 'GET', isArray: true}
    }),

    getMySubscription: $resource(server + `/mysubscription/:id`, { id: '@_id' }, {
       patch: { method: 'PATCH', body: '@body'}
    }),

    getDistrict: $resource(server + '/getorganisationunit?level=3', {}, {
      query: {method: 'GET', isArray: true}
    }),

    runConfiguredUrl: $resource(mediatorPath + '/consumeDhisData ', {}, {
      save: { method: 'POST', body: '@body' },
    }),

    fileUpload: $resource(server +  '/indicatordatabulkupload', {}, {
      save: { method: 'POST', body: '@body', headers: {
        'Content-Type': undefined
      }}
    }),

    sendMoreInfoRequest: $resource(server + '/requestforinfo', {}, {
      save: { method: 'POST', body: '@body' },
    }),

    addMapper: $resource(mediatorPath + '/endpoints', {}, {
      save: { method: 'POST', body: '@body' },
    }),

    addMapperConfig: $resource(server + '/mapData', {}, {
      save: { method: 'POST', body: '@body' },
    }),

    getMappers: $resource(server + `/mapData/:id`, { id: '@_id' }, {
      query: {method: 'GET', isArray: true}
    }),

    uploadDataToFhir: $resource(mediatorPath + '/uploadFhir', {}, {
      save: { method: 'POST' }
    }),

    runShFile: $resource(mediatorPath + '/runShFile', {}, {
      save: { method: 'POST'}
   }),

   getTargetProgram : $resource(server + '/gettargetprogram', {}, {
    query: { method: 'GET', isArray: true }
  }),

    getSubscriptionFor : $resource(server + '/getsubscriptionfor', {}, {
      query: { method: 'GET', isArray: true }
    }),

    getResourceType : $resource(server + '/getresourcetype', {}, {
      query: { method: 'GET', isArray: true }
    }),

    getSourceSystem : $resource(server + '/getsourcesystem', {}, {
      query: { method: 'GET', isArray: true }
    }),

    getPendingUsers: $resource(server + '/newregistration?newuserstatus=pending', {}, {
      query: { method: 'GET', isArray: true }
    }),

    getUsers: $resource(server + '/getorganisationmasterlist', {}, {
      query: { method: 'GET', isArray: true }
    }),

    getRegisteredUsers: $resource(server + '/getorganisationmasterlist?status=true', {}, {
      query: { method: 'GET', isArray: true }
    }),

    getCancelledSubscriber: $resource(server + '/getorganisationmasterlist?status=false', {}, {
      query: { method: 'GET', isArray: true }
    }),

    getAllUsers: $resource(server + '/getorganisationmasterlist', {}, {
      query: { method: 'GET', isArray: true }
    }),

    getUserDetails: $resource(server + '/newregistration/:id', { id: '@id' }, {
      query: { method: 'GET', isArray: true }
    }),

    getSubscriptionDetails: $resource(server + '/subscription/:id', {id: '@id'}, {
      query: { method: 'GET', isArray: true }
    }),

    addSubscription: $resource(server + '/subscription' , {}, {
      save: { method: 'POST', body: '@body'}
    }),

    updatedubscription: $resource(server + '/mysubscription' , {}, {
      save: { method: 'POST', body: '@body'}
    }),

    getRejectedUsers: $resource(server + '/newregistration?newuserstatus=rejected', {}, {
      query: { method: 'GET', isArray: true }
    }),

    acceptReject: $resource(server + '/newregistration/:id', { id: '@id' }, {
      patch: { method: 'PATCH', body: '@body'}
    }),

    removeSubscription : $resource(server + '/cancelsubscription/:id', { id: '@id' }, {
      patch: { method: 'PATCH', body: '@body'}
    }),

    cancelSubscription: $resource(server + '/cancelorganisationsubscription/:id', { id: '@id' }, {
      patch: { method: 'PATCH', body: '@body'}
    }),

    reactivateSubscription: $resource(server + '/activatesubscription/:id', { id: '@id' }, {
      patch: { method: 'PATCH', body: '@body'}
    }),

    Logout: $resource(server + '/logout'),

    AuthenticationTypes: $resource(`${server}/authentication/types`),

    Channels: $resource(server + '/channels/:channelId', { channelId: '@_id' }, {
      update: { method: 'PUT' },
      audits: {
        method: 'GET',
        url: server + '/channels/:channelId/audits',
        isArray: true
      }
    }),

    TriggerPollingChannels: $resource(server + '/channels/:channelId/trigger', { channelId: '@_id' }, {}),

    Roles: $resource(server + '/roles/:name', { name: '@name' }, {
      update: { method: 'PUT' }
    }),

    Users: $resource(server + '/users/:email', { email: '@email' }, {
      get: {method: 'GET', isArray: true},
      update: { method: 'PUT' }
    }),

    Clients: $resource(server + '/clients/:clientId/:property', { clientId: '@_id', property: '@property' }, {
      update: { method: 'PUT' }
    }),

    Transactions: $resource(server + '/transactions/:transactionId', { transactionId: '@_id' }),

    BulkReruns: $resource(server + '/bulkrerun'),

    Mediators: $resource(server + '/mediators/:urn', { urn: '@urn' }, {
      update: { method: 'PUT' }
    }),
    MediatorConfig: $resource(server + '/mediators/:urn/config', { urn: '@urn' }, {
      update: { method: 'PUT' }
    }),
    MediatorChannels: $resource(server + '/mediators/:urn/channels', { urn: '@urn' }),

    // add the metric endpoints
    MetricsChannels: $resource(server + '/metrics/channels/:channelId'),
    MetricsTimeseries: $resource(server + '/metrics/timeseries/:type'),
    MetricsTimeseriesChannel: $resource(server + '/metrics/timeseries/:type/channels/:channelId'),

    Tasks: $resource(server + '/tasks/:taskId', { taskId: '@_id' }, {
      update: { method: 'PUT' }
    }),

    ContactGroups: $resource(server + '/groups/:groupId', { groupId: '@_id' }, {
      update: { method: 'PUT' }
    }),

    Events: $resource(server + '/events/:receivedTime'),
    Heartbeat: $resource(server + '/heartbeat'),

    // endpoint to restart the core server
    Restart: $resource(server + '/restart', {}),

    // User Token
    UserPasswordToken: $resource(server + '/token/:token', { token: '@token' }, {
      update: { method: 'PUT' }
    }),

    // user reset password request
    UserPasswordResetRequest: $resource(server + '/password-reset-request/:email', { email: '@email' }, {}),

    Keystore: $resource(server + '/keystore/:type/:property', { type: '@type', property: '@property' }, {
      update: { method: 'PUT' }
    }),

    Certificates: $resource(server + '/certificates', {}),

    // ATNA Audit log endpoint
    Audits: $resource(server + '/audits/:auditId', { auditId: '@_id' }),
    AuditsFilterOptions: $resource(server + '/audits-filter-options/', {}),

    // Logs API
    Logs: $resource(server + '/logs'),

    // Metadata API
    Metadata: $resource(server + '/metadata', {}, {
      save: { method: 'POST', isArray: true },
      query: { method: 'GET', isArray: true }
    }),

    MetadataValidation: $resource(server + '/metadata/validate', {}, {
      save: { method: 'POST', isArray: true }
    }),

    // Visualizer API
    Visualizers: $resource(server + '/visualizers/:id', { id: '@_id' }, {
      update: { method: 'PUT' }
    }),

    // About page (versions) API
    About: $resource(server + '/about')

  }
}

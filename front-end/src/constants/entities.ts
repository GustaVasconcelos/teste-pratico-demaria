type EntityRoutes = {
    get: string;
    getByColumn: (column: string) => string;
    create: string;
    update: (id: string | number) => string;
    delete: (id: string | number) => string;
  };
  
  type NestedRoutes = {
    get: (id: string | number) => string;
    getByColumn: (id: string | number, column: string) => string;
    create: (id: string | number) => string;
    update: (id: string | number, column: string) => string;
    delete: (id: string | number, column: string) => string;
  };
  
  function createEntityRoutes(baseUrl: string): EntityRoutes {
    return {
      get: `/${baseUrl}`,
      getByColumn: (column: string) => `/${baseUrl}/${column}`,
      create: `/${baseUrl}`,
      update: (id: string | number) => `/${baseUrl}/${id}`,
      delete: (id: string | number) => `/${baseUrl}/${id}`,
    };
  }
  
  function createNestedRoutes(baseUrl: string, subPath: string, subPathBeforeId: boolean = false): NestedRoutes {
    return {
      get: (id: string | number) =>
        subPathBeforeId
          ? `/${baseUrl}/${subPath}${id ? `/${id}` : ''}`
          : `/${baseUrl}${id ? `/${id}` : ''}/${subPath}`,
      getByColumn: (id: string | number, column: string) =>
        subPathBeforeId
          ? `/${baseUrl}/${subPath}${column ? `/${column}` : ''}`
          : `/${baseUrl}${id ? `/${id}` : ''}/${subPath}${column ? `/${column}` : ''}`,
      create: (id: string | number) =>
        subPathBeforeId
          ? `/${baseUrl}/${subPath}`
          : `/${baseUrl}${id ? `/${id}` : ''}/${subPath}`,
      update: (id: string | number, column: string) =>
        subPathBeforeId
          ? `/${baseUrl}/${subPath}${column ? `/${column}` : ''}`
          : `/${baseUrl}${id ? `/${id}` : ''}/${subPath}${column ? `/${column}` : ''}`,
      delete: (id: string | number, column: string) =>
        subPathBeforeId
          ? `/${baseUrl}/${subPath}${column ? `/${column}` : ''}`
          : `/${baseUrl}${id ? `/${id}` : ''}/${subPath}${column ? `/${column}` : ''}`,
    };
  }
  
  export const entities = {
    auth: {
      ...createEntityRoutes('auth'),
      login: createNestedRoutes('auth', 'login', false),
      logout: createNestedRoutes('auth', 'logout', false),
    },
    users: {
        ...createEntityRoutes('users'),
        tasks: createNestedRoutes('users', 'tasks')
    },
  };
  
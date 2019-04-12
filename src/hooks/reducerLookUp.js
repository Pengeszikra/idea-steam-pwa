export default reducerObject => ({type,payload}, store) => 
  reducerObject[type] 
    ? reducerObject[type](store, payload) 
    : store
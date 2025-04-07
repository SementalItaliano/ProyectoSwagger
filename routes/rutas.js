const Departamento = require('./DepartamentoRouter')
const Area = require('./AreaRouter')
const Empleado = require('./EmpleadoRouter')
const Encargado = require('./EncargadoRouter')


function routerApi(app) {
  app.use('/Departamento', Departamento)
  app.use('/Area', Area);
  app.use('/Empleado', Empleado)
  app.use('/Encargado', Encargado);
}

module.exports = routerApi

class service {

  constructor(datas) {
        //  en este constructor se recible la lista y se hace global
    this.datas = datas
  }

  async getALL(res) {
    //Se retorna toda la lista de elementos 
    this.datas.find()
      .then(data => {
        res.json(data)
      })
      .catch(e => {
  // ocurre algun problema aqui se escribe
        res.json({ message: e })
      })
  }

  async getByid(id, res) {
        //Se retorna el elemento que tenga ese id
    this.datas.findOne(
      { _id: id }
    )
      .then(data => {
        res.json(data)
      })
      .catch(e => {
        res.json({ message: e })
      })
  }

  async post(body, res) {
        //  Se recibe un los datos para creal un nuevo registro

    const book = new this.datas(body)
    // recibe cualquier cosa que venga del body y la guarda
    book.save()
      .then(data => {
            // Se agrega ese elemento a la lista

        res.json(data)
      })
      .catch(e => {
        res.json({ message: e })
      })
  }
  
  async update(id, body, res) {
      //  Se recive un id y un body
    this.datas.updateOne({
          //  Se busca la posicion de ese elemento
      _id: id
    },
      {
        // se manda el body
        $set: body
      })
      .then(data => {
        //  Se retorna el registro ya modificado
        res.json(data)
      })
      .catch(e => {
        res.json({ message: e })
      })
  }
  async delete(id, res) {
    this.datas.deleteOne({
  //  Se busca la posicion de ese elemento y se elimina el registro
      _id: id
    })
      .then(data => {
        res.json(data)
      })
      .catch(e => {
      //se manda un mensaje si se equivoca

        res.json({ message: e })
      })
  }

  async find(OtherData, id, findData, res) {
    // Este medoto busca que no se esten borrando elementos que se sten usando en otros casos 
    try {

      // se crea al query donde va a buscar el elemento en la otra lista
      const query = { [`${findData}._id`]: id };
      //realiza la query para buscar si se encuentra ese id
      const dataUsingData = await OtherData.findOne({ query });
      // Si se encuentra se manda un mensaje avisando que esta en uso el elemento
      if (dataUsingData) {
        return res.status(400).json({
          message: `El ${findData} aún está en uso.`
        });
      }
      // se borra el elemento llamando al metodo borrar
      this.delete(id, res)

    } catch (error) {
      // se manda un mensaje por si truene en algo
      return res.status(500).json({
        message: 'Error al procesar la solicitud.',
        error: error.message,
      });
    }
  }

  async remplace(body, OtherData) {
    // este metodo es para cuando se quiere verificar que unla lista contenga un elemente especifico por su id
    const id = body._id;
// se recibe el id del body
    if (id) {
      // se verifica que si tenga id
      try {
        // se busca ese elemento y si se encuentra se retorna todos los datos de este, sino, solo un -1
        const data = await OtherData.findOne({ _id: id });
        return data || -1; // Si no encuentra el documento, retorna -1
      } catch (e) {
        // si truene manda un mensaje y retorna -1
        console.error('Error en remplace:', e);
        return -1;
      }
    } else {
      return -1; // Retorna -1 si el id no está presente
    }
  }


}

module.exports = service
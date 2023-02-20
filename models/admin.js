const startConnection = require("./connection");

class Admin {
  constructor(id_admin = null, id_user = null) {
    this.id_admin = id_admin;
    this.id_user = id_user;
  }
}

const pgClient = startConnection();

class AdminManager {
  static async register() {
    const lastId = await pgClient.query("select max(id_user) from users");
    const id_user = lastId.rows[0].max;

    const newadmin = await pgClient.query(
      "INSERT INTO admin (id_user) VALUES ($1)",
      [id_user]
    );
    return newadmin;
  }

  /*static async getClient (id){
    if(!id){ // este caso se usa para los registros de nuevos clientes
      const lastId = await pgClient.query("select max(id_user) from users");
      const id_user = lastId.rows[0].max;
      const response = await pgClient.query('SELECT * FROM clients WHERE id_user=$1', [id_user])
      const client = convertClientsDataToObjects(response.rows)
      return client[0]
    }
      // este caso es cuando el cliente ya existe eb la bbdd
    const response = await pgClient.query('SELECT * FROM clients WHERE id_user=$1', [id])
    const client = convertClientsDataToObjects(response.rows)
    return client[0] 
    
  }*/
  
}



function convertAdminDataToObjects(data) {
  let admin = [];
  for (const objectData of data) {
    admin.push(
      new Admin(
        (id_admin = objectData.id_admin),
        (id_user = objectData.id_user),
      )
    );
  }
  return admin;
}


module.exports = AdminManager;
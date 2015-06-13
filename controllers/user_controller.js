var users = {
  admin:{id:1, username:"admin", password:"123456"},
  cesar:{id:2, username:"Cesar Daniel", password:"78910"}
};

exports.autenticar = function(login, password, callback){
  if(users[login]){
    if(password === users[login].password){
      callback(null,users[login]);
    }else{
      callback(new Error('Password errónea.'));
    }
  }else{
    callback(new Error('No existe el usuario.'));
  }
};

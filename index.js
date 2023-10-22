class User {
  constructor(id, name, pass, email) {
    this.id = id,
    this.name = name,
    this.pass = pass,
    this.email = email
  }
}

fetch('http://localhost:3006/api/getdata')
  .then(response => response.json())
  .then(data => {
    const result = data.map(userData => new User(userData.id, userData.name, userData.pass, userData.email))

    console.log(result);
  })
  .catch(error => {
    console.error(`Ошибка при выполнении запроса: ${error}`);
  })
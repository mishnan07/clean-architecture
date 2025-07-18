class Admin {
  constructor({ id, email, password, name, role = 'admin', createdAt, updatedAt }) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.name = name;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

module.exports = Admin;
import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'Admin User',
        email: 'admin@example',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },

    {
        name: 'Luisa Estrada',
        email: 'luisa@example',
        password: bcrypt.hashSync('123456', 10),
    },

    {
        name: 'Eliana Rojas',
        email: 'eliana@example',
        password: bcrypt.hashSync('123456', 10),
    },

    {
        name: 'Erik Villarreal',
        email: 'erik@example',
        password: bcrypt.hashSync('123456', 10),
    },
 
]

export default users
export const registerUser = (newUser) => {
    const users = JSON.parse(localStorage.getItem('users')) || []

    const exists = users.find(user => user.email === newUser.email)

    if(exists) {
        throw new Error('Email already exists')
    }

    const saveUser = {
        id: Date.now(),
        ...newUser
    }
    users.push(saveUser)

    localStorage.setItem('users', JSON.stringify(users))
}

export const loginUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || []

    return users.find(user => user.email === email && user.password === password)
}
const STUDENTS_KEY = 'students'
const CURRENT_USER_KEY = 'currentUser'

const getStudents = () => {
    try {
        return JSON.parse(localStorage.getItem(STUDENTS_KEY)) || []
    } catch (error) {
        return []
    }
}

export const registerUser = (newUser) => {
    const students = getStudents()

    const emailExists = students.some((student) => student.email.toLowerCase() === newUser.email.toLowerCase())

    if(emailExists) {
        return {
            success: false,
            message: 'Email already registered!'
        }
    }

    const userToSave = {
        id: Date.now(), 
        ...newUser
    }

    students.push(userToSave)

    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students))

    return {
        success: true,
        message: 'Registration successful!',
        data: userToSave
    }
}

export const loginUser = (email, password) => {
    const students = getStudents()

    const student = students.find(stu => stu.email === email && stu.password === password)

    if(!student) {
        return {
            success: false,
            message: 'Invalid email or password!'
        }
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(student))

    return {
        success: true,
        data: student
    }
}

export const logoutUser = () => {
    localStorage.removeItem(CURRENT_USER_KEY)
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem(CURRENT_USER_KEY))
}

export const isAuthenticated = () => {
    return getCurrentUser() !== null
}
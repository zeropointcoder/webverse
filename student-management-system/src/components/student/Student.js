import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import axios from 'axios'
// import {onAddSuccess, onLoadSuccess, onUpdateSuccess, onDeleteSuccess, onLoadThunk, onAddThunk, onUpdateThunk, onDeleteThunk} from '../../store/student/studentSlice'
import {onLoadThunk, onAddThunk, onUpdateThunk, onDeleteThunk} from '../../store/student/studentSlice'

function Student() {
  // const baseUrl = `http://localhost:5400`
  // const [students, setStudents] = useState([])
  // const [studentNew, setStudentNew] = useState({})
  // const [studentEdit, setStudentEdit] = useState({})

  // const {students, studentNew, studentEdit} = useSelector(state => state.student)
  const {students} = useSelector(state => state.student)
  const dispatch = useDispatch()

  const [studentId, setStudentId] = useState('')

  const [fullname, setFullname] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('')
  const [address, setAddress] = useState('')
  const [course, setCourse] = useState('')
  const [enrolmentDate, setEnrolmentDate] = useState('')
  const [status, setStatus] = useState('active')
  const [profilePic, setProfilePic] = useState('')

  useEffect(() => {
    // onLoad()
    dispatch(onLoadThunk())
  }, [])

  // const onLoad = async () => {
  //   try {
  //     const {data} = await axios.get(`${baseUrl}/students`)
  //     // setStudents(data)
  //     dispatch(onLoadSuccess(data))
  //   } catch (err) {
  //     console.table([err])
  //   }
    
  // }

  const onAdd = async () => {
    if(fullname === '' || phone === '' || email === '') {
      return
    }

    const studentObj = createStudentObj(fullname, phone, email, dob, gender, address, course, enrolmentDate, status, profilePic)

    // try {
    //   const {data} = await axios.post(`${baseUrl}/students`, studentObj)
    //   // setStudentNew(data)
    //   // setStudentEdit({})
    //   // setStudents([...students, studentNew])
    //   dispatch(onAddSuccess(data))

    //   onResetForm()
    //   onCloseModal()
    //   // onLoad()
    // } catch (err) {
    //   console.table([err])
    // }

    dispatch(onAddThunk({studentObj}))
    onResetForm()
    onCloseModal()
  }

  const onUpdate = async () => {
    if(fullname === '' || phone === '' || email === '') {
      return
    }

    const studentObj = createStudentObj(fullname, phone, email, dob, gender, address, course, enrolmentDate, status, profilePic)

    // try {
    //   const {data} = await axios.put(`${baseUrl}/students/${studentId}`, studentObj)
    //   // setStudentEdit(data)
    //   // setStudentNew({})
    //   // setStudents(students.map(student => student.id === studentId ? studentEdit : student))
    //   dispatch(onUpdateSuccess(data))

    //   onResetForm()
    //   onCloseModal()
    //   // onLoad()
    // } catch (err) {
    //   console.table([err])
    // }

    dispatch(onUpdateThunk({studentObj, studentId}))
    onResetForm()
    onCloseModal()
  }

  const onDelete = async (studentId) => {
    // try {
    //   const {data} = await axios.delete(`${baseUrl}/students/${studentId}`)
    //   // setStudentNew(data)
    //   // setStudentEdit(data)
    //   // setStudents([students.filter(student => student.id !== studentId)])
    //   dispatch(onDeleteSuccess(data))

    //   onResetForm()
    //   // onLoad()
    // } catch (err) {
    //   console.table([err])
    // }

    dispatch(onDeleteThunk({studentId}))
    onResetForm()
  }
  
  const onFileChange = (event) => {
    const file = event.target.files[0]

    if(!file) return

    // validate file type
    if(!file.type.startsWith('image/')) {
      alert('Only image files are allowed!')
      return
    }

    // limit file size (2MB)
    if(file.size > 2*1024*1024) {
      alert('Image must be less than 2MB!')
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      setProfilePic(reader.result) // base64 string
    }

    reader.readAsDataURL(file)
  }

  const createStudentObj = (fullname, phone, email, dob, gender, address, course, enrolmentDate, status, profilePic) => {
    return {
      fullname: fullname,
      phone: phone,
      email: email,
      dob: dob,
      gender: gender,
      address: address,
      course: course,
      enrolmentDate: enrolmentDate,
      status: status,
      profilePic: profilePic
    }
  }

  const onUpdateCta = (student) => {
    setFullname(student.fullname)
    setPhone(student.phone)
    setEmail(student.email)
    setDob(student.dob)
    setGender(student.gender)
    setAddress(student.address)
    setCourse(student.course)
    setEnrolmentDate(student.enrolmentDate)
    setStatus(student.status)
    setProfilePic(student.profilePic)

    setStudentId(student.id)
  }

  const onResetForm = () => {
    setFullname('')
    setPhone('')
    setEmail('')
    setDob('')
    setGender('')
    setAddress('')
    setCourse('')
    setEnrolmentDate('')
    setStatus('active')
    setProfilePic('')

    setStudentId('')
  }

  const onCloseModal = () => {
    const btnclose = document.getElementById('btn-close')
    btnclose?.click()
  }

  return (
    
  <div className="table-responsive">
    <table className="table table-info">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">update</th>
          <th scope="col">delete</th>
          <th scope="col">id</th>
          <th scope="col">profilePic</th>
          <th scope="col">fullname</th>
          <th scope="col">phone</th>
          <th scope="col">email</th>
          <th scope="col">dob</th>
          <th scope="col">gender</th>
          <th scope="col">address</th>
          <th scope="col">course</th>
          <th scope="col">enrolmentDate</th>
          <th scope="col">status</th>
        </tr>
      </thead>
      <tbody>
        {
          students.length > 0 ? students.map((student, index) => (
            <tr key={student.id}>
              <th scope="row">{index+1}</th>
              <td>
                <button type='button' className='btn btn-sm btn-info-outline' onClick={() => onUpdateCta(student)} data-bs-toggle="modal" data-bs-target="#studentFormModal">✏️</button>
              </td>
              <td>
                <button type='button' className='btn btn-sm btn-secondary-outline' onClick={() => onDelete(student.id)}>🗑️</button>
              </td>
              <td>{student.id}</td>
              <td>
                <img src={student.profilePic || 'https://placehold.co/40'} width='40' height='40' style={{borderRadius: '50%', objectFit: 'cover'}} alt='Profile pic' />
              </td>
              <td>{student.fullname}</td>
              <td>{student.phone}</td>
              <td>{student.email}</td>
              <td>{student.dob}</td>
              <td>{student.gender}</td>
              <td>{student.address}</td>
              <td>{student.course}</td>
              <td>{student.enrolmentDate}</td>
              <td>{student.status}</td>
            </tr>
          )) : null
        }
        
      </tbody>
    </table>

    <div className="modal fade" id="studentFormModal" tabIndex="-1" aria-labelledby="studentFormModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 text-uppercase text-dark" id="studentFormModalLabel">Student form</h1>
            <button type="button" id="btn-close" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form>

              <div className="row g-3 align-items-center mb-3">
                <div id="detailsHelp" className="form-text">We'll never share your personal details with anyone else.</div>
                
                <div className='col'>
                  <label htmlFor="profilePic" className="form-label">Profile Pic URL</label>
                </div>
                <div className='col'>
                  <input type="file" accept='image/*' onChange={onFileChange} className="form-control" id="profilePic" />
                  {
                    profilePic && (
                      <>
                        <img src={profilePic} alt='Profile pic' width="90" height="90" className='mt-2' style={{borderRadius: '50%', objectFit: 'cover'}} />
                        <p>Image selected ✅</p>
                      </>
                    )
                  }
                </div>
              </div>

              <div className="row g-3 align-items-center mb-3">
                <div className='col'>
                  <label htmlFor="fullname" className="form-label">fullname</label>
                </div>
                <div className='col'>
                  <input value={fullname} onChange={(e) => setFullname(e.target.value)} type="text" className="form-control" id="fullname" aria-describedby="detailsHelp" />
                </div>
              </div>
              
              <div className="row g-3 align-items-center mb-3">
                <div className='col'>
                  <label htmlFor="phone" className="form-label">phone</label>
                </div>
                <div className='col'>
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} type="text" className="form-control" id="phone" aria-describedby="detailsHelp" />
                </div>
              </div>

              <div className="row g-3 align-items-center mb-3">
                <div className='col'>
                  <label htmlFor="email" className="form-label">email</label>
                </div>
                <div className='col'>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" aria-describedby="detailsHelp" />
                </div>
              </div>
              
              <div className="row g-3 align-items-center mb-3">
                <div className='col'>
                  <label htmlFor="dob" className="form-label">date of birth</label>
                </div>
                <div className='col'>
                  <input value={dob} onChange={(e) => setDob(e.target.value)} type="date" className="form-control" id="dob" aria-describedby="detailsHelp" />
                </div>
              </div>

              <div className="row g-3 align-items-center mb-3">
                <div className='col'>
                  <label htmlFor="gender" className="form-label">gender</label>
                </div>
                <div className='col'>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} className="form-control" id="gender">
                    <option value='' selected>Select</option>
                    <option value='female'>female</option>
                    <option value='male'>male</option>
                  </select>
                </div>
              </div>

              <div className="row g-3 align-items-center mb-3">
                <div className='col'>
                  <label htmlFor="address" className="form-label">address</label>
                </div>
                <div className='col'>
                  <textarea type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="address">
                  </textarea>
                </div>
              </div>

              <div className="row g-3 align-items-center mb-3">
                <div className='col'>
                  <label htmlFor="course" className="form-label">course</label>
                </div>
                <div className='col'>
                  <input type="text" value={course} onChange={(e) => setCourse(e.target.value)} className="form-control" id="course" />
                </div>
              </div>

              <div className="row g-3 align-items-center mb-3">
                <div className='col'>
                  <label htmlFor="enrolmentDate" className="form-label">enrolmentDate</label>
                </div>
                <div className='col'>
                  <input type='date' value={enrolmentDate} onChange={(e) => setEnrolmentDate(e.target.value)} className="form-control" id="enrolmentDate" />
                </div>
              </div>

              <div className="row g-3 align-items-center mb-3">
                <div className='col'>
                  <label htmlFor="status" className="form-label">status</label>
                </div>
                <div className='col'>
                  <select value={status} onChange={(e) => setStatus(e.target.value)} className="form-control" id="status">
                    <option value='active' selected>active</option>
                    <option value='inactive'>inactive</option>
                    <option value='graduated'>graduated</option>
                  </select>
                </div>
              </div>

            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">cancel</button>
            <button onClick={() => onUpdate()} type="button" className="btn btn-info btn-sm">update</button>
            <button onClick={() => onAdd()} type="button" className="btn btn-danger btn-sm">add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default Student
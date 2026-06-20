import React, {useState} from 'react'

function CheckoutForm({onPlaceOrder, loading}) {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    studentId: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
  }

  const validate = () => {
    const newErrors = {}

    if(!formData.fullname.trim()) {
        newErrors.fullname = 'Fullname is required'
    }

    if(!formData.email.trim()) {
        newErrors.email = 'Email is required'
    }

    if(!formData.studentId.trim()) {
        newErrors.studentId = 'Student ID is required'
    }

    if(formData.cardNumber.length < 16) {
        newErrors.cardNumber = 'Card number must be 16 digits'
    }

    if(!formData.expiry.trim()) {
        newErrors.expiry = 'Valid card expiry is required'
    }

    if(formData.cvv.length < 3) {
        newErrors.cvv = 'CVV must be at least 3 digits'
    }

    setErrors(newErrors)

    return (Object.keys(newErrors).length === 0)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(validate()) {
        onPlaceOrder(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
        <h2>Place order</h2>
        <h5>Student details</h5>

        <div className="mb-3">
            <label htmlFor="fullname" className="form-label">Fullname</label>
            <input type="text" value={formData.fullname} onChange={handleChange} name="fullname" className="form-control" id="fullname" placeholder="Enter student name" />
            {
                errors.fullname && (
                    <small className="text-danger">{errors.fullname}</small>
                )
            }
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" value={formData.email} onChange={handleChange} name="email" className="form-control" id="email" placeholder="Enter student email" />
            {
                errors.email && (
                    <small className="text-danger">{errors.email}</small>
                )
            }
        </div>
        <div className="mb-3">
            <label htmlFor="studentId" className="form-label">StudentId</label>
            <input type="text" value={formData.studentId} onChange={handleChange} name="studentId" className="form-control" id="studentId" placeholder="Enter student Id" />
            {
                errors.studentId && (
                    <small className="text-danger">{errors.studentId}</small>
                )
            }
        </div>

        <h5>Payment details</h5>

        <div className="mb-3">
            <label htmlFor="cardNumber" className="form-label">Card number</label>
            <input type="text" value={formData.cardNumber} onChange={handleChange} name="cardNumber" className="form-control" id="cardNumber" placeholder="Enter card number" />
            {
                errors.cardNumber && (
                    <small className="text-danger">{errors.cardNumber}</small>
                )
            }
        </div>

        <div className="mb-3">
            <label htmlFor="expiry" className="form-label">Card expiry</label>
            <input type="text" value={formData.expiry} onChange={handleChange} name="expiry" className="form-control" id="expiry" placeholder="Enter card expiry" />
            {
                errors.expiry && (
                    <small className="text-danger">{errors.expiry}</small>
                )
            }
        </div>

        <div className="mb-3">
            <label htmlFor="cvv" className="form-label">Card CVV</label>
            <input type="number" value={formData.cvv} onChange={handleChange} name="cvv" className="form-control" id="cvv" placeholder="Enter card cvv" />
            {
                errors.cvv && (
                    <small className="text-danger">{errors.cvv}</small>
                )
            }
        </div>

        <button type="submit" className="btn btn-sm btn-info" disabled={loading}>
            {loading ? 'Processing...' : 'Place Order'}
        </button>
    </form>
  )
}

export default CheckoutForm
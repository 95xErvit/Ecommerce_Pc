import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'


const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userRegister = useSelector(state => state.userRegister)
    const { loading, userInfo } = userRegister

    const redirect = location ? location.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo) {
           
            navigate(redirect);

        }
    }, [navigate, history, userInfo, redirect])

        const submitHandler = (e) => {
            e.preventDefault()
            if(password !== confirmPassword) {
                setMessage('La contraseña no coincide')
            } else {
                dispatch(register(name, email, password))
            }   
        }

  return <FormContainer>
    <h1 className='text-center mt-2'>Registrarse</h1>
    {message && <Message variant='danger'>{message}</Message>}
    {loading && <Loader/>}
    <Form onSubmit={submitHandler}>
        <Form.Group className='mt-3' controlId='name'>
            <Form.Label>Nombre</Form.Label>
            <Form.Control type='name' placeholder='Ingrese su nombre y apellido' value={name}
            onChange={(e) => setName(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group className='mt-3' controlId='email'>
            <Form.Label>Correo Electronico</Form.Label>
            <Form.Control type='email' placeholder='Ingrese su correo electronico' value={email}
            onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group className='mt-3' controlId='password'>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type='password' placeholder='Ingrese su contraseña' value={password}
            onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group className='mt-3' controlId='confirmPassword'>
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control type='password' placeholder='Confirmar Contraseña' value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Button type='submit' className='mt-5 btn btn-outline-success py-2 px-5 mx-auto d-block' variant=''>
            Regitrarme 
        </Button>
    </Form>

    <Row className='text-center py-3'>
        <Col>
            Tienes una cuenta? <Link className='text-decoration-none' to={redirect ? `/SignIn?redirect=${redirect}`
            : '/SignIn'}>Inicia Sesión</Link>
        </Col>
    </Row>
  </FormContainer>

}

export default RegisterScreen
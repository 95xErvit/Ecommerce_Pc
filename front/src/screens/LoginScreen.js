import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'


const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location ? location.split('=')[1] : '/'

    useEffect(() => {
        if(userInfo) {
           
            navigate(redirect);

        }
    }, [navigate, history, userInfo, redirect])

        const submitHandler = (e) => {
            e.preventDefault()
            dispatch(login(email, password))
        }

  return <FormContainer>
    <h1 className='text-center mt-2'>Iniciar Sesión</h1>
    {error && <Message variant='danger'>{error}</Message>}
    {loading && <Loader/>}
    <Form onSubmit={submitHandler}>
        <Form.Group className='mt-4' controlId='email'>
            <Form.Label>Correo Electronico</Form.Label>
            <Form.Control type='email' placeholder='Ingrese su correo electronico' value={email}
            onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Form.Group className='mt-4' controlId='password'>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type='password' placeholder='Ingrese su contraseña' value={password}
            onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
        </Form.Group>

        <Button type='submit' className='mt-5 btn btn-outline-success py-2 px-5 mx-auto d-block' variant=''>
            Ingresar 
        </Button>
    </Form>

    <Row className='text-center py-3'>
        <Col>
            Eres nuevo aquí? <Link className='text-decoration-none' to={redirect ? `/register?redirect=${redirect}`
            : '/register'}>Regístrate</Link>
        </Col>
    </Row>
  </FormContainer>

}

export default LoginScreen
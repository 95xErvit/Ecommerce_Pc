import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from '../actions/productActions'

const ProductScreen = ({history }) => {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const  { loading, error, product } = productDetails
  
  let params = useParams();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(listProductDetails(params.id))
  }, [dispatch, params.id])

  const addTocartHandler = () => {
    
    navigate(`/cart/${params.id}?qty=${qty}`);

  }
  console.log(product)
  return ( 
    <>
      <Link className='btn btn-light my-3' to='/'>
        Regresar
      </Link>
      {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (

        <Row>
        <Col md={5}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={4}>
          <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                 value={product.rating} 
                 text={`${product.numReviews} reviews`}
                 />
              </ListGroup.Item>
              <ListGroup.Item>
                Precio: ${product.price}
              </ListGroup.Item>
              <ListGroup.Item>
                {product.description}
              </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Precio:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Disponibilidad:</Col>
                    <Col>
                      {product.countInstock > 0 ? 'Disponible' : 'Agotado'}

                    </Col>
                  </Row>
                </ListGroup.Item>
                
                {product.countInstock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Unidades</Col>
                      <Col>
                        <Form.Control 
                          as='select' value={qty} onChange={(e) => 
                          setQty(e.target.value)}
                        >
                          {
                          [...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                            {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item className='d-grid'>
                  <Button
                  onClick={addTocartHandler} 
                    variant='outline-success' 
                    type='button' 
                    disabled={product.countInStock === 0}
                    >
                    Agregar al carrito
                  </Button>
                </ListGroup.Item>
              </ListGroup>
          </Card>
        </Col>
      </Row>
      )} 
    </>
  ) 
}

export default ProductScreen



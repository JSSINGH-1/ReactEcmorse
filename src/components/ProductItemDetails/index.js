import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

import Loader from 'react-loader-spinner'

// import {CiStar} from 'react-icons/ci'

import {BsDashSquare, BsPlusSquare} from 'react-icons/bs'
import SimilarProductItem from '../SimilarProductItem'

import Header from '../Header'

class ProductItemDetails extends Component {
  state = {items: 1, imageDetails: {}, similarList: [], isDataLoaded: false}

  componentDidMount() {
    this.getImagedata()
  }

  getImagedata = async () => {
    const {match} = this.props
    const {params} = match

    const {id} = params
    // const data = await fetch('https://apis.ccbp.in/products/16')

    const fetchUrl = `https://apis.ccbp.in/products/${id}`

    const authData = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${authData}`,
      },
    }
    const data = await fetch(fetchUrl, options)
    const response = await data.json()
    // console.log(response)

    const updateData = {
      imageUrl: response.image_url,
      title: response.title,
      style: response.style,
      price: response.price,
      description: response.description,
      brand: response.brand,
      totalReviews: response.total_reviews,
      rating: response.rating,
      availability: response.availability,
    }

    const updateSimilarData = response.similar_products.map(eachProduct => ({
      imageUrl: eachProduct.image_url,
      title: eachProduct.title,
      style: eachProduct.style,
      price: parseInt(eachProduct.price, 10),
      description: eachProduct.description,
      brand: eachProduct.brand,
      totalReviews: eachProduct.total_reviews,
      rating: eachProduct.rating,
      availability: eachProduct.availability,
    }))

    this.setState({
      imageDetails: updateData,
      similarList: updateSimilarData,
      isDataLoaded: true,
    })
  }

  increaseButton = () => {
    this.setState(prevState => ({items: prevState.items + 1}))
  }

  decreaseButton = () => {
    this.setState(prevState => ({items: prevState.items - 1}))
  }

  render() {
    const {imageDetails, similarList, isDataLoaded, items} = this.state
    console.log(imageDetails)
    return (
      <>
        <Header />

        {isDataLoaded ? (
          <div className="imageDetailsContainer">
            <img
              src={imageDetails.imageUrl}
              alt={imageDetails.title}
              className="imageItem"
            />

            <div className="productDetails">
              <h1 className="main-heading">{imageDetails.title}</h1>
              <p className="prise"> Rs {imageDetails.price}/-</p>
              <div className="reviewsContainer">
                <div className="ratingPara">
                  <p>{imageDetails.rating}</p>
                  <img
                    className="starImage"
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                    alt="star"
                  />
                </div>
                <p className="reviews">{imageDetails.totalReviews} Reviews</p>
              </div>
              <p className="discriptions">{imageDetails.description}</p>

              <p className="para">
                <span className="available">Available:</span>{' '}
                {imageDetails.availability}
              </p>
              <p className="para">
                <span className="available">Brand:</span> {imageDetails.brand}
              </p>
              <hr />
              <div className="buttonContainer">
                <button
                  onClick={this.decreaseButton}
                  className="button2"
                  type="button"
                  data-testid="minus"
                >
                  {' '}
                  <BsDashSquare />
                </button>

                <p className="textPara">{items}</p>
                <button
                  onClick={this.increaseButton}
                  className="bton"
                  type="button"
                  data-testid="plus"
                >
                  {' '}
                  <BsPlusSquare />
                </button>
              </div>
              <button className="cartButton" type="button">
                ADD TO CART
              </button>
            </div>
          </div>
        ) : (
          <div data-testid="loader">
            <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
          </div>
        )}
        <div className="smilarProductContainer">
          <h1>Similar Products</h1>
          <div className="ProductItemContainer">
            {similarList.map(eachProduct => (
              <SimilarProductItem
                eachProduct={eachProduct}
                key={eachProduct.id}
              />
            ))}
          </div>
        </div>
      </>
    )
  }
}

export default ProductItemDetails

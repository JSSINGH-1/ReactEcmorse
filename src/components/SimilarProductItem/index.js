import './index.css'

const SimilarProductItem = props => {
  const {eachProduct} = props
  const {imageUrl, title, brand, price, rating} = eachProduct
  return (
    <div className="similarProduct">
      <img className="SimilarProductImage" src={imageUrl} alt={title} />
      <p className="titles">{title}</p>
      <p className="brands">by {brand}</p>
      <div className="prise">
        <p className="prisePara">Rs {price}/- </p>
        <div className="similarProductRating">
          <p className="ratingParaGraph">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="starImage"
          />
        </div>
      </div>
    </div>
  )
}

export default SimilarProductItem

import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation
} from "../../slices/productsApiSlice"

const ProductEditScreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: product, isLoading, error } = useGetProductDetailsQuery(id)
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation()

  const [name, setName] = useState("")
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState("")
  const [brand, setBrand] = useState("")
  const [category, setCategory] = useState("")
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState("")

  useEffect(() => {
    if (product) {
      setName(product.name)
      setPrice(product.price)
      setImage(product.image)
      setBrand(product.brand)
      setCategory(product.category)
      setCountInStock(product.countInStock)
      setDescription(product.description)
    }
  }, [product])

  const submitHandler = async (e) => {
    e.preventDefault()

    try {
      await updateProduct({
        productId: id,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      }).unwrap()

      navigate("/admin/productlist")
    } catch (err) {
      alert(err?.data?.message || err.error)
    }
  }

  if (isLoading) return <h2>Loading...</h2>
  if (error) return <h2>Error loading product</h2>

  return (
    <form onSubmit={submitHandler} style={{maxWidth:"500px", margin:"auto"}}>
      <h2>Edit Product</h2>

      <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />

      <input placeholder="Price" type="number" value={price} onChange={e=>setPrice(e.target.value)} />

      <input placeholder="Image URL" value={image} onChange={e=>setImage(e.target.value)} />

      <input placeholder="Brand" value={brand} onChange={e=>setBrand(e.target.value)} />

      <input placeholder="Category" value={category} onChange={e=>setCategory(e.target.value)} />

      <input placeholder="Stock" type="number" value={countInStock} onChange={e=>setCountInStock(e.target.value)} />

      <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />

      <button type="submit" disabled={loadingUpdate}>
        {loadingUpdate ? "Updating..." : "Update Product"}
      </button>
    </form>
  )
}

export default ProductEditScreen

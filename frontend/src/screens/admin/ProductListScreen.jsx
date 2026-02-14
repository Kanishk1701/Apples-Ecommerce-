import { Link, useNavigate } from 'react-router-dom'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../slices/productsApiSlice'

const ProductListScreen = () => {
  const { data: products, isLoading, error, refetch } = useGetProductsQuery()

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation()
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation()

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id)
        toast.success('Product Deleted')
        refetch()
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  const createProductHandler = async () => {
    if (window.confirm('Create a new product?')) {
      try {
        await createProduct()
        refetch()
        toast.success('Product Created')
      } catch (err) {
        toast.error(err?.data?.message || err.error)
      }
    }
  }

  return (
    <div className="container mx-auto pt-10 px-4 min-h-screen">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-serif uppercase tracking-widest">Inventory</h1>
        <button
          onClick={createProductHandler}
          className="bg-apples-black text-white px-6 py-3 text-sm font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <FaPlus /> Create Product
        </button>
      </div>

      {loadingCreate && <div className="text-center mb-4">Creating...</div>}
      {loadingDelete && <div className="text-center mb-4">Deleting...</div>}

      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error.data.message}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-4 font-serif uppercase tracking-widest">ID</th>
                <th className="py-4 font-serif uppercase tracking-widest">Name</th>
                <th className="py-4 font-serif uppercase tracking-widest">Price</th>
                <th className="py-4 font-serif uppercase tracking-widest">Category</th>
                <th className="py-4 font-serif uppercase tracking-widest">Brand</th>
                <th className="py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 font-mono text-xs text-gray-500">{product._id}</td>
                  <td className="py-4 font-bold">{product.name}</td>
                  <td className="py-4 font-mono">₹{product.price}</td>
                  <td className="py-4">{product.category}</td>
                  <td className="py-4">{product.brand}</td>
                  <td className="py-4 text-right">
                    {/* FIXED: Standard Link instead of LinkContainer */}
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <button className="text-gray-600 hover:text-apples-black mr-4">
                        <FaEdit />
                      </button>
                    </Link>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <button>Edit</button>
                    </Link>
                    <button
                      onClick={() => deleteHandler(product._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default ProductListScreen
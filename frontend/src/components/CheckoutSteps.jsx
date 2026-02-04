import { Link } from 'react-router-dom'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="flex justify-center mb-12">
      <div className="flex items-center space-x-4 text-xs uppercase tracking-widest font-bold">
        
        {/* Step 1: Sign In */}
        <div className={step1 ? 'text-apples-black' : 'text-gray-300'}>
          {step1 ? <Link to="/login">Sign In</Link> : <span>Sign In</span>}
        </div>
        <span className="text-gray-300">/</span>

        {/* Step 2: Shipping */}
        <div className={step2 ? 'text-apples-black' : 'text-gray-300'}>
          {step2 ? <Link to="/shipping">Shipping</Link> : <span>Shipping</span>}
        </div>
        <span className="text-gray-300">/</span>

        {/* Step 3: Payment */}
        <div className={step3 ? 'text-apples-black' : 'text-gray-300'}>
          {step3 ? <Link to="/payment">Payment</Link> : <span>Payment</span>}
        </div>
        <span className="text-gray-300">/</span>

        {/* Step 4: Place Order */}
        <div className={step4 ? 'text-apples-black' : 'text-gray-300'}>
          {step4 ? <Link to="/placeorder">Place Order</Link> : <span>Place Order</span>}
        </div>

      </div>
    </nav>
  )
}

export default CheckoutSteps
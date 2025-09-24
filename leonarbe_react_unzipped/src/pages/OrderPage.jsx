import '../App.css'
import OrdersTable from '../components/ExercisesTable';


function OrderPage(){
    return (
        <div className="orderPage">
            <h2>This is the Order Page!</h2>
            <p>You can enter your order below:</p>
            <p>Click the <code>&lt;</code>- or -<code>&gt;</code> to decrease or increase Quantity!</p>
            <p>Minimum count is 0 and Maximum count is 10.</p>
        </div>
    );
}

export default OrderPage;
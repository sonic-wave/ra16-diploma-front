import { useState, useEffect } from 'react'
import { Header } from '../Header/Header'
import { Footer } from '../Footer/Footer'
import { Banner } from '../Banner/Banner'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { removeCartItem } from '../../redux/slices/cartSlice';
import { formatNumber } from '../../functions/formatNumber';
import { createPostRequest } from '../../functions/createRequest';

export const Cart = () => {
    let [totalSum, setTotalSum] = useState(0);
    let [disabled, setDisabled] = useState(true);
    const cartList = useAppSelector(state => state.cartList.cartList);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (cartList.length > 0) {
            const sum = cartList.reduce((acc, item) => acc + item.totalPrice, 0);
            setTotalSum(sum);
        }
    }, [cartList])

    const deleteItemHandler = (item) => {
        dispatch(removeCartItem(item))
        const sum = totalSum - item.totalPrice;
        setTotalSum(sum);
    }

    const agreementHandler = (e) => {
        if (e.target.checked) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    const submitClickHandler = async (e) => {
        e.preventDefault();

        const form = e.target;
        const phone = form.phone.value;
        const address = form.address.value;

        const items = cartList.map(item => ({
            id: item.id,
            price: item.totalPrice,
            count: item.counter
        }));

        const order = {
            "owner": {
                "phone": phone,
                "address": address,
            },
            items: items
        }

        try {
            await createPostRequest(order);
            dispatch(clearCartList());
            alert('Заказ успешно оформлен');
        } catch (error) {
            console.error('Ошибка при оформлении заказа', error);
        }
    };

    return (
        <>
            <Header />
            <main className="container">
                <div className="row">
                    <div className="col">
                        <Banner />
                        <section className="cart">
                            <h2 className="text-center">Корзина</h2>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Название</th>
                                        <th scope="col">Размер</th>
                                        <th scope="col">Кол-во</th>
                                        <th scope="col">Стоимость</th>
                                        <th scope="col">Итого</th>
                                        <th scope="col">Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartList.length > 0 && cartList.map((item, index) => (
                                        <tr key={item.id}>
                                            <td scope="row">{index + 1}</td>
                                            <td>{item.title}</td>
                                            <td>{item.size}</td>
                                            <td>{item.counter}</td>
                                            <td>{formatNumber(item.price)} руб.</td>
                                            <td>{formatNumber(item.totalPrice)} руб.</td>
                                            <td><button className="btn btn-outline-danger btn-sm" onClick={() => deleteItemHandler(item)}>Удалить</button></td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="5" className="text-right">Общая стоимость</td>
                                        <td>{formatNumber(totalSum)} руб.</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>
                        <section className="order">
                            <h2 className="text-center">Оформить заказ</h2>
                            <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
                                <form className="card-body" onSubmit={submitClickHandler}>
                                    <div className="form-group">
                                        <label htmlFor="phone">Телефон</label>
                                        <input className="form-control" id="phone" placeholder="Ваш телефон" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Адрес доставки</label>
                                        <input className="form-control" id="address" placeholder="Адрес доставки" />
                                    </div>
                                    <div className="form-group form-check">
                                        <input type="checkbox" className="form-check-input" id="agreement" onChange={agreementHandler} />
                                        <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                                    </div>
                                    <button type="submit" className="btn btn-outline-secondary" disabled={disabled}>Оформить</button>
                                </form>
                            </div>
                        </section>
                    </div >
                </div >
            </main >

            <Footer />
        </>
    )
}

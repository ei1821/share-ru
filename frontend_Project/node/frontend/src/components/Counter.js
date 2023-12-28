import { useSelector, useDispatch } from 'react-redux';

import { counterActions } from '../stores';

const Counter = () => {
    const counter = useSelector((state) => state.counter.counter);
    const show = useSelector((state) => state.counter.showNum);
    const dispatch = useDispatch();

    const incrementHandler = () => {
        dispatch(counterActions.increment());
    };
    const decrementHandler = () => {
        dispatch(counterActions.decrement());
    };
    const increaseHandler = () => {
        dispatch(counterActions.increase(5));
    };
    const toggleHandler = () => {
        dispatch(counterActions.toggleCounter());
    };

    return (
        <div>
            {show && <h1>{counter}</h1>}
            <div className="counter-btn">
                <div className="btn" onClick={incrementHandler}>
                    +1
                </div>
                <div className="btn" onClick={increaseHandler}>
                    +5
                </div>
                <div className="btn" onClick={decrementHandler}>
                    -1
                </div>
            </div>
            <div className="btn" onClick={toggleHandler}>
                表示/非表示
            </div>
        </div>
    );

};

export default Counter;
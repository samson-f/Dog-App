import { Children, createContext, useContext, useState } from 'react'
import './css/child.css'
import PopupBtn from './PopupBtn';

const PageContext = createContext();

function Container(props) {
    const myContext = useContext(PageContext);
    return <>
        <h3>This is contained</h3>
        {Children.map(props.children, (child, i) => i!=1 ? <span>
            [start]
            {child}
            [end]
            <br />
        </span> : null)}
        <button onClick={() => myContext.changeText((prev) => prev === 'first' ? 'second' : 'first')}>
            Click here!
        </button>
    </>
}

const Child = () => {
    const [myState, setMyState] = useState('first');
    return (
    <PageContext.Provider value={{changeText: setMyState}}>
        <PopupBtn title='This is a popup'>
            <h3>pop pop pop</h3>
            <h4>up up up</h4>
        </PopupBtn>
        <h1>Sandbox page</h1>
        <h2>The state is: {myState}</h2>
        <Container>
            <h5>kjgjkrdsjf</h5>
            <span>ffslfsfk jdfd</span>
            <span>sdfjgldg</span>
        </Container>
    </PageContext.Provider>
    )
}

export default Child
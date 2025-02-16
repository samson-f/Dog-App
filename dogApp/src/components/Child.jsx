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

function Frame({title}) {
    return <fieldset className='frame'>
        <legend>{title}</legend>
        <h4>What should I write?</h4>
        <p>Nu?! </p>
        <span>I don't know...</span>
    </fieldset>
}

const Displayer = ({children}) => {
    const [value, setValue] = useState(1);
    const childrenAmnt = Children.count(children);    

    return <>
        <input 
            type="number" 
            min='1' 
            max={childrenAmnt}
            value={value}
            onChange={(e) =>setValue(e.target.value)}
        />
        <br />
        {childrenAmnt == 1 ? children : children[value - 1]}
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
        {/* <Frame title='My BS'>
            
        </Frame>
        <Displayer>
            <span>aaaaaaaaaaaaaaa</span>
            <span>bbbbbbbbbbbbbbb</span>
            <span>ccccccccccccccc</span>
            <span>ddddddddddddddd</span>
            <span>eeeeeeeeeeeeeee</span>
        </Displayer> */}
    </PageContext.Provider>
    )
}

export default Child
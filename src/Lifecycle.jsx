import React, {useState, useEffect} from 'react';

const UnmountTest = () => {


    // Unmount 만들기
    // 마운트를 제어하는 useEffect를 제어하는 콜백함수가 함수 하나를 리턴하게 하면 된다! 그러면 이 리턴되는 함수는 unmount 시에 실행이됩니다!
    useEffect(() => {
        console.log('mount!!')

        return () => {
            // Unmount시에 실행된다.
            console.log('Unmount!!')
        }
    },[])

    return <div>Unmout Testion Component</div>
}

const Lifecycle = () => {

    const [isVisible, setIsVisible] = useState(false)
    const toggle = () => setIsVisible(!isVisible)


    return (
        <div style={ {padding : 20} }>
            <button onClick={toggle}>ON/OFF</button>
            {isVisible && <UnmountTest />}
        </div>
    )
}

export default Lifecycle;
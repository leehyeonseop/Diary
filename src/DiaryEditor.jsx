import { useRef ,useState } from 'react';

const DiaryEditor = (props) => {

    const {onCreate} = props

    const authorInput = useRef()
    const contentInput = useRef()

    // 지금 이거는 2개
    const [state, setState] = useState({
        author : "",
        content : "",
        emotion : 1
    })


    // 지금 살펴보면 onChange 이벤트의 콜백함수도 비슷한 형태이므로 하나의 함수로 만들어보자!
    const handleChangeState = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
        // e.target.name을 출력해보면 우리가 변경해줄 state의 키 값과 동일하게 설정해주었으므로 author와 content가 나오게 된다. 이 점을 이용해서 콜백함수도 비슷한형태이므로 이렇게 하나로 합쳐줄 수 있다.
        setState({
            ...state,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = () => {
        
        // 적당한 길이의 값을 입력해주지 않았을 경우 처리해주기!
        if(state.author.length < 1) {
            // focus
            authorInput.current.focus()
            return
        }

        if(state.content.length < 5) {
            // focus
            contentInput.current.focus()
            return
        }

        console.log(state.author)
        onCreate(state.author, state.content, state.emotion);
        console.log(state);
        alert('저장 성공')
        setState({
            author : "",
            content : "",
            emotion : 1,
        })
    }

    // 동작이 비슷한 state들을 두개로 나누지 않고 하나로 묶어 줄수 있따.
    // const [author, setAuthor] = useState("")
    // const [content, setContent] = useState("")

    return (
        <div className='DiaryEditor'>
            <h2>오늘의 일기</h2>
            <div>
                <input
                    ref={authorInput}
                    name='author'
                    type="text" 
                    value={state.author}
                    // onChange={(e) => {
                    //     // 지금 이거는 2개니까 간단하지만 만약에 10개 이렇게 된다면 엄청 복잡해짐 이럴때 사용해주는것이 스프레드 연산 ...state 이런식으로 작성해주면 된다.

                    //     // 순서에 주의 해줘야함 ...state 먼저! 원래 있던 state를 먼저 펼쳐주고 나서 우리가 변경해줄 스테이트를 그 다음에적어준다.
                        
                    //     setState({
                    //         // author : e.target.value,
                    //         // content : state.content
                    //         ...state,
                    //         author : e.target.value
                    //     })            
                    // }}
                    onChange={handleChangeState}
                />
            </div>
            <div>
                <textarea
                    ref={contentInput}
                    name='content' 
                    value={state.content}
                    // onChange={(e) => {
                    //     setState({
                    //         // author : state.author,
                    //         // content : e.target.value
                    //         ...state,
                    //         content : e.target.value
                    //     })
                    // }}
                    onChange={handleChangeState}
                />
            </div>
            <div>

                <span>오늘의 감정점수 : </span>

                <select 
                    name='emotion'
                    value={state.emotion}
                    onChange={handleChangeState}
                >
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
            </div>
            <div>
                <button onClick={handleSubmit}>일기 저장하기</button>
            </div>
        </div>
    )
};

export default DiaryEditor
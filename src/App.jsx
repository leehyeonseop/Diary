import DiaryEditor from './DiaryEditor';
import './App.css'
import DiaryList from './DiaryList';
import React, { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';



// https://jsonplaceholder.typicode.com/comments

// const dummyList = [
//   {
//     id:1,
//     author : "이현섭",
//     content : "하이 1",
//     emotion : 1,
//     created_date : new Date().getTime()
//   },
//   {
//     id:2,
//     author : "이정환",
//     content : "하이 2",
//     emotion : 2,
//     created_date : new Date().getTime()
//   },
//   {
//     id:3,
//     author : "수메네",
//     content : "하이 3",
//     emotion : 3,
//     created_date : new Date().getTime()
//   },
//   {
//     id:4,
//     author : "이승민",
//     content : "하이 4",
//     emotion : 5,
//     created_date : new Date().getTime()
//   },
// ]

const reducer = (state, action) => {
  switch(action.type) {
    case 'INIT' : {
      return action.data
    }
    case 'CREATE' : {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date
      }
      return [newItem, ...state]
    }
    case 'REMOVE' : {
      return state.filter((item) => item.id !== action.targetId)
    }
    case 'EDIT' : {
      return state.map((item) => 
        item.id === action.targetId ? 
        {...item, content:action.newContent} : item
      )
    }
    default :
      return state;
  }
}

// export default 는 파일 하나당 한번밖에 사용할 수 없음.
export const DiaryStateContext = React.createContext()

export const DiaryDispatchContext = React.createContext()



function App() {

  // const [data, setData] = useState([])
  // dispatch를 호출하면 reducer가 실행되고 그 reducer가 리턴하는 값이 data의 값이된다.
  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const getData = async() => {
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json())
    
    const initData = res.slice(0, 20).map((item) => {
      return {
        author : item.email,
        content : item.body,
        emotion : Math.floor(Math.random() * 5)+1,
        created_date : new Date().getTime(),
        id : dataId.current++
      }
    })

    dispatch({type : 'INIT', data : initData})
  }

  useEffect(getData,[])

  const onCreate = useCallback((author, content, emotion) => {

    dispatch({
      type : 'CREATE', 
      data : {author, content, emotion, id:dataId.current}
    })

    // const created_date = new Date().getTime();
    // const newItem = {
    //   author,
    //   content,
    //   emotion,
    //   created_date,
    //   id : dataId.current
    // }
    dataId.current += 1;
    // 가장 최신의 아이템을 위로 끌어올리기 위해서
    // setData((data) => [newItem, ...data])
  },[])











  // 아이템 삭제하는 함수
  const onRemove = useCallback((targetId) => {

    dispatch({type : 'REMOVE', targetId})

    // console.log(`${targetId} 가 삭제되었습니다.`)
    // const newDiaryList = data.filter((item) => item.id !== targetId);
    // console.log(newDiaryList)
    // setData((data) => data.filter((item) => item.id !== targetId))
  },[])

  // 아이템을 수정하는 함수
  // onEdit 함수는 특정 일기를 수정하는 함수로 작성할거임
  // 원래의 data함수를 map으로 돌림
  // id값이 수정할 id와 같다면 그 데이터들은 스프레드시켜주고 content만 newContent로 수정한뒤, 삼항 연산자이므로 다른 id들은 그냥 그대로 반환하도록



















  const onEdit = useCallback((targetId, newContent) => {

    dispatch({type : 'EDIT', targetId, newContent})

    // setData((data) =>
    //   data.map((item) => item.id === targetId ? {...item, content : newContent} : item)
    // )
  },[])



  const memoizedDispatches = useMemo(() => {
    return {onCreate, onRemove, onEdit}
  },[])










  // 처음 마운트될때 일기분석시작이 뜨고, api요청해서 data가 다시 set되므로 리렌더링이 한번더 일어나게 된다. 또한, 일기를 수정할때마다 data가 변경되기때문에 다시 렌더링이 일어나게되는데, getDiaryAnalysis의 리턴값에는 아무런 영향이 없는데 이 함수도 자꾸 실행되게된다. 이런 경우 최적화하기 위해서 useMemo를 사용해준다!

  // memoization하고 싶은 함수를 감싸주면된다!
  // 이 콜백함수가 리턴하는 값을 최적화하도록 도와줌
  // 두번째 인수인 의존성배열에 data.length을 넣어줌 => data.length가 변할때만 이 콜백함수가 다시실행

  // useMemo는 콜백함수가 반환하는 값을 다시 사용할 수 있도록 dependancy array를 기준으로 memoization을 도와준다.

  const getDiaryAnalysis = useMemo(() => {
    // console.log("일기 분석 시작!");

    const goodCount = data.filter((item) => item.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return {goodCount, badCount, goodRatio}
  },[data.length])

  const {goodCount, badCount, goodRatio} = getDiaryAnalysis

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
      <div className="App">
        <DiaryEditor/>
        <div>전체 일기 : {data.length}</div>
        <div>기분 좋은 일기 개수 : {goodCount}</div>
        <div>기분 나쁜 일기 개수 : {badCount}</div>
        <div>기분 좋은 일기 비율 : {goodRatio}</div>
        <DiaryList/>
      </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
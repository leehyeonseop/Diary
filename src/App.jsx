import DiaryEditor from './DiaryEditor';
import './App.css'
import DiaryList from './DiaryList';
import { useRef, useState } from 'react';

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

function App() {

  const [data, setData] = useState([])

  const dataId = useRef(0);

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id : dataId.current
    }
    dataId.current += 1;
    // 가장 최신의 아이템을 위로 끌어올리기 위해서
    setData([newItem, ...data])
  }

  // 아이템 삭제하는 함수
  const onRemove = (targetId) => {
    console.log(`${targetId} 가 삭제되었습니다.`)
    const newDiaryList = data.filter((item) => item.id !== targetId);
    console.log(newDiaryList)
    setData(newDiaryList)
  }

  // 아이템을 수정하는 함수
  // onEdit 함수는 특정 일기를 수정하는 함수로 작성할거임
  // 원래의 data함수를 map으로 돌림
  // id값이 수정할 id와 같다면 그 데이터들은 스프레드시켜주고 content만 newContent로 수정한뒤, 삼항 연산자이므로 다른 id들은 그냥 그대로 반환하도록


  const onEdit = (targetId, newContent) => {
    setData(
      data.map((item) => item.id === targetId ? {...item, content : newContent} : item)
    )
  }

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList 
        diaryList={data}
        onRemove={onRemove}
        onEdit={onEdit}
      />
    </div>
  );
}

export default App;

import { useContext } from 'react'
import { DiaryStateContext } from './App'
import DiaryItem from './DiaryItem'


const DiaryList = (props) => {

    
    
    const diaryList = useContext(DiaryStateContext)

    // 현재 diaryList를 props로 받아서 배열을 순회하여 리스트를 뽑아줬지만, 만약 넘어오는 list의 값이 undefined라면 문제의 소지가 있다. 따라서 defaultPros를 활용해서 이러한 경우를 대비하자.

    // defaultProps 란? undefined로 전달될거 같은 props들을 기본값을 설정할 수 있는 기능.

    // map으로 리턴해줄때 각 요소들에는 key값이 있어야한다. 이 key값으로 각 아이템들의 고유값인 id같은 것들을 넣어줄 수 있지만, 만약 이러한 id값이 없을경우 map의 2번째 인자인 index를 넣어 줄 수 있다. 하지만 이럴 경우 나중에 수정하거나 할때 문제가 생길 수 있다. => 따라서 고유한 id를 가지고 있다면 고유한 id로 key를 지정해주자!

    return (
        <div className='DiaryList'>
            <h2>일기 리스트</h2>
            <h4>{diaryList.length}개의 일기가 있습니다.</h4>
            <div>
                {diaryList.map((item, index) => {
                    return (
                        <DiaryItem 
                            key={item.id}
                            {...item}
                        />
                    )
                })}
            </div>
        </div>
    )
}

DiaryList.defaultProps = {
    diaryList:[]
}

export default DiaryList;
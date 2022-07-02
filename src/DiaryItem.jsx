import { useRef } from 'react';
import { useState } from 'react'

const DiaryItem = (props) => {

    const {author, content, emotion, created_date, id, onRemove, onEdit} = props

    const [isEdit, setIsEdit] = useState(false);
    const toggleIsEdit = () => setIsEdit(!isEdit);

    const [localContent, setLocalContent] = useState(content)

    const localContentInput = useRef()

    const handleRemove = () => {
        console.log(id)
        if(window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
            onRemove(id);
        }
    }

    // 현재 localContent의 기본값을 원래 content로 넣어줬기때문에 수정하기 버튼을 누른다면 원래의 내용이 나오게 된다. 하지만 여기에서 수정을 해주고 수정취소 버튼을 누른다면, localContent는 이미 setLocalContent 상태가 되었기 때문에 다시 수정하기 버튼을 누른다면 추가된 내용이 나오게됨 

    const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(content);
    }

    const handleEdit = () => {

        if(localContent.length < 5) {
            localContentInput.current.focus()
            return;
        }

        if(window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
            onEdit(id, localContent)
            toggleIsEdit()
        }

        
    }

    return (
        <div className='DiaryItem'>
            <div className='info'>
                <span>작성자 : {author} | 감정점수 : {emotion}</span>
                <br></br>
                <span className='date'>
                    {new Date(created_date).toLocaleString()}
                </span>
            </div>
            <div className='content'>
                {isEdit ? (
                    <>
                        <textarea
                            ref={localContentInput} 
                            value={localContent}
                            onChange={(e) => {
                                setLocalContent(e.target.value)
                            }}
                        />
                    </>
                ) : (
                    <>{content}</>
                )}
            </div>

            {isEdit ? (
                <>
                    <button onClick={handleQuitEdit}>수정 취소</button>
                    <button onClick={handleEdit}>수정 완료</button>
                </>
            ) : (
                <>
                    <button onClick={handleRemove}>삭제하기</button>
                    <button onClick={toggleIsEdit}>수정하기</button>
                </>
            )}

        </div>
    )
}

export default DiaryItem;
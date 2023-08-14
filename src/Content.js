import { useEffect, useState } from 'react'

const tabs = ['posts', 'comments', 'albums']

function Content() {
    const [title, setTitle] = useState('')
    const [posts, setPosts] = useState([])
    const [type, setType] = useState('posts')
    const [buttonTop, setButtonTop] = useState(false)
    const [width, setWidth] = useState(window.innerWidth)
    const [countdown, setCountdown] = useState(180)
    const [avatar, setAvatar] = useState()

    //console.log(window.innerWidth)

    //console.log(type);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/${type}`)
            .then(res => res.json())
            .then(posts => {
                setPosts(posts)
            })
    }, [type])

    useEffect(() => {
        const handleScroll = () => {
            setButtonTop(window.scrollY >= 200)
        }

        window.addEventListener('scroll', handleScroll)

        //cleanup funcion
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth)
        }

        window.addEventListener('resize', handleResize)
    })

    useEffect(() => {
        const timerID = setTimeout(() => {
            setCountdown(countdown - 1)
            //console.log('countdown:', countdown);
        }, 1000)

        return () => {
            clearTimeout(timerID)
        }
    }, [countdown])



    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0]
        file.preview = URL.createObjectURL(file)
        setAvatar(file)
    }

    useEffect(() => {
        return () => {
            URL.revokeObjectURL(avatar.preview)
        }
    }, [avatar])

    return (
        <div>
            <input
                type='file'
                onChange={handlePreviewAvatar}
            />
            {avatar && (
                <img src={avatar.preview} alt='' width='50%' />
            )}

            <h1>{countdown}</h1>
            {tabs.map(tab => (
                <button key={tab}
                    style={type === tab ? {
                        color: '#fff',
                        background: '#333'
                    } : {}}
                    onClick={() => setType(tab)}
                >
                    {tab}
                </button>
            ))}
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
            />

            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title || post.name}</li>
                ))}
            </ul>
            {buttonTop && (
                <button style={{
                    position: 'fixed',
                    right: 20,
                    bottom: 20,
                }}>Go to Top</button>
            )}
            <h1>{width}</h1>
        </div>
    )
}

export default Content
// import { useEffect, useLayoutEffect, useRef, useState, memo } from "react"



// const lessons = [
//     {
//         id: 1,
//         name: 'ReactJS là gì? Tại sao nên học ReactJS'
//     },
//     {
//         id: 2,
//         name: 'SPA/MMA là gì?'
//     },
//     {
//         id: 3,
//         name: 'Arrow function'
//     }
// ]


// function Content() {
//     const [lessonId, setLessonId] = useState(1)
//     const [count, setCount] = useState(60)


//     const timerId = useRef()
//     const prevCount = useRef()
//     const h1Ref = useRef()

//     useEffect(() => {
//         prevCount.current = count
//     }, [count])

//     useEffect(() => {
//         const rect = h1Ref.current.getBoundingClientRect()
//         console.log(rect)
//     })



//     const handleStart = () => {
//         timerId.current = setInterval(() => {
//             setCount(prevCount => prevCount - 1)
//         }, 50000)

//         console.log('start', timerId.current);
//     }

//     const handleStop = () => {
//         clearInterval(timerId.current)
//         console.log('stop', timerId.current)
//     }

//     console.log(count, prevCount.current)

//     useEffect(() => {
//         const handleComment = ({ detail }) => {
//             //console.log({ detail });
//         }
//         window.addEventListener(`lesson-${lessonId}`, handleComment)

//         //cleanup function
//         return () => {
//             window.removeEventListener(`lesson-${lessonId}`, handleComment)
//         }
//     }, [lessonId])

//     return (
//         <div style={{ padding: 20 }}>
//             <h1 ref={h1Ref}>{count}</h1>
//             <button onClick={handleStart}>Start</button>
//             <button onClick={handleStop}>Stop</button>
//             {/* <ul>
//                 <h1>{count}</h1>
//                 <button onClick={handleCount}>count</button>
//                 {lessons.map(lesson => (
//                     <li
//                         key={lesson.id}
//                         style={{
//                             color: lessonId === lesson.id ?
//                                 'red' : '#333'
//                         }}

//                         onClick={() => setLessonId(lesson.id)}
//                     >
//                         {lesson.name}
//                     </li>
//                 ))}
//             </ul> */}
//         </div>
//     )
// }


// export default memo(Content)
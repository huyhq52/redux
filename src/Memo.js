import { memo } from 'react'

function Memo() {

    console.log('re-render')

    return (
        <div>
            <h1>Hello anh em</h1>

        </div>
    )
}

export default memo(Memo)
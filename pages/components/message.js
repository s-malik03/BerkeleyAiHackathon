import React from 'react'

import classes from './message.module.css'

import getDateTimeFromMS from '../lib/utils'

function Message({ id, texts, duration, mode, disabled, onClick }) {

    const [count, setCount] = React.useState(0)
    const [value, setValue] = React.useState(0)

    React.useEffect(() => {

        let timer = null

        if(mode) {

            const interval = (duration * 1000)/100
            const delta = duration / 100

            timer = setInterval(() => {

                setCount(c => c + 1)
                setValue(v => v + delta)

            }, interval)

        }

        return () => {
            
            setCount(0)
            setValue(0)
            clearInterval(timer)
        }

    }, [mode, duration])

    let now = id.replace('tmp-file', '').replace('.m4a', '')
    let display_date = getDateTimeFromMS(now)
    let display_value = Math.round(10 * value)/10

    return (
        <div className={classes.message}>
            <div className={classes.datetime}>{ display_date }</div>
            <div className={classes.inner}>
                <div className={classes.text}>
                { texts.map((text) => {
                    return (
                        <p className={classes.item}>
                            {/* <span className={classes.textTime}>{ duration }</span> */}
                            <span className={classes.textText}>{ text }</span>
                        </p>
                    )
                }) }
                </div>
            </div>
        </div>
    )
}

export default Message
import React from 'react'
import * as examples from './module/index.js'

export default (props) => {
    const { name } = props.params
    const Example = examples[name]
    if (!Example) {
        return null
    }
    return <Example />
}

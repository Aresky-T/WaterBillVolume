import React, { useEffect } from 'react'

const PublicRoute = (props) => {
    useEffect(() => {
        document.title = props.title
    }, [props.title])

    return props.children
}

export default PublicRoute
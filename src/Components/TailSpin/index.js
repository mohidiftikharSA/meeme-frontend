import React from 'react'
import { TailSpin } from 'react-loader-spinner'

export default function TailSpinLoader({ height = "80", width = "80", color = "#4fa94d", isLoading = false }) {
    return (
        <>
            {isLoading && <TailSpin
                visible={true}
                height={height}
                width={width}
                color={color}
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
            />}
        </>
    )
}

import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Bisection from './bisection'
import Taylor from './taylorSeries'
import FalsePosition from './falsePosition'
import { methodsInterface } from '../../App'
import OnePoint from './onePoint'
import Newton from './newton'
import Secant from './secant'
import Cramer from './cramer'
const Methods = (props: { allMethods: methodsInterface[] }) => {
    let methodName = useParams<{ methodName: string }>().methodName
    let [isAvailable, setIsAvailable] = React.useState<boolean>(false)
    useEffect(() => {

        const checkMethod = async (methodName: string) => {
            let isAvailable: boolean = await new Promise((resolve, reject) => {
                props.allMethods.forEach((method: any) => {
                    if (method.methodName === methodName && method.available) {
                        resolve(true)
                    }
                })
                reject(false)
            })
            setIsAvailable(isAvailable)
        }

        if (methodName && props.allMethods.length > 0) {

            checkMethod(methodName)
        }

    }, [props.allMethods])


    const generateMethod = (methodName: string) => {
        switch (methodName) {
            case 'bisection':
                return <Bisection />
            case 'false-position':
                return <FalsePosition />
            case 'onePoint':
                return <OnePoint />
            case 'newton-raphson':
                return <Newton />
            case 'secant':
                return <Secant />
            case 'cramer':
                return <Cramer />
            case 'taylor':
                return <Taylor />

            default:
                return <div>Not found module</div>
        }
    }
    if (!methodName) {
        return <div>Not found module</div>
    }

    if (!isAvailable) {
        return <div>Method is not available right now</div>
    }

    return (
        <div>
            {generateMethod(methodName)}
        </div>
    )
}

export default Methods
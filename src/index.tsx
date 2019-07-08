import { h, Component, render } from 'preact'

declare var cityDZ101010100: {
    weatherinfo: {
        cityname: string
        temp: string
        tempn: string
        weather: string
    }
}

interface State {
    visits?: number
    time?: string
    param?: any
}
class App extends Component<{}, State>{
    state: State = {}

    get_visits = async () => {
        const { visits } = await fetch('/visit').then(res => res.json())
        this.setState({visits})
    }
    get_param = async () => {
        const fn = `F${Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)}`
        const script = document.createElement('script');
        console.log(fn);
        window[fn] = (param) => {
            console.log(param)
            this.setState({ param })
            document.body.removeChild(script)
        }
        script.src = `/jsonp?a=1&b=2&b=3&callback=${fn}`
        document.body.appendChild(script)
    }

    sse: EventSource
    componentDidMount () {
        this.get_visits()
        this.get_param()
        this.sse = new EventSource('/time')
        this.sse.addEventListener('message', e => {
            this.setState(JSON.parse(e.data))
        })
    }
    componentWillUnmount () {
        this.sse.close()
    }
    
    render () {
        const { visits, time, param } = this.state
        const { cityname, temp, tempn, weather } = cityDZ101010100.weatherinfo
        return <table style={{width: '100%'}}>
            <tr>
                <td>服务已被访问 {visits}</td>
                <td>{cityname}天气 {weather} {temp}~{tempn}</td>
                <td>服务器时间: {time}</td>
            </tr>
            <tr>
                <td>&nbsp;</td>
                <td>
                    <pre>{JSON.stringify(param, null, 4)}</pre>
                </td>
                <td>&nbsp;</td>
            </tr>
        </table>
    }
}

render(<App />, document.getElementById('app'))
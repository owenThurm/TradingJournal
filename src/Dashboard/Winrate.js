import { Tooltip, Progress } from 'antd';

const Winrate = (props) => {

    return (
        <div>
            <Tooltip >
                <Progress strokeColor='red' trailColor='gray'
                percent={props.loseRate+props.winRate}
                success={{ percent: props.winRate }} type="circle" />
            </Tooltip>
        </div>
    );

}

export default Winrate;